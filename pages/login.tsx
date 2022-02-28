import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { userLogin } from "../components/api/userApi";
import { loginFail, loginPending, loginSuccess } from "../components/auth/loginSlice";
import { useAppDispatch, useAppSelector } from "../components/hooks/hooks";
import {BsFillPersonFill} from 'react-icons/bs'
import {AiFillLock} from 'react-icons/ai'
import {getUserProfile} from '../components/user/userAction'

interface isAuth { 
    message?:string
    status?:string

}
const login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errormsg, setErrormsg] = useState('')
    const router = useRouter()

    const {isLoading} = useAppSelector((state) => state.login)

    const dispatch = useAppDispatch();

    const handleClick = async (e:any)=>{
        
        // e.preventDefault()
        // if(!email || !password) { 
        //     alert ("Please fill in the blanks")
        //     return
        // }

        dispatch(loginPending())
        try { 
            const isAuth:any = await userLogin({email, password});
            if(isAuth?.status === "error") { 
                   dispatch(loginFail(isAuth.message));
                    setErrormsg(isAuth.message)
                
                
            } else {
            dispatch(loginSuccess())
            dispatch(getUserProfile())
            router.push("/home")
            }

        } catch(error:any) {
            dispatch(loginFail(error.message));
            setErrormsg(error.message);
        }
      
    }

  return (
    <Flex
      flexDirection="column"
      backgroundColor="gray.100"
      h="100vh"
      w="100%"
      pt="10"
      alignItems="center"
    >
      <Image
        src="https://my.alltel.com.au/assets/images/myalltel-logo.svg"
        alt="account-crm"
        h="50px"
      />
      <Box my="40px" backgroundColor="white" rounded="md">
        <Image
          src="https://my.alltel.com.au/assets/images/Phone%20system-MyAlltel-login%20banner.png"
          alt="crm"
          h="160px"
        />
        <Box my="10" px="6">
          <Heading fontSize="16px">Secure Login</Heading>
          <Text mt="8px" fontSize="13px" color="red.500" fontWeight="semibold">{errormsg && errormsg + '*'}</Text>
          <Text mt="8" color="gray.600">Email</Text>
          <InputGroup mt="3" >
            <Input _focus={{border:"gray.300"}} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputRightElement backgroundColor="gray.200" children={<BsFillPersonFill color="green.500" />} />
          </InputGroup>
          <Text  mt="6" color="gray.600">Password</Text>
          <InputGroup mt="3" >
            <Input _focus={{border:"gray.300"}} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}  />
            <InputRightElement backgroundColor="gray.200" children={<AiFillLock color="green.500" />} />
          </InputGroup>
          <Flex textAlign="right" justifyContent="flex-end" w="100%" my="5" color="blue.400" fontSize="14px" cursor="pointer" _hover={{textDecoration:"underline"}}  >Forgot Password?</Flex>
          <Button w="100%" isLoading={isLoading} colorScheme="twitter" fontWeight="light" color="gray.50" onClick={(e)=>handleClick(e)}>Login</Button>
        </Box>
        <Box px="6" fontSize="14px" mb="8" color="gray.500"  >
          <Text>2022 Accounting CRM Pty Ltd. All Rights reserved </Text>
          <Text cursor="pointer" color="blue.500">Terms of service</Text>
      </Box>
      </Box>
      
    </Flex>
  );
};

export default login;
