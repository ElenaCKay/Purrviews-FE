import {
	Text,
	View,
	Image,
	ScrollView,
	Dimensions,
	NativeScrollEvent,
    TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import useUserProfile from "../utils/hooks/useUserProfile";
import Splash from "../components/Splash";

export default function UserProfile({ route }) {
	const { username } = route.params;
	const { userProfile, isLoading, isError } = useUserProfile(username);
	const [active, setActive] = useState(0);
	const { width, height } = Dimensions.get("window");

	const onchange = (nativeEvent: NativeScrollEvent) => {
		const { contentOffset, layoutMeasurement } = nativeEvent;
		if (contentOffset) {
			const slide = Math.ceil(contentOffset.x / layoutMeasurement.width);
			if (slide !== active) {
				setActive(slide);
			}
		}
	};

	if (isError) return <Text>Something Went Wrong!</Text>;

	if (isLoading) {
		return <Splash />;
	}

    return (
        <View tw="flex-1 items-center bg-orange-200">
            <Image source={{ uri: userProfile!.avatar }} style={{ width: 300, height: 300 }} />
            <Text
                tw="text-3xl m-3 mt-10 text-center pt-6 text-purple-900 text-5xl underline text-center"
                style={{ fontFamily: "Pacifico-Regular" }}
            >
                {userProfile!.username}
            </Text>
            <Text>{userProfile!.description}</Text>
            <Text
                tw="text-xl m-3 mt-10 text-center pt-6 text-purple-900 text-3xl underline text-center"
                style={{ fontFamily: "Pacifico-Regular" }}
            >
                Cats:
            </Text>
            <ScrollView
                tw="bg-orange-200"
                style={{ width: width, height: height * 0.35 }}
                onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                horizontal
            >
                {userProfile.cats.length === 0 ? (
                    <View>
                        <Text
                            tw="text-3xl m-3 mt-10 text-center pt-6 text-black-900 text-3xl text-center"
                            style={{ fontFamily: "Pacifico-Regular" }}
                        >
                            No Cats Available...
                        </Text>
                    </View>
                ) : (
                    userProfile!.cats.map((cats, index) => (
                        <View
                            key={cats.cat_id}
                            tw="self-center w-5/6 bg-[#d7945f] m-8 border-4 border-[#876243] rounded-md"
                        >
                            <View tw="pt-4 pb-2 bg-[#876243]">
                                <TouchableOpacity tw="pt-4 pb-2 bg-[#876243]">
                                    <Image source={{ uri: cats.cat_img }} tw="border-2 w-60 h-60 rounded mx-auto" />
                                </TouchableOpacity>
                                <View>
                                    <Text tw="text-center">Name: {cats.cat_name}</Text>
                                    <Text tw="text-center">Age: {cats.age}</Text>
                                    <Text tw="text-center">Breed: {cats.breed}</Text>
                                    <Text tw="text-center">
                                        Top 2 Characteristics: {cats.characteristics[0]}, {cats.characteristics[1]}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))
                )}
                <View tw="bottom-0 flex-row align-middle absolute"></View>
            </ScrollView>
        </View>
    );
}
