import { useState } from 'react'
import { RouterProvider } from "react-router-dom";
import './App.css'
import router from './routers';

const Cms = () => {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default Cms
