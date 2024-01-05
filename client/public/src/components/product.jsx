import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const YourComponent = ({ productList, loading }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`${id}`);
  };

  return (
    <>
      <div className="container pb-16">
        {loading && (
          <>
            <div role="status">
              <svg
                aria-hidden="true"
                class="inline w-1000 h-20 mr-2 text-red-200 animate-spin dark:text-red-600 fill-red-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </>
        )}
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          recomended for you
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {productList.map((el) => (
            <div
              className="bg-white shadow rounded overflow-hidden group"
              key={el.id}
            >
              <div className="relative">
                <img src={el.imgUrl} alt="product 1" className="w-full" />
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                  justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                >
                  <a
                    onClick={() => handleClick(el.id)}
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="view product"
                  >
                    <i className="fa fa-eye"></i>
                  </a>
                  <a
                    href=""
                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                    title="add to wishlist"
                  >
                    <i className="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div className="pt-4 pb-3 px-4">
                <a href={"/product/" + el.id}>
                  <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                    {el.name}
                  </h4>
                </a>
                <div className="flex items-baseline mb-1 space-x-2">
                  <p className="text-xl text-primary font-semibold">
                    {el.price}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    {el.price + 1000000}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex gap-1 text-sm text-yellow-400">
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 ml-3">
                    Stock({el.stock})
                  </div>
                </div>
              </div>
              <a
                href="#"
                className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
              >
                Add to cart
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default YourComponent;
