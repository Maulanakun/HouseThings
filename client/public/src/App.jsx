import { useState } from 'react'
import './App.css'
import router from './routes'
import { RouterProvider } from "react-router-dom";
// import Login from '../../cms/src/pages/login'

function App() {
  const [productList,setProductList] = useState()

return (
   <>
    <RouterProvider router={router}/>
   </>
  )
}

export default App
