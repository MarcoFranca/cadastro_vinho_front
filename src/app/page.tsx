import Image from "next/image";
import styles from "./page.module.css";
import HeroImg from "../../public/assets/hero.png";
import Link from "next/link";
import ClientLayout from "@/app/client-layout";

export default function Home() {
    return (
        <ClientLayout>
            <main className={styles.main}>
                <div className={styles.hero}>
                    <Image
                        className={styles.heroImg}
                        alt={"imagem estilo cartoon representando pessoas em um estoque de vinhos"}
                        src={HeroImg}
                        priority
                    />
                    <div className={styles.heroContent}>
                        <h1>Software feito para organizar o seu estoque e as suas vendas de vinhos</h1>
                        <Link href={"/register"} > Cadastre-se agora!</Link>
                    </div>
                </div>

            </main>
        </ClientLayout>
    );
}
