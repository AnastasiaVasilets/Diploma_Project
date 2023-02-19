import React from "react";
import { useParams } from "react-router-dom"; //вытаскивает id из url и делает перерисовку
import { Link } from "react-router-dom";
import axios from "axios";

import styles from './aboutDish.module.css';

const typeNames = ['eat here', 'take away'];

const AboutDish: React.FC = () => {
    const [dish, setDish] = React.useState<{
        img: string;
        title: string;
        price: number;
        about: string;
        delete: [string];
        add: [string];
        types: [number];
        souce: [string]
    }>({
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

    if (!dish) {
        return <></>
    }
    
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
                            dish.delete.map((product) => (
                                <li>{product}</li>
                            ))
                        }
                    </ul>
                    <ul className={styles.add}>Add to your dish: 
                        {
                            dish.add.map((product) => (
                                <li>{product}</li>
                            ))
                        }
                    </ul>
                    {/* <div className={styles.dish_block__selector}>
                    <ul>
                        {
                        dish.types.map((typeId) => (
                            <li>{typeNames[typeId]}</li>
                            ))
                        }
                    </ul>
                    <ul>
                        {
                        dish.souce.map((souce) => (
                            <li>{souce} souce</li>))
                        }
                    </ul>
                    </div> */}
                </div>
            </div>
            <div className={styles.down}>
                <p className={styles.price}>Price: {dish.price}$</p>
                <div className={styles.btns}>
                    <Link to='/'><button className={styles.back_btn}>
                        &lt; Back
                    </button>
                    </Link>
                    {/* <button 
                            className={styles.add_btn}
                            >
                            Add
                        </button> */}
                </div>
            </div>
        </div>
    )
}

export default AboutDish