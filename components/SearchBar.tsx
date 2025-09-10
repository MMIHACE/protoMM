import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { router } from "expo-router";
import { images } from "@/constants";

const SearchBar = () => {
    const [query, setQuery] = useState('');

    return (
        <View className="searchbar">
            <TextInput
                className="flex-1 p-5"
                placeholder="Search for pizzas, burgers..."
                value={query}
                onChangeText={setQuery}
                placeholderTextColor="#A0A0A0"
                returnKeyType="search"
            />
            <TouchableOpacity
                className="pr-5"
                onPress={() => router.setParams({ query })}
            >
                <Image
                    source={images.search}
                    className="size-6"
                    resizeMode="contain"
                    tintColor="#5D5F6D"
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;
