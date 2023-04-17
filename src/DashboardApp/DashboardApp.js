import styled from "styled-components";
import './css/helloPresident.css';

import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import DashboardLoader from "./components/loader/DashboardLoader";

import Home from "./pages/Home";
import UserList from "./pages/userList/UserList";
import UserPage from "./pages/user/UserPage";
import NewUser from "./pages/new user/NewUser";
import ProductList from "./pages/product list/ProductList";
import ProductPage from "./pages/product/ProductPage";
import NewProduct from "./pages/new product/NewProduct";
import Website from "./pages/website/Website";

import { useAuthContext } from "./hooks/useAuthContext";

import { Route,Routes, Navigate, Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { Helmet ,HelmetProvider } from "react-helmet-async";

const Container = styled.div`
  display: flex;
`
const Background = styled.div`
  background-image: url('/shownimage/backgroundimage');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-color: #464646;
  overflow-x:hidden;
  height: 100vh;
  padding:0;
  transition: none !important;
`


const  DashboardApp = () => {

  function importAll(r) {
    let images = {};
      r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
  }
  const images = importAll(require.context('./imgs', false, /\.(png|jpe?g|svg|gif)$/));


  const { user } = useAuthContext()

  const [isLoading, setIsLoading] = useState(true)
  const [showHelloPresident, setShowHelloPresident] = useState(false)

  useEffect(() => {

    const checkLoaded = setInterval(()=>{
      console.log(document.readyState)
      if (document.readyState === 'complete') {
        setIsLoading(false)
        if (user.user.role === 'President') {
          setShowHelloPresident(true)
          setTimeout(()=>{
            setShowHelloPresident(false)
          }, 3000)
        }
        clearInterval(checkLoaded);
      } else {
        setIsLoading(true)
      }
    },100)
    console.log('Hello from Dashboard')
  }, []);
  
  return (
    <>
    <HelmetProvider>
      <Helmet>
          <meta property="og:title" content="Premium Dashboard" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.premium-club-asu.org/dashboard" />
          <meta property="og:image" content={images["premiumClubLogoTextMouse.png"]} />
          
          <title> Dashboard </title>

          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
      {
        isLoading && (
          <DashboardLoader images={images} style={{backgroundColor:'white',backgroundImage:'none'}} />
        )
      }
      <div id="helloPresident" style={
        showHelloPresident 
        ?  {
          animation: 'fadeIn 2s linear',
        } : {
          animation: 'fadeOut 1s linear',
          display:'none'
        }
      }>
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
          <h1><b>hello, president.</b></h1>
        </div>
      </div>
      <div id='site' style={
        isLoading || showHelloPresident ? {
          display:'none'
        } : {
          animation:'fadeIn 1s linear'
        }
      }>
          <Topbar images={images}/>
          <Container>
            <Sidebar/>
              <Routes>
                <Route index element={<Home/>} />
                <Route path="website-edit/" element={<Website/>} >
                  <Route path="*" element={<Website/>} />
                </Route>
                <Route path="users/" element={<UserList images={images}/>}>
                  <Route path="*" element={<UserList images={images}/>} />
                </Route>
                <Route path="user/:userId" element={<UserPage/>}>
                    <Route path="*" element={<UserPage/>} />
                </Route>
                <Route path="newUser/" element={<NewUser/>} />
                <Route path="products/" element={<ProductList/>} />
                <Route path="product/:productId" element={<ProductPage/>} />
                <Route path="newproduct" element={<NewProduct/>} />
              </Routes>
          </Container>
      </div>
    </HelmetProvider>
    </>
  );
}

export default DashboardApp;
