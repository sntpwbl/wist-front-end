'use client'
import styles from "./page.module.css";
import Product from "@/components/product/Product";
import productUtils from "@/utils/productUtils";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([])
  useEffect(()=>{
    const fetchProducts = async()=>{
      const prodList = await productUtils.findAllProducts()
      if(prodList.length!=0) setProducts(prodList)
      else setProducts()
    }
    fetchProducts()
  }, [])

  return (
      <div className={products && products.length===0 || !products ? 'alignCenter' : styles.listContainer}>
        {
        products && products.length>0 ? products.map((product) => (
          <Product key={product.id} product={product} />
        )) : 
        products && products.length===0 ? <p>Carregando...</p>
        :
        <p>Nenhum produto encontrado.</p>}
      </div>
    );
}
