import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import useUsersList from "../utils/hooks/useUsersList";
import sans from "../tailwind.config"

export default function UsersList() {
    const { userListData, isLoading, isError } = useUsersList();
    if (isError) return <Text>Something Went Wrong!</Text>;

    return isLoading ? (
        <View>
            <Text>Loading...</Text>
        </View>
    ) : (
        <ScrollView tw="bg-[#e9d2b0]">
            {userListData.map((user) => (
                <View tw="justify-center items-center">
                    <TouchableOpacity>
                        <Text style={{ width: 200, height: 300 } } >
                            <Image source={{ uri: user.avatar }} style={{ width: 200, height: 200 }}></Image>
                        </Text>
                    </TouchableOpacity>
                    <Text tw="font-bold">{user.username}</Text>
                    <Text tw="font-semibold">{user.description}</Text>
                    <Button
                        //   onPress={onPressLearnMore}
                        title="Chat"
                        color="#d7945f"
                        accessibilityLabel={`Click this button to chat with ${user.username}`}
                    />
                </View>
            ))}
        </ScrollView>
    );
}
