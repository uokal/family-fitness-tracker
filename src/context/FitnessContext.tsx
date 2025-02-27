import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FitnessActivity, FitnessGoal } from '../types';
import { useAuth } from './AuthContext';

interface FitnessContextType {
  activities: FitnessActivity[];
  goals: FitnessGoal[];
  addActivity: (activity: Omit<FitnessActivity, 'id'>) => void;
  updateActivity: (activity: FitnessActivity) => void;
  deleteActivity: (id: string) => void;
  setGoal: (goal: FitnessGoal) => void;
  getUserActivities: (userId: string) => FitnessActivity[];
  getUserGoal: (userId: string) => FitnessGoal | undefined;
  getRecentActivities: (userId: string, days: number) => FitnessActivity[];
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

const ACTIVITIES_STORAGE_KEY = 'familyFitnessActivities';
const GOALS_STORAGE_KEY = 'familyFitnessGoals';

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { users } = useAuth();
  
  const [activities, setActivities] = useState<FitnessActivity[]>(() => {
    const storedActivities = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    return storedActivities ? JSON.parse(storedActivities) : [];
  });

  const [goals, setGoals] = useState<FitnessGoal[]>(() => {
    const storedGoals = localStorage.getItem(GOALS_STORAGE_KEY);
    return storedGoals ? JSON.parse(storedGoals) : [];
  });

  useEffect(() => {
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  // Initialize goals for all users if they don't exist
  useEffect(() => {
    users.forEach(user => {
      if (!goals.some(goal => goal.userId === user.id)) {
        setGoals(prev => [...prev, { userId: user.id }]);
      }
    });
  }, [users, goals]);

  const addActivity = (activityData: Omit<FitnessActivity, 'id'>) => {
    const newActivity: FitnessActivity = {
      ...activityData,
      id: uuidv4()
    };
    setActivities(prev => [...prev, newActivity]);
  };

  const updateActivity = (updatedActivity: FitnessActivity) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
  };

  const deleteActivity = (id: string) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  const setGoal = (newGoal: FitnessGoal) => {
    setGoals(prev => {
      const existingGoalIndex = prev.findIndex(goal => goal.userId === newGoal.userId);
      if (existingGoalIndex >= 0) {
        const updatedGoals = [...prev];
        updatedGoals[existingGoalIndex] = newGoal;
        return updatedGoals;
      } else {
        return [...prev, newGoal];
      }
    });
  };

  const getUserActivities = (userId: string) => {
    return activities.filter(activity => activity.userId === userId);
  };

  const getUserGoal = (userId: string) => {
    return goals.find(goal => goal.userId === userId);
  };

  const getRecentActivities = (userId: string, days: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return activities
      .filter(activity => 
        activity.userId === userId && 
        new Date(activity.date) >= cutoffDate
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return (
    <FitnessContext.Provider value={{ 
      activities, 
      goals, 
      addActivity, 
      updateActivity, 
      deleteActivity, 
      setGoal, 
      getUserActivities, 
      getUserGoal,
      getRecentActivities
    }}>
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (context === undefined) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};