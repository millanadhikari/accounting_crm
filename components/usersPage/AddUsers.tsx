import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addUser } from "./usersAction";
import { useToast } from "@chakra-ui/react";

export const AddUsers = ({ addUsers, setAddUsers }: any) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    address: "",
    isSuperAdmin: false,
    isTeam: false,
  });
  const isLoading = useAppSelector((state) => state.users.createUserLoading);

  const toast = useToast();
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const final = await dispatch(addUser(contact));
    final?.success &&
      (setAddUsers(!addUsers),
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      }),
      setContact({
        name: "",
        email: "",
        password: "",
        dob: "",
        phone: "",
        address: "",
        isSuperAdmin: false,
        isTeam: false,
      }));
  };

  useEffect(() => {
    console.log(contact);
  }, [contact]);
  return (
    <Box>
      <Drawer
        isOpen={addUsers}
        onClose={() => setAddUsers(!addUsers)}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="gray.100" mt={1.5} />
          <DrawerHeader
            backgroundColor="#7c68ee"
            color="gray.100"
            _focus={{ border: "none" }}
          >
            Add a new User
          </DrawerHeader>

          <DrawerBody>
            <form
              id="my-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Box mt={8}>
                <Flex
                  alignItems="center"
                  color="gray.500"
                  gap={3}
                  fontSize="20px"
                  mb={5}
                >
                  <BsPersonCircle />
                  <Text
                    fontSize="16px"
                    letterSpacing="1.2px"
                    fontWeight="semibold"
                    color="gray.500"
                  >
                    CONTACT DETAILS s{" "}
                  </Text>
                </Flex>
                <Flex flexDirection="column" gap={5} mx={8} color="gray.500">
                  <Flex>
                    <FormLabel minWidth="80px">
                      <Flex alignItems="center">
                        <Text>Full Name</Text>
                        <Text fontSize="11px" ml={1} color="red">
                          *
                        </Text>
                      </Flex>
                    </FormLabel>
                    <Input
                      size="sm"
                      maxWidth="300"
                      name="nickname"
                      value={contact.name}
                      onChange={(e) =>
                        setContact({ ...contact, name: e.target.value })
                      }
                      placeholder="incl. middle name "
                    />
                  </Flex>
                  <Flex alignItems="center">
                    <FormLabel minWidth="80px">
                      <Flex alignItems="center">
                        Email{" "}
                        <Text fontSize="11px" ml={1} color="red">
                          *
                        </Text>
                      </Flex>
                    </FormLabel>
                    <Input
                      size="sm"
                      maxWidth="300"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      name="email"
                      placeholder="e.g. ram@gmail.com"
                    />
                  </Flex>
                  <Flex alignItems="center">
                    <FormLabel minWidth="80px">
                      <Flex alignItems="center">
                        Dob <Text color="gray">*</Text>
                      </Flex>
                    </FormLabel>
                    <Input
                      size="sm"
                      maxWidth="300"
                      name="dob"
                      value={contact.dob}
                      onChange={(e) =>
                        setContact({ ...contact, dob: e.target.value })
                      }
                      placeholder="MM/DD/YY"
                    />
                  </Flex>
                  <Flex alignItems="center">
                    <FormLabel minWidth="80px">
                      <Flex alignItems="center">
                        Phone{" "}
                        <Text fontSize="11px" ml={1} color="red">
                          *
                        </Text>
                      </Flex>
                    </FormLabel>
                    <Input
                      size="sm"
                      maxWidth="300"
                      value={contact.phone}
                      onChange={(e) =>
                        setContact({ ...contact, phone: e.target.value })
                      }
                      name="dob"
                      placeholder="e.g. +6128417676"
                    />
                  </Flex>
                  <Flex alignItems="center">
                    <FormLabel minWidth="80px">
                      <Flex alignItems="center">
                        Address{" "}
                        <Text fontSize="11px" ml={1} color="red">
                          *
                        </Text>
                      </Flex>
                    </FormLabel>
                    <Input
                      size="sm"
                      maxWidth="300"
                      value={contact.address}
                      onChange={(e) =>
                        setContact({ ...contact, address: e.target.value })
                      }
                      name="Address"
                      placeholder="Address"
                    />
                  </Flex>
                </Flex>
              </Box>
              <Box mt={8}>
                <Flex
                  alignItems="center"
                  color="gray.500"
                  gap={3}
                  fontSize="20px"
                  mb={5}
                >
                  <BsPersonCircle />
                  <Text
                    fontSize="16px"
                    letterSpacing="1.2px"
                    fontWeight="semibold"
                    color="gray.500"
                  >
                    LOGIN DETAILS
                  </Text>
                </Flex>
                <Flex flexDirection="column" gap={5} mx={8} color="gray.500">
                  <Flex alignItems="center">
                    <Flex alignItems="center" mr={7}>
                      Username{" "}
                    </Flex>

                    <Text>{contact.email}</Text>
                  </Flex>
                  <Flex alignItems="center">
                    <Flex alignItems="center" mr={7}>
                      Password
                    </Flex>

                    <Input
                      size="sm"
                      maxWidth="300"
                      value={contact.password}
                      onChange={(e) =>
                        setContact({ ...contact, password: e.target.value })
                      }
                      name="email"
                      placeholder="password"
                    />
                  </Flex>
                  <Flex alignItems="center">
                    <Flex alignItems="center" mr={4}>
                      User Level{" "}
                    </Flex>
                    <Box>
                      {/* <Select>
                        <option
                          onChange={(e) => setContact({...contact, isTeam:true})}
                          onClick={() =>
                            setContact({ ...contact, isTeam: true })
                          
                          }
                          value="isTeam"
                        >
                          Team
                        </option>
                        <option
                          onClick={() =>
                            setContact({ ...contact, isSuperAdmin: true })
                          }
                          value="isSuperAdmin"
                        >
                          Super Admin
                        </option>
                      </Select> */}
                      <Flex alignItems="center">
                        <input
                          type="radio"
                          name="myRadios"
                          value="1"
                          onChange={() =>
                            setContact({
                              ...contact,
                              isTeam: true,
                              isSuperAdmin: false,
                            })
                          }
                        />
                        <Text ml={2}>Team</Text>
                      </Flex>
                      <Flex alignItems="center">
                        <input
                          type="radio"
                          name="myRadios"
                          value="2"
                          onChange={() =>
                            setContact({
                              ...contact,
                              isSuperAdmin: true,
                              isTeam: false,
                            })
                          }
                        />
                        <Text ml={2}>Super Admin</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button
              type="submit"
              form="my-form"
              onClick={handleClick}
              isLoading={isLoading}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
