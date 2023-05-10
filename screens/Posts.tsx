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
import * as ImagePicker from "expo-image-picker";
import usePosts from "../utils/hooks/usePosts";
import useImagePerm from "../utils/hooks/useImagePerm";
import useUserLocation from "../utils/hooks/userUserLocation";
import * as Location from 'expo-location';
import { postPost } from "../api";
import Icon from "react-native-vector-icons/FontAwesome";

const auth = getAuth();

export default function Posts({navigation}) {
	const user = auth.currentUser;
	const imagePerm = useImagePerm();
	const { postsData, setPostsData, isLoading, isError } = usePosts();
	const { userLocation, locationPerm } = useUserLocation();
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

	const goToChat = (room: string) => {
		navigation.navigate("Welcome", {screen: 'Chat', params: {room}});
	}

	const pickImage = () => {
		ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
  if (isLoading) return <View tw="flex items-center text-center mt-10"><Text>Loading...</Text></View>

  return (
    <ScrollView tw="bg-[#e9d2b0] mt-6">
		<Text className=" text-3xl font-bold m-3  text-center">Posts</Text>
				<View tw="items-center m-3">
					{newPost.img_url !== '' ? <Image source={{uri: newPost.img_url}} tw="w-60 h-60 rounded mx-auto"></Image> : null}
					{imagePerm ? <TouchableOpacity onPress={pickImage} style={styles.button}><Text>Upload Image</Text></TouchableOpacity> : <Text>Grant Media Permissions To Upload</Text>}
					<Input tw="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-5" id="location" placeholder="Location" value={newPost.location} onChangeText={value => setNewPost(currPost => {return {...currPost, location: value}})}></Input>
					<Input tw="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" value={newPost.description} onChangeText={value => setNewPost(currPost => {return {...currPost, description: value}})}></Input>
					<TouchableOpacity onPress={postNewPost} style={styles.button}><Text>Submit</Text></TouchableOpacity>
				</View>
      <View tw="h-full">

        {/* <Text>Welcome {user?.email}!</Text> */}

        <View>
          {postsData.map((post) => (
            <Card key={post._id} containerStyle={styles.card}>
              <Image
                source={{ uri: post.img_url }}
                tw="w-60 h-60 rounded mx-auto"
              />
              <Text tw="text-center">{post.description}</Text>
				<Text tw="text-center">{post.username} {post.posted_at.slice(0,16).replace('T', ' ')}</Text>
				<Text tw="text-center"><Icon name="thumbs-o-up" size={16}/> {post.votes}</Text>
				<TouchableOpacity style={styles.button} onPress={() => goToChat(post.username)}><Text>Chat</Text></TouchableOpacity>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
	alignItems: 'center',
    backgroundColor: '#d7945f',
    padding: 10,
	elevation: 6,
  },
  card: {
	backgroundColor: '#e3aa6b',
	borderColor: '#d7945f',
  }
});
