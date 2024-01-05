import { Outlet } from "react-router-dom"
import NavBar from "../components/navbar"

const Parent = () => {
  return (
    <>
    <NavBar/>
    <Outlet/>
    </>
  )
}

export default Parent