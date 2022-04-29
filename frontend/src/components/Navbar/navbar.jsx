import React from "react";
import logo from "../../assets/logo.png";
import vector from "../../assets/vector.png";
import userIcon from "../../assets/user-icon.png";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import {
  Box,
  Text,
  Flex,
  Image,
  Spacer,
  HStack,
  Heading,
  Button,
  Link,
} from "@chakra-ui/react";

export default function Navbar(props) {
  const navigate = useNavigate();

  async function signOut() {
    try {
      await Auth.signOut({ global: true });
      navigate("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
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
          <Image src={userIcon} />
        </Box>
        <Box>
          <button onClick={signOut}>Sign Out </button>
        </Box>
      </HStack>
    </Flex>
  );
}
