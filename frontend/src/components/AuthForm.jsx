import React, { useState } from 'react';

export default function AuthForm() {
  const [mode, setMode] = useState('sign-up');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const url = mode === 'sign-up'
      ? 'http://localhost:8000/accounts/sign-up'
      : 'http://localhost:8000/accounts/sign-in';

    const payload = mode === 'sign-up'
      ? {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email_addr: formData.email,
          password: formData.password,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      const result = await res.json();
      setMessage(`Success: ${JSON.stringify(result)}`);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-400 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {mode === 'sign-up' ? 'Sign Up' : 'Sign In'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'sign-up' && (
          <>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Submitting...' : mode === 'sign-up' ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        {mode === 'sign-up' ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setMode(mode === 'sign-up' ? 'sign-in' : 'sign-up')}
        >
          {mode === 'sign-up' ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
      {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
    </div>
  );
}
