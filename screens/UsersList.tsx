import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import useUsersList from "../utils/hooks/useUsersList";
import { Card } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";

export default function UsersList({ navigation }) {
    const [userProfileUsername, setUserProfileUsername] = useState("");
    const { userListData, isLoading, isError } = useUsersList();
    if (isError) return <Text>Something Went Wrong!</Text>;

    const onPressFunction = (username) => {
        setUserProfileUsername(username);
        navigation.navigate("User Profile", { username: username });
    };

    return isLoading ? (
        <View>
            <Text>Loading...</Text>
        </View>
    ) : (
        <ScrollView tw="bg-orange-200">
            <Text
                tw="text-3xl m-3 mt-10 text-center pt-6 text-purple-900 text-5xl underline text-center"
                style={{ fontFamily: "Pacifico-Regular" }}
            >
                Users
            </Text>
            {userListData.map((user) => (
                <View key={user._id} tw="self-center w-5/6 bg-[#d7945f] m-3 border-4 border-[#876243] rounded-md">
                    <TouchableOpacity tw="pt-4 pb-2 bg-[#876243]" onPress={() => onPressFunction(user.username)}>
                        <Image source={{ uri: user.avatar }} tw="border-2 w-60 h-60 rounded mx-auto" />
                    </TouchableOpacity>
                    <Text tw="basis-1/2 text-xl text-orange-200 font-semibold text-center">{user.username}</Text>
                    <Text tw="basis-1/2 text-xl font-semibold text-orange-200  text-center">{user.description}</Text>
                    <TouchableOpacity
                        tw="self-center w-3/6 m-2 h-10 bg-white rounded-md items-center justify-center bg-yellow-500 border-2"
                        style={{ elevation: 6 }}
                    >
                        <Text tw="text-xl">Contact User</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}
