export type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  age: number | null;
  gender: string | null;
  height: number | null;
  weight: number | null;
  goal: FitnessGoal | null;
  created_at?: string;
};

export type FitnessGoal = 'Fat Loss' | 'Muscle Gain' | 'Strength Gain' | 'Maintenance';

export type MuscleGroup = 'Chest' | 'Back' | 'Shoulders' | 'Biceps' | 'Triceps' | 'Legs' | 'Core';

export type Workout = {
  id: string;
  user_id: string;
  workout_date: string;
  muscle_group: MuscleGroup;
  created_at?: string;
  exercises?: Exercise[];
};

export type Exercise = {
  id: string;
  workout_id: string;
  exercise_name: string;
  sets: number;
  reps: number;
  weight_used: number;
  created_at?: string;
};

export type WeightHistory = {
  id: string;
  user_id: string;
  weight: number;
  date: string;
  created_at?: string;
};
