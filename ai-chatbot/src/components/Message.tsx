import { Message } from "../App";
import PluginCard from "./PluginCard";

const MessageCard = ({ message }: { message: Message }) => {
  const isUser = message?.type === "user";
  const isPlugin = message?.type === "plugin";

  return (
    <div className={`mb-2 ${isUser ? "text-right" : "text-left"}`}>
      {isPlugin ? (
        <PluginCard content={message?.content} />
      ) : (
        <div
          className={`p-2 rounded shadow-sm ${
            isUser ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          {message?.content}
        </div>
      )}
    </div>
  );
};

export default MessageCard;
