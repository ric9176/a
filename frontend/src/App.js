import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import A  from "./a";
import './index.css'

class App extends Component {
    constructor() {
        super();
        this.state = {
            socket: null,
            // endpoint: "http://127.0.0.1:8080"
        };
    }

    componentDidMount() {
        const {endpoint} = this.state;
        const host = window.location.hostname === 'localhost' ? "http://127.0.0.1:8080" : window.location.hostname;
        const socket = socketIOClient(host);
        this.setState({socket});
    }

    render() {
        const {socket} = this.state;

        return (
            <div style={{textAlign: "center"}}>
                { socket && (<A socket={socket} />) }
            </div>
        );
    }
}

export default App;
