import React from "react";
import { Link } from 'react-router-dom'

import styles from './emptyCart.module.css'

const EmptyCart: React.FC = () => {
    return (
            <div className={styles.cart__empty}>
                <h2>Your cart is empty <span>😟</span></h2>
                <p>
                Probably you haven't put something in it<br />
                Go <Link to='/'><span className={styles.link}>main page</span></Link> to order.
                </p>
          </div>
    )
}

export default EmptyCart