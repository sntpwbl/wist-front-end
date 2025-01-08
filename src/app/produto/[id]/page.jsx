import ExtendedProduct from "@/components/extendedProduct/ExtendedProduct"
import productUtils from "@/utils/productUtils"

export async function generateMetadata({params}){
    const {id} = await params

    const product = await productUtils.findProductById(id)
    return {
        title: product.name
    }
}

export default async function ProductById({params}){
    const {id} = await params

    const product = await productUtils.findProductById(id)
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ExtendedProduct product={product}/>
        </div>
    )
}