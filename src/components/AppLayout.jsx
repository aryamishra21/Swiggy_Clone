import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import { Provider } from 'react-redux'
import store from '../utils/store/store'
const AppLayout = () => {
  return (
    <Provider store={store}>
        <ScrollToTop/>
        <Header/>
        <Outlet/>
        <Footer/>
    </Provider>
  )
}

export default AppLayout