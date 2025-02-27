import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFitness } from '../context/FitnessContext';
import { Target, Edit } from 'lucide-react';
import GoalForm from '../components/GoalForm';

const Goals: React.FC = () => {
  const { currentUser } = useAuth();
  const { getUserGoal } = useFitness();
  const [showForm, setShowForm] = useState(false);
  const [userGoal, setUserGoal] = useState<any>(null);

  useEffect(() => {
    if (currentUser) {
      const goal = getUserGoal(currentUser.id);
      setUserGoal(goal);
    }
  }, [currentUser, getUserGoal]);

  const handleFormSubmit = () => {
    setShowForm(false);
    if (currentUser) {
      const goal = getUserGoal(currentUser.id);
      setUserGoal(goal);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Fitness Goals</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Goals
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Set Your Fitness Goals</h2>
            <GoalForm 
              userId={currentUser.id} 
              onSubmit={handleFormSubmit} 
              onCancel={() => setShowForm(false)} 
            />
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex items-center">
          <Target className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Current Goals</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Target Weight</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userGoal?.targetWeight ? `${userGoal.targetWeight} kg` : 'Not set'}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Daily Steps Target</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userGoal?.targetSteps || 'Not set'}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Daily Calories Burned Target</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userGoal?.targetCaloriesBurned || 'Not set'}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Daily Calories Consumed Target</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userGoal?.targetCaloriesConsumed || 'Not set'}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Daily Water Intake Target</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userGoal?.targetWaterIntake ? `${userGoal.targetWaterIntake} ml` : 'Not set'}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Daily Sleep Hours Target</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userGoal?.targetSleepHours ? `${userGoal.targetSleepHours} hours` : 'Not set'}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Daily Workout Minutes Target</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userGoal?.targetWorkoutMinutes ? `${userGoal.targetWorkoutMinutes} minutes` : 'Not set'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Goal Setting Tips</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-md font-medium text-gray-900">S.M.A.R.T. Goals</h4>
              <p className="mt-1 text-sm text-gray-600">
                Set goals that are Specific, Measurable, Achievable, Relevant, and Time-bound.
              </p>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900">Start Small</h4>
              <p className="mt-1 text-sm text-gray-600">
                Begin with achievable goals and gradually increase them as you progress.
              </p>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900">Be Consistent</h4>
              <p className="mt-1 text-sm text-gray-600">
                Consistency is more important than intensity. Aim for regular activity rather than occasional intense workouts.
              </p>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900">Track Your Progress</h4>
              <p className="mt-1 text-sm text-gray-600">
                Regularly log your activities to stay motivated and see your improvement over time.
              </p>
            </div>
            <div>
              <h4 className="text-md font-medium text-gray-900">Celebrate Achievements</h4>
              <p className="mt-1 text-sm text-gray-600">
                Acknowledge and celebrate when you reach your goals, no matter how small.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;