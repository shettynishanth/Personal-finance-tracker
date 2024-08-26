import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore"; 
import { db, auth } from '../firebase'; 
import { FaArrowUp, FaArrowDown, FaBalanceScale } from 'react-icons/fa';

const Summary = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const user = auth.currentUser; 
    console.log("Current User: ", user); 
    if (!user) return;

    const q = query(
      collection(db, 'transactions'),
      where('uid', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("Snapshot data: ", snapshot.docs); 
      let totalIncome = 0;
      let totalExpenses = 0;

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        console.log("Document data: ", data); 
        if (data.type === 'income') {
          totalIncome += parseFloat(data.amount);
        } else if (data.type === 'expense') {
          totalExpenses += parseFloat(data.amount);
        }
      });

      setIncome(totalIncome);
      setExpenses(totalExpenses);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="summary flex justify-center items-center h-auto bg-gray-100 rounded-2xl p-6">
      <div className="w-full max-w-lg grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div>
            <h2 className="text-2xl font-bold mb-2">Total Income</h2>
            <p className="text-lg text-green-600">RS: {income}</p>
          </div>
          <FaArrowUp className="text-green-600 text-3xl" />
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div>
            <h2 className="text-2xl font-bold mb-2">Total Expenses</h2>
            <p className="text-lg text-red-600">RS: {expenses}</p>
          </div>
          <FaArrowDown className="text-red-600 text-3xl" />
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div>
            <h2 className="text-2xl font-bold mb-2">Balance</h2>
            <p className="text-lg text-blue-600">RS: {income - expenses}</p>
          </div>
          <FaBalanceScale className="text-blue-600 text-3xl" />
        </div>
      </div>
      
    </div>
  );
};

export default Summary;
