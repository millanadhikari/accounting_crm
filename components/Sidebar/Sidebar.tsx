import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Spacer,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  Slide,
  Fade,
} from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  SettingsIcon,
  Search2Icon,
  DragHandleIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import SidebarMenu from "./Menu/SidebarMenu";
import SpaceAccordion from "./Sidebar_Accordion/SpaceAccordion";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { BsToggleOn } from "react-icons/bs";
import { userLogout } from "../api/userApi";
import { useRouter } from "next/router";
import { getSidebarStatus } from "../user/userSlice";
import { getUserProfile } from "../user/userAction";
import withAuth from '../privateRoute/withAuth'
const Sidebar = () => {
  const user = useAppSelector((state) => state.user) || false;

  const sidebarOpen =
    useAppSelector((state) => state.user.sidebarOpen) || false;
  const dispatch = useAppDispatch();

  const Router = useRouter();

  const handleSidebar = () => {
    dispatch(getSidebarStatus(!sidebarOpen));
  };
  const logmeOut = () => {
    sessionStorage.removeItem("accessJWT");
    localStorage.removeItem("service_ecommerce");
    userLogout();
    Router.replace("/login");
  };

  useEffect(() => {
    dispatch(getUserProfile())
  }, [])

  return (
    <Box
      position="fixed"
      top="0"
      w={sidebarOpen ? "300px" : "80px"}
      h="100vh"
      borderRight="1px solid "
      borderColor="gray.200"
      fontFamily="sans-serif"
    >
      <Flex p={5} pt={2} alignItems="center">
        <Flex alignItems="center">
          <Image
            src="https://app-cdn.clickup.com/assets/images/brand/clickup-symbol_color.svg"
            w={!sidebarOpen ? 5 : 6}
            h={sidebarOpen ? 7 : 6}
            mr={sidebarOpen ? 2 : 6}
            ml={!sidebarOpen && "2.5"}
            objectFit="contain"
          />
          {sidebarOpen && (
            <Text fontWeight="bold" fontSize="1.3rem">
              CRM-B
            </Text>
          )}
        </Flex>
        <Spacer />
        <Flex alignItems="center">
          {sidebarOpen && (
            <IconButton
              backgroundColor="white"
              aria-label="Search database"
              textAlign="center"
              icon={
                <SettingsIcon w={4} h={4} cursor="pointer" color="#7b68ee" />
              }
            />
          )}
          <IconButton
            backgroundColor="white"
            aria-label="Search database"
            textAlign="center"
            _focus={{active:"none"}}
            onClick={handleSidebar}
            ml={!sidebarOpen && "2" || " 0"}
            icon={
             sidebarOpen ?  <ArrowLeftIcon
             w={3}
             h={3}
             cursor="pointer"
             color="#7b68ee" 
           /> :  <ArrowRightIcon
           w={3}
           h={3}
           cursor="pointer"
           color="#7b68ee" 
         />
            }
          />
        </Flex>
      </Flex>
      {sidebarOpen && (
        <Flex px={5}>
          <InputGroup w="80%" size="sm">
            <InputLeftAddon children={<Search2Icon />} />
            <Input
              placeholder="Search"
              variant="filled"
              focusBorderColor="gray.100"
            />
          </InputGroup>
          <Spacer />
          <IconButton
            backgroundColor="gray.100"
            aria-label="Search database"
            textAlign="center"
            size="sm"
            
            icon={
              <DragHandleIcon
                w={3}
                h={3}
                cursor="pointer"
                color="#7b68ee"
                fontSize="5px"
              />
            }
          />
        </Flex>
      )}
      <SidebarMenu />
      {sidebarOpen && (
        <Box mt="20rem">
          <SpaceAccordion />
        </Box>
      )}
      <Flex
        w={sidebarOpen ? "300px" : "80px"}
        position="fixed"
        bottom="0"
        justifyContent="space-between"
        px={5}
        py={3}
        borderTop="1px solid gray"
        borderBottom="1px solid gray"
        borderColor="gray.300"
        alignItems="center"
        color="gray.400"
      >
        <Popover>
          <PopoverTrigger>
            <Flex alignItems="center" cursor="pointer">
              <Flex
                position="relative"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontSize="13px"
                backgroundColor="red"
                rounded="full"
                h={9}
                w={9}
              >
                {user.user.name &&
                  user.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}{" "}
                <Box
                  backgroundColor="green.500"
                  border="0.5px solid white"
                  h={2}
                  w={2}
                  rounded="full"
                  position="absolute"
                  top="0"
                  right="0.5"
                ></Box>
              </Flex>
              <BiChevronDown />
            </Flex>
          </PopoverTrigger>
          <PopoverContent
            w="200px"
            ml={10}
            top={10}
            _focus={{ border: "1px solid gray", borderColor: "gray.200" }}
          >
            <Box>
              <PopoverCloseButton />
            </Box>
            <Flex mt={5} mx={5} alignItems="center">
              <Flex
                position="relative"
                mr={2}
                alignItems="center"
                justifyContent="center"
                color="white"
                fontSize="10px"
                backgroundColor="red"
                rounded="full"
                h={8}
                w={8}
              >
                {user.user.name &&
                  user.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}{" "}
                <Box
                  backgroundColor="green.500"
                  border="0.5px solid white"
                  h={2}
                  w={2}
                  rounded="full"
                  position="absolute"
                  top="0"
                  right="0.5"
                ></Box>
              </Flex>
              <Text
                fontSize="12px"
                fontFamily="sans-serif"
                fontWeight="semibold"
                color="gray.600"
              >
                {user.user.name}
              </Text>
            </Flex>
            <Box
              fontSize="13px"
              letterSpacing="0.3px"
              fontFamily="sans-serif"
              fontWeight="light"
              color="gray.600"
              my={5}
              px={6}
            >
              <Flex
                cursor="pointer"
                direction="column"
                gap={2}
                borderBottom="1px solid gray"
                borderColor="gray.300"
                pb={4}
              >
                <Text>My Settings</Text>
                <Text>Notifications</Text>
                <Text>Apps</Text>
                <Text>My Settings</Text>
              </Flex>

              <Flex direction="column" gap={2} mt={4} cursor="pointer">
                <Text onClick={logmeOut}>Logout</Text>
                <Text>Help</Text>
                <Flex alignItems="center" justifyContent="space-between">
                  Dark Mode
                  <Box fontSize="18px" color="gray.400">
                    <BsToggleOn />
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </PopoverContent>
        </Popover>
        {/* {JSON.stringify(user)} */}

        {sidebarOpen && (
          <Box _hover={{ color: "purple.600" }} cursor="pointer">
            <AiOutlineQuestionCircle fontSize="20px" />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default withAuth(Sidebar)
