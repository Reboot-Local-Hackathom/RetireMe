import React, { useState, useEffect } from 'react';

export default function TransactionCategoriser() {
  const categories = [
    'Groceries',
    'Subscriptions',
    'Income',
    'Food & Dining',
    'Utilities',
    'Transportation',
    'Entertainment',
    'Other'
  ];

  const [transactions, setTransactions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categorised, setCategorised] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = sessionStorage.getItem('access_token');
        const res = await fetch('http://localhost:8000/transactions/my-transactions', {
          headers: {
            'x-access-token': token
          }
        });
        const data = await res.json();
        var transaction;
        const uncategorised = [];
        for (let i = 0; i < data.transactions.length; i++) {
          transaction = data.transactions[i]
          if (transaction.category === 'Uncategorized') {
            uncategorised.push(transaction)
          }
        }
        setTransactions(uncategorised);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleCategorySelect = (category) => {
    const updated = [...categorised, { ...transactions[currentIndex], category }];
    console.log(transactions[currentIndex].transaction_id);
    console.log(category);
    const response = fetch('http://localhost:8000/transactions/update-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Add this line
      },
      body: JSON.stringify({
        'transaction_id': transactions[currentIndex].transaction_id,
        'new_category': category
      })
    });
    console.log(response);
    setCategorised(updated);
    setCurrentIndex(currentIndex + 1);
  };

  if (transactions.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-400 shadow-xl rounded-2xl text-center">
        <p>Loading transactions...</p>
      </div>
    );
  }

  if (currentIndex >= transactions.length) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-400 shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Categorisation Complete</h2>
        <ul className="space-y-2">
          {categorised.map((t, i) => (
            <li key={i} className="border rounded-xl p-3">
              <p><strong>{t.payee}</strong> - {t.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{new Date(t.time).toLocaleDateString()} | {t.reference} | {t.category}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const current = transactions[currentIndex];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-400 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Categorise Transaction ({currentIndex + 1}/{transactions.length})
      </h2>
      <div className="mb-6">
        <p className="text-lg"><strong>{current.payee}</strong></p>
        <p className="text-gray-600">{current.reference}</p>
        <p className="text-gray-600">{new Date(current.time).toLocaleDateString()}</p>
        <p className="text-gray-800 font-semibold">${current.amount.toFixed(2)}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className="py-2 px-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            onClick={() => handleCategorySelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
} 
