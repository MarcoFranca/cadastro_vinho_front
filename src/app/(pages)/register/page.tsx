'use client';

import RegisterForm from "@/app/(pages)/register/RegisterForm";
import styles from './register.module.css'

export default function Register() {
   return(
       <main className={styles.container}>
           <RegisterForm />
       </main>
   );
}
