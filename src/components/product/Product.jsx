import Image from 'next/image'
import styles from './product.module.css'
import Link from 'next/link'
import Placeholder from '../../../public/placeholder.svg'
import {BoughtLabel} from '../boughtLabel/BoughtLabel'

export default function Product({product, ...rest}){
    const formattedDescription = !product.description || product.description?.length==0 ? '' : product.description.length >= 80 ? product.description.substring(0, 80)+'...' : product.description
    const formattedName = product.name.length>=15 ? product.name.substring(0, 15).trimRight()+'...' : product.name

    return <Link href={`/produto/${product.id}`} {...rest}>
                <div style={{border: product.bought ? 'solid 5px #3083FF' : 'none', padding: product.bought ? 15 : 20}} className={styles.productContainer}>
                    <div>
                        {product.picture ? (
                            <img src={product.picture} className={styles.productImage}/>
                        ) :(
                            <Image src={Placeholder} className={styles.productImage}/>
                        )}
                        <p className={styles.productSubtitle}>{formattedName}</p>
                        <p className={styles.productDescription}>{formattedDescription}</p>
                    </div>
                    {product.bought && (
                        <BoughtLabel />
                    )}
                </div>
        </Link>
}