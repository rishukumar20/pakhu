import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../App';

const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (
      (email === 'payal@pakshu.com' && password === '1234') ||
      (email === 'khushi@pakshu.com' && password === '4321')
    ) {
      setIsAuthenticated(true);
      history.push('/question');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;