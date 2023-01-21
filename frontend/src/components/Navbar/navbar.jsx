import React, { useContext } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import {
  Box,
  Flex,
  Image,
  Spacer,
  HStack,
  Heading,
  Link,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import vector from "../../assets/vector.png";
import userIcon from "../../assets/user-icon.png";
import { GlobalContext } from "../../GlobalState";

export default function Navbar() {
  const navigate = useNavigate();
  const { setCurrentUser, currentUserInfo } = useContext(GlobalContext);

  async function signOut() {
    try {
      setCurrentUser({});
      await Auth.signOut({ global: true });
      navigate("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const getVolunteerOption = () => {
    //
    if (currentUserInfo.is_Admin === "True") {
      return (
        <div>
          <Box mr={2}>
            <Link
              as={ReactLink}
              _activeLink={{ fontWeight: "bold" }}
              to="/volunteer"
            >
              {" "}
              <Heading size="lg" color="white">
                {" "}
                Volunteers{" "}
              </Heading>{" "}
            </Link>
          </Box>
        </div>
      );
    }

    return null;
  };

  return (
    <Flex pt={5} pb={5} bg="#CCDDBD">
      <HStack pl={10}>
        <Box>
          <Image objectFit="cover" src={logo} />
        </Box>
        <Box>
          <Image src={vector} />
        </Box>
        <Box p={2}>
          <Heading color="white" size="lg">
            {" "}
            Volunteer Database{" "}
          </Heading>
        </Box>
      </HStack>
      <Spacer />
      <HStack pr={10}>
        <Box mr={2}>
          <Link as={ReactLink} _activeLink={{ fontWeight: "bold" }} to="/">
            {" "}
            <Heading size="lg" color="white">
              {" "}
              Home{" "}
            </Heading>{" "}
          </Link>
        </Box>
        {getVolunteerOption()}
        <Box>
          <Link as={ReactLink} to="/profile">
            {" "}
            <Heading size="lg" color="white">
              {" "}
              Profile{" "}
            </Heading>{" "}
          </Link>
        </Box>
        <Box>
          <Link as={ReactLink} onClick={signOut} to="/">
            {" "}
            <Heading size="lg" color="white">
              {" "}
              Sign Out{" "}
            </Heading>{" "}
          </Link>
        </Box>
        <Box>
          <Image src={userIcon} />
        </Box>
      </HStack>
    </Flex>
  );
}
