import React, { useEffect, useState } from "react";
import {user} from "../Join/Join"
import socketIO from "socket.io-client"
import "./Chat.css"
import Send from "./send-button.png"
import Message from "../Message/Message.js"
import ReactScrollToBottom from "react-scroll-to-bottom" //React scroll to bottom to automatically scroll down just like whatsapp
import closeIcon from "./close.png"
const ENDPOINT = "http://localhost:4500/"
let socket
const Chat = () => {
    const [id , setid] = useState(0)
    const [messages , setMessages] = useState([])
    const send= () => {
        const message = document.getElementById("chatInput").value
        socket.emit("message" , {message , id})
        document.getElementById("chatInput").value = ""
    }
    
    useEffect(() => {
        
        socket = socketIO(ENDPOINT , {transports : ['websocket']})
        socket.on("connect" , () => {
            //alert("Coonected")
            setid(socket.id)
        })

        socket.emit('joined' , {user})//emit means sending the data to backend

        socket.on("welcome",(data) => {
            setMessages([...messages,data])
            console.log(data.user , data.message)
        })
        socket.on("userJoined" , (data) => {
            setMessages([...messages,data])
            console.log(data.user , data.message)
        })
        socket.on("leave" , (data) => {
            setMessages([...messages,data])
            console.log(data.user , data.message)
        })
        return () => {
            socket.emit("disconnect")
            socket.off()
        }
    } , [])

    useEffect(() => {
        socket.on("sendMessage" , (data) =>{
            setMessages([...messages,data])
            console.log(data.user , data.message , data.id)
        })
        return () => {
            socket.off()
        }
    },[messages])
    return (
        <div className = "chatPage">
            <div className = "chatContainer">
                <div className = "header">
                    <h2>RBT Chat App</h2>
                    <a href="/"><img src = {closeIcon} alt = "Close"></img></a>
                </div>
                    <ReactScrollToBottom className="chatBox">
                        {messages.map((item , i) => 
                            <Message user = {item.id === id?"": item.user} message={item.message} classs = {item.id === id?"right":"left"}/>
                        )}
                    </ReactScrollToBottom>
                        <div className= "inputBox">
                            <input type = "text" id = "chatInput" onKeyPress={(event) =>{
                                return(event.key === 'Enter'?send():null)
                                
                            }}></input>
                            <button className="sendBtn" onClick={send}><img src = {Send}></img></button>
                        </div>
                    </div>
            
        </div>
    )
}
export default Chat