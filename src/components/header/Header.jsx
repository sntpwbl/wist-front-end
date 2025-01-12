import Link from 'next/link'
import styles from './header.module.css'

export default function Header(){
    return <div className={styles.container}>
        <Link href='/' className={styles.headerButton}>Wist</Link>
        <nav className={styles.buttonContainer}>
            <Link href='/produto?type=criar' className={styles.headerButton}>Novo produto</Link>
        </nav>
    </div>
}