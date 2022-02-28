import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

const Todo = () => {
  return (
    <Box>
        <Box>
             <Flex>
                 <Box>Today</Box>
                 <Box>Task</Box>
                 <Box>Reminder</Box>

             </Flex>
            
        </Box>
        <Box>
             <Flex>
                 <Box>Overdue</Box>
                 <Box>Task</Box>
                 <Box>Reminder</Box>

             </Flex>
            
        </Box>
        <Box>
             <Flex>
                 <Box>Next</Box>
                 <Box>Task</Box>
                 <Box>Reminder</Box>

             </Flex>
            
        </Box>
        <Box>
             <Flex>
                 <Box>Unscheduled</Box>
                 <Box>Task</Box>

             </Flex>
            
        </Box>
        
    </Box>
  )
}

export default Todo