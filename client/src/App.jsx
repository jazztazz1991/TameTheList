// import { useState } from 'react'
import './App.css';
import dotenv from 'dotenv';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header.jsx';
import { Footer } from './components/footer.jsx';
import { Landing } from './pages/landing.jsx';
import { Login } from './pages/login.jsx';
import { Register } from './pages/register.jsx';
import { Dashboard } from './pages/dashboard.jsx';
import { Boards } from './pages/boards.jsx';
import { Board } from './pages/board.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {
	return (
		<GoogleOAuthProvider clientId={`${process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/boards' element={<Boards />} />
				<Route path='/boards/:id' element={<Board />} />

				{/* <Route path="/boards" element={<Boards />} />
        <Route path="/profile" element={<Profile />} /> */}
			</Routes>
			<Footer />
		</Router>
		</GoogleOAuthProvider>
	);
}

export default App;
