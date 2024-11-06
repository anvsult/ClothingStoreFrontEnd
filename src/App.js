
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from "./components/MyNavBar";
import HomePage from './pages/HomePage'
import CustomersPage from './pages/CustomersPage'
import ProductsPage from './pages/ProductsPage'
import OrdersPage from './pages/OrdersPage'
import {useState} from "react";


export default function App() {
    const [customerMode, setCustomerMode] = useState('list');
    const [productMode, setProductMode] = useState('list');
    const [orderMode, setOrderMode] = useState('list');
    const handleNavLinkClick = () => {
        setCustomerMode('list');
        setProductMode('list');
        setOrderMode('list');
    };
  return (
  <Router>
    <MyNavBar onNavLinkClick={handleNavLinkClick}/>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/customers' element={<CustomersPage
          mode={customerMode}
          setMode={setCustomerMode}/>} />
      <Route path='/products' element={<ProductsPage
          mode={productMode}
          setMode={setProductMode}/>} />
      <Route path='/orders' element={<OrdersPage
          mode={orderMode}
          setMode={setOrderMode}/>} />
    </Routes>
  </Router>

  );
}

