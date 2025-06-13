-- Create lead_submissions table if it doesn't exist
CREATE TABLE IF NOT EXISTS lead_submissions (
  id VARCHAR(128) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'partial',
  revenue VARCHAR(50),
  budget VARCHAR(50),
  website VARCHAR(255),
  "firstName" VARCHAR(100),
  "lastName" VARCHAR(100),
  phone VARCHAR(50),
  "referralSource" VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  reminders_count VARCHAR DEFAULT '0',
  last_reminder_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  ip_address VARCHAR(50),
  user_agent TEXT
); 