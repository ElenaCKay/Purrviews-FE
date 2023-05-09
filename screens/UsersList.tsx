import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import useUsersList from "../utils/hooks/useUsersList";
import { Card } from "@rneui/themed";
import { StackScreenProps } from "@react-navigation/stack";
import {useState} from 'react';

export default function UsersList({navigation}) {
    const [userProfileUsername, setUserProfileUsername] = useState("");
    const { userListData, isLoading, isError } = useUsersList();
    if (isError) return <Text>Something Went Wrong!</Text>;

    const onPressFunction = (username) => {
        setUserProfileUsername(username);
        navigation.navigate("User Profile", { username: username });
    }

    const goToChat = () => {
        navigation.navigate("Chat");
    }

    return isLoading ? (
        <View>
            <Text>Loading...</Text>
        </View>
    ) : (
        <ScrollView tw="bg-[#e9d2b0]">
             <Text className=" text-3xl font-bold m-3  text-center">Users</Text>
            {userListData.map((user) => (
                <Card key={user._id} >
                    <TouchableOpacity onPress={() => onPressFunction(user.username)}>
                        <Image source={{ uri: user.avatar }} tw="w-60 h-60 rounded mx-auto" />
                    </TouchableOpacity>
                    <Text tw="font-bold text-center">{user.username}</Text>
                    <Text tw="font-semibold text-center">{user.description}</Text>
                    <Button
                        onPress={goToChat}
                        title="Chat"
                        color="#d7945f"
                        accessibilityLabel={`Click this button to chat with ${user.username}`}
                    />
                </Card>
            ))}
        </ScrollView>
    );
}

