import { getAuth, signOut, updateProfile } from "firebase/auth";
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
import * as ImagePicker from "expo-image-picker";
import { catmarkers } from "../assets/catmarkers/catmarkers";
import useUserProfile from "../utils/hooks/useUserProfile";
import AddCat from "../components/AddCat";
// &#x25cf; - big dot

const auth = getAuth();
const { width, height } = Dimensions.get("window");

export default function UserScreen() {
    const [galleryPerm, setGalleryPerm] = useState(null);
    const [image, setImage] = useState(catmarkers[1]);
    const [active, setActive] = useState(0);
    const user = auth.currentUser;
    const username = user.displayName;
    const [addCat, setAddCat] = useState(false);
    const [apiUserInfo, setApiUserInfo] = useState({
        username: "",
        description: "",
        avatar: catmarkers[Math.floor(Math.random() * catmarkers.length)],
        cats: [],
    });

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setGalleryPerm(galleryStatus.status === "granted");
        })();
    }, [addCat]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });
        if (!result.canceled) {
            setImage("data:image/png;base64," + result.assets[0].base64);
        }
    };

    if (galleryPerm === false) {
        return <Text>No access to storage</Text>;
    }

    const userProfileState = useUserProfile(username);

    if (userProfileState.isError) {
        return <Text>Something Went Wrong!</Text>;
    }

    if (userProfileState.isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    const userProfile = userProfileState.userProfile;

    const onchange = (nativeEvent: NativeScrollEvent) => {
        const { contentOffset, layoutMeasurement } = nativeEvent;
        if (contentOffset) {
            const slide = Math.ceil(contentOffset.x / layoutMeasurement.width);
            if (slide !== active) {
                setActive(slide);
            }
        }
    };

    return (
        <View tw="flex-1 items-center m-3">
            <Text className=" text-3xl font-bold m-3">Welcome {user?.displayName}!</Text>
            <TouchableOpacity onPress={pickImage}>
                <Image source={{ uri: userProfile.avatar }} tw="h-72 w-72 rounded-3xl" />
            </TouchableOpacity>
            <Text tw="text-xl mt-3">Cats:</Text>
            <ScrollView
                style={{ width: width, height: height * 0.35 }}
                onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
            >
                {userProfile.cats.length < 4 && (
                    <TouchableOpacity
                        tw="h-60  mr-6 w-72 bg-gray-300 rounded-3xl justify-center items-center align-middle"
                        style={{ elevation: 6 }}
                        onPress={() => setAddCat(!addCat)}
                    >
                        <Text tw=" text-gray-500 text-4xl absolute z-20 top-0">Add Cat</Text>
                        <Text tw=" text-gray-500 text-4xl absolute z-20 bottom-0">(Max 4)</Text>
                        <Text tw="text-5xl">+</Text>
                    </TouchableOpacity>
                )}
                {userProfile.cats.length === 0 ? (
                    <View>
                        <Text>This user has no cats</Text>
                    </View>
                ) : (
                    userProfile.cats.map((e, index) => (
                        <View key={e} tw="flex-row align-middle justify-center" style={{ width: width }}>
                            <View tw="flex-col text-center">
                                <Image source={{ uri: e.cat_img }} tw="h-60 w-72" />
                                <View>
                                    <Text tw="text-center">Name: {e.cat_name}</Text>
                                    <Text tw="text-center">Age: {e.age}</Text>
                                    <Text tw="text-center">Breed: {e.breed}</Text>
                                    <Text tw="text-center">Characteristics: {e.characteristics[0]}</Text>
                                </View>
                            </View>
                        </View>
                    ))
                )}
                <View tw="bottom-0 flex-row align-middle absolute"></View>
            </ScrollView>
            <View tw="flex-row bottom-9 self-center absolute">
                {userProfile.cats.map((e, index) => (
                    <Text
                        key={e}
                        style={active === index ? { color: "grey", margin: 3 } : { color: "black", margin: 3 }}
                    >
                        &#x25cf;
                    </Text>
                ))}
            </View>
            <View tw="flex-row self-center">
                {apiUserInfo.cats.map((e, index) => (
                    <Text
                        tw=" -mt-10"
                        key={index}
                        style={active === index ? { color: "grey", margin: 3 } : { color: "black", margin: 3 }}
                    >
                        &#x25cf;
                    </Text>
                ))}
            </View>
            {addCat && (
                <AddCat
                    setAddCat={setAddCat}
                    addCat={addCat}
                    setApiUserInfo={setApiUserInfo}
                    apiUserInfo={apiUserInfo}
                />
            )}
            <Button title="Sign Out" onPress={() => signOut(auth)} />
        </View>
    );
}
