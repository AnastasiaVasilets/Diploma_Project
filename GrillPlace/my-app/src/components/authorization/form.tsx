import { useState } from "react";
import styles from './authorization.module.css'

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
}

const Form: React.FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className={styles.authorization}>
      <div className={styles.login}>
        <label className={styles.email_label}>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='email'/>
      </div>
      <div className={styles.password}>
        <label className={styles.password_label}>Password</label>
        <input
          type='password'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder='password'/>
      </div>
      <button
        onClick={() => handleClick(email, pass)}
        className={styles.btn}>
          {title}
      </button>
    </div>
  )
}

export default Form