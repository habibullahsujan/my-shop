import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../Context/UserContext";

import CartItem from "./CartItem";

const Orders = () => {
  // const cartItems=useLoaderData();
  const {user, logOut}=useContext(AuthContext);

  const [cart,setCart]=useState([])
  useEffect(()=>{
    fetch(`https://shop-server-kappa.vercel.app/cartItem?email=${user?.email}`, {
      headers:{
        authorization: `Bearer ${localStorage.getItem('user-verify')}`
      }
    })
    .then(res=>{

      if(res.status === 401 || res.status === 403){
        return logOut();
      }
      return res.json()})
    .then(data=>{
      console.log(data);
      setCart(data)
    })
  },[user, logOut]);

  const deleteBtnHandler=(id)=>{
    console.log(' i am clicked', id);
    const remaining=cart.filter(crt=>crt._id !== id);
    console.log(remaining);
    setCart(remaining)
  }

  return (
    <div>
       <h2 className="text-xl font-semibold">Your cart</h2>
      {
        cart.map(item=><CartItem key={item._id} item={item} deleteBtnHandler={deleteBtnHandler}/>)
      }
         <div className="space-y-1 text-right">
         
          <p className="text-sm dark:text-gray-400">
            Not including taxes and shipping costs
          </p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border rounded-md dark:border-violet-400"
          >
            Back
            <span className="sr-only sm:not-sr-only">to shop</span>
          </button>
          <button
            type="button"
            className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
          >
            <span className="sr-only sm:not-sr-only">Continue to</span>Checkout
          </button>
        </div>
    </div>
  );
};

export default Orders;
