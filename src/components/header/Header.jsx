import React, { useState } from 'react';
import Logo from '../../img/logo.png'
import './index.scss'
import menu from '../../img/menu.png'
import {Link} from 'react-router-dom';
const Header = () => {
    const [open ,setOpen] = useState(false);
    const [check,setCheck] =useState(false);
    const HandleMenu =()=>{
        setOpen(!open)
    }
    console.log(open)
    return (
        <>
        <div className='header'>
        <img src={Logo} className='logo' alt="" />
        <div className={open ? "row open" : "row"}>
            <div className="left">  
                <Link className='link checked' to='/use'>使用說明</Link>
                <Link className='link checked' to="/pay">收費方式</Link>
                <Link className={check ? 'link checked' :"link" } onclick={()=>setCheck(!check)} to='/'>站點資訊</Link>
                <Link className='link checked' to='/news'>最新消息</Link>
                <Link className='link checked' to='/act'>活動專區</Link>
            </div>
            <div className="right">
                <button>登入</button>
            </div>
        </div>
        <div className="menu">
            <img src={menu} className="icon" />
        </div>
        </div>
        <hr style={{border: "1px solid #EBEBEB"}}/>

        </>
    );
}

export default Header;
