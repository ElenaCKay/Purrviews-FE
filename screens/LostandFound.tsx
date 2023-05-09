import useGetLostCats from "../utils/hooks/useGetLostCats";
import React, { useCallback, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    NativeScrollEvent,
} from "react-native";
import { Card } from "@rneui/themed";

export default function LostAndFound() {
    const { lostCats, isLoading, isError } = useGetLostCats();

    if (isError) {
        <Text>There has been an error!</Text>;
    }

    return isLoading ? (
			<View>
				<Text>Loading...</Text>
			</View>
		) : (
			<ScrollView tw="bg-orange-200">
				<Text tw="text-3xl font-bold m-3 mt-10 text-center">
					Lost and Found
				</Text>
				{lostCats.map((user) => (
					<View
						tw="bg-orange-300 m-3 border-4 border-[#d7945f] "
						key={user._id}
					>
						<TouchableOpacity>
							<Image
								source={{ uri: user.cats[0].cat_img }}
								tw="w-60 h-60 rounded mx-auto"
							/>
						</TouchableOpacity>
						<View tw="flex-row">
							<Text tw="basis-1/2 text-xl font-semibold text-center">
								Owner:&nbsp;<Text tw="font-bold">{user.username}</Text>
							</Text>
							<Text tw="basis-1/2 text-xl font-semibold text-center">
								Lost cat:&nbsp;
								<Text tw="font-bold">{user.cats[0].cat_name}</Text>
							</Text>
						</View>
						<Text tw="w-full text-xl font-semibold text-center">
							Characteristics:&nbsp;
						</Text>
						<View tw="flex-row">
							{user.cats[0].characteristics.map((characteristic, index) => (
								<View tw="flex-wrap" key={index}>
									<Text tw="text-xl m-2 p-1 rounded-xl border-2 border-black">
										{characteristic}
									</Text>
								</View>
							))}
						</View>
						<TouchableOpacity
							tw="self-center w-3/6 m-2 h-10 bg-white rounded-md items-center justify-center bg-[#d7945f] border-2"
							style={{ elevation: 6 }}
						>
							<Text tw="text-xl">Contact User</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		);
}
