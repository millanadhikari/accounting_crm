import React, { useState } from 'react'
import { Box, Flex, Icon, Link, Spacer } from '@chakra-ui/react'
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'
import {  AiOutlineHome as Aioutlinehome } from 'react-icons/Ai'
import { BiBellMinus } from 'react-icons/Bi'
import { GiBowlingPropulsion } from 'react-icons/Gi'
import { GiTargetPrize } from 'react-icons/Gi'
import { useAppSelector } from '../../hooks/hooks'

const SidebarMenu = () => {

    const [showLess, setShowLess] = useState<boolean>(false);
    const sidebarOpen = useAppSelector((state) => state.user.sidebarOpen) || undefined;

    return (
        <Box position="absolute" color="gray.500" mt="20px"  w={sidebarOpen ? "300px" : "80px"}
        fontSize="13px" >
            <Flex
                role="group"
                px="8"
                py="2"
                _hover={{ backgroundColor: "gray.100" }}
                w="100%" alignItems="center" cursor="pointer"
                fontSize="13px" letterSpacing="0.5px" >
                <Icon
                    fontSize="20px" _groupHover={{ backgroundColor: "gray.100" }} backgroundColor="white" aria-label='Search database' textAlign="center" mr="3"
                    as={Aioutlinehome} />
                {sidebarOpen && "Home"}</Flex>
            <Flex role="group"
                px="8"
                py="2"
                _hover={{ backgroundColor: "gray.100" }}
                _active={{ backgroundColor: "purple" }}
                w="100%" alignItems="center" cursor="pointer"
                fontSize="13px" letterSpacing="0.5px" >
                <Icon
                    _hover={{ background: "gray.100" }} fontSize="20px" _groupHover={{ backgroundColor: "gray.100" }} backgroundColor="white" aria-label='Search database' textAlign="center" mr="3"
                    as={BiBellMinus} />{sidebarOpen && "Notifications"}</Flex>
            {showLess &&
                <Box>
                    <Flex role="group"
                        px="8"
                        py="2"
                        _hover={{ backgroundColor: "gray.100" }}
                        w="100%" alignItems="center" cursor="pointer"
                        fontSize="13px" letterSpacing="0.5px" >
                        <Icon
                            _hover={{ background: "gray.100" }} fontSize="20px" _groupHover={{ backgroundColor: "gray.100" }} backgroundColor="white" aria-label='Search database' textAlign="center" mr="3"
                            as={GiBowlingPropulsion} />{sidebarOpen && "Pulse"}</Flex>
                    <Link href='/admin/bookings'><Flex role="group"
                        px="8"
                        py="2"
                        _hover={{ backgroundColor: "gray.100" }}
                        w="100%" alignItems="center" cursor="pointer"
                        fontSize="13px" letterSpacing="0.5px" >
                        <Icon  textDecoration="none"
                            _hover={{ background: "gray.100" }} fontSize="20px" _groupHover={{ backgroundColor: "gray.100" }} backgroundColor="white" aria-label='Search database' textAlign="center" mr="3"
                            as={GiTargetPrize} />{sidebarOpen && "Bookings"}</Flex></Link>
                </Box>}
            {showLess ?
                <Box onClick={() => setShowLess(!showLess)}>
                    <Flex role="group"
                        px="8"
                        py="2"
                        _hover={{ backgroundColor: "gray.100" }}
                        w="100%" alignItems="center" cursor="pointer"
                        fontSize="13px" letterSpacing="0.5px" >
                        <Icon
                            _hover={{ background: "gray.100" }} fontSize="20px" _groupHover={{ backgroundColor: "gray.100" }} backgroundColor="white" aria-label='Search database' textAlign="center" mr="3"
                            as={ArrowUpIcon} />{sidebarOpen && "Show less"}</Flex>
                </Box> :
                <Box onClick={() => setShowLess(!showLess)}>
                    <Flex role="group"
                        px="8"
                        py="2"
                        _hover={{ backgroundColor: "gray.100" }}
                        w="100%" alignItems="center" cursor="pointer"
                        fontSize="13px" letterSpacing="0.5px" >
                        <Icon
                            _hover={{ background: "gray.100" }} fontSize="20px" _groupHover={{ backgroundColor: "gray.100" }} backgroundColor="white" aria-label='Search database' textAlign="center" mr="3"
                            as={ArrowDownIcon} />{sidebarOpen && "Show more"}</Flex>
                </Box>}
        </Box>
    )
}


export default SidebarMenu