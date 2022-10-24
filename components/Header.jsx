import React, {useState} from 'react'
import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from './';
const styles = {
  navbarContainer: `w-full py-4 px-5 flex justify-between items-center`,
  logo: ` text-gray-500 font-semibold text-2xl hover:scale-110 transition duration-150 ease-in`,
  cartIcon: `text-gray-500  hover:scale-110 transition duration-150 ease-in relative`,
  cartItemQty: `absolute top-[-4px] right-[-8px] bg-red-500 text-white text-sm rounded-full w-[20px] h-[20px] flex items-center justify-center`
}
const Header = () => {
  const {products, cartMenu} = useSelector((state) => state.products); 
  const dispatch = useDispatch()
  return (
    <div className={styles.navbarContainer}>
      <Link href="/">
      <p className={styles.logo}> 
          NewTech
      </p>
      </Link>

      <button
        type="button"
        className={styles.cartIcon} onClick={() => dispatch({type: "SHOW_MENU"})}
      >
        <AiOutlineShopping size={25} />
        <span className={styles.cartItemQty}>{products.length}</span>
      </button>
      {cartMenu && <Card />}
    </div>
  )
}

export default Header