// userCreateAccount.js

// Get all users from localStorage
export const getAllUsers = () => {
    return JSON.parse(localStorage.getItem("users") || "[]");
  };
  
  // Save a new user to localStorage
  export const saveUser = (userData) => {
    const existing = getAllUsers();
    const newUser = {
      id: Date.now(),
      ...userData,
    };
    localStorage.setItem("users", JSON.stringify([...existing, newUser]));
  };
  
  // Check if email is already taken
  export const isEmailTaken = (email) => {
    return getAllUsers().some(user => user.email === email);
  };
  