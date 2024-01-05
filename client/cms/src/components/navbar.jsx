import { useEffect } from "react"
import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"

const NavBar = () => {
    const navigate =useNavigate()
    const ifClickWillLogout = () => {
      localStorage.removeItem('access_token')
      navigate('/login')
    }
    useEffect(() => {
      
    })
  return (
    <>
     <nav className="bg-gray-800">
        <div className="container flex">
            {/* <!-- all category --> */}
            <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                <span className="text-white">
                    <i className="fa fa-bars">
                        <Link to={"/category"}>
                         <button >
                         All Categories
                         </button>
                        </Link>
                         </i>
                </span>
                <span className="capitalize ml-2 text-white hidden"></span>

                {/* <!-- dropdown --> */}
            </div>
            {/* <!-- all category end--> */}
            {/* <!-- navbar link--> */}
            <div className="flex items-center justify-between flex-grow pl-12">
                <div  className="flex items-center space-x-6 capitalize">
                    <Link to='product' className="text-gray-200 hover:text-white transition"><button>Product List</button></Link>
                </div>
                <Link to='/addForm'  className="text-gray-200 hover:text-white transition">
                    <button>Add Product</button>
                </Link>
                <Link to="/regist" className="text-gray-200 hover:text-white transition">
                <button>Add Staff</button>
                </Link>
                <button onClick={ifClickWillLogout} className="text-red-600">Logout</button>
            </div>
        </div>
    </nav>
    </>
  )
}


export default NavBar