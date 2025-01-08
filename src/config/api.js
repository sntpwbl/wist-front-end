import axios from "axios"

const baseURL = process.env.API

const api = axios.create({
    baseURL, 
})

export const reqs = {
    findAllProducts: () => api.get('/find-all'),
    findProductById: (id) => api.get(`/${id}`),
    createProduct: (product) => api.post(`/create`, product),
    updateProduct: (id, product) => api.update(`/update/${id}`, product),
    deleteProduct: (id) => api.delete(`/delete/${id}`),
    changeProductBoughtStatus: (id, bought)=> api.patch(`/bought/${id}?bought=${bought}`)
}