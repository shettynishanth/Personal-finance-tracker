import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault(); 
    setError(''); 

    // Validate input
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!"); 
      navigate('/login'); 
    } catch (error) {
      setError("Error registering: " + error.message); 
      console.error("Error registering: ", error);
    }
  };

  
  const handleLoginRedirect = () => {
    navigate('/login'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-bold text-center">Register</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <button
            type="submit"
            className="mb-4 p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <button
          onClick={handleLoginRedirect}
          className="p-2 bg-gray-300 text-black rounded w-full hover:bg-gray-400 transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Register;
