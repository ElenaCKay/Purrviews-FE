import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
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
  if (isLoading) return <Text>Loading...</Text>

  return (
    <ScrollView>
				<View tw="items-center">
					{newPost.img_url !== '' ? <Image source={{uri: newPost.img_url}} tw="w-1/2 h-1/2"></Image> : null}
					{imagePerm ? <Button onPress={pickImage} title="Upload Image"></Button> : <Text>Grant Media Permissions To Upload</Text>}
					<Input placeholder="Location" value={newPost.location} onChangeText={value => setNewPost(currPost => {return {...currPost, location: value}})}></Input>
					<Input placeholder="Description" value={newPost.description} onChangeText={value => setNewPost(currPost => {return {...currPost, description: value}})}></Input>
					<Button onPress={postNewPost} loading={hasPosted} title="Submit"></Button>
				</View>
      <View tw="h-full">

        <Text>Welcome {user?.email}!</Text>

        <View>
          {postsData.map((post) => (
            <Card key={post._id}>
              <Image
                source={{ uri: post.img_url }}
                tw="w-60 h-60 rounded mx-auto"
              />
              <Text tw="text-center">{post.description}</Text>
				<Text>{post.username} {post.posted_at.slice(0,16).replace('T', ' ')}</Text>
				<Text><Icon name="thumbs-o-up" size={16}/> {post.votes}</Text>
              <Button title="Chat" />
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
    marginTop: 10,
  },
});
