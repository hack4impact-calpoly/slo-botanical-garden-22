import React from "react";
import styles from "./AnnouncementForm.module.css";

export default function AnnouncementForm(props) {
  /*
  function eraseText() {
    document.getElementById("littlerbox").value = "";
  }
  */

  return (
    <div>
      <div className={styles.lilbox}>
        <h3 id={styles.formtitle}>New Announcement </h3>
        <form action="/form/submit" method="GET">
          <div className={styles.textBoxes}>
            <textarea
              className={styles.littlerbox}
              id="littlerbox"
              rows="1"
              cols="100%"
              name="text"
              placeholder="Title"
            ></textarea>
            <textarea
              className={styles.littlerbox}
              id="littlerbox"
              rows="1"
              cols="100%"
              name="text"
              placeholder="Poster"
            ></textarea>
            <textarea
              className={styles.littlerbox}
              id="littlerbox"
              rows="3"
              cols="100%"
              name="text"
              placeholder="Message"
            ></textarea>
            <br />
          </div>
          <div classname={styles.bottomButtons}>
            <input
              className={styles.cancel}
              id="cancel"
              type="button"
              value="Cancel"
            />

            <input
              className={styles.publish}
              id="publish"
              type="submit"
              value="Publish"
              //onClick={eraseText()}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
