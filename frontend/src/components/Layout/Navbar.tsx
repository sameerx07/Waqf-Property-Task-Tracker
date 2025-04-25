// src/components/Navbar.tsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Building2,
  Plus,
  ClipboardList,
  Home,
  Sun,
  Moon,
  LogIn,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-emerald-700 dark:bg-emerald-900 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold transition-transform hover:scale-105"
          >
            <Building2 className="text-amber-300" size={24} />
            <span>Waqf Property Tracker</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" icon={<Home size={18} />} label="Home" isActive={isActive('/')} />

            {user ? (
              <>
                <NavLink to="/add-property" icon={<Plus size={18} />} label="Add Property" isActive={isActive('/add-property')} />
                <NavLink to="/add-task"      icon={<Plus size={18} />} label="Add Task"     isActive={isActive('/add-task')} />
                <NavLink to="/tasks"         icon={<ClipboardList size={18} />} label="View Tasks" isActive={isActive('/tasks')} />
              </>
            ) : (
              <NavLink to="/login" icon={<LogIn size={18} />} label="Login" isActive={isActive('/login')} />
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-800 transition-colors"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-800"
                >
                  <UserIcon size={18} />
                  <span>{user.username}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu
              user={user}
              onLogout={handleLogout}
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-emerald-600 dark:hover:bg-emerald-800
      ${isActive ? 'bg-emerald-800 dark:bg-emerald-700 font-medium' : ''}`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

interface MobileMenuProps {
  user: any;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ user, onLogout, isDarkMode, onToggleDarkMode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-emerald-600 dark:hover:bg-emerald-800 transition-colors"
      >
        <div className="w-6 h-0.5 bg-white mb-1.5"></div>
        <div className="w-6 h-0.5 bg-white mb-1.5"></div>
        <div className="w-6 h-0.5 bg-white"></div>
      </button>

      {isOpen && (
        <div className="absolute top-16 right-4 z-50 bg-emerald-700 dark:bg-emerald-900 shadow-lg rounded-lg py-2 w-56">
          {/* Display username at top */}
          {user && (
            <div className="flex items-center px-4 py-2 border-b border-emerald-600 dark:border-emerald-700 text-white">
              <UserIcon size={18} className="mr-2" />
              <span className="font-medium">{user.username}</span>
            </div>
          )}

          <MobileNavLink to="/" icon={<Home size={18} />} label="Home" onClick={() => setIsOpen(false)} />

          {user ? (
            <>
              <MobileNavLink to="/add-property" icon={<Plus size={18} />}       label="Add Property" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/add-task"      icon={<Plus size={18} />}       label="Add Task"     onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/tasks"         icon={<ClipboardList size={18} />} label="View Tasks" onClick={() => setIsOpen(false)} />
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-3 text-white hover:bg-emerald-600 dark:hover:bg-emerald-800"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <MobileNavLink to="/login" icon={<LogIn size={18} />} label="Login" onClick={() => setIsOpen(false)} />
          )}

          <button
            onClick={() => {
              onToggleDarkMode();
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-3 text-white hover:bg-emerald-600 dark:hover:bg-emerald-800"
          >
            {isDarkMode ? <Sun size={18} className="mr-2" /> : <Moon size={18} className="mr-2" />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </div>
  );
};

interface MobileNavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-3 text-white hover:bg-emerald-600 dark:hover:bg-emerald-800 transition-colors w-full text-left"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
