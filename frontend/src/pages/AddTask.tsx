import React from 'react';
import Layout from '../components/Layout/Layout';
import TaskForm from '../components/Tasks/TaskForm';

const AddTask: React.FC = () => {
  return (
    <Layout>
      <TaskForm />
    </Layout>
  );
};

export default AddTask;