// src/app/login/page.tsx

import LoginForm from "@/app/(pages)/login/LoginForm";
import styles from './login.module.css'

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <LoginForm />
        </div>
    )
}
