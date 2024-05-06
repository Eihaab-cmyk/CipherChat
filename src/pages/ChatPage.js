import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

const ChatPage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        style={{ display: "flex", justifyContent: "space-between" }}
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && (
          <>
            <MyChats fetchAgain={fetchAgain} />
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </>
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
