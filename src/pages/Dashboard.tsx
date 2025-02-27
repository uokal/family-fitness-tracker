import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFitness } from '../context/FitnessContext';
import StatCard from '../components/StatCard';
import { 
  Activity, 
  Footprints, 
  Flame, 
  Utensils, 
  Droplets, 
  Moon, 
  Timer, 
  Scale, 
  Plus 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import ActivityForm from '../components/ActivityForm';
import { FitnessActivity } from '../types';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { getUserActivities, getUserGoal, getRecentActivities } = useFitness();
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [recentActivities, setRecentActivities] = useState<FitnessActivity[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [latestActivity, setLatestActivity] = useState<FitnessActivity | null>(null);
  const [userGoal, setUserGoal] = useState<any>(null);

  useEffect(() => {
    if (currentUser) {
      const activities = getUserActivities(currentUser.id);
      const recent = getRecentActivities(currentUser.id, 7);
      const goal = getUserGoal(currentUser.id);
      
      setRecentActivities(recent);
      setUserGoal(goal);
      
      // Find latest activity
      if (activities.length > 0) {
        const latest = activities.reduce((latest, activity) => {
          return new Date(activity.date) > new Date(latest.date) ? activity : latest;
        }, activities[0]);
        setLatestActivity(latest);
      }
      
      // Prepare weekly data
      const last7Days = [...Array(7)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
      });
      
      const weekData = last7Days.map(date => {
        const dayActivity = activities.find(a => a.date === date) || {};
        return {
          date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          steps: dayActivity.steps || 0,
          calories: dayActivity.caloriesBurned || 0,
          water: dayActivity.waterIntake || 0,
          sleep: dayActivity.sleepHours || 0
        };
      });
      
      setWeeklyData(weekData);
    }
  }, [currentUser, getUserActivities, getRecentActivities, getUserGoal]);

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={() => setShowActivityForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Activity
        </button>
      </div>

      {showActivityForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Activity</h2>
            <ActivityForm 
              userId={currentUser.id} 
              onSubmit={() => setShowActivityForm(false)} 
              onCancel={() => setShowActivityForm(false)} 
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Today's Steps" 
          value={latestActivity?.steps || 0} 
          icon={<Footprints className="h-6 w-6" />} 
          color="bg-blue-500"
          target={userGoal?.targetSteps || currentUser.targetSteps}
        />
        <StatCard 
          title="Calories Burned" 
          value={latestActivity?.caloriesBurned || 0} 
          icon={<Flame className="h-6 w-6" />} 
          color="bg-orange-500"
          target={userGoal?.targetCaloriesBurned || currentUser.targetCalories}
        />
        <StatCard 
          title="Water Intake (ml)" 
          value={latestActivity?.waterIntake || 0} 
          icon={<Droplets className="h-6 w-6" />} 
          color="bg-cyan-500"
          target={userGoal?.targetWaterIntake || currentUser.targetWater}
        />
        <StatCard 
          title="Current Weight (kg)" 
          value={latestActivity?.weight || '—'} 
          icon={<Scale className="h-6 w-6" />} 
          color="bg-purple-500"
          target={userGoal?.targetWeight || currentUser.targetWeight}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Weekly Steps</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="steps" fill="#3b82f6" name="Steps" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#f97316" 
                  name="Calories" 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="water" 
                  stroke="#06b6d4" 
                  name="Water (ml)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activities</h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Steps
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Calories Burned
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Water
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Workout
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(activity.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.weight ? `${activity.weight} kg` : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.steps || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.caloriesBurned || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.waterIntake ? `${activity.waterIntake} ml` : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activity.workoutMinutes ? `${activity.workoutMinutes} min ${activity.workoutType ? `(${activity.workoutType})` : ''}` : '—'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No recent activities found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;