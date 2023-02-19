import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, CartItem } from "../../../redux/slices/cartSlice";

import styles from './card.module.css'

const typeNames = ['eat here', 'take away']

type CardProps = {
    id: string;
    title: string;
    price: number;
    img: string;
    souce: number[];
    type: number[]
}

const Card: React.FC<CardProps> = ( { id, title, price, img, souce, type } ) => {
    const dispatch = useDispatch();
    const cartItem = useSelector((state:any) => state.cart.items.find((obj:any) => obj.id === id))
    const [activeType, setActiveType] = React.useState(0);
    const [activeSouce, setActiveSouce] = React.useState(0);
    
    const addCount = cartItem ? cartItem.count : 0;
    

    const onClickAdd = () => {
        const item: CartItem = {
            id,
            title,
            price,
            img,
            type: typeNames[activeType],
            souce: souce[activeSouce],
            count: 0
        };
        
        dispatch(addItem(item))
    }

    return (
        <div className={styles.dish_block}>
            <Link to={`/dishes/${id}`}><div className={styles.img_wrap}>
              <img
                className={styles.dish_block__image}
                src={img}
                alt="dish"
              />
            </div>
            <h4 className={styles.dish_block__title}>{title}</h4></ Link>
            <div className={styles.dish_block__selector}>
                <ul>
                    {
                        type.map((typeId) => (
                            <li 
                            key={typeId}
                            onClick = {() => setActiveType(typeId)} 
                            className={activeType === typeId ? styles.active : ''}>
                            {typeNames[typeId]}
                            </li>))
                    }
                </ul>
                <ul>
                    {
                        souce.map((souce, i) => (
                            <li 
                            key={souce}
                            onClick = {() => setActiveSouce(i)} 
                            className={activeSouce === i ? styles.active : ''}>
                            {souce} souce
                             </li>))
                    }
                </ul>
            </div>
            <div className={styles.dish_block__bottom}>
                <div className={styles.dish_block__price}>from {price}$</div>
                <button 
                    className={(styles.button, styles.button_outline, styles.button_add)}
                    onClick={onClickAdd}>
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"
                        />
                    </svg>
                    <span>Add</span>
                    {addCount > 0 && <i>{addCount}</i>}
                </button>
            </div>
        </div>
    )
}

export default Card