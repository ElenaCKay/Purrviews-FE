import React, { useEffect, useState } from "react";
import { Text, View, Pressable, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { catmarkers } from "../assets/catmarkers/catmarkers";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";

const AddCat = ({ setAddCat, addCat, setApiUserInfo, apiUserInfo }) => {
	const [isMissing, setIsMissing] = useState(false);
	const [currentCat, setCurrentCat] = useState({
		cat_name: "",
		age: 0,
		breed: "",
		characteristics: "",
		cat_img: catmarkers[Math.floor(Math.random() * catmarkers.length)],
		missing: false,
	});

	const pickCatImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			base64: true,
			quality: 0.4,
		});
		if (!result.canceled) {
			setCurrentCat({
				...currentCat,
				cat_img: "data:image/png;base64," + result.assets[0].base64,
			});
		}
	};
	return (
		<Animated.View
			entering={SlideInDown}
			tw="w-full h-full bg-blue-900 absolute items-center justify-end border-black border-2"
		>
			<Pressable
				tw=" bg-gray-300 rounded-3xl mt-12 mb-12"
				style={{ elevation: 6 }}
				onPress={pickCatImage}
			>
				<Image
					tw="h-44 w-40 items-center"
					resizeMode="contain"
					source={{ uri: currentCat.cat_img }}
				/>
			</Pressable>
			<Input
				tw="bg-gray-300"
				placeholder="Cat name"
				value={currentCat.cat_name}
				onChangeText={(text) => {
					setCurrentCat({ ...currentCat, cat_name: text });
				}}
				leftIcon={<Icon name="envelope" size={16} />}
			/>
			<Input
				tw="bg-gray-300"
				placeholder="Age"
				value={String(currentCat.age)}
				keyboardType="numeric"
				onChangeText={(text) => {
					setCurrentCat({ ...currentCat, age: Number(text) });
				}}
				leftIcon={<Icon name="envelope" size={16} />}
			/>
			<Input
				tw="bg-gray-300"
				placeholder="Breed"
				value={currentCat.breed}
				onChangeText={(text) => {
					setCurrentCat({ ...currentCat, breed: text });
				}}
				leftIcon={<Icon name="envelope" size={16} />}
			/>
			<Input
				tw="bg-gray-300"
				placeholder="Characteristics"
				value={currentCat.characteristics}
				onChangeText={(text) => {
					setCurrentCat({ ...currentCat, characteristics: text });
				}}
				leftIcon={<Icon name="envelope" size={16} />}
			/>
			<Pressable
				tw=" mb-12 bg-white justify-center items-center rounded-md p-3 border-black border-2"
				style={
					isMissing
						? {
								backgroundColor: "gold",
						  }
						: { backgroundColor: "green" }
				}
				onPress={() => {
					setIsMissing(!isMissing);
					setCurrentCat({ ...currentCat, missing: isMissing });
				}}
			>
				<Text tw="text-3xl">Missing</Text>
			</Pressable>
			<View tw="flex-row space-x-4">
				<Pressable
					tw="basis-2/4 bg-white h-16 justify-center items-center rounded-md"
					style={{ elevation: 6 }}
					onPress={() => {
						setAddCat(!addCat);
						setCurrentCat({
							cat_name: "",
							age: 0,
							breed: "",
							characteristics: "",
							cat_img:
								catmarkers[Math.floor(Math.random() * catmarkers.length)],
							missing: false,
						});
					}}
				>
					<Text tw="text-3xl">Back</Text>
				</Pressable>
				<Pressable
					tw="basis-2/4 bg-white h-16 justify-center items-center rounded-md"
					style={{ elevation: 6 }}
					onPress={() => {
						setApiUserInfo({
							...apiUserInfo,
							cats: [...apiUserInfo.cats, currentCat],
						});
						setAddCat(!addCat);
						setCurrentCat({
							cat_name: "",
							age: 0,
							breed: "",
							characteristics: "",
							cat_img:
								catmarkers[Math.floor(Math.random() * catmarkers.length)],
							missing: false,
						});
					}}
				>
					<Text tw="text-3xl">Add Cat</Text>
				</Pressable>
			</View>
		</Animated.View>
	);
};

export default AddCat;
