import React, {useState} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import Link from 'next/link';
import {SidebarData} from "./SidebarData";
import {IconContext} from "react-icons";
//import '../pages/_app.js';


function Sidebar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
    <IconContext.Provider value={{ color: "undefined"}}>
      <div className="sidebar">
        <Link href="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
        
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className = "navbar-toggle">
            <Link href="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link href={item.path}>
                  {item.icons}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </IconContext.Provider>

    </>
  )
}

export default Sidebar
