
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from './components/AppLayout';
import HomePage from './Pages/HomePage';
import SearchPage from './Pages/SearchPage';
import SupportPage from './Pages/SupportPage';
import CartPage from './Pages/CartPage';
import MenuPage from './Pages/MenuPage';
import CollectionPage from './Pages/CollectionPage';

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
        element:<SearchPage/>
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
        path:'/collections/:id',
        element:<CollectionPage/>
      },
      {
        path:'/restaurant/:id',
        element:<MenuPage/>
      }
    ]
  }
])
function App() {
  return (
    
    <RouterProvider router={route}/>
  );
}

export default App;
