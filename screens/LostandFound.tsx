import useGetLostCats from "../utils/hooks/useGetLostCats";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

export default function LostAndFound() {
	const { lostCats, isLoading, isError } = useGetLostCats();

	if (isError) <Text>There has been an error!</Text>;

	return isLoading ? (
		<View>
			<Text>Loading...</Text>
		</View>
	) : (
		<ScrollView tw="bg-orange-200">
			<Text
				tw="text-3xl m-3 mt-10 text-center pt-6 text-purple-900 text-5xl underline text-center"
				style={{ fontFamily: "Pacifico-Regular" }}
			>
				Lost and Found
			</Text>
			{lostCats.map((user) => (
				<View
					tw="self-center w-5/6 bg-[#d7945f] m-3 border-4 border-[#876243] rounded-md"
					key={user._id}
				>
					<TouchableOpacity tw="pt-4 pb-2 bg-[#876243]">
						<Image
							source={{ uri: user.cats[0].cat_img }}
							tw="border-2 w-60 h-60 rounded mx-auto"
						/>
					</TouchableOpacity>
					<View tw="flex-row bg-[#876243]">
						<Text tw="basis-1/2 text-xl text-orange-200 font-semibold text-center">
							Owner:&nbsp;<Text tw="font-bold">{user.username}</Text>
						</Text>
						<Text tw="basis-1/2 text-xl font-semibold text-orange-200  text-center">
							Lost cat:&nbsp;
							<Text tw="font-bold">{user.cats[0].cat_name}</Text>
						</Text>
					</View>
					<Text tw="w-full text-xl font-semibold text-center">
						Characteristics:&nbsp;
					</Text>

					<ScrollView horizontal tw="flex-wrap">
						{user.cats[0].characteristics.map((characteristic, index) => (
							<Text
								key={index}
								tw="text-xl m-2 p-1 font-semibold rounded-xl border-2 border-black bg-blue-200"
							>
								{characteristic}
							</Text>
						))}
					</ScrollView>
					<TouchableOpacity
						tw="self-center w-3/6 m-2 h-10 bg-white rounded-md items-center justify-center bg-yellow-500 border-2"
						style={{ elevation: 6 }}
					>
						<Text tw="text-xl">Contact User</Text>
					</TouchableOpacity>
				</View>
			))}
		</ScrollView>
	);
}
