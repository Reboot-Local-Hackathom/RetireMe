import React, { useState, useEffect } from 'react';

export default function TransactionCategoriser() {
  const sampleCSVData = `
Date,Description,Amount
2023-01-01,Grocery Store, -55.20
2023-01-02,Online Subscription, -12.99
2023-01-03,Paycheck, 1500.00
2023-01-04,Coffee Shop, -4.50
2023-01-05,Restaurant, -35.75
`;

  const categories = [
    'Rent',
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
    const lines = sampleCSVData.trim().split('\n');
    const [, ...dataLines] = lines;
    const parsed = dataLines.map(line => {
      const [Date, Description, Amount] = line.split(',').map(s => s.trim());
      return { Date, Description, Amount: parseFloat(Amount), category: null };
    });
    setTransactions(parsed);
  }, []);

  const handleCategorySelect = (category) => {
    const updated = [...categorised, { ...transactions[currentIndex], category }];
    setCategorised(updated);
    setCurrentIndex(currentIndex + 1);
  };

  if (currentIndex >= transactions.length) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-400 shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Categorisation Complete</h2>
        <ul className="space-y-2">
          {categorised.map((t, i) => (
            <li key={i} className="border rounded-xl p-3">
              <p><strong>{t.Description}</strong> - {t.Amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{t.Date} | {t.category}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const current = transactions[currentIndex];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-400 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Categorise Transaction</h2>
      <div className="mb-6">
        <p className="text-lg"><strong>{current.Description}</strong></p>
        <p className="text-gray-600">{current.Date}</p>
        <p className="text-gray-800 font-semibold">${current.Amount.toFixed(2)}</p>
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
