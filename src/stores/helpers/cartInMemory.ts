import { ProductProps } from "@/utils/data/products";
import { ProductCardProps } from "../cartStore";

export function add(products: ProductCardProps[], newProduct: ProductProps) {
    const existsProduct = products.find((product) => product.id === newProduct.id);

    if (existsProduct) {
        return products.map((product) => 
            existsProduct.id === product.id 
            ? { ...product, quantity: product.quantity + 1 } 
            : product
        )
    }

    return [...products, { ...newProduct, quantity: 1 }];
}

export function remove(products: ProductCardProps[], productToRemove: ProductCardProps) {
    const updatedProducts = products.map(product => product.id === productToRemove.id ?
        { 
            ...product, 
            quantity: product.quantity > 1 ? product.quantity - 1 : 0 
        } 
        : product
    );

    return updatedProducts.filter(product => product.quantity > 0);
}