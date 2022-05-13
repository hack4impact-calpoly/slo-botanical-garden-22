import "../../App.css";
import AnnouncementBar from "../AnnouncementBar/AnnouncementBar.js";
import React, { useState, useEffect, useContext } from "react";
import { fetchUser, fetchData } from "../../dynoFuncs";
import { Navigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { GlobalContext } from "../../GlobalState";
import { Box, Flex, Center, Spacer, Heading } from "@chakra-ui/react";
import Navbar from "../Navbar/navbar";

export default function Home() {
  const { currentUserInfo } = useContext(GlobalContext);
  const [loggedHours, setLoggedHours] = useState();
  const [reloadPage, setReloadPage] = useState(0);

  useEffect(() => {
    fetchData("logged_hours").then((data) => {
      setLoggedHours(
        data.filter(
          (h) =>
            Date.parse(h.date) >= lastWeekWindowStart() &&
            Date.parse(h.date) <= new Date()
        )
      );
    });
  }, []);

  const lastWeekWindowStart = () => {
    var date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  };

  function getThisWeeksHoursTotal() {
    let totalHoursPre = 0;
    loggedHours.map((h) => (totalHoursPre += parseFloat(h.hours)));
    return totalHoursPre;
  }

  function getThisWeeksHoursTotalByDepartment(department) {
    let totalHoursPre = 0;
    loggedHours
      .filter((h) => h.activity === department)
      .map((h) => (totalHoursPre += parseFloat(h.hours)));
    return totalHoursPre;
  }

  function countVolunteersThisWeek() {
    let volunteerCount = new Set(loggedHours.map((toV) => toV.username)).size;
    return volunteerCount;
  }
  if (!currentUserInfo || !loggedHours) return null;
  console.log("IN HOME");
  return (
    <>
      {!currentUserInfo ? (
        <Navigate replace to="/" />
      ) : currentUserInfo.Emergency_Contact === "" ? (
        <Navigate replace to="/info" />
      ) : (
        <>
          <Navbar />
          <Flex p={10} w="100%">
            <Flex w="100%">
              <Box
                w="25%"
                borderRadius={"12px"}
                p={3}
                boxShadow="dark-lg"
                backdropFilter="blur(60px)"
              >
                <Heading size="lg" color="#cee4bb">
                  {" "}
                  Admin Announcements:{" "}
                </Heading>
                <Box overflow="auto" height="90vh">
                  <AnnouncementBar
                    reloadPageVar={reloadPage}
                    reloadPageFunc={setReloadPage}
                  />
                </Box>
              </Box>
              <Spacer />
              <Box
                w="72%"
                h="100vh"
                borderRadius={"12px"}
                boxShadow="dark-lg"
                backdropFilter="blur(60px)"
              >
                <Box
                  borderRadius={"12px"}
                  boxShadow="lg"
                  bg="#F5F5F559"
                  backdropFilter="blur(60px)"
                  bgOpacity="0.75"
                >
                  <Box bg="#576754" borderRadius={"12px"} boxShadow="dark-lg">
                    <Heading p={3} size="lg" color="white">
                      {" "}
                      In the Last Week:{" "}
                    </Heading>
                  </Box>
                  <Flex p={10}>
                    <Flex>
                      <Center w="100%">
                        <Heading fontSize="144">
                          {" "}
                          8{/* {getThisWeeksHoursTotal()}{" "} */}
                        </Heading>
                        <Heading mb={3} fontSize="lg">
                          total hours contributed by
                          <br />
                          SLO volunteers{" "}
                        </Heading>
                      </Center>
                    </Flex>
                    <Spacer />
                    <Flex>
                      <Center w="100%">
                        <Heading fontSize="144">
                          {" "}
                          {countVolunteersThisWeek()}{" "}
                        </Heading>
                        <Heading mb={3} fontSize="lg">
                          volunteers volunteered
                        </Heading>
                      </Center>
                    </Flex>
                  </Flex>
                </Box>
                <Box>
                  <Flex p={10}>
                    <Box
                      bg="#576754"
                      w="30%"
                      borderRadius={"12px"}
                      boxShadow="dark-lg"
                      backdropFilter="blur(60px)"
                    >
                      <Flex>
                        <Center w="100%">
                          <Heading fontSize="90px" color="#CCDDBD">
                            {" "}
                            {getThisWeeksHoursTotalByDepartment(
                              "Maintenance"
                            )}{" "}
                          </Heading>
                          <Heading fontSize="20px" color="#CCDDBD">
                            {" "}
                            HRS{" "}
                          </Heading>
                        </Center>
                      </Flex>
                      <Heading pb={3} fontSize="20px" color="#CCDDBD">
                        {" "}
                        In Maintenance{" "}
                      </Heading>
                    </Box>
                    <Spacer />
                    <Box
                      bg="#576754"
                      w="30%"
                      borderRadius={"12px"}
                      boxShadow="dark-lg"
                      backdropFilter="blur(60px)"
                    >
                      <Flex>
                        <Center w="100%">
                          <Heading fontSize="90px" color="#CCDDBD">
                            {" "}
                            {getThisWeeksHoursTotalByDepartment("Garden")}{" "}
                          </Heading>
                          <Heading fontSize="20px" color="#CCDDBD">
                            {" "}
                            HRS{" "}
                          </Heading>
                        </Center>
                      </Flex>
                      <Heading pb={3} fontSize="20px" color="#CCDDBD">
                        {" "}
                        In the Garden{" "}
                      </Heading>
                    </Box>
                    <Spacer />
                    <Box
                      bg="#576754"
                      w="30%"
                      borderRadius={"12px"}
                      boxShadow="dark-lg"
                      backdropFilter="blur(60px)"
                    >
                      <Flex>
                        <Center w="100%">
                          <Heading fontSize="90px" color="#CCDDBD">
                            {" "}
                            {getThisWeeksHoursTotalByDepartment(
                              "Propagation"
                            )}{" "}
                          </Heading>
                          <Heading fontSize="20px" color="#CCDDBD">
                            {" "}
                            HRS{" "}
                          </Heading>
                        </Center>
                      </Flex>
                      {console.log("currentUserInfo in home")}
                      {console.log(currentUserInfo)}
                      <Heading pb={3} fontSize="20px" color="#CCDDBD">
                        {" "}
                        In Propagation{" "}
                      </Heading>
                    </Box>
                  </Flex>
                  <Flex p={10}>
                    <Box
                      bg="#576754"
                      w="30%"
                      borderRadius={"12px"}
                      boxShadow="dark-lg"
                      backdropFilter="blur(60px)"
                    >
                      <Flex>
                        <Center w="100%">
                          <Heading fontSize="90px" color="#CCDDBD">
                            {" "}
                            {getThisWeeksHoursTotalByDepartment(
                              "Outreach"
                            )}{" "}
                          </Heading>
                          <Heading fontSize="20px" color="#CCDDBD">
                            {" "}
                            HRS{" "}
                          </Heading>
                        </Center>
                      </Flex>
                      <Heading pb={3} fontSize="20px" color="#CCDDBD">
                        {" "}
                        In Outreach{" "}
                      </Heading>
                    </Box>
                    <Spacer />
                    <Box
                      bg="#576754"
                      w="30%"
                      borderRadius={"12px"}
                      boxShadow="dark-lg"
                      backdropFilter="blur(60px)"
                    >
                      <Flex>
                        <Center w="100%">
                          <Heading fontSize="90px" color="#CCDDBD">
                            {" "}
                            {getThisWeeksHoursTotalByDepartment(
                              "Education"
                            )}{" "}
                          </Heading>
                          <Heading fontSize="20px" color="#CCDDBD">
                            {" "}
                            HRS{" "}
                          </Heading>
                        </Center>
                      </Flex>
                      <Heading pb={3} fontSize="20px" color="#CCDDBD">
                        {" "}
                        In Education{" "}
                      </Heading>
                    </Box>
                    <Spacer />
                    <Box
                      bg="#576754"
                      w="30%"
                      borderRadius={"12px"}
                      boxShadow="dark-lg"
                      backdropFilter="blur(60px)"
                    >
                      <Flex>
                        <Center w="100%">
                          <Heading fontSize="90px" color="#CCDDBD">
                            {" "}
                            {getThisWeeksHoursTotalByDepartment(
                              "Administration"
                            )}{" "}
                          </Heading>
                          <Heading fontSize="20px" color="#CCDDBD">
                            {" "}
                            HRS{" "}
                          </Heading>
                        </Center>
                      </Flex>
                      <Heading pb={3} fontSize="20px" color="#CCDDBD">
                        {" "}
                        In Administration{" "}
                      </Heading>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
}
