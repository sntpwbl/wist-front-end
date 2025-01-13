'use client'
import Image from 'next/image'
import styledContainer from '../extendedProduct/ExtendedProduct.module.css'
import styles from './InputProduct.module.css'
import Placeholder from '../../../public/placeholder.svg'
import productUtils from '@/utils/productUtils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import StoreLink from '../storeLink/StoreLink'

export default function InputProduct({type, id}){
    const router = useRouter() 

    const [event, setEvent] = useState({
        name: '',
        description: '',
        picture: '',
        bought: false,
        links: []
    })

    const [misc, setMisc] = useState({
        nameInput: true,
        numberOfLinks: 3
    })
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!event.name){
            setMisc({...misc, nameInput: false})
            return
        }
        if(type==='criar'){
            const product = await productUtils.createProduct(event)
            if(product.name){
                alert('Produto cadastrado com sucesso.')
                router.push('/')
            } else{
                alert('Falha ao cadastrar produto.')
            }
        } else if(type==='atualizar' && id){
            const product = await productUtils.updateProduct(id, event)
            if(product.name){
                alert('Produto atualizado com sucesso.')
                router.push(`/produto/${id}`)
            }else{
                alert('Falha ao atualizar o produto.')
            }
        } else router.push('/')
    }
    

    useEffect(() => {

        const fetchProduct = async () => {
            if (type === 'atualizar') {
                const product = await productUtils.findProductById(id);
                if (product?.name) {
                    setEvent(product);
                }
            }
        };
    
        fetchProduct();
    }, [type, id]);


    return(
       <form className={styledContainer.extendedContainer}>
            <div className={styledContainer.imgAndProperties}>
                <label className={styles.labelImage} htmlFor='input-image'>
                    {event.picture ? (
                        <img src={event.picture} alt='product preview' className={styledContainer.extendedImg}/>
                    ) : (
                        <Image src={Placeholder} alt='preview placeholder' className={styledContainer.extendedImg}/>
                    )}
                </label>
                <div className={styles.properties}>
                    <input type='text' id='input-name' placeholder={event.name || 'Adicione um nome para o produto...'} value={event.name} required style={{border: misc.nameInput ? 'none' : '5px solid red'}} className={styles.inputBox} onChange={(e)=>setEvent({...event, name: e.target.value})}/>
                    <textarea id='input-description' maxLength={240} value={event.description} placeholder={'Adicione uma descrição para o produto...'} onChange={(e)=>setEvent({...event, description: e.target.value})} />
                    <input type='text' id='input-picture' placeholder={event.picture || 'Adicione a URL da foto que deseja enviar...'} value={event.picture} className={styles.inputBox} onChange={(e)=>setEvent({...event, picture: e.target.value})}/>
                    {/* <StoreLink storeValue={event?.links[0]?.store} onStoreChange={()=>setEvent({...event, links})}/>
                    <StoreLink />
                    <StoreLink /> */}
                    <input type='submit' value={type==='criar' ? 'Cadastrar produto' : 'Atualizar produto'} className={styles.inputButton} onClick={(e)=>handleSubmit(e)}/>
                </div>
            </div>
       </form> 
    )
}