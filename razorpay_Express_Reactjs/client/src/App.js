import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import IndividualPayments from "./components/IndividualPayments";
import PaymentPage from "./components/PaymentPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return(
			<div>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<PaymentPage></PaymentPage>}></Route>
						<Route path="/indivualPayment" element={<IndividualPayments></IndividualPayments>}></Route>
					</Routes>
				</BrowserRouter>
			</div>
	)
}

export default App;

