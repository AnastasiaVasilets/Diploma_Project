import { useDispatch } from "react-redux";
import Form from "./form";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { setUser } from "../../redux/slices/userSlice";
import styles from './authorization.module.css'



const LogIn:React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const hangleLogIn = (email: string, password:string) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken
                }));
                navigate('/')
            })
            .catch(console.error)
        }
        return (
            <Form 
                title='Sign in'
                handleClick={hangleLogIn}/>
        )
    
}

export default LogIn