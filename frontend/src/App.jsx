import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TransactionPage from './components/TransactionPage';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';


function App() {
  return (
    <Router>
      <NavBar />
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
