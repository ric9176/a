import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import A  from "./a";
import './index.css'

class App extends Component {
    constructor() {
        super();
        this.state = {
            socket: null,
            endpoint: "http://127.0.0.1:4001"
        };
    }

    componentDidMount() {
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
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
