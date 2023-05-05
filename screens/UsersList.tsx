import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity } from "react-native";
import useUsersList from "../utils/hooks/useUsersList";
import { Card } from "@rneui/themed";

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
                <Card key={user.user_id}>
                    <TouchableOpacity>
                        <Image source={{ uri: user.avatar }} tw="w-60 h-60 rounded mx-auto" />
                    </TouchableOpacity>
                    <Text tw="font-bold text-center">{user.username}</Text>
                    <Text tw="font-semibold text-center">{user.description}</Text>
                    <Button
                        //   onPress={onPressLearnMore}
                        title="Chat"
                        color="#d7945f"
                        accessibilityLabel={`Click this button to chat with ${user.username}`}
                    />
                </Card>
            ))}
        </ScrollView>
    );
}
