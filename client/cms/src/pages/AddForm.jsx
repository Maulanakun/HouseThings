import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const AddForm = () => {
    const [inputProduct,setInputProduct] = useState({
        name:'',
        description:'',
        price:'',
        stock:'',
        imgUrl:'',
        categoryId:'',
        authorId:''
    })
    const inputChange = (e) => {
        let inputValue = e.target.value;
        let inputName = e.target.name;
      console.log(inputProduct);
        setInputProduct({
          ...inputProduct, 
          [inputName]: inputValue 
        });
      }
    const token = localStorage.access_token
    const navigate = useNavigate()
    const addSubmit = async (e) => {
      e.preventDefault()
      try {
        let response = await axios.post('https://anasendiri.cloud/product',inputProduct,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        navigate('/product')
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <>
     <section class="p-6 dark:bg-gray-800 dark:text-gray-50">
            <form onSubmit={addSubmit} class="container flex flex-col mx-auto space-y-12">
                <fieldset class="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                    <div class="space-y-2 col-span-full lg:col-span-1">
                        <p class="font-medium">Product Inormation</p>
                        <p class="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!</p>
                    </div>
                    <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div class="col-span-full sm:col-span-3">
                            <label for="name" class="text-sm">name</label>
                            <input onChange={inputChange} name="name" id="name" type="text" placeholder="name" class="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                        <div class="col-span-full sm:col-span-3">
                            <label for="lastname" class="text-sm">Description</label>
                           <textarea onChange={inputChange} id="description" name="description" class="textarea textarea-bordered  dark:border-gray-700 dark:text-gray-900 w-full rounded-md focus:ring focus:ri focus:ri" placeholder="Description"></textarea>
                        </div>
                        <div class="col-span-full sm:col-span-3">
                            <label for="price" class="text-sm">Price</label>
                            <input id="price" onChange={inputChange} name="price" type="number" placeholder="price" class="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                        <div class="col-span-full sm:col-span-3">
                            <label for="stock" class="text-sm">Stock</label>
                            <input id="stock" onChange={inputChange} name="stock" type="number" placeholder="Stock" class="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                        <div class="col-span-full">
                            <label for="imgUrl" class="text-sm">imgUrl</label>
                            <input id="imgUrl" onChange={inputChange} name="imgUrl" type="url" placeholder="" class="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                        <div class="col-span-full sm:col-span-2">
                            <label for="categoryId" class="text-sm">Category Id</label>
                            <input id="categoryId" onChange={inputChange} name="categoryId" type="number" placeholder="" class="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                        <div class="col-span-full sm:col-span-2">
                            <label for="authorId" class="text-sm">Author Id</label>
                            <input id="authorId" onChange={inputChange} name="authorId" type="number" placeholder="" class="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"/>
                        </div>
                    </div>
                </fieldset>
                <button type="submit" class="btn btm-nav-sm md:btn-md ">Add</button>
            </form>
        </section>
    </>
  )
}
export default AddForm