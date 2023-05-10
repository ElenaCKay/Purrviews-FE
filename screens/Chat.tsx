import React, { useContext, useState, useEffect, useRef } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SocketContext } from "../utils/contexts/socket";
import { Button, Input, Text } from "react-native-elements";
import { getLocalUser } from "../assets/hooks/getLocalUser";
import useUsersList from "../utils/hooks/useUsersList";

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

    interface chatUserType {
        username: string,
        socketId: string
    }

    interface msgType {
        username: string,
        body: string,
        roomId:string,
        time: number
    }

    const [user, setUser] = useState<userType>(null);
    const [chatUsers, setChatUsers] = useState<chatUserType[]>([]);
    const [message, setMessage] = useState<string>('');
    const [messageLog, setMesasgeLog] = useState<msgType[]>([]);
    const [sending, setSending] = useState<boolean>(false);
    const lastMsgRef = useRef(null);

    const sendMessage = async () => {
        if (message !== '') {
            setSending(true);
            await socket.emit('message', {username: user.username, body: message, roomId: room, time: Date.now()});
            setMessage('');
        }
    };

    const newMsgScroll = (height: number) => {
        lastMsgRef.current?.scrollTo({y: height, animated: true});
    }

    const changeRoom = (newRoom: string) => {
        socket.emit('roomLeave', {id: room});
        navigation.push('Chat', {room: newRoom});
    }
    
    useEffect(() => {
        if (!user) {
            getLocalUser().then(userData => {
            setUser(userData);
            socket.emit('newUser', userData.username);
            socket.emit('roomJoin', {id: room, username: userData.username});
            });
        }
    }), [user];

    useEffect(() => {
        socket.on('newUserRes', (chatUsersArr: chatUserType[]) => setChatUsers(chatUsersArr));
    }, [socket]);

    useEffect(() => {
        socket.on('messageRes', (msg: msgType) => {
            if(room === msg.roomId) setMesasgeLog(currLog => [...currLog, msg]);
            setSending(false);
        });
    }, [socket]);

    return isLoading ? <View tw="flex items-center text-center mt-10">
        <Text h3>Loading...</Text>
    </View> : <ScrollView tw="flex-column text-center gap-10 mt-10">
        <Text h3>Welcome to the Chat Page</Text>
        <ScrollView tw="bg-slate-900 rounded">
            {userListData.map(userData => <TouchableOpacity tw="w-1/2 h-fit bg-white ml-10 mb-3" key={userData.username} onPress={() => changeRoom(userData.username)}>
                    <Text tw="text-black ml-1">{userData.username + userData.username === user.username ? ' (You)' : null}</Text>
                </TouchableOpacity>)}
        </ScrollView>
        <ScrollView tw="w-3/4 h-1/2 bg-slate-900 rounded" ref={lastMsgRef} onContentSizeChange={(width, height) => {newMsgScroll(height)}}>
            {messageLog.map((msg, index) => <Text tw="text-white ml-1" key={index}>{`${msg.username}` + `${msg.username === user.username ? ' (You)' : null}` + `: ${msg.body}`}</Text>)}
        </ScrollView>
        <Input placeholder="Write your message..." value={message} onChangeText={value => setMessage(value)} onSubmitEditing={sendMessage} blurOnSubmit={true}></Input>
        <Button title='Send' onPress={sendMessage} loading={sending}></Button>
    </ScrollView>
}

export default Chat;
