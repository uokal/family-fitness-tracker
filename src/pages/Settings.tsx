import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings as SettingsIcon, Bell, Shield, Download, Trash2 } from 'lucide-react';

const Settings: React.FC = () => {
  const { currentUser } = useAuth();

  const handleExportData = () => {
    // Get all user data from localStorage
    const userData = {
      users: JSON.parse(localStorage.getItem('familyFitnessUsers') || '[]'),
      activities: JSON.parse(localStorage.getItem('familyFitnessActivities') || '[]'),
      goals: JSON.parse(localStorage.getItem('familyFitnessGoals') || '[]')
    };
    
    // Filter to only include current user's data if not admin
    if (currentUser && currentUser.role !== 'admin') {
      userData.users = userData.users.filter((user: any) => user.id === currentUser.id);
      userData.activities = userData.activities.filter((activity: any) => activity.userId === currentUser.id);
      userData.goals = userData.goals.filter((goal: any) => goal.userId === currentUser.id);
    }
    
    // Create a downloadable file
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'family-fitness-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex items-center">
          <SettingsIcon className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 className="text-lg leading-6 font-medium text-gray-900">Application Settings</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Bell className="h-5 w-5 text-gray-400 mr-2" />
                Notifications
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    role="switch"
                    aria-checked="false"
                  >
                    <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                  </button>
                  <span className="ml-3">Enable email notifications</span>
                </div>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Shield className="h-5 w-5 text-gray-400 mr-2" />
                Privacy
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="bg-indigo-600 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    role="switch"
                    aria-checked="true"
                  >
                    <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                  </button>
                  <span className="ml-3">Share data with family members</span>
                </div>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Download className="h-5 w-5 text-gray-400 mr-2" />
                Data Export
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <button
                  onClick={handleExportData}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Export Your Data
                </button>
                <p className="mt-1 text-xs text-gray-500">
                  Download all your fitness data in JSON format
                </p>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <Trash2 className="h-5 w-5 text-red-400 mr-2" />
                Account
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <button
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Account
                </button>
                <p className="mt-1 text-xs text-gray-500">
                  This will permanently delete your account and all associated data
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">About</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <p className="text-sm text-gray-500">
            Family Fitness Tracker v1.0.0
          </p>
          <p className="mt-2 text-sm text-gray-500">
            A comprehensive fitness tracking application for the whole family.
            Track activities, set goals, and monitor progress together.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            © 2025 Family Fitness Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;