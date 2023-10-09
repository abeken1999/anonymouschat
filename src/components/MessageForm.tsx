import React, { useState } from "react";
import { getDatabase, ref, push } from "firebase/database";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container, Grid } from "@mui/material";

const MessageForm: React.FC = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  // 名前と投稿内容の両方入力されていれば送信ボタンを有効にする
  const isSubmitDisabled = !name || !content;

  const nameTextFieldStyle = {
    width: "850px", // 名前の幅を調整
  };

  const contentTextFieldStyle = {
    width: "850px", // 投稿内容の幅を800pxに指定
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const database = getDatabase(); // Firebase データベースへの参照を取得

    try {
      // メッセージをデータベースに追加
      await push(ref(database, "messages"), {
        name,
        content,
        timestamp: new Date().toISOString(), // 現在の時刻をISO文字列で保存
      });

      setContent("");
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="flex-end">
          {/* 右寄せ */}
          <Grid item xs={12}>
            <TextField
              label="名前"
              value={name}
              onChange={handleNameChange}
              fullWidth
              margin="normal"
              style={nameTextFieldStyle}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="メッセージ"
              value={content}
              onChange={handleContentChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              style={contentTextFieldStyle}
            />
          </Grid>
          <Grid item xs={12} justifyContent="end" spacing={1} container>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitDisabled}
            >
              送信
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MessageForm;
