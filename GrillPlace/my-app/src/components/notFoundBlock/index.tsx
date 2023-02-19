import styles from './notFoundBlock.module.css'

export const NotFoundBlock: React.FC = () => {
    return (
            <div className={styles.cart__empty}>
                <h2>Nothing found <span>😟</span></h2>
                <p>
                This page is not found<br />
                on our web-site.
                </p>
          </div>
    )
}

export default NotFoundBlock