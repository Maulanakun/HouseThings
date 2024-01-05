import { useState,useEffect } from "react"
import axios from "axios"
import { Link,useNavigate } from "react-router-dom"
const TableProduct = () => {
    const [product,setProduct] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    const token = localStorage.access_token
    // console.log(token);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://anasendiri.cloud/product',{
                headers:{
                    Authorization:`bearer ${token}`
                }
            });
            setProduct(response.data.dataProduct);
            setLoading(true)
          } catch (error) {
            console.error("Error fetching data: ", error);
          }finally{
            setLoading(false)
          }
        };
    
        fetchData();
      } )
    const deleteData = async (productId) => {
      try {
        await axios.delete(`https://anasendiri.cloud/product/${productId}`,{
            headers:{
                Authorization:`bearer ${token}`
            }
        })
        navigate('/product')
      } catch (error) {
        console.log(error);
      }
    }
    return (
        <>
        <div className="overflow-x-auto">
           
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>desciption</th>
        <th>price</th>
        <th>stock</th>
        <th>imgUrl</th>
        <th>category</th>
        <th>email author</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {product.map((el,index) => (
      <>
        <tr>
        <th>{index+1}</th>
        <td>{el.name}</td>
        <td>{el.description}</td>
        <td>{el.price}</td>
        <td>{el.stock}</td>
        <td><img src={el.imgUrl} alt="" /></td>
        <td>{el.Category.name}</td>
        <td>{el.User.email}</td>
        <td>  
        <div className="flex items-center">
        <div className="flex flex-col">
        <button onClick={() => deleteData(el.id)} className="btn btn-outline btn-error">Delete</button>
        <Link to={`${el.id}`}>
        <button className="btn btn-outline btn-secondary">Update</button>
        </Link>
        </div>
        <Link to={`img/${el.id}`}>
        <button className="btn btn-outline btn-secondary flex flex-row">Update</button>
        </Link>
        </div>      
        
        </td>
      </tr>
      </>))}
     
    </tbody>
  </table>
</div>
        </>
    )
}

export default TableProduct