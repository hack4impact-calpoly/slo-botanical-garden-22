import React, { useState, useEffect } from "react";
import { fetchData } from "../../dynoFuncs";
import Announcement from "./Announcement";
import { Box } from "@chakra-ui/react";
import "./AnnouncementBar.css";

const AnnouncementBar = () => {
  const [messages, setMessages] = useState();

  useEffect(() => {
    fetchData("admin_announcements").then(data => setMessages(data));
  }, []);

  if (!messages) return null;

  return (
    <Box>
      {messages.map((announcement) => (
        <Announcement
          name={announcement.name}
          date={announcement.date}
          title={announcement.title}
          body={announcement.content}
          poster={announcement.poster}
        />
      ))}
    </Box>
  );
}

export default AnnouncementBar;
