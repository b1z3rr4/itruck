import { Category } from '@/components/category';
import { Header } from '@/components/header';
import { View, FlatList } from 'react-native';
import { CATEGORIES } from "@/utils/data/products";
import { useState } from 'react';

export default function Home() {
    const [categorySelected, setCatergorySelected] = useState(CATEGORIES[0]);

    const handleCategorySelected = (category: string) => {
        setCatergorySelected(category);
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Faça seu pedido" itemsQuantity={2} />
            <FlatList 
                data={CATEGORIES}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Category 
                        title={item} 
                        isSelected={categorySelected === item} 
                        onPress={() => handleCategorySelected(item)}
                    />
                )}
                horizontal
                className='max-h-10 mt-5'
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}
