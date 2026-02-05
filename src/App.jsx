
import AppRoute from './routes/AppRoute'
import { AuthProvider } from "./context/AuthContext";
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import Home from './pages/Home';
import PrivateRoute from './routes/PrivateRoute';

import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";

function App() {
  
  const router = createBrowserRouter([
    {
      path:'/',
      element:(
        <>
        <Login/>
        </>
      )
    },
      {
    path:'/Login',
    element:(
      <>
    <Login/>
    {/* <SampleForm/> */}
      </>
    )
  },
      {
    path:'/signup',
    element:(
      <>
     <Signup/>
      </>
    )
  },
        {
    path:'/home',
    element:(
      <>
   <PrivateRoute> <Home/></PrivateRoute>
      </>
    )
  },
  ])

  return (
<>
<RouterProvider router={router} />
</>
  )
}

export default App
