import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './page/Landing';
import ResultPage from './page/ResultPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route exact path="/result" element={<ResultPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
