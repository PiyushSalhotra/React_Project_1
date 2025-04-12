import React from 'react'
import Navbar from './components/Navbar'
import {Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProduct from './pages/AllProduct'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/cart'
import AddAddress from './pages/AddAddress'
import MyOrder from './pages/myOrder'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
//npm i react-router-dom
//prebuiltui.com
const App = () => {
  //to get information about whether we are on seller dashboard or normal user page, we will use uselocation hook
  const isSellerPath = useLocation().pathname.includes("seller")
  const {showUserLogin, isSeller} = useAppContext()
  
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {/* this navbar will be displayed for regular user not for the seller */}
      {isSellerPath ? null : <Navbar/>}
      {showUserLogin? <Login/> : null}

       <Toaster/>
      
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"} `}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<AllProduct/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/my-orders' element={<MyOrder/>}/>
          <Route path='/seller' element={isSeller? <SellerLayout/> : <SellerLogin/>}>
          <Route index element={isSeller? <AddProduct/>: null}/>
          <Route path='product-list' element={<ProductList/>}/>
          <Route path='orders' element={<Orders/>}/>
          </Route>

        </Routes>
      </div>
    {/* we have to hide this footer in seller dashboard, in seller dashboard we will display different footer */}
      {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App
