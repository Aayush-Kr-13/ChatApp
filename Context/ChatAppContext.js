import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

import {ChechIfWalletConnected, connectWallet, connectingWithContract} from "@/Utils/apiFeature";

export const ChatAppProvider = ({children}) => {
    const title = "Hey Welcome to ChatApp by Aayush and Ashish";

    return(
        <ChatAppContext.Provider value={{title}}>
            {children}
        </ChatAppContext.Provider>
    );
};
export const ChatAppContext = React.createContext(ChatAppProvider);
