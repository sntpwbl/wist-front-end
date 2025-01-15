import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_API

const api = axios.create({
    baseURL, 
})

export const reqs = {
    findAllProducts: () => api.get('/find-all'),
    findProductById: (id) => api.get(`/${id}`),
    createProduct: (product) => api.post('/create', {
        name: product.name,
        description: product.description,
        picture: product.picture,
        links: product.links
    }),
    updateProduct: (id, product) => api.put(`/update/${id}`, {
        name: product.name,
        description: product.description,
        picture: product.picture,
        links: product.links
    }),
    deleteProduct: (id) => api.delete(`/delete/${id}`),
    changeProductBoughtStatus: (id, status)=> api.patch(`/${id}/${status}`)
}