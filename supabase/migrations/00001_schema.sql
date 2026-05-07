-- ============================================
-- MindQuark — Schema database
-- ============================================

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin', 'teacher')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Subjects / categories
CREATE TABLE IF NOT EXISTS public.subjects (
  id TEXT PRIMARY KEY,
  glyph TEXT NOT NULL,
  name_it TEXT NOT NULL,
  name_en TEXT NOT NULL,
  color TEXT NOT NULL,
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- Courses
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE SET NULL,
  title_it TEXT NOT NULL,
  title_en TEXT NOT NULL,
  short_it TEXT,
  short_en TEXT,
  level_it TEXT,
  level_en TEXT,
  duration TEXT,
  lessons_count INT DEFAULT 0,
  price DECIMAL(10,2) NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  students_count INT DEFAULT 0,
  type TEXT DEFAULT 'ondemand' CHECK (type IN ('ondemand', 'live', 'hybrid')),
  bestseller BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Lessons
CREATE TABLE IF NOT EXISTS public.lessons (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  number INT NOT NULL,
  title_it TEXT NOT NULL,
  title_en TEXT NOT NULL,
  duration TEXT,
  video_url TEXT,
  material_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Webinars
CREATE TABLE IF NOT EXISTS public.webinars (
  id TEXT PRIMARY KEY,
  subject_id TEXT REFERENCES public.subjects(id) ON DELETE SET NULL,
  title_it TEXT NOT NULL,
  title_en TEXT NOT NULL,
  short_it TEXT,
  short_en TEXT,
  date TIMESTAMPTZ NOT NULL,
  duration TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  seats_total INT DEFAULT 0,
  mode TEXT DEFAULT 'group' CHECK (mode IN ('group', 'one2one')),
  recording_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.webinars ENABLE ROW LEVEL SECURITY;

-- Enrollments (user → course)
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'expired')),
  progress DECIMAL(5,2) DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Webinar registrations
CREATE TABLE IF NOT EXISTS public.webinar_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  webinar_id TEXT NOT NULL REFERENCES public.webinars(id) ON DELETE CASCADE,
  attended BOOLEAN DEFAULT false,
  registered_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, webinar_id)
);

ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;

-- Payments
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_payment_id TEXT UNIQUE,
  stripe_session_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'eur',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  item_type TEXT CHECK (item_type IN ('course', 'webinar')),
  item_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies
-- ============================================

-- Profiles: users can read own profile, admin can read all
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Courses: public read, admin write
CREATE POLICY "Anyone can view published courses"
  ON public.courses FOR SELECT
  USING (published = true);

-- Lessons: enrolled users + public read
CREATE POLICY "Anyone can view lesson metadata"
  ON public.lessons FOR SELECT
  USING (true);

-- Enrollments: own only
CREATE POLICY "Users can view own enrollments"
  ON public.enrollments FOR SELECT
  USING (auth.uid() = user_id);

-- Webinars: public read
CREATE POLICY "Anyone can view published webinars"
  ON public.webinars FOR SELECT
  USING (published = true);

-- Webinar registrations: own only
CREATE POLICY "Users can view own registrations"
  ON public.webinar_registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own registration"
  ON public.webinar_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Subjects: public read
CREATE POLICY "Anyone can view subjects"
  ON public.subjects FOR SELECT
  USING (true);

-- ============================================
-- Functions
-- ============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
