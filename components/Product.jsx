import React from 'react'
import Link from 'next/link';
import  Image from 'next/image';

const styles = {
  cartContainer: `w-[250px] p-2 bg-gray-50 shadow-lg shadow-gray-300 rounded-lg hover:scale-105 transition-all duration-200 ease-in rounded-xl`,
  image: `object-contain`,
  price: `text-black text-lg font-bold px-2`,
}


const Product = ({product, }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className={styles.cartContainer}>
        <Image 
        src={product?.data.image}
        width={250}
        height={250} 
        className={ styles.image} />
        <h1 className='text-gray-500 text-lg my-2 p-2'>{product?.data.title}</h1>
        <h1 className={styles.price}>${product?.data?.price}</h1> 
      </div>
    </Link>
  )
}

export default Product
