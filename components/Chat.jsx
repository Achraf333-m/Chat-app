import Chatbar from "./Chatbar";
import Input from "./Input";
import Messages from "./Messages";

function Chat() {
    return (
        <div className="chat">
            <Chatbar />
            <Messages />
            <Input />
        </div>
    );
}

export default Chat;