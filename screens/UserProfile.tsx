import {StyleSheet,
	Text,
	View,
	Image,
	Button,
	TouchableOpacity,
	ScrollView,
	Dimensions, NativeScrollEvent } from "react-native";
import React, { useState } from "react";
import useUserProfile from "../utils/hooks/useUserProfile";

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

    if(isLoading){
        return (<View>
                <Text>Loading...</Text>
            </View>)
    };

    return (<View tw="flex-1 items-center">
                <Image source={{ uri: userProfile!.avatar }} style={{ width:300, height: 300 }} />
                <Text tw="text-2xl">{userProfile!.username}</Text>
                <Text>{userProfile!.description}</Text>
                <Text tw="text-xl mt-3">Cats:</Text>
                <ScrollView
                    style={{ width: width, height: height * 0.35 }}
                    onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
		{userProfile.cats.length === 0 ? <View >
                        <Text tw="text-center">
                            No Cats Available...
                        </Text>
                </View>
         :
        userProfile!.cats.map((cats, index) => (
					<View
						key={cats.cat_id}
						tw="flex-row align-middle justify-center"
						style={{ width: width }}
					>
						<View tw="flex-col text-center">
							<Image source={{ uri: cats.cat_img }} tw="h-60 w-72" />
							<View>
								<Text tw="text-center">Name: {cats.cat_name}</Text>
								<Text tw="text-center">Age: {cats.age}</Text>
								<Text tw="text-center">Breed: {cats.breed}</Text>
								<Text tw="text-center">Top 2 Characteristics: {cats.characteristics[0]}, {cats.characteristics[1]}</Text>
							</View>
						</View>
					</View>
				))}
				<View tw="bottom-0 flex-row align-middle absolute"></View>
			</ScrollView>
        </View>
    );
}