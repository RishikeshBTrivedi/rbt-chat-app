import React from "react";
import "./Join.css"
import logo from "../Join/logo192.png"
import {Link} from "react-router-dom"
let user

const Join = () => {
    const [name , setName] = React.useState("")
    const sendUser = () => {
        user = document.getElementById("joinInput").value;
        document.getElementById("joinInput").value = ""

    }
    return(
        <div className="JoinPage">
            <div className="JoinContainer">
                <img src = {logo} alt = "logo" />
                <h1>RBT Chat App</h1>
                <input type="text" id="joinInput" placeholder="Enter Your Name" onChange = {(event) => {
                    setName(event.target.value)
                }}/>
                <Link to = "./chat" onClick = {(event) => {
                   return !name?event.preventDefault():null;
                    
                }}><button className = "joinButton" onClick={sendUser}>Enter</button></Link>
            </div>
        </div>
    );
};
export default Join
export {user}