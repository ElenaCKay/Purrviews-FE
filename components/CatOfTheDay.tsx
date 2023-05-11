import { useEffect, useState } from "react";
import { getPosts } from "../api";
import { Image } from "react-native-elements";
import { View, Text } from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";
import Splash from "./Splash";
import { catmarkers } from "../assets/catmarkers/catmarkers";

export default function CatOfTheDay() {
	const [catOfTheDay, SetCatOfTheDay] = useState({
		img_url: catmarkers[Math.floor(Math.random() * catmarkers.length)],
		location: "",
		description: "",
		lat: 0,
		long: 0,
		votes: 0,
		username: "",
		posted_at: "",
	});
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		getPosts()
			.then((posts) =>
				posts.reduce((max = { votes: 0 }, post) => {
					max.votes > posts.votes ? max : post;
					return max;
				})
			)
			.then((maxPost) => {
				setLoading(false);
				SetCatOfTheDay(maxPost);
			});
	}, []);
	return loading ? (
		<Splash />
	) : (
		<View tw="w-5/6 items-center bg-[#d7945f] pb-12 mt-10 rounded-xl border-4 border-[#876243]">
			<View tw="flex-column">
				<Text style={{
								fontFamily: "Pacifico-Regular",
								fontSize: 25,
								color: "#FFF",
								textShadowColor: "black",
								textShadowRadius: 10,
								textShadowOffset: {
									width: 2,
									height: 2,
								},
							}} tw="text-center text-3xl mt-5">Cat of The Day!</Text>
							<Text style={{
								fontFamily: "Pacifico-Regular",
								fontSize: 10,
								color: "#FFF",
								textShadowColor: "black",
								textShadowRadius: 10,
								textShadowOffset: {
									width: 2,
									height: 2,
								},
							}} tw="text-center mb-2">Posted by {catOfTheDay.username}</Text>
			</View>
			<View tw=" border-yellow-500 border-4">
				<Image
					source={{ uri: catOfTheDay.img_url }}
					tw="self-align w-60 h-60 rounded-md"
				/>
				<Text tw="border-2 border-blue-500 bg-blue-400 rounded-3xl p-2 -right-3 -bottom-3 absolute font-bold">
					<Icon name="thumbs-o-up" size={16} /> {catOfTheDay.votes}
				</Text>
			</View>
		</View>
	);
}
