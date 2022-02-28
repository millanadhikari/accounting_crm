import React, { useState } from "react";
import { Box, Flex, Icon, Link, Spacer, Text } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { AiFillHome, AiOutlineHome as Aioutlinehome } from "react-icons/Ai";
import { BiBellMinus } from "react-icons/Bi";
import { GiBowlingPropulsion } from "react-icons/Gi";
import { GiTargetPrize } from "react-icons/Gi";
import { useAppSelector } from "../../hooks/hooks";
import { useRouter } from "next/router";
import { BsBellFill, BsFillPeopleFill, BsPeople } from "react-icons/bs";

const SidebarMenu = () => {
  const [showLess, setShowLess] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<string>("home");
  const sidebarOpen = useAppSelector((state) => state.user.sidebarOpen) || undefined;
  const isSuperAdmin = useAppSelector((state) => state.user.isSuperAdmin)
  
  const router = useRouter();

  return (
    <Box
      position="absolute"
      color="gray.500"
      mt="20px"
      w={sidebarOpen ? "300px" : "80px"}
      fontSize="13px"
    >
      <Flex
        role="group"
        px="8"
        py="2"
        _hover={{
          backgroundColor: isActive === "home" ? "#e1ddf8" : "gray.100",
        }}
        backgroundColor={isActive === "home" ? "#e1ddf8" : undefined}
        w="100%"
        alignItems="center"
        borderLeft={isActive === "home" ? "4px solid black" : undefined}
        borderColor="#7c68ee"
        cursor="pointer"
        fontSize="13px"
        letterSpacing="0.5px"
        onClick={() => {
          router.push("/home"), setIsActive("home");
        }}
      >
        <Icon
          fontSize="20px"
          aria-label="Search database"
          textAlign="center"
          color={isActive === "home" ? "#7c68ee" : "none"}
          mr="3"
          as={isActive === "home" ? AiFillHome : Aioutlinehome}
        />

        <Text
          fontWeight={isActive === "home" ? "semibold" : "none"}
          color={isActive === "home" ? "#7c68ee" : "none"}
        >
          {sidebarOpen && "Home"}
        </Text>
      </Flex>
      <Flex
        role="group"
        px="8"
        py="2"
        _active={{ backgroundColor: "purple" }}
        _hover={{
          backgroundColor:
            isActive === "notifications" ? "#e1ddf8" : "gray.100",
        }}
        backgroundColor={isActive === "notifications" ? "#e1ddf8" : undefined}
        borderLeft={
          isActive === "notifications" ? "4px solid black" : undefined
        }
        borderColor="#7c68ee"
        w="100%"
        alignItems="center"
        cursor="pointer"
        fontSize="13px"
        letterSpacing="0.5px"
        onClick={() => {
          router.push("/notifications"), setIsActive("notifications");
        }}
      >
        <Icon
          fontSize="20px"
          aria-label="Search database"
          color={isActive === "notifications" ? "#7c68ee" : "none"}
          textAlign="center"
          mr="3"
          as={isActive === "notifications" ? BsBellFill : BiBellMinus}
        />
        <Text
          fontWeight={isActive === "notifications" ? "semibold" : "none"}
          color={isActive === "notifications" ? "#7c68ee" : "none"}
        >
          {" "}
          {sidebarOpen && "Notifications"}
        </Text>
      </Flex>
      {showLess && (
        <Box>
          {isSuperAdmin && (
            <Flex
              role="group"
              px="8"
              py="2"
              _hover={{
                backgroundColor: isActive === "users" ? "#e1ddf8" : "gray.100",
              }}
              backgroundColor={isActive === "users" ? "#e1ddf8" : undefined}
              w="100%"
              alignItems="center"
              borderLeft={isActive === "users" ? "4px solid black" : undefined}
              borderColor="#7c68ee"
              cursor="pointer"
              fontSize="13px"
              letterSpacing="0.5px"
              onClick={() => {
                router.push("/users"), setIsActive("users");
              }}
            >
              <Icon
                fontSize="20px"
                aria-label="Search database"
                textAlign="center"
                color={isActive === "users" ? "#7c68ee" : "none"}
                mr="3"
                as={isActive === "users" ? BsFillPeopleFill : BsPeople}
              />

              <Text
                fontWeight={isActive === "users" ? "semibold" : "none"}
                color={isActive === "users" ? "#7c68ee" : "none"}
              >
                {sidebarOpen && "Users"}
              </Text>
            </Flex>
          )}
          <Link href="/admin/bookings">
            <Flex
              role="group"
              px="8"
              py="2"
              _hover={{ backgroundColor: "gray.100" }}
              w="100%"
              alignItems="center"
              cursor="pointer"
              fontSize="13px"
              letterSpacing="0.5px"
            >
              <Icon
                textDecoration="none"
                _hover={{ background: "gray.100" }}
                fontSize="20px"
                _groupHover={{ backgroundColor: "gray.100" }}
                backgroundColor="white"
                aria-label="Search database"
                textAlign="center"
                mr="3"
                as={GiTargetPrize}
              />
              {sidebarOpen && "Bookings"}
            </Flex>
          </Link>
        </Box>
      )}
      {showLess ? (
        <Box onClick={() => setShowLess(!showLess)}>
          <Flex
            role="group"
            px="8"
            py="2"
            _hover={{ backgroundColor: "gray.100" }}
            w="100%"
            alignItems="center"
            cursor="pointer"
            fontSize="13px"
            letterSpacing="0.5px"
          >
            <Icon
              _hover={{ background: "gray.100" }}
              fontSize="20px"
              _groupHover={{ backgroundColor: "gray.100" }}
              backgroundColor="white"
              aria-label="Search database"
              textAlign="center"
              mr="3"
              as={ArrowUpIcon}
            />
            {sidebarOpen && "Show less"}
          </Flex>
        </Box>
      ) : (
        <Box onClick={() => setShowLess(!showLess)}>
          <Flex
            role="group"
            px="8"
            py="2"
            _hover={{ backgroundColor: "gray.100" }}
            w="100%"
            alignItems="center"
            cursor="pointer"
            fontSize="13px"
            letterSpacing="0.5px"
          >
            <Icon
              _hover={{ background: "gray.100" }}
              fontSize="20px"
              _groupHover={{ backgroundColor: "gray.100" }}
              backgroundColor="white"
              aria-label="Search database"
              textAlign="center"
              mr="3"
              as={ArrowDownIcon}
            />
            {sidebarOpen && "Show more"}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default SidebarMenu;
