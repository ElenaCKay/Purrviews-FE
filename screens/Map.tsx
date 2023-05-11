import { useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { View, Image, Text } from "react-native";
import usePosts from "../utils/hooks/usePosts";
import useUserLocation from "../utils/hooks/userUserLocation";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import { catmarkers } from "../assets/catmarkers/catmarkers";
import PostCatMap from "../components/PostCatMap";

export default function Map({ navigation }): JSX.Element {
	const { postsData, setPostsData, isLoading, isError } = usePosts();
	const { userLocation, locationPerm } = useUserLocation();
	const [postModal, setPostModal] = useState(false);

	if (isError) return <Text>Something Went Wrong!</Text>;

	return isLoading || !locationPerm ? (
		<View>
			<Text>Loading...</Text>
		</View>
	) : (
		<View tw="flex-1">
			<PostCatMap
				postModal={postModal}
				setPostModal={setPostModal}
				setPostsData={setPostsData}
			/>
			<MapView tw="w-full h-full flex-1 z-0" region={userLocation}>
				{postsData.map((post) => (
					<Marker
						key={post._id}
						coordinate={{
							latitude: post.lat,
							longitude: post.long,
						}}
					>
						<Image
							source={
								post.img_url
									? { uri: post.img_url }
									: {
											uri: catmarkers[
												Math.floor(Math.random() * catmarkers.length)
											],
									  }
							}
							style={{ width: 35, height: 35, borderRadius: 100 }}
						></Image>

						<Callout tw="w-60 h-60 bg-orange-200">
							<Text tw="z-20 top-0 -right-0 absolute bg-red-900 text-white bg-blue-400 p-2 pb-1 border-2 border-white rounded-3xl">
								<Icon name="thumbs-o-up" size={16} /> {post.votes}
							</Text>
							<View tw="flex-column items-center -m-16 align-middle content-center">
								<Text
									tw="w-80 h-80 -m-20 text-center "
									style={{ textAlign: "center" }}
								>
									<Image
										tw="w-80 h-60"
										source={
											post.img_url
												? { uri: post.img_url }
												: {
														uri: catmarkers[
															Math.floor(Math.random() * catmarkers.length)
														],
												  }
										}
									/>
								</Text>
								<View tw="m-20 text-start w-60">
									<Text tw="bg-[#876243] text-orange-200 text-center text-bold">
										{post.username}
										{"               "}
										{post.posted_at.slice(0, 16).replace("T", " ")}
									</Text>
									<Text>{post.description}</Text>
								</View>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>
			<View tw="absolute top-10 self-end">
				<Button
					icon={{
						name: "send-o",
						type: "font-awesome",
						size: 24,
					}}
					buttonStyle={{
						borderRadius: 100,
						marginRight: 10,
					}}
					onPress={() => setPostModal(true)}
				></Button>
			</View>
			<View tw="absolute top-10 self-start">
				<Button
					buttonStyle={{
						borderRadius: 100,
						marginLeft: 10,
					}}
					title="List View"
					onPress={() => navigation.navigate("Posts")}
				></Button>
			</View>
		</View>
	);
}
