import {toast} from 'react-toastify';

class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor() {
        this.chatSocket = [];
    }

    connect(chatid, token) {
        if(chatid){
            const path = `ws://localhost:8000/chat/${chatid}/`;
            this.chatSocket[chatid] = new WebSocket(path, token);
            this.chatSocket[chatid].onopen = () => {
                console.log("WebSocket open");
            };
            this.chatSocket[chatid].onmessage = e => {
                this.socketNewMessage(e.data);
            };
            this.chatSocket[chatid].onerror = err => {
                console.log(err.message);
                toast.error(err.message)
            };
            this.chatSocket[chatid].onclose = () => {
                console.log("WebSocket closed");
            };
        }else{
            console.log('No chatid')
        }
    }

    disconnect() {
        this.chatSocket.close();
    }

    socketNewMessage(data) {
        const parsedData = JSON.parse(data);

        const command = parsedData.command;
        if (Object.keys(this.callbacks).length === 0) {
            return;
        }
        if (command === "send_message") {
            this.callbacks[command](parsedData);
        }
    }

    sendMessage(chatid, message) {
        this.sendToServer({
            chatid: chatid,
            command: "send_message",
            message: {
                text: message.text,
            }
        })
    }

    onSendMessage(onSendMessageFunction){
        this.callbacks["send_message"] = onSendMessageFunction;
    }

    sendToServer(data, callback) {
        let chatid = data.chatid;
        try {
            this.chatSocket[chatid].send(JSON.stringify({...data}));
        } catch (err) {
            console.log(err.message);
            toast.error(err.message)
        }
    }

    state() {
        return this.chatSocket.readyState;
    }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;