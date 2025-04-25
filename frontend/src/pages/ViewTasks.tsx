import React from 'react';
import Layout from '../components/Layout/Layout';
import TaskList from '../components/Tasks/TaskList';

const ViewTasks: React.FC = () => {
  return (
    <Layout>
      <TaskList />
    </Layout>
  );
};

export default ViewTasks;