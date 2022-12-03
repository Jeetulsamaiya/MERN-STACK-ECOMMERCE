import React from 'react'
import logo from '../../../images/logo.png'
import playstore from '../../../images/google.png'
import Appstore from '../../../images/apple.png'
import "./footer.css"

const footer = () => {
  return (
    <footer id="footer">
    <div className="leftFooter">
      <h4>DOWNLOAD OUR APP</h4>
      <p>Download App for Android and IOS mobile phone</p>
      <img src={playstore} alt="img" />
      <img src={Appstore} alt="img" />
    </div>
    <div className="midFooter">
      <img src={logo} alt="img" />
      <p>High Quality Is Our First Priority</p>
      <p>Copyrights 2022 &copy; Jeetul Samaiya</p>
    </div>
    <div className="rightFooter">
      <h4>Follow Us</h4>
      <a href="/https://github.com/Jeetulsamaiya/MERN-STACK-ECOMMERCE">Instagram</a>
      <a href="https://github.com/Jeetulsamaiya/MERN-STACK-ECOMMERCE">Instagram</a>
      <a href="https://github.com/Jeetulsamaiya/MERN-STACK-ECOMMERCE">Instagram</a>
    </div>
  </footer>
  )
}

export default footer