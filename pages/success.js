import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { runFireworks } from '../lib/utils';
import {useDispatch} from 'react-redux';

const styles = {
  successWrapper: `h-screen w-screen flex items-center justify-center`,
  success: `w-[500px] p-10 bg-gray-300 rounded-lg flex jyestify-center items-center flex-col `,
}

const Success = () => {
  const dispatch = useDispatch();
  const restart = () => {
    dispatch({type: "SUCCESS"});
  }
  useEffect(() => {
    restart();
    runFireworks();
  }, [restart]);

  return (
    <div className={styles.successWrapper}>
      <div className={styles.success}>
        <p className="text-green-700 my-4">
          <BsBagCheckFill size={30}/>
        </p>
        <h2 className="text-3xl font-semibold mb-1">Thank you for your order!</h2>
        <p className=" font-semibold mb-4">Check your email inbox for the receipt.</p>
        <p className="flex text-sm">
          If you have any questions, please email
          <a className=" ml-2 text-red-500 font-semibold" href="mailto:order@example.com">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="mt-8 bg-red-500 text-white rounded-full py-2 w-[300px] font-semibold text-lg">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success