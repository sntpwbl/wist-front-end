'use client'
import styles from './StoreLinkButton.module.css'

export function AddStoreLink({...rest}){
    return <div className={styles.container} {...rest}>
            +
        </div>
}
export function RemoveStoreLink({...rest}){
    return <div className={styles.container} {...rest}>
            -
        </div>
}