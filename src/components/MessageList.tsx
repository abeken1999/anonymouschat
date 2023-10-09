import React, { useState, useEffect } from "react";
import { database } from "@/firebase/firebase";
import { Card, CardContent, List, ListItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  DatabaseReference,
  DataSnapshot,
  ref,
  onValue,
  off,
} from "firebase/database";

const StyledCard = styled(Card)({
  margin: "5px",
  padding: "5px",
  width: "835px",
  textAlign: "right",
});

const CenteredContent = styled(CardContent)({
  textAlign: "center",
});

const CenteredListItem = styled(ListItem)({
  display: "flex",
  justifyContent: "center",
});

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const messagesRef: DatabaseReference = ref(database, "messages");

    const fetchData = async () => {
      try {
        // メッセージの非同期取得
        onValue(messagesRef, (snapshot: DataSnapshot) => {
          const messagesData: {
            [key: string]: { name: string; content: string };
          } = snapshot.val();

          if (messagesData) {
            const messagesArray = Object.keys(messagesData).map((key) => ({
              id: key,
              ...messagesData[key],
            }));
            setMessages(messagesArray.reverse()); // 反転して新しいメッセージが上に表示されるようにする
          }
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();

    return () => {
      off(messagesRef, "value");
    };
  }, []);

  return (
    <List>
      {messages.map((message) => (
        <CenteredListItem key={message.id}>
          <StyledCard>
            <CenteredContent>
              <Typography variant="body1" align="left">
                {message.name}
              </Typography>
              <Typography variant="body1" align="left">
                {message.content}
              </Typography>
              <div style={{ textAlign: "right" }}>
                <Typography variant="caption" color="textSecondary">
                  {new Date(message.timestamp).toLocaleString()}{" "}
                  {/* 時刻を右端に表示 */}
                </Typography>
              </div>
            </CenteredContent>
          </StyledCard>
        </CenteredListItem>
      ))}
    </List>
  );
};

export default MessageList;
