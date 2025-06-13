import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/app/lib/db";
import { leadSubmissions } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";
import { ratelimit, getClientIp } from "@/app/lib/rate-limit";

// Email validation schema
const EmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export async function POST(request: NextRequest) {
  try {
    const db = getDb();
    // Apply rate limiting
    const ip = getClientIp(request);
    const { success, limit, reset, remaining } = await ratelimit.limit(`leads_ip_${ip}`);
    
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { 'X-RateLimit-Limit': limit.toString(), 'X-RateLimit-Remaining': remaining.toString(), 'X-RateLimit-Reset': reset.toString() } }
      );
    }

    // Parse request body
    const body = await request.json();
    
    // Validate email using Zod
    const result = EmailSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    
    // Extract validated email
    const { email } = result.data;
    
    // Get user agent for tracking
    const userAgent = request.headers.get("user-agent") || "";
    
    try {
      // Check if this email already exists
      const existingSubmission = await db.query.leadSubmissions.findFirst({
        where: eq(leadSubmissions.email, email)
      });
      
      let submissionId;
      
      if (existingSubmission) {
        // Update existing record
        submissionId = existingSubmission.id;
        await db
          .update(leadSubmissions)
          .set({ updatedAt: new Date() })
          .where(eq(leadSubmissions.id, submissionId));
      } else {
        // Create new record
        const [newSubmission] = await db
          .insert(leadSubmissions)
          .values({
            email,
            status: "partial",
            ipAddress: ip,
            userAgent
          })
          .returning({ id: leadSubmissions.id });
        
        submissionId = newSubmission.id;
      }
      
      // Return success response with submission ID
      return NextResponse.json({ 
        success: true, 
        message: "Email captured successfully", 
        submissionId 
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      
      // For development, return detailed error
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({ 
          error: "Database error", 
          details: dbError instanceof Error ? dbError.message : String(dbError)
        }, { status: 500 });
      }
      
      return NextResponse.json({ error: "Failed to save your information" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error processing form submission:", error);
    
    // For development, return detailed error
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ 
        error: "Failed to process your request", 
        details: error instanceof Error ? error.message : String(error)
      }, { status: 500 });
    }
    
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
} 