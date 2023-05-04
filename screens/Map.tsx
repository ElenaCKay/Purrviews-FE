import React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { View, Image, Text } from "react-native";
import usePosts from "../utils/hooks/usePosts";

export default function Map(): JSX.Element {
	const { postsData, isLoading, isError } = usePosts();

	if (isError) return <Text>Something Went Wrong!</Text>;

	return ( isLoading ? <View>
		<MapView tw="w-full h-full"></MapView>
	</View> :
		<View>
			<MapView tw="w-full h-full">
				{postsData.map(post => <Marker key={post._id} coordinate={{
					latitude: post.lat,
					longitude: post.long
				}}>
					<Image source={{uri: post.img_url}} style={{width: 35, height: 35, borderRadius: 100}}></Image>
					<Callout tw="w-60 h-60 flex-column items-center">
						<Text style={{width: 150, height: 150}}><Image source={{uri: post.img_url}} style={{width: 100, height: 100}}></Image></Text>
						<Text>{post.description}</Text>
					</Callout>
				</Marker>)}
			</MapView>
		</View>
	);
}
