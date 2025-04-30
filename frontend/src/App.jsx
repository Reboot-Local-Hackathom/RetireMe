
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionPage from './components/TransactionPage';
import AuthPage from './components/AuthPage';
import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
