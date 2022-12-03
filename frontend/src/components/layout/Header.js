import React from 'react'
import { ReactNavbar } from 'overlay-navbar'
import logo from '../../images/logo.png'


const Header = () => {
  return(
    <ReactNavbar 
    logo={logo}
    navColor1="white"
    burgerColor="grey"
    burgerColorHover="black"
    logoWidth="15vmax"
    logoHoverSize="20px"
    logoHoverColor="grey"
    link1Text="Home"
    link2Text="Product"
    link3Text="Contact"
    link4Text="About"
    link1Url = "/"
    link2Url = "/product"
    link3Url = "/contact"
    link4Url = "/about"
    link1Size="1.3vmax"
    link2Size="1.3vmax"
    link3Size="1.3vmax"
    link4Size="1.3vmax"
    link1Color="#007CC3"
    link2Color="#007CC3"
    link3Color="#007CC3"
    link4Color="#007CC3"
    link2ColorHover="#1D4670"
    link3ColorHover="#1D4670"
    link4ColorHover="#1D4670"
    link1ColorHover="#1D4670"
    nav1justifyContent="flex-end"
    nav2justifyContent="flex-end"
    nav3justifyContent="flex-start"
    nav4justifyContent="flex-start"
    link1Margin="0vmax"
    link2Margin="1.5vmax"
    link3Margin="0vmax"
    link4Margin="1.5vmax"
   



     />
      ) 
}

export default Header