import React from 'react'
import { ReactNavbar } from 'overlay-navbar'
import logo from '../../../images/logo.png'
import { MdAccountCircle , MdSearch , MdAddShoppingCart } from 'react-icons/md'


const options = {
    burgerColor: '#464646',
    burgerColorHover: "black",
    logo,
    logoWidth: "20vmax",
    navColor1: "#7e7e7e",
    navColor4:"#7e7e7e",
    logoHoverSize: "10px",
    logoHoverColor: "black",
    link1Decoration: "none",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "black",
    link1Margin: "1vmax",
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "black",
    CartIconColorHover: "black",
    searchIconColorHover: "black",
    cartIconMargin: "1vmax",
    profileIcon: true,
    ProfileIconElement: MdAccountCircle,
    searchIcon: true,
    SearchIconElement: MdSearch,
    cartIcon: true,
    CartIconElement: MdAddShoppingCart,
  };

const Header = () => {
  return(
    <ReactNavbar {...options} />
      ) 
}

export default Header