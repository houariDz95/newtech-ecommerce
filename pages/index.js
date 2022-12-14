import Head from 'next/head'
import { Header, Product, HeroBanner, Footer } from '../components';
import db from '../firebase';
import { getDocs, collection } from 'firebase/firestore';

export default function Home({products}) {
  return (
    <div className="max-w-[1400px] w-full  m-auto">
      <Head>
        <title>Edd E-commerce</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="w-full p-4">
        {products.slice(1, 2).map((product) => (
            <HeroBanner key={product.id} product={product} />
        ))}
      </div>
      <h1 className="w-full text-center text-4xl md:text-6xl font-bold mt-10 mb-5 text-[#324d67]">Best Selling Products</h1>
      <div className="flex flex-wrap gap-5 justify-center w-[92%] m-auto mb-10">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <div className="w-full p-4">
        {products.slice(3, 4).map((product) => (
            <HeroBanner key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  )
}


export const getServerSideProps = async () => {
   const products =  (await getDocs(collection(db, 'products'))).docs.map(doc => {
    return {
      id: doc.id,
      data: doc.data(),
    };
   })

  return {
    props: { products }
  }
}