import { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { catmarkers } from "../assets/catmarkers/catmarkers";
import Animated, { SlideInDown } from "react-native-reanimated";
import { postCat } from "../api";
import { useAuthentication } from "../utils/useAuthentication";
import ChooseImage from "../utils/hooks/chooseImage";

const AddCat = ({ setAddCat, addCat, setUserProfile }) => {
	const [isMissing, setIsMissing] = useState(false);
	const [err, setErr] = useState("");
	const { user } = useAuthentication();
	const [currentCat, setCurrentCat] = useState({
		cat_name: "",
		age: 0,
		breed: "",
		characteristics: [],
		cat_img: catmarkers[Math.floor(Math.random() * catmarkers.length)],
		missing: false,
	});

	const pickImage = () => {
		ChooseImage().then((result) =>
			setCurrentCat({
				...currentCat,
				cat_img: result,
			})
		);
	};
	return (
		<Animated.View
			entering={SlideInDown}
			tw="flex-1 w-full h-full absolute bottom-0 bg-orange-300 items-center justify-end"
		>
			{err && (
				<Text tw="w-full bg-red-700 text-xl text-white top-0 absolute">
					{err}
				</Text>
			)}
			<Text
				style={{ fontFamily: "Pacifico-Regular" }}
				tw="text-5xl pt-7 text-purple-900 underline"
			>
				Add A Cat
			</Text>
			<TouchableOpacity
				tw=" bg-gray-300 rounded-3xl mb-12"
				style={{ elevation: 6 }}
				onPress={pickImage}
			>
				<Image
					tw="h-44 w-40 items-center"
					resizeMode="contain"
					source={{ uri: currentCat.cat_img }}
				/>
			</TouchableOpacity>
			<Input
				style={{ backgroundColor: "#d7945f" }}
				placeholder="Cat name"
				value={currentCat.cat_name}
				onChangeText={(text) => {
					setCurrentCat({ ...currentCat, cat_name: text });
				}}
				leftIcon={<Icon name="envelope" size={16} />}
			/>
			<Input
				style={{ backgroundColor: "#d7945f" }}
				placeholder="Age"
				keyboardType="numeric"
				onChangeText={(text) => {
					setCurrentCat({ ...currentCat, age: Number(text) });
				}}
				leftIcon={<Icon name="envelope" size={16} />}
			/>
			<Input
				style={{ backgroundColor: "#d7945f" }}
				placeholder="Breed"
				value={currentCat.breed}
				onChangeText={(text) => {
					setCurrentCat({ ...currentCat, breed: text });
				}}
				leftIcon={<Icon name="envelope" size={16} />}
			/>
			<Input
				style={{ backgroundColor: "#d7945f" }}
				placeholder="Characteristics e.g. Moody,Reclusive,etc."
				value={currentCat.characteristics.join(',')}
				onChangeText={(text) => {
					setCurrentCat({ ...currentCat, characteristics: text.split(',') });
				}}
				leftIcon={<Icon name="envelope" size={16} />}
			/>
			<TouchableOpacity
				tw="mb-12 bg-white justify-center items-center rounded-md p-3 border-black border-2"
				style={
					isMissing
						? {
								backgroundColor: "white",
						  }
						: { backgroundColor: "#d7945f" }
				}
				onPress={() => {
					setIsMissing(!isMissing);
					setCurrentCat({ ...currentCat, missing: isMissing });
				}}
			>
				<Text tw="text-3xl">{isMissing ? "Missing" : "Not Missing"}</Text>
			</TouchableOpacity>
			<View tw="flex-row space-x-4">
				<TouchableOpacity
					tw="basis-2/4 bg-white h-16 justify-center items-center rounded-md"
					style={{ elevation: 6 }}
					onPress={() => {
						setAddCat(!addCat);
						setCurrentCat({
							cat_name: "",
							age: 0,
							breed: "",
							characteristics: [],
							cat_img:
								catmarkers[Math.floor(Math.random() * catmarkers.length)],
							missing: false,
						});
					}}
				>
					<Text tw="text-3xl">Back</Text>
				</TouchableOpacity>
				<TouchableOpacity
					tw="basis-2/4 bg-white h-16 justify-center items-center rounded-md"
					style={{ elevation: 6 }}
					onPress={() => {
						if (currentCat.cat_name.length <= 2) {
							setErr("Please Enter a cat name");
						} else {
							setAddCat(!addCat);
							postCat(user.displayName, currentCat).then(newCat => {
								setUserProfile(currProfile => {return {...currProfile, cats: [...currProfile.cats, newCat]}});
								setCurrentCat({
									cat_name: "",
									age: 0,
									breed: "",
									characteristics: [],
									cat_img:
										catmarkers[Math.floor(Math.random() * catmarkers.length)],
									missing: false,
								});
							})
							.catch(err => console.log(err));
						}
					}}
				>
					<Text tw="text-3xl">Add Cat</Text>
				</TouchableOpacity>
			</View>
		</Animated.View>
	);
};

export default AddCat;
