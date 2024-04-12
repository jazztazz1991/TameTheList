// import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header.jsx';
import { Footer } from './components/footer.jsx';
import { Landing } from './pages/landing.jsx';
import { Login } from './pages/login.jsx';
import { Register } from './pages/register.jsx';
import { Dashboard } from './pages/dashboard.jsx';

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/dashboard' element={<Dashboard />} />

				{/* <Route path="/boards" element={<Boards />} />
        <Route path="/profile" element={<Profile />} /> */}
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
