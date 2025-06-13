import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/app/lib/db";
import { leadSubmissions } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";
import { ratelimit, getClientIp } from "@/app/lib/rate-limit";

// Form completion validation schema
const CompleteFormSchema = z.object({
  submissionId: z.string().min(1, { message: "Submission ID is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  revenue: z.string().min(1, { message: "Monthly revenue is required" }),
  budget: z.string().min(1, { message: "Marketing budget is required" }),
  website: z.string().min(1, { message: "Website URL is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  referralSource: z.string().min(1, { message: "Referral source is required" }),
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
    
    // Validate form data using Zod
    const result = CompleteFormSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
    }
    
    // Extract validated data
    const { 
      submissionId, 
      email, 
      revenue, 
      budget, 
      website, 
      firstName, 
      lastName, 
      phone, 
      referralSource 
    } = result.data;
    
    // Check if the submission exists
    const existingSubmission = await db.query.leadSubmissions.findFirst({
      where: eq(leadSubmissions.id, submissionId)
    });
    
    if (!existingSubmission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }
    
    // Verify that the email matches what was initially captured
    if (existingSubmission.email !== email) {
      return NextResponse.json({ error: "Email mismatch" }, { status: 400 });
    }
    
    // Update the submission with all form data
    await db
      .update(leadSubmissions)
      .set({
        revenue,
        budget,
        website,
        firstName,
        lastName,
        phone,
        referralSource,
        status: "complete",
        completedAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(leadSubmissions.id, submissionId));
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: "Form submission completed successfully" 
    });
  } catch (error) {
    console.error("Error completing form submission:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
} 