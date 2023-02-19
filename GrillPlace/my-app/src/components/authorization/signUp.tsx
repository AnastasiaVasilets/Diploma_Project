import { useDispatch } from "react-redux";
import Form from "./form";
import {useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from "../../redux/slices/userSlice";

const SignUp:React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const hangleRegister = (email:string, password:string) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken
                }))
                navigate('/');
            })
            .catch(console.error)
        }
        return (
            <Form 
                title='Sign up'
                handleClick={hangleRegister}/>
        )
    
}

export default SignUp