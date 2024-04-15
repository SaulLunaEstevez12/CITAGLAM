import styles from './home.module.css';
import Link from 'next/link';

export default function page () {
    return (
        <body className={styles.body}>
        <div className={styles.logincontainer}>
        <form className={styles.loginform}>
            <div className={styles.logocontainer}>
            <img src="/bigote.png" alt="Logo" className={styles.logo}/>
            <div className={styles.logintext}>LOGIN  </div>
            </div>
            <div className={styles.inputgroup}>
            <input type="email" id="email" placeholder="Correo" required className={styles.input}/>
            </div>
            <div className={styles.inputgroup}>
            <input type="password" id="password" placeholder="Contraseña" required className={styles.input}/>
            </div>
            <div className={styles.loginactions}>
            <button type="submit" className={styles.btnlogin}>Comenzar</button>
            </div>
            <a href="recuperacioncontraseña" className={styles.forgotpassword}>¿Olvidaste Tu Contraseña?</a>
        </form>
        </div>
        </body>
    )
}