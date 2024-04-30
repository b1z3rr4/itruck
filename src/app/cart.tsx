import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link";
import { Product } from "@/components/product";
import { ProductCardProps, useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Text, View, ScrollView, Alert, Linking } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const PHONE_NUMBER = "5527996848634";

export default function Cart() {
    const [address, setAddress] = useState('');
    const { products, remove, clear } = useCartStore();
    const navigation = useNavigation();

    const total = formatCurrency(products.reduce((acc, curr) => acc += curr.price * curr.quantity, 0.0));

    const handleProductRemove = (product: ProductCardProps) => {
        Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`,
        [
            { text: 'Cancelar'},
            { text: 'Remover', onPress: () => remove(product)}
        ])
    }

    const handleOrder = () => {
        if (address.trim().length === 0) {
            return Alert.alert("Pedido", "Informe os dados da entrega.");
        }

        const message = "🍔🍕✍🏻 Novo Pedido 🥤🍛🍸 \n\n" + products
            .map((product) => `\n ✅ ${product.quantity} ${product.title}`)
            .join("")
            .concat("\n\n")
            .concat(`\n 📍 Endereço: ${address}`)
            .concat(`\n 💸 Total: ${total}`);

        Linking.openURL(`https://wa.me/${PHONE_NUMBER}?text=${message}`)

        clear();
        navigation.goBack();
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
                    <Input placeholder="Informe o endereço de entrega" value={address} onChangeText={setAddress} />
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
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