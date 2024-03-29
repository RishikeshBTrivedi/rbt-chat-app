import socketIO from "socket.io-client"
import './App.css';
import {BrowserRouter as Router , Route} from "react-router-dom"
import {Routes} from "react-router-dom"
import Join from "./component/Join/Join.jsx"
import Chat from "./component/Chat/Chat"
// const ENDPOINT = "http://localhost:4500/"
// const socket = socketIO(ENDPOINT , {transports: ["websocket"]})
function App() {
  
  return (
    <div className="App">
      
      <Router>
        <Routes>
        <Route exact path = "/" element = {<Join />} />
        <Route path = "/chat" element = {<Chat/>} />
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
