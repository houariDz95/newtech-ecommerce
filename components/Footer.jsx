import React from 'react'
import { AiOutlineTwitter, AiFillInstagram} from 'react-icons/ai';
const styles = {
  footerContainer: `w-full p-4 flex items-center justify-center text-lg text-[#324d67] font-semibold flex-col mt-5 `,
  icons: `flex items-center my-3 gap-3`,
}
const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <p>2022 EDD NewTech All rights</p>
      <p className={styles.icons}>
        <AiFillInstagram size={27}/>
        <AiOutlineTwitter size={27} />
      </p>
    </div>
  )
}

export default Footer