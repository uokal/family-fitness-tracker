import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';

interface FamilyMemberFormProps {
  initialData?: User;
  onSubmit: () => void;
  onCancel: () => void;
}

const FamilyMemberForm: React.FC<FamilyMemberFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel 
}) => {
  const { register, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    password: initialData ? '********' : '',
    role: initialData?.role || 'member',
    avatar: initialData?.avatar || '',
    targetWeight: initialData?.targetWeight || undefined,
    targetSteps: initialData?.targetSteps || undefined,
    targetCalories: initialData?.targetCalories || undefined,
    targetWater: initialData?.targetWater || undefined
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? undefined : Number(value)) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (initialData) {
        // Update existing user
        updateUser({
          ...initialData,
          name: formData.name,
          email: formData.email,
          // Don't update password if it's the placeholder
          ...(formData.password !== '********' && { password: formData.password }),
          role: formData.role as 'admin' | 'member',
          avatar: formData.avatar,
          targetWeight: formData.targetWeight,
          targetSteps: formData.targetSteps,
          targetCalories: formData.targetCalories,
          targetWater: formData.targetWater
        });
      } else {
        // Create new user
        const success = register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role as 'admin' | 'member',
          avatar: formData.avatar,
          targetWeight: formData.targetWeight,
          targetSteps: formData.targetSteps,
          targetCalories: formData.targetCalories,
          targetWater: formData.targetWater
        });

        if (!success) {
          setError('Email already exists');
          return;
        }
      }
      
      onSubmit();
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {initialData && (
            <p className="mt-1 text-xs text-gray-500">Leave unchanged to keep current password</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="member">Family Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            placeholder="https://example.com/avatar.jpg"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">Leave empty for default avatar</p>
        </div>

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
          <label className="block text-sm font-medium text-gray-700">Target Steps</label>
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
          <label className="block text-sm font-medium text-gray-700">Target Calories</label>
          <input
            type="number"
            name="targetCalories"
            value={formData.targetCalories || ''}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Water (ml)</label>
          <input
            type="number"
            name="targetWater"
            value={formData.targetWater || ''}
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
          {initialData ? 'Update' : 'Add'} Family Member
        </button>
      </div>
    </form>
  );
};

export default FamilyMemberForm;