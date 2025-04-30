import React, { useState, useEffect } from 'react';

// Helper function to parse CSV data (basic example)
// In a real application, you'd handle file uploads and more robust parsing
const parseCSV = (csvString) => {
  const rows = csvString.trim().split('\n');
  const headers = rows[0].split(',').map(header => header.trim());
  const data = rows.slice(1).map(row => {
    const values = row.split(',').map(value => value.trim());
    let transaction = {};
    headers.forEach((header, index) => {
      transaction[header] = values[index];
    });
    // Add a category property to each transaction
    transaction.category = '';
    return transaction;
  });
  return data;
};

// Sample CSV data (replace with your actual data or file loading logic)
const sampleCSVData = `
Date,Description,Amount
2023-01-01,Grocery Store, -55.20
2023-01-02,Online Subscription, -12.99
2023-01-03,Paycheck, 1500.00
2023-01-04,Coffee Shop, -4.50
2023-01-05,Restaurant, -35.75
`;

// Define possible categories
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

const TransactionCategoriser = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('');
  const [categorisedTransactions, setCategorisedTransactions] = useState([]);

  // Load and parse data on component mount
  useEffect(() => {
    const parsedData = parseCSV(sampleCSVData);
    setTransactions(parsedData);
    setCategorisedTransactions(parsedData); // Initialize categorised data
    if (parsedData.length > 0) {
      setCurrentCategory(parsedData[0].category || ''); // Set initial category if exists
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Update current category when currentIndex changes
  useEffect(() => {
    if (transactions.length > 0) {
      setCurrentCategory(categorisedTransactions[currentIndex]?.category || '');
    }
  }, [currentIndex, transactions, categorisedTransactions]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    // Update the category for the current transaction in the categorised list
    const updatedCategorised = [...categorisedTransactions];
    updatedCategorised[currentIndex].category = category;
    setCategorisedTransactions(updatedCategorised);
  };

  // Move to the next transaction
  const handleNext = () => {
    if (currentIndex < transactions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Move to the previous transaction
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle saving (example: log to console)
  const handleSave = () => {
    console.log("Categorised Transactions:", categorisedTransactions);
    alert("Categorised data logged to console!"); // Using alert for simplicity, replace with proper UI feedback
  };

  // Display message if no transactions loaded
  if (transactions.length === 0) {
    return <div className="p-4 text-center text-gray-600">Loading transactions or no data available...</div>;
  }

  // Get the current transaction
  const currentTransaction = transactions[currentIndex];

  return (
    <div className="container mx-auto p-4 max-w-md bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Categorise Transaction</h2>

      {/* Transaction Details */}
      <div className="mb-6 p-4 border rounded-md bg-gray-50">
        <p className="text-lg font-semibold text-gray-700">Transaction {currentIndex + 1} of {transactions.length}</p>
        <p className="text-gray-600">Date: <span className="font-medium">{currentTransaction.Date}</span></p>
        <p className="text-gray-600">Description: <span className="font-medium">{currentTransaction.Description}</span></p>
        <p className="text-gray-600">Amount: <span className={`font-medium ${parseFloat(currentTransaction.Amount) < 0 ? 'text-red-600' : 'text-green-600'}`}>{currentTransaction.Amount}</span></p>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Select Category:
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition duration-200 ease-in-out
                ${currentCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === transactions.length - 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Save Button */}
      <div className="text-center mt-6">
         <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-md shadow-lg transition duration-200 ease-in-out"
          >
            Save Categories
          </button>
      </div>
    </div>
  );
};

export default TransactionCategoriser;
