import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  change?: string;
  target?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  change, 
  target 
}) => {
  const getProgressPercentage = () => {
    if (!target || typeof value !== 'number') return 0;
    const percentage = (value / target) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${color} text-white mr-4`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <p className={`text-xs ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {change} from last week
              </p>
            )}
          </div>
        </div>
        
        {target && typeof value === 'number' && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{Math.round(getProgressPercentage())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${color.replace('bg-', 'bg-opacity-80 bg-')}`} 
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Target: {target}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;