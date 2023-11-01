import React  from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
    {
        title:"Home",
        path: "/",
        icons: <AiIcons.AiFillHome/>,
        cName: "nav-text",
    },
    {
        title:"Profile",
        path: "/UserProfile",
        icons: <FaIcons.FaUser/>,
        cName: "nav-text",
    },
    {
        title:"Calendar",
        path: "/Calendar",
        icons: <FaIcons.FaCalendarDay/>,
        cName: "nav-text",
    },
    {
        title:"Logout",
        path:"/",
        icons:<RiIcons.RiLogoutBoxFill/>,
        cName:"nav-text",
    },
]