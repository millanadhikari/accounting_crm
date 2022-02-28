import { background, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from 'react'
import Todo from './Todo'

const MyWork = () => {
  return (
    <Box mt='10'>
        <Box> <Heading fontSize='24px' fontWeight='500' lineHeight='1' color='#292d34' >My Work</Heading></Box>
        <Box mt='10'>
        <Tabs>
  <TabList >
    <Tab _focus={{outline:"none"}}>Todo</Tab>
    <Tab _focus={{outline:"none"}}>Comments</Tab>
    <Tab _focus={{outline:"none"}}>Done</Tab>
    <Tab _focus={{outline:"none"}}>Delegated</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <Todo/>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
    <TabPanel>
      <p>four</p>
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>
        
       
       
    </Box>
  )
}

export default MyWork