import styles from "./page.module.css";
import Product from "@/components/product/Product";
import productUtils from "@/utils/productUtils";

export default async function Home() {
  const products = await productUtils.findAllProducts()
  
  if (!products || products.length === 0) {
    return <p>Nenhum produto encontrado.</p>;
  }
  
  return (
      <div className={styles.listContainer}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    );
}
