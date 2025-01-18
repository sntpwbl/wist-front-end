import DeleteButton from "@/components/deleteButton/DeleteButton";
import Product from "@/components/product/Product";
import productUtils from "@/utils/productUtils";

export default async function DeleteProductPage({params}){
    const {id} = await params
    const product = await productUtils.findProductById(id)
    return <div className="alignCenter">
        <Product product={product}/>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',  marginTop: 20}}>
            <h1>Excluir produto</h1>
            <p>Tem certeza que deseja excluir esse produto? Essa ação não pode ser desfeita.</p>
            <DeleteButton id={id} style={{marginTop: 20}}/>
        </div>
    </div>
}