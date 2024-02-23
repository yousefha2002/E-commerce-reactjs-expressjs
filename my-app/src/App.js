import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import {createTheme,ThemeProvider} from '@mui/material'
import Home from './pages/Home';
import SingleProduct from './pages/SingleProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Footer from './components/Footer';
import FavouriteProducts from './pages/FavouriteProducts';
import Cart from './pages/Cart';
import ShopDepartment from './pages/ShopDepartment';
import ShippingOrder from './pages/ShippingOrder';
import PaymentOrder from './pages/PaymentOrder';
import SuccessOrder from './pages/SuccessOrder';
import Orders from './pages/Orders'
import SingleOrder from './pages/SingleOrder'

function App() {
  const {user} = useSelector((state)=>state.userLogin)
  
  const theme = createTheme({
    palette:{
      primary:{
        main:"#ff5252",
        contrastText:"white"
      },
      Black:{
        main:"#24292d",
        contrastText:"#fff"
      }
    }
  })

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/product/:id' element={<SingleProduct/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='favourite' element={user?<FavouriteProducts/>:<Navigate to="/login"/>}/>
          <Route path='cart' element={user?<Cart/>:<Navigate to="/login"/>}/>
          <Route path='orders' element={user?<Orders/>:<Navigate to="/login"/>}/>
          <Route path='order/:orderId' element={user?<SingleOrder/>:<Navigate to="/login"/>}/>
          <Route path='department/:title/:id' element={<ShopDepartment/>}/>
          <Route path='order/shipping' element={!user?<Navigate to={"/login"}/>:<ShippingOrder/>}/>
          <Route path='order/payment' element={!user?<Navigate to={"/login"}/>:<PaymentOrder/>}/>
          <Route path='order/success' element={!user?<Navigate to={"/login"}/>:<SuccessOrder/>}/>
        </Routes>
        <Footer/>
      </ThemeProvider>
    </div>
  );
}

export default App;
