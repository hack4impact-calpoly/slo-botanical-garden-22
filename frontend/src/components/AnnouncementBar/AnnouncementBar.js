import React, { useState, useEffect, useContext } from "react";
import { Box } from "@chakra-ui/react";
import { fetchData } from "../../dynoFuncs";
import Announcement from "./Announcement";
import "./AnnouncementBar.css";
import AnnouncementForm from "./announcementForm";
import { GlobalContext } from "../../GlobalState";

function AnnouncementBar({ reloadPageVar, reloadPageFunc }) {
  const [messages, setMessages] = useState();
  const { currentUserInfo } = useContext(GlobalContext);

  useEffect(() => {
    fetchData("admin_announcements-TEST").then((data) => setMessages(data));
  }, [reloadPageVar]);

  if (!messages) return null;

  const getAnnouncementForm = () => {
    // eslint-disable-line
    if (currentUserInfo.is_Admin === "True") {
      return (
        <div className="announcementForm">
          <h2> </h2>
          <AnnouncementForm
            reloadPageVar={reloadPageVar}
            reloadPageFunc={reloadPageFunc}
          />
        </div>
      );
    }
  };

  return (
    <div>
      <Box className="box">
        {getAnnouncementForm()}

        <div className="announcements">
          {messages
            .sort((a, b) => {
              const keyA = new Date(a.date);
              const keyB = new Date(b.date);
              if (keyA < keyB) return 1;
              if (keyA > keyB) return -1;
              return 0;
            })
            .map((announcement) => (
              <Announcement
                name={announcement.name}
                date={announcement.date}
                title={announcement.title}
                body={announcement.content}
                poster={announcement.poster}
                id={announcement.primary_id}
                reloadPageVar={reloadPageVar}
                reloadPageFunc={reloadPageFunc}
              />
            ))}
        </div>
      </Box>
    </div>
  );
}

export default AnnouncementBar;
