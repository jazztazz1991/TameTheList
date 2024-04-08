// import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header.jsx';
import { Landing } from './pages/landing.jsx';
import { Login } from './pages/login.jsx';

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/login' element={<Login />} />

				{/* <Route path="/boards" element={<Boards />} />
        <Route path="/profile" element={<Profile />} /> */}
			</Routes>
		</Router>
	);
}

export default App;
