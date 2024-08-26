import React from 'react';
import { auth, db } from '../firebase'; 
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

const Footer = ({ onClear }) => {
  const handleClear = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(collection(db, 'transactions'), where('uid', '==', user.uid));
    const snapshot = await getDocs(q);

    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    
    onClear();
  };

  return (
    <footer className="flex justify-center items-center bg-gray-200 rounded-lg p-4">
      <button
        onClick={handleClear}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
      >
        Clear Data
      </button>
    </footer>
  );
};

export default Footer;
