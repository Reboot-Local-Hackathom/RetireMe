// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TransactionPage from './components/TransactionPage';
import './App.css';

function Home() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src="/src/assets/react.svg" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/">Home</Link> | <Link to="/transactions">Transactions</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<TransactionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
