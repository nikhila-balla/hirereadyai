
-- Create resume_skills table
CREATE TABLE public.resume_skills (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  skill_name TEXT NOT NULL,
  proficiency_level INTEGER NOT NULL DEFAULT 50,
  source TEXT DEFAULT 'resume',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resume_skills ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own skills"
  ON public.resume_skills FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own skills"
  ON public.resume_skills FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own skills"
  ON public.resume_skills FOR DELETE
  USING (auth.uid() = user_id);

-- Add resume_uploaded flag to profiles
ALTER TABLE public.profiles ADD COLUMN resume_uploaded BOOLEAN DEFAULT false;
