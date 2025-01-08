'use client'
import Image from 'next/image'
import styledContainer from '../extendedProduct/ExtendedProduct.module.css'
import styles from './InputProduct.module.css'
import Placeholder from '../../../public/placeholder.svg'
import productUtils from '@/utils/productUtils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

export default function InputProduct({type, id}){
    const router = useRouter() 

    const [event, setEvent] = useState({
        name: '',
        description: '',
        picture: '',
        boughtProduct: false,
        firstStore: '', 
        secondStore: '', 
        thirdStore: '', 
        firstLink: '', 
        secondLink: '', 
        thirdLink: ''
    })

    const [misc, setMisc] = useState({
        nameInput: true
    })
    const handleSubmit = async(e)=>{
        e.preventDefault()
        
        const res = await productUtils.createProduct(event)
        if(res.name){
            alert('Produto cadastrado com sucesso.')
            router.push('/')
        } else alert('Falha ao cadastrar produto.')
    }
    useEffect(() => {
        if (!type || !id) return
    
        const fetchProduct = async () => {
            if (type === 'atualizar') {
                try {
                    const product = await productUtils.findProductById(id);
                    if (product?.name) {
                        setEvent(product);
                    }
                } catch (error) {
                    console.error("Erro ao buscar produto:", error);
                }
            }
        };
    
        fetchProduct();
    }, [type, id]);


    return(
       <form method={type==='criar' ? 'post' : 'put'} className={styledContainer.extendedContainer}>
            <div className={styledContainer.imgAndProperties}>
                <label className={styles.labelImage} htmlFor='input-image'>
                    {event.picture ? (
                        <img src={event.picture} alt='no picture found for this product' style={{cursor: 'pointer'}}  className={styledContainer.extendedImg}/>
                    ) : (
                        <Image src={Placeholder} alt='no picture found for this product' style={{cursor: 'pointer'}} className={styledContainer.extendedImg}/>
                    )}
                </label>
                <input type='file' id='input-image' className={styles.inputImage} accept='image/*'/>
                <div className={styles.properties}>
                    <input type='text' id='input-name' placeholder={event.name || 'Adicione um nome para o produto...'} value={event.name} required onChange={(e)=>setEvent({...event, name: e.target.value})}/>
                    <textarea id='input-description' maxLength={240} placeholder={event.description || 'Adicione uma descrição para o produto...'} onChange={(e)=>setEvent({...event, description: e.target.value})} />
                    <input type='submit' value='Cadastrar produto' className={styles.inputButton} onClick={(e)=>handleSubmit(e)}/>
                </div>
            </div>
       </form> 
    )
}