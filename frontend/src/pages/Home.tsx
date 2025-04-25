import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { getTasks } from '../services/taskService';
import { getProperties } from '../services/propertyService';
import { Building2, ClipboardList, Plus, AlertCircle } from 'lucide-react';

const Home: React.FC = () => {
  const [taskStats, setTaskStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  });
  
  const [propertyCount, setPropertyCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tasks, properties] = await Promise.all([
          getTasks(),
          getProperties(),
        ]);
        
        setPropertyCount(properties.length);
        
        const stats = {
          total: tasks.length,
          pending: tasks.filter(task => task.status === 'Pending').length,
          inProgress: tasks.filter(task => task.status === 'In Progress').length,
          completed: tasks.filter(task => task.status === 'Completed').length,
          overdue: tasks.filter(task => task.isOverdue && task.status !== 'Completed').length,
        };
        
        setTaskStats(stats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-emerald-800 mb-3 dark:text-emerald-200">
            Waqf Property Task Tracker
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-400">
            Efficiently manage your waqf properties and keep track of tasks such as maintenance, 
            rent collection, and legal follow-ups.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center p-8">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ">
            <StatsCard 
              title="Properties"
              value={propertyCount}
              icon={<Building2 className="h-6 w-6 text-emerald-500" />}
              link="/add-property"
              linkText="Add Property"
              iconColor="bg-emerald-100"
            />
            
            <StatsCard
              title="Total Tasks"
              value={taskStats.total}
              icon={<ClipboardList className="h-6 w-6 text-blue-500" />}
              link="/tasks"
              linkText="View All"
              iconColor="bg-blue-100"
            />
            
            <StatsCard
              title="In Progress"
              value={taskStats.inProgress}
              icon={<ClipboardList className="h-6 w-6 text-amber-500" />}
              link="/tasks"
              linkText="View Tasks"
              iconColor="bg-amber-100"
            />
            
            <StatsCard
              title="Overdue Tasks"
              value={taskStats.overdue}
              icon={<AlertCircle className="h-6 w-6 text-red-500" />}
              link="/tasks"
              linkText="Handle Now"
              iconColor="bg-red-100"
              highlight={taskStats.overdue > 0}
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">Quick Actions</h2>
            
            <div className="space-y-4">
              <ActionLink
                to="/add-property"
                icon={<Building2 size={18} />}
                label="Add New Property"
                description="Register a new waqf property"
              />
              
              <ActionLink
                to="/add-task"
                icon={<Plus size={18} />}
                label="Create New Task"
                description="Add a new task for a property"
              />
              
              <ActionLink
                to="/tasks"
                icon={<ClipboardList size={18} />}
                label="Manage Tasks"
                description="View and update existing tasks"
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg shadow-md p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">About Waqf Management</h2>
            
            <p className="mb-4 text-emerald-50">
              Waqf properties are religious endowments that serve the community. Proper management
              ensures these assets continue to benefit people for generations.
            </p>
            
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-medium mb-2">Key Responsibilities:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-emerald-50">
                <li>Regular maintenance and upkeep</li>
                <li>Timely collection of rents and revenues</li>
                <li>Legal compliance and documentation</li>
                <li>Regular inspections and reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  link: string;
  linkText: string;
  iconColor: string;
  highlight?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, value, icon, link, linkText, iconColor, highlight = false 
}) => (
  <div className={`bg-white rounded-lg shadow-md p-5 transition-all duration-300 
    ${highlight ? 'border border-red-300 animate-pulse-subtle' : ''}`}>
    <div className="flex items-center mb-3">
      <div className={`rounded-full p-2 mr-3 ${iconColor}`}>
        {icon}
      </div>
      <h3 className="text-gray-600 font-medium">{title}</h3>
    </div>
    
    <div className="flex items-end justify-between">
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <Link
        to={link}
        className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
      >
        {linkText}
      </Link>
    </div>
  </div>
);

interface ActionLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

const ActionLink: React.FC<ActionLinkProps> = ({ to, icon, label, description }) => (
  <Link
    to={to}
    className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 transition-colors group"
  >
    <div className="rounded-full bg-emerald-100 p-2 mr-3 group-hover:bg-emerald-200 transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-emerald-800">{label}</h3>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </Link>
);

export default Home;