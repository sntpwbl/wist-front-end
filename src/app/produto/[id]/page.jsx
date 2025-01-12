import ExtendedProduct from "@/components/extendedProduct/ExtendedProduct"
import productUtils from "@/utils/productUtils"

export async function generateMetadata({params}){
    const {id} = await params

    const product = await productUtils.findProductById(id)
    return {
        title: `Produto ${product.name}`
    }
}

export default async function ProductById({params}){
    const {id} = await params

    const product = await productUtils.findProductById(id)
    console.log(product)
    return (
        <div className="alignCenter">
            <ExtendedProduct product={product}/>
        </div>
    )
}