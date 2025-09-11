import SignUpHeader from "@/src/Components/Common/SignUpHeader";
import ChatWindow from "../src/Components/Chat";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#212121] relative">
      <SignUpHeader />
      <ChatWindow />
    </div>
  );
}
