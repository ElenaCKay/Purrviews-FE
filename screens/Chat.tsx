import React, { useContext, useState, useEffect, useRef } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SocketContext } from "../utils/contexts/socket";
import { Button, Input, Text } from "react-native-elements";
import { getLocalUser } from "../utils/hooks/getLocalUser";
import useUsersList from "../utils/hooks/useUsersList";
import Splash from "../components/Splash";

const Chat = ({route, navigation}) => {
    const {room}: {room: string} = route.params;
    const { socket } = useContext(SocketContext);
    const {userListData, isLoading} = useUsersList();

    interface userType {
        username: string;
        description: string;
        avatar: string;
        cats: string;
    }

    interface msgType {
        username: string,
        body: string,
        roomId:string,
        time: number
    }

    const [user, setUser] = useState<userType>(null);
    const [message, setMessage] = useState<string>('');
    const [messageLog, setMesasgeLog] = useState<msgType[]>([]);
    const [sending, setSending] = useState<boolean>(false);
    const lastMsgRef = useRef(null);

    const sendMessage = async () => {
        if (message !== '') {
            setSending(true);
            await socket.emit('message', {username: user.username, body: message, roomId: room === 'your' ? user.username : room, time: Date.now()});
            setMessage('');
        }
    };

    const newMsgScroll = (height: number) => {
        lastMsgRef.current?.scrollTo({y: height, animated: true});
    }

    const changeRoom = (newRoom: string) => {
        socket.emit('roomLeave', {id: room});
        navigation.push('Welcome', {screen: 'Chat', params: {room: newRoom}});
    }
    
    useEffect(() => {
        if (!user) {
            getLocalUser().then(userData => {
            setUser(userData);
            socket.emit('newUser', userData.username);
            });
        }
    }), [user];

    useEffect(() => {
        if (user) {
            socket.emit('roomJoin', {id: room === 'your' ? user.username : room, username: user.username});
        }
    }, [user, room]);

    useEffect(() => {
        socket.on('newUserRes', (msg: string) => console.log(msg));
    }, [socket]);

    useEffect(() => {
        socket.on('messageRes', (msg: msgType) => {
            if(room === msg.roomId) setMesasgeLog(currLog => [...currLog, msg]);
            setSending(false);
        });
    }, [socket]);

    return isLoading ? (
			<Splash />
		) : (
			<View tw=" h-full w-full mt-6 mr-6 bottom-0 absolute bg-orange-200">
				<ScrollView tw="bg-orange-200 flex-column text-center">
					<Text
						tw=" m-3 mt-10 text-center pt-6 text-purple-900 text-5xl underline text-center"
						style={{ fontFamily: "Pacifico-Regular" }}
					>
						{room} Chat Room
					</Text>
					<Text
						tw="m-3 text-center text-purple-900 text-2xl underline text-center"
						style={{ fontFamily: "Pacifico-Regular" }}
					>
						Scroll to View
					</Text>
					<ScrollView
						nestedScrollEnabled={true}
						tw="h-40 bg-[#d7945f] border-4 border-[#876243] rounded content-center mr-6 ml-6"
					>
						{userListData.map((userData) => (
							<TouchableOpacity
								tw="w-1/2 h-fit bg-white ml-10 mb-3"
								key={userData.username}
								onPress={() => changeRoom(userData.username)}
							>
								<Text tw="text-black ml-1">
									{`${userData.username}` +
										`${userData.username === user.username ? " (You)" : ""}`}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</ScrollView>
				<ScrollView
					tw="h-1/4 bg-[#d7945f] border-2 border-black rounded rounded content-center ml-6 mr-6"
					ref={lastMsgRef}
					onContentSizeChange={(width, height) => {
						newMsgScroll(height);
					}}
				>
					{messageLog.map((msg, index) => (
						<Text tw="text-white ml-1" key={index}>
							{`${msg.username}` +
								`${msg.username === user.username ? " (You)" : ""}` +
								`: ${msg.body}`}
						</Text>
					))}
				</ScrollView>
				<View tw="w-3/4 self-center mb-6">
					<Input
						placeholder="Write your message..."
						value={message}
						onChangeText={(value) => setMessage(value)}
						onSubmitEditing={sendMessage}
						blurOnSubmit={true}
					></Input>
					<Button title="Send" onPress={sendMessage} loading={sending}></Button>
				</View>
			</View>
		);
}

export default Chat;
