'use client'
import styles from './StoreLink.module.css'

export default function StoreLink({storeValue, urlValue, onStoreChange, onUrlChange, ...rest}){
    return <div style={{display: 'flex', flexDirection: 'row', gap: 5}} {...rest}>
        <input type="text" placeholder='Loja' value={storeValue} className={styles.inputStore} onChange={onStoreChange}/>
        <input type="text" placeholder='URL do produto' value={urlValue} className={styles.inputUrl} onChange={onUrlChange}/>
    </div>
}