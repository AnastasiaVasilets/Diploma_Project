import { useDispatch } from "react-redux";
import { addItem, CartItem, minusItem, removeItem } from "../../redux/slices/cartSlice";
import { FiPlus, FiMinus } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai'


import styles from '../../pages/cart/cart.module.css';

type CartItemProps = {
    id: string;
    title: string;
    type: string;
    souce: string;
    price: number;
    count: number;
    img: string
}

const CartItemBlock: React.FC<CartItemProps> = ({ id, title, type, souce, price, count, img}) => {
    const dispatch = useDispatch();
    const onClickPlus = () => {
        dispatch(addItem({id} as CartItem))
    }
    const onClickMinus = () => {
        dispatch(minusItem(id))
    }
    const onClickRemove = () => {
        dispatch(removeItem(id))
    }

    return(
        <div className={styles.cart__item}>
                <div className={styles.cart__item_img}>
                    <img
                    src={img}
                    alt="Dish"
                    />
                </div>
                <div className={styles.cart__item_info}>
                    <h3>{title}</h3>
                    <p> {type}, {souce} souce</p>
                </div>
                <div className={styles.cart__item_count}>
                    <button 
                        className={styles.cart__item_count_minus}
                        disabled={count===0}
                        onClick={onClickMinus}>
                        <FiMinus/>
                    </button>
                    <b>{count}</b>
                    <button 
                        className={styles.cart__item_count_plus}
                        onClick={onClickPlus}>
                        <FiPlus />
                    </button>
                </div>
                <div className={styles.cart__item_price}>
                    <b>{price * count} $</b>
                </div>
                <div className={styles.cart__item_remove}>
                    <div 
                        className={styles.button__circle}
                        onClick={onClickRemove}>
                        <AiOutlineCloseCircle/>
                    </div>
                </div>
            </div>
    )
}

export default CartItemBlock