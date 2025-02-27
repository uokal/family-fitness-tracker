import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  User, 
  Target, 
  Activity,
  Menu,
  X
} from 'lucide-react';

const Layout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) {
    return <Outlet />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button 
        className="fixed z-50 p-2 bg-indigo-600 rounded-md text-white md:hidden top-4 left-4"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-indigo-700 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-indigo-800">
            <h1 className="text-xl font-bold">Family Fitness Tracker</h1>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              <Link 
                to="/" 
                className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-indigo-600"
                onClick={() => setSidebarOpen(false)}
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>

              <Link 
                to="/activities" 
                className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-indigo-600"
                onClick={() => setSidebarOpen(false)}
              >
                <Activity className="mr-3 h-5 w-5" />
                Activities
              </Link>

              <Link 
                to="/goals" 
                className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-indigo-600"
                onClick={() => setSidebarOpen(false)}
              >
                <Target className="mr-3 h-5 w-5" />
                Goals
              </Link>

              <Link 
                to="/stats" 
                className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-indigo-600"
                onClick={() => setSidebarOpen(false)}
              >
                <BarChart3 className="mr-3 h-5 w-5" />
                Statistics
              </Link>

              {currentUser.role === 'admin' && (
                <Link 
                  to="/family" 
                  className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-indigo-600"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Users className="mr-3 h-5 w-5" />
                  Family Members
                </Link>
              )}

              <Link 
                to="/profile" 
                className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-indigo-600"
                onClick={() => setSidebarOpen(false)}
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </Link>

              <Link 
                to="/settings" 
                className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-indigo-600"
                onClick={() => setSidebarOpen(false)}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </nav>
          </div>

          <div className="p-4 border-t border-indigo-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm rounded-md hover:bg-indigo-600"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center md:hidden">
                {/* Spacer for mobile */}
                <div className="w-8"></div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <span className="hidden md:block text-lg font-semibold text-gray-900">
                    Family Fitness Tracker
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-3 relative flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">
                    {currentUser.name}
                  </span>
                  <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                    {currentUser.avatar ? (
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-full w-full p-1" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;