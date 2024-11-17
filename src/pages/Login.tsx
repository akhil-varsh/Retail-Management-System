import React, { useState } from 'react';
import { supabase } from '../lib/supabase'; // Import your Supabase client
import toast from 'react-hot-toast'; // Toast for popups
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import bcrypt from 'bcryptjs'; // Library for password hashing
import CitizenDashboard from '../citizen/citizendashboard';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('citizen'); // Default role
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const navigate = useNavigate(); // Initialize navigate function

  // Handle signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into Supabase database
      const { error } = await supabase
        .from('users')
        .insert({
          name,
          email,
          password: hashedPassword,
          role,
        });

      if (error) throw error;

      toast.success('Signup successful! You can now log in.');
      setIsSignup(false); // Switch to login mode
    } catch (error: any) {
      toast.error(error.message || 'Signup failed.');
    }
  };

  // Handle login
  // Handle login
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // Fetch user details from the database
    const { data, error } = await supabase
      .from('users')
      .select('id, password, role, name')
      .eq('email', email)
      .single();

    if (error || !data) {
      toast.error('Invalid email or password.');
      return;
    }

    // Compare hashed passwords
    const isPasswordMatch = await bcrypt.compare(password, data.password);
    if (!isPasswordMatch) {
      toast.error('Invalid email or password.');
      return;
    }

    // Show popup and redirect based on role
    toast.success(`Welcome back, ${data.name}!`);
    
    // Navigate based on the user's role
    if (data.role === 'manager') {
      navigate('/manager'); // Redirect to manager dashboard
    } else if (data.role === 'citizen') {
      navigate('/citizendashboard'); // Redirect to citizen dashboard
    } else {
      toast.error('Invalid role');
    }
  } catch (error: any) {
    toast.error(error.message || 'Login failed.');
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Lock className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isSignup ? 'Create a new account' : 'Sign in to your account'}
        </h2>
        <p
          className="mt-2 text-center text-sm text-gray-600 cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? 'Already have an account? Log in here'
            : "Don't have an account? Sign up here"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={isSignup ? handleSignup : handleLogin}
          >
            {isSignup && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <input
                    id="citizen"
                    name="role"
                    type="radio"
                    value="citizen"
                    checked={role === 'citizen'}
                    onChange={(e) => setRole(e.target.value)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <label htmlFor="citizen" className="ml-3 text-sm text-gray-700">
                    Citizen
                  </label>
                </div>
                <div className="flex items-center ml-6">
                  <input
                    id="manager"
                    name="role"
                    type="radio"
                    value="manager"
                    checked={role === 'manager'}
                    onChange={(e) => setRole(e.target.value)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <label
                    htmlFor="manager"
                    className="ml-3 text-sm text-gray-700"
                  >
                    manager
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSignup ? 'Sign up' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
