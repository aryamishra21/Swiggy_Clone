
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from './components/AppLayout';
import HomePage from './Pages/HomePage';
import SearhPage from './Pages/SearhPage';
import SupportPage from './Pages/SupportPage';
import CartPage from './Pages/CartPage';
import MenuPage from './Pages/MenuPage';
import TestAccordion from './components/TestAccordion';

const route=createBrowserRouter([
  {
    path:'/',
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path:'/search',
        element:<SearhPage/>
      },
      {
        path:'/support',
        element:<SupportPage/>
      },
      {
        path:'/cart',
        element:<CartPage/>
      },
      {
        path:'/restaurant/:id',
        element:<MenuPage/>
      },
      {
        path:'/test',
        element:<TestAccordion/>
      },
    ]
  }
])
function App() {
  return (
    <RouterProvider router={route}/>
  );
}

export default App;
