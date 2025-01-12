import Image from 'next/image'
import styles from './ExtendedProduct.module.css'
import Placeholder from '../../../public/placeholder.svg'
import BoughtLabel from '../boughtLabel/BoughtLabel'
import Link from 'next/link'

export default function ExtendedProduct({product}){
    
    const {name, description, bought, picture, links } = product

    return <div style={{border: bought ? 'solid 5px #3083FF' : 'none'}} className={styles.extendedContainer}>
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
                    {links.length>0 && (
                    <div style={{display: 'flex', flexDirection:'column', gap: '16px', width: '100%', marginTop: 10}}>
                        {links.map((link) => (
                            <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                                <Link href={link.url}><h2 className={styles.subtitle}>{link.store}</h2></Link>
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