import React from 'react';
import Navbar from './Navbar';
import { useTheme } from '../../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="bg-emerald-800 dark:bg-emerald-900 text-white py-4">
          <div className="container mx-auto px-4 text-center text-sm">
            © {new Date().getFullYear()} Waqf Property Task Tracker | Built with 💚 for Waqf Management
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;