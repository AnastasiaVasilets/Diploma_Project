import LogIn from "../../components/authorization/logIn"
import { Link } from "react-router-dom"
import { useAuth } from "../../utils/useAuth"
import { removeUser } from "../../redux/slices/userSlice"
import { useDispatch } from "react-redux"
import styles from '../../components/authorization/authorization.module.css'

const Authorization:React.FC = () => {
    const dispatch = useDispatch();
    const { isAuth, email } = useAuth()
    return isAuth ? (
        <div className={styles.container_up}>
            <div className={styles.welcome}>Welcome, <span className={styles.name}>{email}</span></div>
            <button onClick={() => dispatch(removeUser())} className={styles.log_out}>
                Log out
            </button>
        </div>
    ) : (
        <div className={styles.container}>
            <div>
                <h2 className={styles.title}>Log in</h2>
            </div>
            <div className={styles.form}>
                <LogIn />
            </div>
            <div className={styles.sign_up_wrap}>Don't have an account? <Link to='/sign_up' className={styles.sign_up}>Sign up</Link></div>
        </div>
    )
}

export default Authorization