
-- Battle Pass table
CREATE TABLE public.battle_pass (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  total_xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 1,
  streak_days INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

ALTER TABLE public.battle_pass ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own battle pass"
  ON public.battle_pass FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own battle pass"
  ON public.battle_pass FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own battle pass"
  ON public.battle_pass FOR UPDATE
  USING (auth.uid() = user_id);

CREATE TRIGGER update_battle_pass_updated_at
  BEFORE UPDATE ON public.battle_pass
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Company Selection table
CREATE TABLE public.company_selection (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, company_name)
);

ALTER TABLE public.company_selection ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own company selections"
  ON public.company_selection FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own company selections"
  ON public.company_selection FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own company selections"
  ON public.company_selection FOR DELETE
  USING (auth.uid() = user_id);
