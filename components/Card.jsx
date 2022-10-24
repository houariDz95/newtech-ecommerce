import React, { useState } from 'react';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineShopping, AiOutlineLeft } from 'react-icons/ai';
import { TiDeleteOutline} from 'react-icons/ti';
import { useSelector, useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import axios from 'axios';


const styles = {
  cartHeading: `w-full p-5 flex items-center text-lg md:text-3xl font-bold gap-5 cursor-pointer mt-5 `,
  cartNumItems: `text-red-500`,
  emptyCart: `w-full flex items-center flex-col`,
  btn: `w-[70%] py-3 mt-5 rounded-full bg-red-500 text-white text-2xl hover:scale-110 transition duration-500`,
  product: `w-full flex md:h-[130px] h-[100px] mb-6 md:px-8 px-2`,
  productContainerImg: `w-[130px] md:w-[150px] h-full object-contain`,
  itemDesc: `w-full md:p-4 p-6 flex flex-col  h-full`,
  quantityDesc:  `flex items-center border-[2px] border-gray-500  text-2xl font-bold`,
  num: `md:px-5 py-2 text-slate-500 px-3`,
  minus: `text-green-500 border-r-[2px] border-gray-500 py-4 md:px-5 px-3 cursor-pointer`,
  plus: `text-red-500 border-l-[2px] border-gray-500 py-4 md:px-5 px-3 cursor-pointer`,
  removeItem: `text-red-500 cursor-pointer`,
  cartButton: `w-full mt-5 p-2`,
  total: `w-full flex justify-between text-2xl font-bold mt-8 px-6 md:px-0`,
  buttonContainer: `w-full flex justify-center mt-5`,
}
const Card = ({setShowCart}) => {
  const {products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
const stripePromise = loadStripe(process.env.stripe_public_key);
  const sumWithInitial = products.reduce(
    (previousValue, currentValue) => previousValue + currentValue.price * currentValue.qty ,
    0
  );
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/api/create_checkout_session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(products),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();


    stripe.redirectToCheckout({ sessionId: data.id });
  }
  const inc = (id) => {
    dispatch({type: 'INCREMENT', payload: id})
  }
  const dec = (id) => {
    dispatch({type: 'DECREMENT', payload: id})
  }

  const onRemove = (id) => {
    dispatch({type: 'REMOVE_ITEM', payload: id})
    dispatch({type: 'TOTAL'})
  }

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black/50 transition-all ease-linear duration-300 z-50">
      <div className="h-screen w-[100%] md:w-[50%] lg:w-[40%] fixed right-0 top-0 bg-white overflow-y-scroll">
        <button className={styles.cartHeading} type="button" onClick={() => dispatch({type: "CLOSE_MENU"})}>
          <AiOutlineLeft />
          <span>Your Cart</span>
          <span className={styles.cartNumItems}>({products?.length} items)</span>
        </button>
        {products.length < 1 &&
        <div className={styles.emptyCart}>
          <AiOutlineShopping size={150}/>
          <h3 className="text-2xl my-5 font-semibold">Your Shopping Bag Is Empty</h3>
          <Link href="/">
            <button type="button" onClick={() => setShowCart(false)} className={styles.btn}>
              Contiune Shopping
            </button>
          </Link>
        </div>}
        <div >
        {products.length >= 1 && products?.map((item, index) => (
              <div className={styles.product} key={index}>
                <img src={item?.product?.image} className={styles.productContainerImg} alt="product"/>
                <div className={styles.itemDesc}>
                  <div className='flex flex-1 justify-between text-lg mb-2 sm:text-lg md-text-xl text-neutral-500 font-semibold'>
                    <h5>{item?.product?.title}</h5>
                    <h4>{item?.product?.price}</h4>
                  </div>
                  <div className='flex justify-between flex-1'>
                    <div >
                    <p className={styles.quantityDesc}>
                      <span className={styles.minus} onClick={() => dec(item.id)}><AiOutlineMinus /></span>
                      <span className={styles.num}>{item.qty}</span>
                      <span className={styles.plus} onClick={() => inc(item.id)}><AiOutlinePlus /></span>
                    </p>
                    </div> 
                    <button 
                    type="button" 
                    className={styles.removeItem}
                    onClick={() => onRemove(item.id)}
                    >
                        <TiDeleteOutline size={30} />
                    </button>                 
                </div>
                </div>
              </div>
            ))}
        </div>
          {products.length >= 1 && (
            <div className={styles.cartButton}>
              <div className={styles.total}>
                <h3>subtitol</h3>
                <h3>${sumWithInitial}</h3>
              </div>
              <div className={styles.buttonContainer}>
                <button type="button" className={styles.btn} onClick={handleCheckout}>
                  Pay with Stripe
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default Card