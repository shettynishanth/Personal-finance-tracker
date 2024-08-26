import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom"; 
import "../index.css";

const Header = () => {
  const [userEmail, setUserEmail] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
   
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email); 
      } else {
        setUserEmail(""); 
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      navigate("/"); 
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between items-center container mx-auto">
        <h1 className="text-xl font-bold">Personal Finance Tracker</h1>
        <div className="relative">
          {userEmail ? (
            <div className="flex items-center">
              <span
                className="text-sm cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {userEmail}
              </span>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left p-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span className="text-sm">Not logged in</span>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
