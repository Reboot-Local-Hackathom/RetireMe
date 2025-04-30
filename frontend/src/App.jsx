import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionPage from './components/TransactionPage';
import AuthPage from './components/AuthPage';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CategoryReport from './components/CategoryReport'; // ✅ Import the component

import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/report" element={<CategoryReport />} /> {/* ✅ Correct path for CategoryReport */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
