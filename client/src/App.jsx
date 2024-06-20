// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header.jsx';
import { Footer } from './components/footer.jsx';
import { Landing } from './pages/landing.jsx';
import { Login } from './pages/login.jsx';
import { Register } from './pages/register.jsx';
import { Dashboard } from './pages/dashboard.jsx';
import { Boards } from './pages/boards.jsx';
import { Board } from './pages/board.jsx';
import GLogin from './components/GLogin';
import Secure from './components/Secure';
import { AuthProvider } from '../src/components/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/glogin' element={<GLogin />} />
          <Route path='/secure' element={<Secure />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/boards' element={<Boards />} />
          <Route path='/boards/:id' element={<Board />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
