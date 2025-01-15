import Image from 'next/image'
import styles from './ExtendedProduct.module.css'
import Placeholder from '../../../public/placeholder.svg'
import BoughtLabel from '../boughtLabel/BoughtLabel'
import Link from 'next/link'

export default function ExtendedProduct({product}){
    
    const {id, name, description, bought, picture, links } = product

    return <div style={{border: bought ? 'solid 5px #3083FF' : 'none'}} className={styles.extendedContainer}>
        <div className={styles.imgAndProperties}>
            {picture ? (
                <img src={picture} className={styles.extendedImg}/>
            ): (
                <Image src={Placeholder} className={styles.extendedImg} />
            )}
            <div className={styles.properties}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h1 className={styles.title}>{name}</h1>
                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                        <Link href={`/produto?type=atualizar&id=${id}`}>Atualizar</Link>
                        <Link href=''>Excluir</Link>
                    </div>
                    {description && (
                        <div style={{marginTop: 10}}>
                            <h2>Descrição</h2>
                            <p className={styles.text}>{description}</p>
                        </div>
                    )}
                    {links.length>0 && (
                    <div style={{display: 'flex', flexDirection:'column', gap: '16px', width: '100%', marginTop: 10}}>
                        {links.map((link, index) => (
                            <div key={index} style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                                <h2>Links</h2>
                                <Link href={link.url}><p style={{fontWeight: 700}}>{link.store}</p></Link>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
                {bought && (
                    <BoughtLabel style={{marginTop: 30}}/>
                )}
            </div>
        </div>
    </div>
}