import { Message } from "../App";

type Props = {
  messages: Message[];
};

const Chat = ({ messages }: Props) => {
  console.log("messages", messages);
  return (
    <div className="space-y-2 flex flex-col min-h-[300px] justify-end relative">
      {messages?.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center text-center text-gray-500 px-4">
          <div>
            <div className="text-4xl mb-2 animate-bounce">🤖</div>
            <p className="text-sm">Start a conversation with your assistant</p>
          </div>
        </div>
      ) : (
        messages?.map((msg) => {
          const isUser = msg?.type === "user";

          return (
            <div
              key={msg?.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-2 px-4 rounded-lg max-w-xs text-sm shadow ${
                  isUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg?.content}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Chat;
