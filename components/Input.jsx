import { FcAddImage } from "react-icons/fc";
import { AiOutlinePaperClip } from "react-icons/ai";

function Input() {
  return (
    <div className="input">
      <input type="text" placeholder="Type a message..." />
      <div className="inputTools">
        <input type="file" id="file" style={{ display: "none" }} />
        <label htmlFor="file">
          <FcAddImage />
        </label>
        <AiOutlinePaperClip />
        <button>Send</button>
      </div>
    </div>
  );
}

export default Input;
