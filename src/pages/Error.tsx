import React from 'react'
import { TbError404 } from "react-icons/tb";
import { useLocation, Link } from 'react-router-dom';

import styles from "../styles/pages/error.module.scss";


const Error:React.FC = () => {
    const {pathname}=useLocation()

  return (
    <div className={styles.error}>
        <div className={styles.content}>
            <TbError404 className={styles.icon}/>
            <div className={styles.message}>
                <p>Page not found in the following path: <span>{pathname}</span></p>
                <Link to={"/"}>Home</Link>
            </div>
        </div>
    </div>
  )
}

export default Error