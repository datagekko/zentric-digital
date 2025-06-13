import { pgTable, varchar, timestamp, text } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

// Lead form submissions table schema
export const leadSubmissions = pgTable("lead_submissions", {
  id: varchar("id", { length: 128 }).primaryKey().$defaultFn(() => createId()),
  email: varchar("email", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("partial"), // 'partial' or 'complete'
  revenue: varchar("revenue", { length: 50 }),
  budget: varchar("budget", { length: 50 }),
  website: varchar("website", { length: 255 }),
  firstName: varchar("firstName", { length: 100 }),
  lastName: varchar("lastName", { length: 100 }),
  phone: varchar("phone", { length: 50 }),
  referralSource: varchar("referralSource", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  remindersCount: varchar("reminders_count").default("0"),
  lastReminderAt: timestamp("last_reminder_at"),
  completedAt: timestamp("completed_at"),
  ipAddress: varchar("ip_address", { length: 50 }),
  userAgent: text("user_agent"),
});

// Type definitions for easier usage
export type LeadSubmission = typeof leadSubmissions.$inferSelect;
export type NewLeadSubmission = typeof leadSubmissions.$inferInsert; 