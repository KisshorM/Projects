import "./AboutContentStyles.css"
import { Link } from "react-router-dom"
import React1 from "../assets/react1.jpg"
import React2 from "../assets/react2.webp"

import React from 'react'

const AboutContent = () => {
  return (
    <div className="about">
        <div className="left">
          <h1>Who Am I?</h1>
          <p>I am a student who loves to solve real world problems using technology.</p> 
          <Link to="/contact"><button className="btn">contact</button></Link> 
        </div>
      <div className="right">
        <div className="img-container">
            <div className="img-stack top">
                <img src={React1} className="img" alt="blah"/>
            </div>
            <div className="img-stack bottom">
                <img src={React2} className="img" alt="blah"/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AboutContent
