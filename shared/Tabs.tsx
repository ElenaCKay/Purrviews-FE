import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useAuthentication } from "../utils/useAuthentication";
import { Button } from "react-native-elements";
import { signOut, getAuth } from "firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WelcomeScreen from "../screens/Welcome";
import UserScreen from "../screens/User";
import Map from "../screens/Map";
import UsersList from "../screens/UsersList";
import LostAndFound from "../screens/LostandFound";

const Tab = createBottomTabNavigator();

const auth = getAuth();

export default function Tabs() {
    const { user } = useAuthentication();


    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={WelcomeScreen}
                options={{
                    tabBarIcon: () => {
                        return <Image style={{ width: 45, height: 45 }} source={require("../assets/catlogo.png")} />;
                    },
                }}
            />
            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarIcon: () => {
                        return <Image style={{ width: 65, height: 65 }} source={require("../assets/map.png")} />;
                    },
                }}
            />
            <Tab.Screen
                name="Lost & Found"
                component={LostAndFound}
                options={{
                    tabBarIcon: () => {
                        return <Image style={{ width: 40, height: 40 }} source={require("../assets/landf.png")} />;
                    },
                }}
            />
            <Tab.Screen
                name="Users"
                component={UsersList}
                options={{
                    tabBarIcon: () => {
                        return (
                            <Image style={{ width: 40, height: 40 }} source={require("../assets/play-with-pet.png")} />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="My Profile"
                component={UserScreen}
                options={{
                    tabBarIcon: () => {
                        return <Image style={{ width: 40, height: 40 }} source={require("../assets/user.png")} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
}
