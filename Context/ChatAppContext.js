import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

import {ChechIfWalletConnected, connectWallet, connectingWithContract} from "@/Utils/apiFeature";

export const ChatAppProvider = ({children}) => {

    //Usestate
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    //Chat User Data
    const [currentUserName, setCurrentName] = useState("");
    const [currentUserAddress, setCurrentAddress] = useState("");

    const router = useRouter();

    //Fetch Data Time Of Page Load
    const fetchData = async () => {
        try{
            const contract = await connectingWithContract();

            const connectAccount = await connectWallet();
            setAccount(connectAccount);

            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);

            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);

            const userLists = await contract.getAllAppUser();
            setUserLists(userLists);
        }
        catch (error){
            setError("Please Install and connect your wallet!")
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const readMessage = async(friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFiendMsg(read);
        }
        catch (error){
            setError("No new messages recieved!")
        }
    }; 

    const createAccount = async ({name, accountAddress}) => {
        try {
            if (name || accountAddress) return setError("Name and accountAdress can't be empty!");
            
            const contract = await connectingWithContract();
            const getCreatedUer = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUer.wait();
            setLoading(false);
        }
        catch (error){
            setError("Error while creating account!")
        }
    };

    const addFriends = async () => {
        try {
            if (name || accountAddress) return setError("Please provide correct name and accountAddress!");

            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
        }
        catch (error) {
            setError("Friend not added, please try again!")
        }
    };

    const sendMessage = async ({msg, address}) => {
        try {
            if (msg || address) return setError("Please type your message!")

            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        }
        catch (error){
            setError("Please reload and try again!")
        }
    };

    const readUser = async (userAddress) => {
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrentName(userName);
        setCurrentAddress(userAddress);
    };

    return(
        <ChatAppContext.Provider value={{readMessage, createAccount, addFriends, sendMessage, readUser, account, userName, friendLists,
        friendMsg, userLists, loading, error, currentUserAddress, currentUserName}}>
            {children}
        </ChatAppContext.Provider>
    );
};
export const ChatAppContext = React.createContext(ChatAppProvider);
