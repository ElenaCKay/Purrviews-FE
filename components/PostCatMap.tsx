import { Input } from "react-native-elements";
import { useState } from "react";
import { View, Image, Text, Modal, TouchableOpacity } from "react-native";
import ChooseImage from "../utils/hooks/chooseImage";
import { postPost } from "../api";
import useImagePerm from "../utils/hooks/useImagePerm";
import useUserLocation from "../utils/hooks/userUserLocation";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const PostCatMap = ({ setPostsData, postModal, setPostModal }) => {
	const user = auth.currentUser;
	const { userLocation, locationPerm } = useUserLocation();
	const [hasPosted, setHasPosted] = useState(false);
	const [newPost, setNewPost] = useState({
		img_url: "",
		location: "",
		username: user?.displayName || "Harry111",
		description: "",
		lat: userLocation.latitude,
		long: userLocation.longitude,
	});

	const pickImage = () =>
		ChooseImage().then((result) =>
			setNewPost((currPost) => {
				return {
					...currPost,
					img_url: result,
				};
			})
		);

	const modalClose = () => {
		setNewPost({
			img_url: "",
			location: "",
			username: user?.displayName || "Harry111",
			description: "",
			lat: userLocation.latitude,
			long: userLocation.longitude,
		});
		setPostModal(false);
	};

	const postNewPost = () => {
		setHasPosted(true);
		postPost(newPost)
			.then((post) => {
				setPostsData((currPosts) => {
					modalClose();
					return [...currPosts, post];
				});
			})
			.catch((err) => console.log(err))
			.finally(() => setHasPosted(false));
	};
	return (
		<Modal
			animationType="slide"
			visible={postModal}
			onRequestClose={modalClose}
		>
			<View tw="items-center justify-end bg-orange-200 h-full bottom-0">
				<Text
					tw="text-3xl m-3 mt-10 text-center pt-6 text-purple-900 text-5xl underline text-center"
					style={{ fontFamily: "Pacifico-Regular" }}
				>
					Post a Cat
				</Text>
				<View tw="bg-[#876243] items-center rounded-md">
					<Image
						source={
							newPost.img_url
								? { uri: newPost.img_url }
								: require("../assets/twocats.png")
						}
						tw="w-60 h-60 m-8 bg-[#876243] rounded-md"
					/>
				</View>

				<Input
					tw="p-4 mt-4 bg-[#d7945f] rounded-md"
					placeholder="Location"
					value={newPost.location}
					onChangeText={(value) =>
						setNewPost((currPost) => {
							return { ...currPost, location: value };
						})
					}
				/>
				<Input
					tw="p-4 bg-[#d7945f] rounded-md"
					placeholder="Description"
					value={newPost.description}
					onChangeText={(value) =>
						setNewPost((currPost) => {
							return { ...currPost, description: value };
						})
					}
				/>
				<View tw="flex-row">
					<TouchableOpacity
						tw="basis-1/2 self-center h-20 m-2 p-2 bg-white rounded-md items-center justify-center bg-yellow-500 border-2"
						style={{ elevation: 6 }}
						onPress={pickImage}
					>
						<Text tw="text-xl text-white font-semibold">Upload Image</Text>
					</TouchableOpacity>

					<TouchableOpacity
						tw="basis-1/2 self-center h-20 m-2 p-2 bg-white rounded-md items-center justify-center bg-yellow-500 border-2"
						onPress={postNewPost}
					>
						<Text tw="text-xl text-white font-semibold">Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default PostCatMap;
