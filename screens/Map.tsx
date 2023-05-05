import React, { useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { View, Image, Text } from "react-native";
import usePosts from "../utils/hooks/usePosts";
import useUserLocation from "../utils/hooks/userUserLocation";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";

export default function Map(): JSX.Element {
	const { postsData, isLoading, isError } = usePosts();
	const { userLocation, locationPerm } = useUserLocation();
	const [postModal, setPostModal] = useState(false);

	if (isError) return <Text>Something Went Wrong!</Text>;

	return ( isLoading || !locationPerm ? <View>
		<Text>Loading...</Text>
	</View> :
		<View tw="flex-1">
			<MapView tw="w-full h-full flex-1 z-0" region={userLocation}>
				{postsData.map(post => <Marker key={post._id} coordinate={{
					latitude: post.lat,
					longitude: post.long
				}}>
					<Image source={{uri: post.img_url}} style={{width: 35, height: 35, borderRadius: 100}}></Image>
					{<Callout tw="w-60 h-60">
						<View tw="flex-column items-center">
							<Text style={{width:150, height: 150, textAlign: "center"}}><Image resizeMode="cover" source={{uri: post.img_url}} style={{width: 100, height: 100}}></Image></Text>
							<Text>{post.description}</Text>
							<Text>{post.username} {post.posted_at.slice(0,16).replace('T', ' ')}</Text>
							<Text><Icon name="thumbs-o-up" size={16}/> {post.votes}</Text>
						</View>
					</Callout>}
				</Marker>)}
			</MapView>
			<View tw="absolute top-10 self-end">
				<Button icon={{
					name: "send-o",
					type: 'font-awesome',
					size: 24
				}} buttonStyle={{
					borderRadius: 100,
					marginRight: 10
				}} onPress={() => console.log('Will allow user to post')}></Button>
			</View>
		</View>
	);
}
