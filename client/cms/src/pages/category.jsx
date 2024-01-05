import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'

import {useNavigate} from 'react-router-dom' 
const Category = () => {
    const [category,setcategory] = useState([])
    const [loading,setLoading] = useState(true)
    const token = localStorage.access_token
    // console.log(token);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://anasendiri.cloud/category',{
                headers:{
                    Authorization:`bearer ${token}`
                }
            });
            setcategory(response.data.categories);
            setLoading(true)
          } catch (error) {
            console.error("Error fetching data: ", error);
          }finally{
            setLoading(false)
          }
        };
    
        fetchData();
      } ,[])
    return (
        <>
        <div className="overflow-x-auto">
           
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {category.map((el,index) => (
      <>
        <tr>
        <th>{index+1}</th>
        <td>{el.name}</td>
        <td>          
        </td>
      </tr>
      </>))}
     
    </tbody>
  </table>
</div>
        </>
    )
}
export default Category