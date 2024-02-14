import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import * as cartInMemory from './helpers/cartInMemory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ProductCardProps = ProductProps & {
    quantity: number;
};

type StateProps = {
    products: ProductCardProps[];
    add: (product: ProductProps) => void;
    remove: (product: ProductCardProps) => void;
}

export const useCartStore = create(
    persist<StateProps>(
        (set) => ({
            products: [],

            add: (product: ProductProps) => set((state) => ({
                products: cartInMemory.add(state.products, product),
            })),
        
            remove: (product: ProductCardProps) => set((state) => ({
                products: cartInMemory.remove(state.products, product),
            })),
        }), {
            name: 'itruck-cart',
            storage: createJSONStorage(() =>  AsyncStorage),
        }
    )
)
