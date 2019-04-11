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
        this.chatSocket = null;
    }

    connect(chatid, token) {
        if(chatid){
            const path = `ws://localhost:8000/chat/${chatid}/`;
            this.chatSocket = new WebSocket(path, token);
            this.chatSocket.onopen = () => {
                console.log("WebSocket open");
            };
            this.chatSocket.onmessage = e => {
                this.socketNewMessage(e.data);
            };
            this.chatSocket.onerror = e => {
                console.log(e.message);
            };
            this.chatSocket.onclose = () => {
                console.log("WebSocket closed let's reopen");
                this.connect(chatid, token);
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

    sendMessage(message) {
        this.sendToServer({
            command: "send_message",
            message: {
                text: message.text,
            }
        }, function(){
            console.log('sent')
        })
    }

    onSendMessage(onSendMessageFunction){
        this.callbacks["send_message"] = onSendMessageFunction;
    }

    sendToServer(data, callback) {
        try {
            this.chatSocket.send(JSON.stringify({...data}));
            callback()
        } catch (err) {
            console.log(err.message);
        }
    }

    state() {
        return this.chatSocket.readyState;
    }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;