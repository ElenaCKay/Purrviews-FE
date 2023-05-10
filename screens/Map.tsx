import React, { useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { View, Image, Text, Modal } from "react-native";
import usePosts from "../utils/hooks/usePosts";

import useUserLocation from "../utils/hooks/userUserLocation";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Input } from "react-native-elements";
import { getAuth } from "firebase/auth";
import * as imagePicker from "expo-image-picker";
import useImagePerm from "../utils/hooks/useImagePerm";
import { postPost } from "../api";

const auth = getAuth();

export default function Map({navigation}): JSX.Element {
	const user = auth.currentUser;
	const { postsData, setPostsData, isLoading, isError } = usePosts();
	const { userLocation, locationPerm } = useUserLocation();
	const imagePerm = useImagePerm();
	const [postModal, setPostModal] = useState(false);
	const [hasPosted, setHasPosted] = useState(false);
	const [newPost, setNewPost] = useState({
		img_url: '',
		location: '',
		username: user?.displayName || 'Harry111',
		description: '',
		lat: userLocation.latitude,
		long: userLocation.longitude
	});

	const modalClose = () => {
		setNewPost({
			img_url: '',
			location: '',
			username: user?.displayName || 'Harry111',
			description: '',
			lat: userLocation.latitude,
			long: userLocation.longitude
		});
		setPostModal(!postModal);
	}

	const pickImage = () => {
		imagePicker.launchImageLibraryAsync({
			mediaTypes: imagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			base64: true,
		})
		.then(res => {
			if(!res.canceled) setNewPost(currPost => {return {...currPost, img_url: "data:image/png;base64," + res.assets[0].base64}});
		})
	}

	const postNewPost = () => {
		setHasPosted(true);
		postPost(newPost)
		.then(post => {
			setPostsData(currPosts => {
				return [...currPosts, post];
			});
			modalClose();
		})
		.catch(err => console.log(err))
		.finally(() => setHasPosted(false));
	}

	if (isError) return <Text>Something Went Wrong!</Text>;


	return ( isLoading || !locationPerm ? <View>
		<Text>Loading...</Text>
	</View> :
		<View tw="flex-1">
			<Modal animationType="slide" transparent={false} visible={postModal} presentationStyle="formSheet" onRequestClose={modalClose}>
				<View tw="items-center">
					{newPost.img_url !== '' ? <Image source={{uri: newPost.img_url}} tw="w-1/2 h-1/2"></Image> : null}
					{imagePerm ? <Button onPress={pickImage} title="Upload Image"></Button> : <Text>Grant Media Permissions To Upload</Text>}
					<Input placeholder="Location" value={newPost.location} onChangeText={value => setNewPost(currPost => {return {...currPost, location: value}})}></Input>
					<Input placeholder="Description" value={newPost.description} onChangeText={value => setNewPost(currPost => {return {...currPost, description: value}})}></Input>
					<Button onPress={postNewPost} loading={hasPosted} title="Submit"></Button>
				</View>
			</Modal>
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
				}} onPress={() => setPostModal(true)}></Button>
			</View>
			<View tw="absolute top-10 self-start">
				<Button buttonStyle={{
					borderRadius: 100,
					marginLeft: 10
				}} title="List View"
				onPress={() =>
				  navigation.navigate('Posts')
				}></Button>
			</View>
		</View>
	);
}
