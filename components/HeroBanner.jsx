import React from 'react'
import Router from 'next/router';
import Image from 'next/image';
const styles = {
  cartContainerBest: `flex justify-between bg-white rounded-xl mb-4 rounded-xl shadow-lg shadow-gray-400`,
  imageBest: `w-[85px] h-[415px] md:w-[350px]`,
  banner: `relative p-5 flex  justify-center gap-4 flex-col`,
  bannerP: `text-gray-500 md:text-xl text-lg font-semibold`,
  bannerH3: `md:text-8xl text-3xl font-semibold text-black ml-4 `,
  bannerH1: `md:text-[12rem] text-6xl text-gray-300 font-bold`,
  bannerButton: `absolute bottom-10 left-10  py-2 rounded-lg bg-red-500 text-white font-bold w-[160px] text-lg md:text-2xl`,
  discreption: `flex flex-col h-full justify-end tems-start p-2 pr-10 p-4`,
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
          <img src={product?.data.image} className={styles.imageBest }  alt="hero"/>
          <div className='text-gray-500 text-lg my-2 p-2'>
            <div className={styles.discreption}>
              <p className="md:text-xl font-bold text-slate-500 md:text-right">Descreption</p>
              <p className="md:text-lg text-sm mt-2  text-gray-500">{product?.data?.title}</p>
            </div>
          </div>
      </div>
    )
}

export default HeroBanner