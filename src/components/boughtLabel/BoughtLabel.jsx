import styles from './BoughtLabel.module.css'
export default function BoughtLabel({...rest}){
    return <div className={styles.boughtContainer} {...rest}>
            <p>Comprado</p>
        </div>
}