import useGetLostCats from "../utils/hooks/useGetLostCats";
import React, { useCallback, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    NativeScrollEvent,
} from "react-native";
import { Card } from "@rneui/themed";

export default function LostAndFound() {
    const { lostCats, isLoading, isError } = useGetLostCats();

    if (isError) {
        <Text>There has been an error!</Text>;
    }

    return isLoading ? (
        <View>
            <Text>Loading...</Text>
        </View>
    ) : (
        <ScrollView tw="bg-[#e9d2b0]">
            <Text className=" text-3xl font-bold m-3  text-center">Lost and Found</Text>
            {lostCats.map((user) => (
                <Card key={user._id}>
                    <TouchableOpacity>
                        <Image source={{ uri: user.cats[0].cat_img }} tw="w-60 h-60 rounded mx-auto" />
                    </TouchableOpacity>
                    <Text tw="font-bold text-center">Owner: {user.username}</Text>
                    <Text tw="font-semibold text-center">Lost cat: {user.cats[0].cat_name}</Text>
                    <Text tw="font-semibold text-center">
                        Characteristics: {user.cats[0].characteristics[0]}, {user.cats[0].characteristics[1]}
                    </Text>
                    <Button title="Chat" color="#d7945f" />
                </Card>
            ))}
        </ScrollView>
    );
}
