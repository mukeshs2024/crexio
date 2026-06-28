-- SQL script to create the feedback table in Supabase

CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    room_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Add Row Level Security (RLS) policies if needed
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (since users are not authenticated)
CREATE POLICY "Allow anonymous inserts"
    ON public.feedback
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow reading feedback only by authenticated users (admins)
CREATE POLICY "Allow authenticated read"
    ON public.feedback
    FOR SELECT
    TO authenticated
    USING (true);
