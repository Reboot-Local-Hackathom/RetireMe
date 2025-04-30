"use client";

import { useState, useEffect } from "react";

function CategoryReport() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const startDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
        const lastDay = new Date(year, month + 1, 0).getDate();
        const endDate = `${year}-${String(month + 1).padStart(2, "0")}-${lastDay}`;

        const token = sessionStorage.getItem("access_token");
        if (!token) {
          throw new Error("Access token not found.");
        }

        const response = await fetch(
          `http://localhost:8000/transactions/my-transactions?startDate=${startDate}&endDate=${endDate}`,
          {
            headers: {
              "x-access-token": token,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Failed to fetch: ${errText}`);
        }

        const data = await response.json();

        // Log to inspect the response structure
        console.log("Fetched transactions:", data);

        // Check if response contains the expected array of transactions
        if (Array.isArray(data)) {
          const categoryMap = {};

          // Process the data to aggregate by category
          data.forEach((item) => {
            const cat = item.category || "Uncategorized";
            const amt = parseFloat(item.amount) || 0;
            if (!categoryMap[cat]) categoryMap[cat] = 0;
            categoryMap[cat] += amt;
          });

          // Create an array of categories with their summed amounts
          const categoryArray = Object.entries(categoryMap).map(([name, amount]) => ({
            name,
            amount,
          }));

          setCategories(categoryArray);
        } else {
          throw new Error("Expected an array of transactions.");
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, year]);

  const total = categories.reduce((sum, category) => sum + category.amount, 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Monthly Category Report</h2>
        <div style={styles.monthSelector}>
          <button onClick={handlePrevMonth} style={styles.button}>&lt;</button>
          <span style={styles.monthDisplay}>{months[month]} {year}</span>
          <button onClick={handleNextMonth} style={styles.button}>&gt;</button>
        </div>
      </div>

      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : error ? (
        <div style={styles.error}>{error}</div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{category.name}</td>
                  <td style={styles.tdAmount}>${category.amount.toFixed(2)}</td>
                </tr>
              ))}
              <tr style={styles.totalRow}>
                <td style={styles.tdTotal}>Total</td>
                <td style={styles.tdTotalAmount}>${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {categories.length === 0 && !loading && (
            <div style={styles.noData}>No data available for this month</div>
          )}
        </div>
      )}

      {/* Centered Message */}
      <div style={styles.centeredMessage}>
        {categories.length === 0 && !loading && !error && (
          <p>No data to display for this period.</p>
        )}
      </div>
    </div>
  );
}

// Inline styles for centering content and UI adjustments
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
  },
  monthSelector: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
  },
  button: {
    fontSize: '1.5rem',
    margin: '0 10px',
  },
  monthDisplay: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  tableContainer: {
    width: '80%',
    maxWidth: '800px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    marginTop: '20px',
    padding: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
  },
  td: {
    padding: '10px',
  },
  tdAmount: {
    padding: '10px',
    textAlign: 'right',
  },
  totalRow: {
    fontWeight: 'bold',
    backgroundColor: '#f4f4f4',
  },
  tdTotal: {
    padding: '10px',
    textAlign: 'left',
  },
  tdTotalAmount: {
    padding: '10px',
    textAlign: 'right',
  },
  noData: {
    textAlign: 'center',
    color: '#999',
    fontSize: '1.2rem',
    marginTop: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: '1.2rem',
    marginTop: '20px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#555',
  },
  centeredMessage: {
    textAlign: 'center',
    color: '#555',
    marginTop: '20px',
  },
};

export default CategoryReport;
