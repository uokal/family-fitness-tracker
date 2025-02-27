import React, { useState, useEffect } from 'react';
import { useFitness } from '../context/FitnessContext';
import { FitnessGoal } from '../types';

interface GoalFormProps {
  userId: string;
  onSubmit: () => void;
  onCancel: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ userId, onSubmit, onCancel }) => {
  const { getUserGoal, setGoal } = useFitness();
  const [formData, setFormData] = useState<FitnessGoal>({
    userId,
    targetWeight: undefined,
    targetSteps: undefined,
    targetCaloriesBurned: undefined,
    targetCaloriesConsumed: undefined,
    targetWaterIntake: undefined,
    targetSleepHours: undefined,
    targetWorkoutMinutes: undefined
  });

  useEffect(() => {
    const currentGoal = getUserGoal(userId);
    if (currentGoal) {
      setFormData(currentGoal);
    }
  }, [userId, getUserGoal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? undefined : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGoal(formData);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Target Weight (kg)</label>
          <input
            type="number"
            name="targetWeight"
            value={formData.targetWeight || ''}
            onChange={handleChange}
            step="0.1"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Daily Steps</label>
          <input
            type="number"
            name="targetSteps"
            value={formData.targetSteps || ''}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Daily Calories Burned</label>
          <input
            type="number"
            name="targetCaloriesBurned"
            value={formData.targetCaloriesBurned || ''}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Daily Calories Consumed</label>
          <input
            type="number"
            name="targetCaloriesConsumed"
            value={formData.targetCaloriesConsumed || ''}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Daily Water Intake (ml)</label>
          <input
            type="number"
            name="targetWaterIntake"
            value={formData.targetWaterIntake || ''}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Daily Sleep Hours</label>
          <input
            type="number"
            name="targetSleepHours"
            value={formData.targetSleepHours || ''}
            onChange={handleChange}
            step="0.5"
            min="0"
            max="24"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Daily Workout Minutes</label>
          <input
            type="number"
            name="targetWorkoutMinutes"
            value={formData.targetWorkoutMinutes || ''}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Goals
        </button>
      </div>
    </form>
  );
};

export default GoalForm;