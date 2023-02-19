import SignUp from "../../components/authorization/signUp"
import styles from '../../components/authorization/authorization.module.css'
import { Link } from "react-router-dom"

const SignUpPage:React.FC = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Registration</h2>
            <div className={styles.form}>
            <SignUp />
            </div>
            <div className={styles.sign_up_wrap}>Already have an account? <Link to='/log_in' className={styles.sign_up}>Log in</Link></div>
        </div>
    )
}

export default SignUpPage