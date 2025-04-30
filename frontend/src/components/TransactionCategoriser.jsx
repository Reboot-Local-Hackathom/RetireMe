import React, { useState, useEffect } from 'react';

export default function TransactionCategoriser() {
  const sampleCSVData = `
Date,Payee,Reference,Amount
2025-03-01,OVO ENERGY,OVO ENERGY,-75.50
2025-03-01,RENT - LANDLORD SMITH,RENT - LANDLORD SMITH,-850.00
2025-03-03,TESCO STORES BRISTOL,TESCO STORES BRISTOL,-65.20
2025-03-05,BRISTOL COUNCIL TAX,BRISTOL COUNCIL TAX,-120.00
2025-03-07,AMAZON UK MARKETPLACE,AMAZON UK MARKETPLACE,-29.99
2025-03-10,COSTA COFFEE 1234 BRISTOL,COSTA COFFEE 1234 BRISTOL,-3.10
`;

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
    const lines = sampleCSVData.trim().split('\n');
    const [, ...dataLines] = lines;
    const parsed = dataLines.map(line => {
      const [Date, Payee, Reference, Amount] = line.split(',').map(s => s.trim());
      return { Date, Payee, Reference, Amount: parseFloat(Amount), category: null };
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
              <p><strong>{t.Payee}</strong>: {t.Amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{t.Date} | {t.Reference} | {t.category}</p>
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
        <p className="text-lg"><strong>{current.Payee}</strong></p>
        <p className="text-gray-600">{current.Reference}</p>
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
