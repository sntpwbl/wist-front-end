import { reqs } from "@/config/api"

const findAllProducts = async()=>{
    try {
        const products = await reqs.findAllProducts()
        return products.data
    } catch (error) {
        console.error(error)
        return []
    }
}
const findProductById = async(id)=>{
    try {
        const product = await reqs.findProductById(id)
        return product.data
    } catch (error) {
        console.error(error)
        return {}
    }
}
const createProduct = async(product) => {
    try {
        const res = await reqs.createProduct(product)
        if(res.data) return res.data
    } catch (error) {
        console.error(error)
        return {}
    }
}
const updateProduct = async(id, product)=>{
    try {
        const updatedProduct = await reqs.updateProduct(id, product)
        return updatedProduct.data
    } catch (error) {
        console.error(error)
        return {}
    }
}
const deleteProduct = async(id)=>{
    try {
        await reqs.deleteProduct(id)
        return 204
    } catch (error) {
        console.error(error)
        return {}
    }
}
const changeProductBoughtStatus = async(id, bought)=>{
    try {
        const res = await reqs.changeProductBoughtStatus(id, bought)
        return res.data
    } catch (error) {
        console.error(error)
        return {}
    }
}


const productUtils = { findAllProducts, findProductById, createProduct, updateProduct, deleteProduct, changeProductBoughtStatus }
export default productUtils
 