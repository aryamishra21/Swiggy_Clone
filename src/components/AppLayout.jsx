import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
const AppLayout = () => {
  return (
    <div>
        <ScrollToTop/>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default AppLayout