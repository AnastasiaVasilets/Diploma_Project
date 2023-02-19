import styles from './categories.module.css'

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void
}

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory}) => {
  const categories = ['All', 'Meat', 'Fish', 'Hot', 'Vegetarian', 'Sets']

    return (
        <div className={styles.categories}>
              <ul>
                {categories.map((categoryName, i) => (
                  <li 
                  key={i} 
                  onClick={() => onClickCategory(i)} 
                  className={value === i ? styles.active : ''}>
                    {categoryName}
                  </li>
                ))}
              </ul>
            </div>
    )
}

export default Categories