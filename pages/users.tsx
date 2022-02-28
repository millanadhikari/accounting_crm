import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import React from 'react'
import { AiOutlineFullscreen } from 'react-icons/ai';
import { BiRefresh } from 'react-icons/bi';
import { MdAlternateEmail } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../components/hooks/hooks';
import UsersList from '../components/usersPage/UsersList';

const users = () => {
    const dispatch = useAppDispatch()
    const sidebarOpen = useAppSelector((state) => state.user.sidebarOpen) || undefined;
  return (
    <Box
      pl={sidebarOpen ? "300px" : "100px"}
      backgroundColor="white"
      fontFamily="sans-serif"
      w="100%"
    >
      <Flex
        backgroundColor="white"
        border="1px solid gray"
        borderTop="none"
        borderLeft="none"
        borderColor="gray.200"
        alignItems="center"
        justifyContent="space-between"
        // py="2"
        fontSize="15px"
        pl="5"
        position="fixed"
        w="100%"
        pr={sidebarOpen ? 300 : 100}
      >
        <Heading  fontSize="14px" fontWeight="semibold" borderBottom="3px solid black" borderColor="blue.400" w="43px" h="28px" mt="4" >
          Users
        </Heading>
        <Flex alignItems="center" cursor="pointer" fontSize="12px">
          <Flex>
            <Flex
              // onClick={handleRefresh}
              pl="4"
              pr="4"
              _hover={{ backgroundColor: "gray.100", color: "blue.600" }}
              borderLeft="1px solid gray"
              borderColor="gray.200"
              py="12px"
              alignItems="center"
              justifyContent="center"
              color="gray.500"
            >
              <BiRefresh fontSize="18px" /> <Spacer ml="6px" />
              <Text>Refresh</Text>{" "}
            </Flex>

            <Flex
              alignItems="center"
              borderLeft="1px solid gray"
              borderColor="gray.200"
              _hover={{ backgroundColor: "gray.100", color: "blue.600" }}
              px="4"
            >
              <AiOutlineFullscreen />
            </Flex>
            <Flex
              pl="4"
              pr="4"
              _hover={{ backgroundColor: "gray.100", color: "blue.600" }}
              borderLeft="1px solid gray"
              borderColor="gray.200"
              py="12px"
              
              alignItems="center"
              justifyContent="center"
              color="gray.500"
            >
              <MdAlternateEmail /> <Spacer ml="6px" />
              <Text>Mentions(0) </Text>{" "}
            </Flex>
          </Flex>
        
        </Flex>
      </Flex>

      <Box backgroundColor="gray.100" py={20}>
            {/* <BookingList /> */}
            <UsersList/>
        </Box>
    </Box>
  )}
export default users