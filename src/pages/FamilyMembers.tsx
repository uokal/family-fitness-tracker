import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFitness } from '../context/FitnessContext';
import { User, Plus, Edit, BarChart3 } from 'lucide-react';
import FamilyMemberForm from '../components/FamilyMemberForm';
import { Link } from 'react-router-dom';

const FamilyMembers: React.FC = () => {
  const { currentUser, users } = useAuth();
  const { getUserActivities } = useFitness();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Family Members</h1>
        <button
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Family Member
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingUser ? 'Edit Family Member' : 'Add New Family Member'}
            </h2>
            <FamilyMemberForm 
              initialData={editingUser} 
              onSubmit={handleFormSubmit} 
              onCancel={() => {
                setShowForm(false);
                setEditingUser(null);
              }} 
            />
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <ul className="divide-y divide-gray-200">
          {users.map(user => {
            const activities = getUserActivities(user.id);
            const latestActivity = activities.length > 0 
              ? activities.reduce((latest, activity) => {
                  return new Date(activity.date) > new Date(latest.date) ? activity : latest;
                }, activities[0])
              : null;
            
            return (
              <li key={user.id} className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-full w-full p-2 text-gray-500" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Role: {user.role === 'admin' ? 'Administrator' : 'Family Member'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Link
                      to={`/stats?user=${user.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <BarChart3 className="mr-1.5 h-4 w-4 text-gray-500" />
                      Stats
                    </Link>
                    <button
                      onClick={() => handleEdit(user)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Edit className="mr-1.5 h-4 w-4" />
                      Edit
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-xs font-medium text-gray-500">Target Weight</p>
                    <p className="text-sm font-semibold">
                      {user.targetWeight ? `${user.targetWeight} kg` : 'Not set'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-xs font-medium text-gray-500">Target Steps</p>
                    <p className="text-sm font-semibold">
                      {user.targetSteps || 'Not set'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-xs font-medium text-gray-500">Latest Activity</p>
                    <p className="text-sm font-semibold">
                      {latestActivity ? new Date(latestActivity.date).toLocaleDateString() : 'No activity'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-xs font-medium text-gray-500">Total Activities</p>
                    <p className="text-sm font-semibold">{activities.length}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FamilyMembers;