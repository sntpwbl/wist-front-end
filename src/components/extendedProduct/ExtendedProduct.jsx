import Image from 'next/image'
import styles from './ExtendedProduct.module.css'
import Placeholder from '../../../public/placeholder.svg'
import BoughtLabel from '../boughtLabel/BoughtLabel'
import StoreLink from '../storeLink/StoreLink'

export default function ExtendedProduct({product}){
    
    const {name, description, boughtProduct, picture, firstStore, secondStore, thirdStore, firstLink, secondLink, thirdLink} = product
    
    const links = [{
            key: 0, store: firstStore, link: firstLink
        },
        {
            key: 1, store: secondStore, link: secondLink
        },
        {
            key: 2, store: thirdStore, link: thirdLink
        },
    ]

    return <div style={{border: boughtProduct ? 'solid 5px #3083FF' : 'none'}} className={styles.extendedContainer}>
        {/* <p style={{color: 'white', }}>oi</p> */}
        <div className={styles.imgAndProperties}>
            {picture ? (
                <img src={picture} className={styles.extendedImg} alt='product picture'/>
            ): (
                <Image src={Placeholder} alt='na' className={styles.extendedImg} />
            )}
            <div className={styles.properties}>
                <div>
                    <h1 className={styles.title}>{name}</h1>
                    {description && <p className={styles.text}>{description}</p>}
                    {links[0].store!==null && (
                    <div style={{display: 'flex', flexDirection:'column', gap: '16px', width: '100%'}}>
                        {links.map((link) => {
                            if(!link.store) return
                            else return (
                            <div key={link.key} style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                                <h2 className={styles.subtitle}>{link.store}</h2>
                                <StoreLink link={link.link}/>
                            </div>
                        )})}
                    </div>
                    )}
                </div>
                {boughtProduct && (
                    <BoughtLabel style={{marginTop: 30}}/>
                )}
            </div>
        </div>
    </div>
}