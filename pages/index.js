import React, {useEffect, useState, useContext} from "react"

import { ChatAppContext } from "@/Context/ChatAppContext"

const ChatApp = () => {
    const  {title}  = useContext(ChatAppContext);
    console.log(title);
    return <div>{title}</div>;
}

export default ChatApp;