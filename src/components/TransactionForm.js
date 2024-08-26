import React, { useState } from 'react';
import { db, auth } from '../firebase'; 
import { addDoc, collection } from 'firebase/firestore';

const TransactionForm = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');

  const handleAddTransaction = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("You need to be logged in to add a transaction.");
      return;
    }
  
    if (!category || !amount || !description) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      await addDoc(collection(db, 'transactions'), {
        uid: user.uid,
        category,
        amount: parseFloat(amount),
        type,
        description,
        date: new Date(),
      });
      console.log("Transaction added");
      setCategory('');
      setAmount('');
      setDescription('');
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleAddTransaction}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Add Transaction
      </button>
    </div>
  );
};

export default TransactionForm;
