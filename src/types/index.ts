export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'member';
  avatar?: string;
  targetWeight?: number;
  targetSteps?: number;
  targetCalories?: number;
  targetWater?: number;
}

export interface FitnessActivity {
  id: string;
  userId: string;
  date: string;
  weight?: number;
  steps?: number;
  caloriesBurned?: number;
  caloriesConsumed?: number;
  waterIntake?: number;
  sleepHours?: number;
  workoutMinutes?: number;
  workoutType?: string;
  notes?: string;
}

export interface FitnessGoal {
  userId: string;
  targetWeight?: number;
  targetSteps?: number;
  targetCaloriesBurned?: number;
  targetCaloriesConsumed?: number;
  targetWaterIntake?: number;
  targetSleepHours?: number;
  targetWorkoutMinutes?: number;
}