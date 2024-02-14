import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link";
import { Product } from "@/components/product";
import { ProductCardProps, useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { Feather } from "@expo/vector-icons";
import { Text, View, ScrollView, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Cart() {
    const { products, remove } = useCartStore();

    const total = formatCurrency(products.reduce((acc, curr) => acc += curr.price * curr.quantity, 0.0));

    const handleProductRemove = (product: ProductCardProps) => {
        Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`,
        [
            { text: 'Cancelar'},
            { text: 'Remover', onPress: () => remove(product)}
        ])
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho" />
            <KeyboardAwareScrollView>
                <ScrollView>
                    <View className="p-5 flex-1">
                    {
                        products?.length > 0 ? 
                        (
                            <View className="border-b border-slate-700">
                                {products.map((product) => (
                                    <Product 
                                        data={product} 
                                        key={product.id} 
                                        onPress={() => handleProductRemove(product)}
                                    />
                                ))}
                            </View>
                        )
                        :
                        (
                            <Text className="font-body text-slate-400 text-center my-8">
                                Seu carrinho esta vazio!
                            </Text>
                        )
                    }
                    <View className="flex-row gap-2 items-center mt-5 mb-4">
                        <Text className="text-white text-xl font-subtitle">Total:</Text>
                        <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
                    </View>
                    <Input placeholder="Informe o endereço de entrega"/>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>

            <View className="p-5 gap-5">
                <Button>
                    <Button.Text>Enviar pedido!</Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                </Button>

                <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
        </View>
    );
}