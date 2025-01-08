import productUtils from "@/utils/productUtils";
import Image from "next/image";
import Placeholder from '../../../public/placeholder.svg'
import Link from "next/link";
import styles from './StoreLink.module.css'

export default async function StoreLink({link, ...rest}){
    //TO-DO: fix broken path images to assure they dont break product card
    const data = await productUtils.extractDataFromLink(link)

    const formattedTitle = data?.title.length>25 ? data?.title.substring(0, 25)+'...' : data?.title

    if(!data) return <Link href={link} className={styles.fallback}>{link.substring(0, 30)+'...'}</Link>
    else return <Link href={link} className={styles.storeLinkContainer} {...rest}>
        <div className={styles.storeLinkImage}>
        {data?.imageUrl && 
            <Image src={data.imageUrl || Placeholder} width={30} height={30} alt='imagem da loja'/>
        }
        </div>
        <div className={styles.storeLinkText}>
            {data?.title && <p>{formattedTitle}</p>}
            {data?.domain && <p>{data.domain}</p>}
        </div>
    </Link>
}