'use client'
import Image from 'next/image'
import styledContainer from '../extendedProduct/ExtendedProduct.module.css'
import styles from './InputProduct.module.css'
import Placeholder from '../../../public/placeholder.svg'
import productUtils from '@/utils/productUtils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import StoreLink from '../storeLink/StoreLink'
import {AddStoreLink, RemoveStoreLink} from '../storeLinkButton/StoreLinkButton'

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
        numberOfLinks: event?.links?.length || 0
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
    
    useEffect(()=>{
        if(type==='criar'){
            setEvent({
                name: '',
                description: '',
                picture: '',
                bought: false,
                links: []
            })
            setMisc({
                nameInput: true,
                numberOfLinks: 0
            })
        }
    }, [type])
    useEffect(() => {

        const fetchProduct = async () => {
            if (type === 'atualizar') {
                const product = await productUtils.findProductById(id);
                if (product?.name) {
                    setEvent(product);
                    setMisc({...misc, numberOfLinks: product.links.length})
                }
            }
        };
    
        fetchProduct();
    }, [type, id]);

    const handleAddLink = () =>{
        if(misc.numberOfLinks<3){
            setMisc({...misc, numberOfLinks: misc.numberOfLinks+1})
        }
    }
    const handleRemoveLink = () =>{
        if(misc.numberOfLinks>0){
            const updatedLinks = [...event.links];
            updatedLinks.splice((misc.numberOfLinks-1), 1); 
            setEvent({ ...event, links: updatedLinks });
            setMisc({ ...misc, numberOfLinks: misc.numberOfLinks - 1 });
        }
    }

    const handleStoreChange = (index, updatedStore)=>{
        const updatedLinks = [...event.links]
        updatedLinks[index] = {
          ...updatedLinks[index],
          store: updatedStore,
        };
        setEvent({ ...event, links: updatedLinks })
    }
    const handleUrlChange = (index, updatedUrl)=>{
        const updatedLinks = [...event.links]
        updatedLinks[index] = {
          ...updatedLinks[index],
          url: updatedUrl,
        };
        setEvent({ ...event, links: updatedLinks })
    }

    return(
       <form className={styledContainer.extendedContainer}>
            <div className={styledContainer.imgAndProperties}>
                <label className={styles.labelImage} htmlFor='input-picture'>
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
                    <div style={{display: 'flex', flexDirection: 'row', gap: 10, alignSelf: 'center'}}>
                        <AddStoreLink onClick={handleAddLink}/>
                        {misc.numberOfLinks>0 && <RemoveStoreLink onClick={handleRemoveLink}/>}
                    </div>
                    {misc.numberOfLinks > 0 && 
                        Array.from({ length: misc.numberOfLinks }).map((_, i) => (
                            <StoreLink key={i} storeValue={event?.links[i]?.store} urlValue={event?.links[i]?.url} onStoreChange={(e)=>handleStoreChange(i, e.target.value)} onUrlChange={(e)=>handleUrlChange(i, e.target.value)}/>
                        ))}
                    <input type='submit' value={type==='criar' ? 'Cadastrar produto' : 'Atualizar produto'}  className={styles.inputButton} onClick={(e)=>handleSubmit(e)}/>
                </div>
            </div>
       </form> 
    )
}