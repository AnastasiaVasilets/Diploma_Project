import { Link } from 'react-router-dom'
import NotFoundBlock from "../../components/notFoundBlock";
import styles from './notFound.module.css'

const NotFound: React.FC = () => {
    return (
    <>
        <NotFoundBlock />
        <div className={styles.wrap}>
            <Link to="/" className={styles.button__black}>
              <span>Main page</span>
            </Link>
        </div>
    </>
    )
}

export default NotFound