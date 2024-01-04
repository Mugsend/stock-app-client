import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [stocks, setStocks] = useState([]);
	const [n, setN] = useState(10);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`http://localhost:3000/api/stocks?n=${n}`);
				const data = await response.json();
				setStocks(data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();

		const intervalId = setInterval(fetchData, 1000);
		return () => clearInterval(intervalId);
	}, [n]);

	return (
		<div className="App">
			<h1>Stock App</h1>
			<label>
				Enter the number of stocks to display:
				<input
					type="number"
					value={n}
					max={20}
					onChange={(event) => {
						const value = event.target.value;
						const parsedValue = parseInt(value, 10);
						if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 20) {
							setN(parsedValue);
						}
					}}
				/>
			</label>
			{stocks.length > 0 && (
				<table>
					<thead>
						<tr>
							<th>Stock</th>
							<th>Open Price</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{stocks.map((stock, index) => (
							<tr key={index}>
								<td>{stock.stock}</td>
								<td>{stock.openPrice}</td>
								<td>{stock.price}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

export default App;
