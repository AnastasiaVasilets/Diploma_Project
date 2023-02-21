import React from "react";
import { useParams } from "react-router-dom"; //вытаскивает id из url и делает перерисовку
import { Link } from "react-router-dom";
import axios from "axios";
import { addItem ,CartItem } from "redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import styles from './aboutDish.module.css';

const typeNames = ['eat here', 'take away'];


const AboutDish: React.FC = () => {
    const [dish, setDish] = React.useState<{
        id: string,
        img: string;
        title: string;
        price: number;
        about: string;
        delete: [string];
        add: [string];
        types: [number];
        souce: [string]
    }>({
        id: '',
        img: '',
        title: '',
        price: 0,
        about: '',
        delete: [''],
        add: [''],
        types: [0],
        souce: ['']
    });
    const { id } = useParams();
    const dispatch = useDispatch();
    const cartItem = useSelector((state:any) => state.cart.items.find((obj:any) => obj.id === id))
    const [activeType, setActiveType] = React.useState(0);
    const [activeSouce, setActiveSouce] = React.useState(0);
    const addCount = cartItem ? cartItem.count : 0;

    const onClickAdd = () => {
        const item: CartItem = {
            id: dish.id,
            title: dish.title,
            price: dish.price,
            img: dish.img,
            type: typeNames[activeType],
            souce: dish.souce[activeSouce],
            count: 0
        };
        dispatch(addItem(item))
    }

    

    //получаем данные о блюде по его id
    React.useEffect(() => {
        async function fetchDish() {
            try {
                const { data } = await axios.get('https://63e0b25d65b57fe606478285.mockapi.io/dishes/' + id);
                setDish(data)
        } catch (error) {
            alert('Error while getting data');
        }
    }
    fetchDish();
    
    }, [])

    //если блюдо не получено
    if (!dish) {
        return <></>
    }
    //если блюдо успешно получено
    return (
        <div className={styles.wrap}>
            <h2 className={styles.title}>{dish.title}</h2>
            <div className={styles.up}>
                <div className={styles.img_wrap}>
                    <img src={dish.img}/> 
                </div>
                <div className={styles.about_block}>
                    <p className={styles.about}>{dish.about}</p>
                    <ul className={styles.delete}>Remove from your dish: 
                        {
                            dish.delete.map((product) => ( // перебор и вывод элементов массива продуктов, которые можно исключить из блюда
                                <li>{product}</li>
                            ))
                        }
                    </ul>
                    <ul className={styles.add}>Add to your dish: 
                        {
                            dish.add.map((product) => ( // перебор и вывод элементов массива продуктов, которые можно добавить в блюдо
                                <li>{product}</li>
                            ))
                        }
                    </ul>
                    <div className={styles.dish_block__selector}>
                    <ul>
                        {
                        dish.types.map((typeId) => (
                            <li 
                            key={typeId}
                            onClick = {() => setActiveType(typeId)} 
                            className={activeType === typeId ? styles.active : ''}>
                                {typeNames[typeId]}</li>
                            ))
                        }
                    </ul>
                    <ul>
                        {
                        dish.souce.map((souce, i) => (
                            <li
                            key={souce}
                            onClick = {() => setActiveSouce(i)} 
                            className={activeSouce === i ? styles.active : ''}>
                                {souce} souce</li>))
                        }
                    </ul>
                    </div>
                </div>
            </div>
            <div className={styles.down}>
                <p className={styles.price}>Price: {dish.price}$</p>
                <div className={styles.btns}>
                    <Link to='/'><button className={styles.back_btn}>
                        &lt; Back
                    </button>
                    </Link>
                    <button 
                            className={styles.add_btn}
                            onClick={onClickAdd}
                            >
                            Add {addCount > 0 && <b>{addCount}</b>}
                        </button>
                </div>
            </div>
        </div>
    )
}

export default AboutDish
