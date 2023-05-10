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
		<View tw="w-5/6 items-center bg-orange-200 pb-12 rounded-xl border-4 border-[#876243]">
			<View tw="flex-column">
				<Text tw="text-center text-3xl mb-2 font-bold">Cat Of The Day By:</Text>
				<Text
					tw="pt-4 text-[#345fc4] text-5xl underline text-center"
					style={{ fontFamily: "Pacifico-Regular" }}
				>
					{catOfTheDay.username}!
				</Text>
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
