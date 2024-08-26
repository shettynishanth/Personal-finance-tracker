import React from 'react';
import TransactionForm from './TransactionForm';
import Summary from './Summary';
import TransactionList from './TransactionList';
import Footer from './Footer';

const Dashboard = () => {
  return (
    <div>
      <TransactionForm />
      <Summary />
      <TransactionList />
      <Footer />
    </div>
  );
};

export default Dashboard;
