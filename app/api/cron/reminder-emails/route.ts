import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { leadSubmissions } from "@/app/lib/db/schema";
import { eq, and, lt, or, isNull, lte, sql } from "drizzle-orm";

// Function to validate the cron secret
function validateCronSecret(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !process.env.CRON_SECRET) return false;
  
  const providedSecret = authHeader.split(" ")[1]; // Format: "Bearer <secret>"
  return providedSecret === process.env.CRON_SECRET;
}

// This endpoint will be called by Vercel Cron Jobs
export async function GET(request: NextRequest) {
  try {
    // Validate the secret to ensure this is called by the cron job
    if (!validateCronSecret(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const now = new Date();
    
    // Find partial submissions that haven't been reminded in the last 24 hours
    // and were created at least 1 hour ago but less than 7 days ago
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Get candidates for reminders - using sql literals for date comparison
    const reminderCandidates = await db.query.leadSubmissions.findMany({
      where: and(
        eq(leadSubmissions.status, "partial"),
        sql`${leadSubmissions.createdAt} < ${oneHourAgo}`, // Created at least 1 hour ago
        or(
          isNull(leadSubmissions.lastReminderAt),
          sql`${leadSubmissions.lastReminderAt} < ${oneDayAgo}` // No reminder in last 24 hours
        ),
        lte(leadSubmissions.remindersCount, "2"), // Max 3 reminders (0, 1, 2)
        sql`${leadSubmissions.createdAt} >= ${sevenDaysAgo}` // Created within last 7 days
      ),
    });
    
    if (reminderCandidates.length === 0) {
      return NextResponse.json({ message: "No candidates for reminders found" });
    }
    
    // Process each candidate and send reminder email
    const processed = [];
    
    for (const candidate of reminderCandidates) {
      // TODO: Implement email sending logic
      // For now, we'll just update the reminder count and timestamp
      
      const newRemindersCount = parseInt(candidate.remindersCount || "0") + 1;
      
      await db
        .update(leadSubmissions)
        .set({
          remindersCount: newRemindersCount.toString(),
          lastReminderAt: now,
          updatedAt: now,
        })
        .where(eq(leadSubmissions.id, candidate.id));
      
      processed.push({
        id: candidate.id,
        email: candidate.email,
        reminderCount: newRemindersCount,
      });
    }
    
    return NextResponse.json({
      message: `Processed ${processed.length} reminder emails`,
      processed,
    });
  } catch (error) {
    console.error("Error sending reminder emails:", error);
    return NextResponse.json(
      { error: "Failed to process reminder emails" },
      { status: 500 }
    );
  }
} 