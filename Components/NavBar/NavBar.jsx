import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from './NavBar.module.css'

import { ChatAppContext } from "@/Context/ChatAppContext";
import {Model, Error} from "../index";

const NavBar = () => {
    const menuItems = [
        {
            menu: "All Users",
            link: "/"
        },
        {
            menu: "Chat",
            link: "/"
        },
        {
            menu: "Contact",
            link: "/"
        },
        {
            menu: "Settings",
            link: "/"
        },
        {
            menu: "FAQ",
            link: "/"
        },
        {
            menu: "Terms of Use",
            link: "/"
        }
    ]

    const [active, setActive] = React.useState(2);
    const [open, setOpen] = React.useState(false);
    const [openModel, setOpenModel] = React.useState(false);

    const {account, userName, connectWallet} = useContext(ChatAppContext);

    return (
        <div className={Style.NavBar}>
            <div className={Style.NavBar_box}>
                <div className={Style.NavBar_box_left}>
                    Logo
                </div>
                <div className={Style.NavBar_box_right}>
                    <div className={Style.NavBar_box_right_menu}>
                        {menuItems.map((el, i) => (
                            <div onClick={()=> setActive(i+1)} key={i} className={`{Style.NavBar_box_right_menu_items} ${active == i+1 ? Style.active_btn : ""}`}>
                                <Link className={Style.NavBar_box_right_menu_items_link} href={el.link}>
                                    {el.menu}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className={Style.NavBar_box_right_connect}>
                        {account == "" ? (
                            <button onClick={()=>connectWallet()}>
                                {""}
                                <span>Connect Wallet</span>
                            </button>
                        ) : (
                            <button onClick={()=>setOpenModel(true)}>
                                {""}
                                <span>{`${userName ? UserImage : ""}`}</span>
                                {""}
                                <small>{userName || "Create Account"}</small>
                            </button>
                        )}
                    </div>
                    {/* <div className={Style.NavBar_box_right_open} onClick={()=>setOpen(true)}>
                        Open Menu
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default NavBar;