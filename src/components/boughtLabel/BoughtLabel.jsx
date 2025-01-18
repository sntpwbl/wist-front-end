'use client'
import productUtils from '@/utils/productUtils'
import styles from './BoughtLabel.module.css'
export function BoughtLabel({id, extended, onClick, ...rest}){
    const handleMarkProductAsNotBought = async()=>{
        if(extended){
            await productUtils.changeProductBoughtStatus(id, false)
            onClick(false)
        } 
    }
    return <div className={styles.boughtContainer} {...rest} onClick={handleMarkProductAsNotBought}>
            <p>Comprado</p>
        </div>
}

export function NotBoughtLabel({id, extended, onClick, ...rest}){

    const handleMarkProductAsBought = async()=>{
        if(extended){
            await productUtils.changeProductBoughtStatus(id, true)
            onClick(true)
        } 
    }

    return <div className={styles.notBoughtContainer} {...rest} onClick={handleMarkProductAsBought}>
            Marcar como comprado
        </div>
}