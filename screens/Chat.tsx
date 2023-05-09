import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { SocketContext } from "../utils/contexts/socket";
import { Button, Input, Text } from "react-native-elements";
import { getLocalUser } from "../assets/hooks/getLocalUser";

const Chat = () => {
    const { socket } = useContext(SocketContext);

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

    type chatUsersArrType = chatUserType[];

    const [user, setUser] = useState<userType>(null);
    const [chatUsers, setChatUsers] = useState<chatUsersArrType>([]);
    const [message, setMessage] = useState<string>('');
    const [sending, setSending] = useState<boolean>(false);

    const sendMessage = async () => {
        if (message) {
            setSending(true);
            await socket.emit('directMessage', message);
            setMessage('');
            setSending(false);
        }
    };
    
    useEffect(() => {
        if (!user) {
            getLocalUser().then(userData => {
            setUser(userData);
            socket.emit('newUser', {username: userData.username, socketId: socket.id});
            });
        }
    }), [user];

    useEffect(() => {
        socket.on('newUserRes', (chatUsersArr: chatUsersArrType) => setChatUsers(chatUsersArr));
    }, [socket]);

    useEffect(() => {
        socket.on('ping', (msg: string) => console.log(msg));
    }, [socket]);

    return <View tw="flex-column items-center text-center gap-10 mt-10">
        <Text h3>Welcome to the Chat Page</Text>
        {chatUsers.map(user => <View key={user.username}><Text>{user.username}</Text></View>)}
        <Input placeholder="Write your message..." value={message} onChangeText={value => setMessage(value)}></Input>
        <Button title='Send' onPress={sendMessage} loading={sending}></Button>
    </View>
}

export default Chat;
