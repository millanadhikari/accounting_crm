import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

const LineUp = () => {
    return (
        <Flex pt='90px' >
            <Box w="50%">
                <Flex alignItems='center' gap={10}>
                    <Heading fontSize='24px' fontWeight='500' lineHeight='1' color='#292d34' >LineUp</Heading>
                    <Text>(0)</Text>
                </Flex>
                <Box mt='5' cursor='pointer' backgroundColor="#f6f7f9" color='gray.300' fontSize='13px' fontWeight="semibold" px='3px' py='4px' borderRadius='3px' >
                    <Flex border='1px #b9bec7 dashed'  justifyContent="center"  py='7px' borderRadius='7px'>
                        <Text mr={3}>+</Text>
                        <Text color="#7c828d">Add your important tasks</Text>
                    </Flex>
                </Box>
            </Box>
            <Box ml={8} w='40%'>
                <Flex alignItems='center' gap={10}>
                    <Heading fontSize='24px' fontWeight='500' lineHeight='1' color='#292d34'>Trending</Heading>
                    <Text>(1)</Text>
                </Flex>
                <Box mt='5' fontSize='13px' fontWeight="semibold" py='4px' px='3px'  >
                    <Flex border='1px #b9bec7 solid'  justifyContent="center"  py='7px' borderRadius='4px'>
                        <Text mr={3}>+</Text>
                        <Text color="#7c828d">you have no trending task</Text>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    )
}

export default LineUp