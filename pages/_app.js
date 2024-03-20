import "../styles/global.css"

import { ChatAppProvider } from "@/Context/ChatAppContext";
import { NavBar } from "@/Components";
import { Error } from "@/Components";
const MyApp = ({Component, pageProps }) => (
    <div>
        <ChatAppProvider>
            <NavBar/>
            <Component {...pageProps} />
            {/* <Error /> */}
        </ChatAppProvider>
    </div>
);

export default MyApp;