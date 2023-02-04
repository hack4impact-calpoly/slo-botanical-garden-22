import { Box } from "@chakra-ui/react";
import React from "react";

function Legend() {
  return (
    <Box
      bgColor="#576754"
      m="30px"
      p="10px"
      borderRadius="20px"
      textAlign="center"
      color="#cee4bb"
      width="90%"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {" "}
        <div>
          <strong>20 Hours:</strong> Volunteer T-Shirt and Name Tag{" "}
        </div>
        <div>
          <strong>50 Hours:</strong> Free Membership
        </div>
        <br />
        <br />
        <br />
      </div>
      <strong>All Volunteers:</strong> Attend Quarterly Volunteer Luncheons
    </Box>
  );
}

export default Legend;
