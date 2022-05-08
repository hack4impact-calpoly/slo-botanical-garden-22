import React, { useState, useEffect, useContext } from "react";
import { fetchData } from "../../dynoFuncs";
import Announcement from "./Announcement";
import { Box } from "@chakra-ui/react";
import "./AnnouncementBar.css";
import AnnouncementForm from "./announcementForm";
import { GlobalContext } from "../../GlobalState";

const AnnouncementBar = ({ reloadPageVar, reloadPageFunc }) => {
  const [messages, setMessages] = useState();
  const { currentUserInfo } = useContext(GlobalContext);

  useEffect(() => {
    fetchData("admin_announcements").then((data) => setMessages(data));
  }, [reloadPageVar]);

  if (!messages) return null;

  const getAnnouncementForm = () => {
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
            .sort(function (a, b) {
              var keyA = new Date(a.date),
                keyB = new Date(b.date);
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
};

export default AnnouncementBar;
