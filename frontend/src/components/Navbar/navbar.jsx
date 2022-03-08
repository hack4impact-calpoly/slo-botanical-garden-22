import React from "react";
import logo from "../../assets/logo.png";
import vector from "../../assets/vector.png";
import userIcon from "../../assets/user-icon.png";
import { Link as ReactLink } from 'react-router-dom';
import { Box, Text, Flex, Image, Spacer, HStack, Heading, Button, Link} from '@chakra-ui/react';

export default function Navbar() {
  return (
      <Flex bg='#CCDDBD'>
        <HStack>
            <Box p={2}>
                <Image src={ logo } />
            </Box>
            <Box mr={2}>
                <Image src={ vector } />
            </Box>
            <Box p={2}>
                <Heading size='xl'> Volunteer Database </Heading>
            </Box>
        </HStack>
        <Spacer />
        <HStack>
            <Box mr={2}>
                <Link as={ ReactLink } _activeLink={{fontWeight:"bold"}} to='/'> <Heading size='xl' color='white'> Home </Heading> </Link>
            </Box>
            <Box>
                <Link as={ ReactLink } to='/profile'> <Heading size='xl' color='white'> Profile </Heading> </Link>
            </Box>
            <Box p={2}>
                <Image src={ userIcon } />
            </Box>
        </HStack>
      </Flex>
  );
}
