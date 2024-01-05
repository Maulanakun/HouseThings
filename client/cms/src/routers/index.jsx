import {createBrowserRouter,redirect} from 'react-router-dom'
import Login from '../pages/login'
import Regist from '../pages/regist'
import Parent from '../pages/parent'
import TableProduct from '../pages/table-product'
import AddForm from '../pages/AddForm'
import EditForm from '../pages/editForm'
import ImgUrl from '../pages/imgForm'
import Category from '../pages/category'

const router = createBrowserRouter([
    {
        path:'/login',
        element:<Login/>,
        loader: async () => {
          if (localStorage.access_token) {
            return redirect('/product')
          }
          return null
        }
    },
    {
        element:<Parent/>,
        children:[
          {
            path:'category',
            element:<Category/>,
            loader: async () => {
                if (!localStorage.access_token) {
                  return redirect('/login')
                }
                return null
              }
        },
        {
                path:'regist',
                element:<Regist/>,
                loader: async () => {
                    if (!localStorage.access_token) {
                      return redirect('/login')
                    }
                    return null
                  }
            },
            {
                path:"product",
                element:<TableProduct/>,
                loader: async () => {
                    if (!localStorage.access_token) {
                      return redirect('/login')
                    }
                    return null
                  }
            },
            {
                path:"addForm",
                element:<AddForm/>,
                loader: async () => {
                    if (!localStorage.access_token) {
                      return redirect('/login')
                    }
                    return null
                  }
            },
            {
        
              path:'product/img/:ProductId',
              element:<ImgUrl/>,
              loader: async () => {
                  if (!localStorage.access_token) {
                    return redirect('/login')
                  }
                  return null
                }
          },            
            {
        
              path:'product/:ProductId',
              element:<EditForm/>,
              loader: async () => {
                  if (!localStorage.access_token) {
                    return redirect('/login')
                  }
                  return null
                }
          },            
        ]
    },
   
])
export default router