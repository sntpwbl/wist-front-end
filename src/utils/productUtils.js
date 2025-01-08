import * as cheerio from 'cheerio'
import { reqs } from "@/config/api"
import axios from 'axios'

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
        return res.data
    } catch (error) {
        console.error(error)
        return {}
    }
}
const updateProduct = async(id, product)=>{
    try {
        if(!product.name) throw new Error('The \'name\' field cannot be null.')
        const updatedProduct = await reqs.updateProduct(id, product)
        if(!product.name) throw new Error('No products were found by this ID.')
        return updatedProduct.data
    } catch (error) {
        console.error(error)
        return {}
    }
}
const deleteProduct = async(id)=>{
    try {
        return (reqs.deleteProduct(id)).data
    } catch (error) {
        console.error(error)
        return {}
    }
}
const changeProductBoughtStatus = async(id, bought)=>{
    try {
        return (reqs.changeProductBoughtStatus(id, bought)).data
    } catch (error) {
        console.error(error)
        return {}
    }
}

const extractDataFromLink = async(link) =>{
    try {
        const res = await axios.get(link)
        const html = res.data
        const $ = cheerio.load(html)

        const title = $('title').text()
        const imageUrl = $('img').attr('src')
        const domain = new URL(link).hostname

        return {title, imageUrl, domain}
    } catch (error) {
        console.error(error);
        return null;
    }
}
const productUtils = { findAllProducts, findProductById, createProduct, updateProduct, deleteProduct, changeProductBoughtStatus, extractDataFromLink }
export default productUtils
 