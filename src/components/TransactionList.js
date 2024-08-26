import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("User is not logged in");
        return;
      }

      try {
        const q = query(
          collection(db, 'transactions'),
          where('uid', '==', user.uid), 
          orderBy('date', 'desc') 
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          } else {
            console.log("No transactions found for the user.");
            setTransactions([]);
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transaction-list max-w-2xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Transaction History</h2>
      <ul className="space-y-4">
        {transactions.length === 0 ? (
          <li className="text-center text-gray-500">No transactions found.</li>
        ) : (
          transactions.map(transaction => (
            <li key={transaction.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center transform transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center">
                {transaction.type === 'income' ? (
                  <FaArrowUp className="text-green-600 mr-2 text-2xl" />
                ) : (
                  <FaArrowDown className="text-red-600 mr-2 text-2xl" />
                )}
                <div>
                  <h3 className="font-semibold">{transaction.category}</h3>
                  <p className="text-gray-500">{transaction.description}</p>
                </div>
              </div>
              <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
