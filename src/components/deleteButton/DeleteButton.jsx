'use client'
import { useRouter } from 'next/navigation'
import styles from './DeleteButton.module.css'
import productUtils from "@/utils/productUtils"

export default function DeleteButton({id, ...rest}){
    const router = useRouter()
    const deleteProduct = async()=>{
        const res = await productUtils.deleteProduct(id)
        if(res===204){
            alert('Produto deletado com sucesso.')
            router.push('/')
        } else alert('Falha ao deletar produto.')
    }
    return <div onClick={deleteProduct} className={styles.button} {...rest}>
        Excluir produto
    </div>
}