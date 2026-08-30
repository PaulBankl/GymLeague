INSERT INTO exercises (name)
VALUES
('Bench Press'),
('Squat'),
('Deadlift'),
('Overhead Press'),
('Pull-Up'),
('Barbell Row'),
('Incline Bench'),
('Lat Pulldown'),
('Leg Press'),
('Romanian Deadlift')
ON CONFLICT (name) DO NOTHING;