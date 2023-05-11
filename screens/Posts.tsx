import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "@rneui/themed";
import { Button, Input } from "react-native-elements";
import { getAuth } from "firebase/auth";
import usePosts from "../utils/hooks/usePosts";
import useImagePerm from "../utils/hooks/useImagePerm";
import useUserLocation from "../utils/hooks/userUserLocation";
import { postPost } from "../api";
import Icon from "react-native-vector-icons/FontAwesome";
import chooseImage from "../utils/hooks/chooseImage";
import Splash from "../components/Splash";
import PostCatMap from "../components/PostCatMap";

const auth = getAuth();

export default function Posts({ navigation }) {
	const user = auth.currentUser;
	const imagePerm = useImagePerm();
	const { postsData, setPostsData, isLoading, isError } = usePosts();
	const { userLocation, locationPerm } = useUserLocation();
	const [postModal, setPostModal] = useState(false);
	const [hasPosted, setHasPosted] = useState(false);
	const [newPost, setNewPost] = useState({
		img_url: "",
		location: "",
		username: user?.displayName || "Harry111",
		description: "",
		lat: userLocation.latitude,
		long: userLocation.longitude,
	});

	const modalClose = () => {
		setNewPost({
			img_url: "",
			location: "",
			username: user?.displayName || "Harry111",
			description: "",
			lat: userLocation.latitude,
			long: userLocation.longitude,
		});
		setPostModal(!postModal);
	};

	const goToChat = (room: string) => {
		navigation.navigate("Welcome", { screen: "Chat", params: { room } });
	};

	const pickImage = () =>
		chooseImage().then((result) =>
			setNewPost((currPost) => {
				return {
					...currPost,
					img_url: result,
				};
			})
		);

	const postNewPost = () => {
		setHasPosted(true);
		postPost(newPost)
			.then((post) => {
				setPostsData((currPosts) => {
					return [...currPosts, post];
				});
				modalClose();
			})
			.catch((err) => console.log(err))
			.finally(() => setHasPosted(false));
	};

	if (isError) return <Text>Something Went Wrong!</Text>;
	if (isLoading) return <Splash />;

	return (
		<View tw="h-full">
			{postModal && (
				<PostCatMap
					postModal={postModal}
					setPostModal={setPostModal}
					setPostsData={setPostsData}
				/>
			)}
			<ScrollView tw="bg-orange-200">
				<Text
					tw="underline text-3xl m-3 mt-10 text-center pt-6 text-purple-900 text-5xl text-center"
					style={{ fontFamily: "Pacifico-Regular" }}
				>
					Posts
				</Text>
				<View tw="h-full">
					<View>
						{postsData.map((post) => (
							<View
								tw="self-center w-5/6 bg-[#d7945f] m-3 border-4 border-[#876243] rounded-md"
								key={post._id}
							>
								<Image
									source={{ uri: post.img_url }}
									tw="mt-3 mb-3 w-60 h-60 rounded mx-auto"
								/>

								<View tw="flex-row  bg-[#876243]">
									<Text tw="basis-1/2 text-orange-200 text-md text-center text-bold">
										{post.username}
									</Text>
									<Text tw="basis-1/2 text-orange-200 text-md text-center text-bold">
										{post.posted_at.slice(0, 16).replace("T", " ")}
									</Text>
								</View>
								<Text tw=" bg-[#876243] pr-14 pl-14 text-orange-200 text-xl text-start text-bold">
									{post.description}
								</Text>
								<View tw=" bg-[#876243] ">
									<TouchableOpacity
										tw="self-center w-3/6 m-2 h-10 bg-white rounded-md items-center justify-center bg-yellow-500 border-2"
										onPress={() => goToChat(post.username)}
									>
										<Text>Chat</Text>
									</TouchableOpacity>
								</View>
							</View>
						))}
					</View>
				</View>
			</ScrollView>
			<TouchableOpacity
				tw="self-center p-2 rounded-3xl items-center justify-center bg-yellow-500 border-2 absolute bottom-2 right-3 "
				onPress={() => setPostModal(true)}
			>
				<Text tw="text-2xl font-bold mr-3 ml-3">+</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton: {
	alignItems: 'center',
    backgroundColor: '#d7945f',
    padding: 10,
	elevation: 6,
	margin: 10,
  },
  submitButton: {
	alignItems: 'center',
    backgroundColor: '#d7945f',
    padding: 10,
	elevation: 6,
	marginTop: 0
  },
  chatButton: {
	alignItems: 'center',
    backgroundColor: '#d7945f',
    padding: 10,
	elevation: 6,
	margin: 10,
  },
  card: {
	backgroundColor: '#e3aa6b',
	borderColor: '#d7945f',
  }
});
