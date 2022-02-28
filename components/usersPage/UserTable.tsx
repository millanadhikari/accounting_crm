import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const UserTable = ({ user }: any) => {
  return (
    <Flex
      px="8"
      my={4}
      fontSize="14px"
      backgroundColor="white"
      rounded="md "
      py={4}
      alignItems="center"
      _hover={{ shadow: "lg" }}
      cursor="pointer"
    >
      <Flex minWidth="275" alignItems="center">
        <Box mr={4}>
          {user.photo ? (
            <Image h={12} w={12} rounded="full" src={user.photo} />
          ) : (
            <Flex
              border="1px solid gray"
              rounded="full"
              alignItems="center"
              p="3"
            >
              MA
            </Flex>
          )}
        </Box>
        <Box color="gray.500">
          <Text fontWeight="semibold"> {user.name}</Text>
          <Text fontWeight="semibold" color="gray.400" fontSize="13px">
           {user.email}
          </Text>
        </Box>
      </Flex>
      <Flex minWidth="250" color="gray.400" gap="2">
        {user.isSuperAdmin ? (
          <Flex
            border="1px solid gray"
            w="110px"
            alignItems="center"
            justifyContent="center"
            p={1}
            rounded="lg"
            backgroundColor="blue.50"
            borderColor="blue.200"
            color="blue.400"
            fontSize="14px"
          >
            SuperAdmin
          </Flex>
        ) : undefined}
        {user.isTeam ?   <Flex
            border="1px solid gray"
            w="80px"
            alignItems="center"
            justifyContent="center"
            p={1}
            rounded="lg"
            backgroundColor="green.50"
            borderColor="green.200"
            color="green.500"
            fontSize="14px"
          >
            Team
          </Flex> : undefined}
      </Flex>
      <Text minWidth="264" color="gray.400">
        Sydney, Australia
      </Text>
      <Text>0434343433</Text>
    </Flex>
  );
};

export default UserTable;
