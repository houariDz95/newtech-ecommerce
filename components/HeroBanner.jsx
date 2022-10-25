import React from 'react'
import Router from 'next/router';
import Image from 'next/image';
const styles = {
  cartContainerBest: `flex justify-between bg-white rounded-xl mb-4 rounded-xl shadow-lg shadow-gray-400 h-[250px] md:h-[500px]`,
  banner: `py-4 pl-2  flex  gap-4 md:gap-6 flex-col md:justify-center md:p-5`,
  bannerP: `w-[130px] md:w-[200px] text-slate-700 font-semibold text-lg md:text-2xl`,
  bannerH3: `font-semibol text-4xl md:ml-5 md:text-8xl`,
  bannerH1: `font-bold text-6xl text-gray-300 md:text-[10rem] md:mb-8`,
  bannerButton: `w-[130px] md:w-[160px] py-2 bg-red-500 text-white text-xl rounded-full font-semibold cursor-pointer`,
  discreption: `flex flex-col h-full justify-end items-end `,
}

const HeroBanner = ({product}) => {
  return (
      <div className={styles.cartContainerBest}>
          <div className={styles.banner}>
            <p className={styles.bannerP}>Best {product.data.category}</p>
            <h3 className={styles.bannerH3}>Summer Sale</h3>
            <h1 className={styles.bannerH1}>FINE</h1>
            <button className={styles.bannerButton} onClick={() => Router.push(`/product/${product.id}`)}>Shope Now</button>
          </div>
          <Image 
          src={product?.data.image} 
          alt="hero"
          layout='intrinsic'
          width={415}
          height={415}
          className={styles.image}
          />
          <div className='text-gray-500 text-lg my-2 p-2'>
            <div className={styles.discreption}>
              <p className="md:text-xl font-bold text-slate-500 md:text-right">Descreption</p>
              <p className="md:text-lg text-sm mt-2 w-[130px] md:w-[200px] text-gray-500">{product?.data?.title}</p>
            </div>
          </div>
      </div>
    )
}

export default HeroBanner