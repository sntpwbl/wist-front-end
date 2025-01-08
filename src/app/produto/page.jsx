import InputProduct from "@/components/inputProduct/InputProduct"

export async function generateMetadata({searchParams}){
    const {type} = await searchParams
    return{
        title: type==='criar'? 'Novo produto' : 'Atualizar produto'
    }
}

export default async function UpdateOrCreateProduct({searchParams}){
    const {type} = await searchParams
    const {id} = await searchParams

    return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {type && id ? 
            (
                <InputProduct type={type} id={id}/>
            )
         : !id && type==='criar' ? (
            <InputProduct type={type}/>
         ) : <h1>Volte para a tela inicial clicando no logotipo do site.</h1>}
    </div>
}