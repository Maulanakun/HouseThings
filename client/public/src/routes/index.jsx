import {createBrowserRouter} from 'react-router-dom'

import Home from '../pages/home'
import ProductDetail from '../pages/productDetail'
import Parent from '../pages/parent'

const router = createBrowserRouter([
    {
        element:<Parent/>,
        children:[{
            path:'/pub/product',
            element: <Home/>
        },
        {
            path:'/pub/product/:id',
            element:<ProductDetail/>
        }]
    },
    
])
// 
export default router
