import React, {useState} from 'react'
import db from '../../firebase';
import { collection, doc, getDoc} from "firebase/firestore";
import {AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import {Footer, Header} from '../../components';
import { useDispatch  } from 'react-redux';
const styles = {
  productDetailContainer: `w-[92%] m-auto mt-[50px] mr-[50px] flex gap-[50px] md:flex-row p-5 flex-col mb-[65px]`,
  imageContainer: `w-[350px] h-[350px] rounded-lg shadow-lg shadow-gray-200`,
  productDetailsImage: `w-full h-full`,
  productDetailDesc: `flex flex-col`,
  quantity: `flex items-center justify-start gap-10 mt-8`,
  quantityDesc:  `flex items-center border-[2px] border-gray-500  text-2xl font-bold`,
  num: `px-5 py-2 text-slate-500 `,
  minus: `text-green-500 border-r-[2px] border-gray-500 py-4 px-5 cursor-pointer`,
  plus: `text-red-500 border-l-[2px] border-gray-500 py-4 px-5 cursor-pointer`,
  buttons: `flex-1 flex flex-col sm:flex-row md:flex-row gap-5  mt-5`,
  addToCart: `px-20 py-2 text-xl font-semibold cursor-pointer hover:scale-110 transition-all duration-200 border-[2px] border-red-500 text-red-500`,
  buyNow:    `px-20 py-2 text-xl font-semibold cursor-pointer hover:scale-110 transition-all duration-200 bg-red-500 text-white`,
  plus: `text-red-500 border-l-[2px] border-gray-500 py-4 px-5 cursor-pointer`,

}


const ProductDetails = ({product, id1}) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1)

  const onAdd = () => {
    const price =  parseFloat(product.price)
   dispatch({ type: 'ADD_TO_BASKET', payload: {product, qty, id: id1, price}});
  }
  const handelBuyNow = () => {
    onAdd();
    dispatch({type: "SHOW_MENU"})
  }
  const inc = () => {
    setQty((prev) =>  prev + 1)
  }

  const dec = () => {
    if(qty > 1){
      setQty((prev) => prev - 1)
    }
  }
  return (
    <div>
      <Header />
      <div className={styles.productDetailContainer}>
        <div className={styles.imageContainer}>
          <img src={product?.image} className={styles.productDetailsImage} />
        </div>
        <div className={styles.productDetailDesc}>
        <h1 className="text-slate-500 font-bold text-4xl mb-4">{product.title}</h1>
        <div className="reviews">
          <div className="flex text-red-500">
            {product.feedback >= 1 ? <AiFillStar size={20}/> : <AiOutlineStar size={20} />}
            {product.feedback >= 2 ? <AiFillStar size={20}/> : <AiOutlineStar size={20} />}
            {product.feedback >= 3 ? <AiFillStar size={20}/> : <AiOutlineStar size={20} />}
            {product.feedback >= 4 ? <AiFillStar size={20}/> : <AiOutlineStar size={20} />}
            {product.feedback >= 5 ? <AiFillStar size={20}/> : <AiOutlineStar size={20} />}
            <p className="text-slate-500 ml-3 text-lg">
              (20)
            </p>
          </div>
        </div>
        <h4 className="text-slate-500 font-semibold text-xl my-3">Details: </h4>
        <p className="text-slate-500 font-base text-lg">{product?.discreption}</p>
        <p className="font-bold text-red-500 text-3xl mt-[50px]">${product?.price}</p>
        <div className={styles.quantity}>
          <h3 className="text-slate-500 text-xl font-bold">Quantity:</h3>
          <p className={styles.quantityDesc}>
            <span className={styles.minus} onClick={dec}><AiOutlineMinus /></span>
            <span className={styles.num}>{qty}</span>
            <span className={styles.plus} onClick={inc}><AiOutlinePlus /></span>
          </p>
        </div>
        <div className={styles.buttons}>
            <button type="button" className={styles.addToCart} onClick={() => onAdd()}>Add to Cart</button>
            <button type="button" className={styles.buyNow} onClick={() => handelBuyNow()}>Buy Now</button>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}



export const getServerSideProps = async ({ params: { id }}) => {
  const item = doc(collection(db, 'products'), id)
  const product = (await getDoc(item)).data();
  const id1 = id
  return {
    props: {  product, id1}
  }
}

export default ProductDetails