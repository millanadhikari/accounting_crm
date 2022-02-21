import { AddIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Spacer, Text, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { AiFillFolder } from 'react-icons/Ai'
import { FiMoreHorizontal } from 'react-icons/fi'

import { Folder } from './spaceMode'

interface Props {
    folder: Folder,
    showMenu: boolean,
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const Folders = ({ folder, showMenu, setShowMenu }: Props) => {
    return (
        <Box display='flex' alignItems="center" color="gray.500" pl={10} pr={4} cursor="pointer" fontSize="sm"
            _hover={{ backgroundColor: 'gray.100' }} py={1}>
            <ChevronRightIcon mr={2} />
            <AiFillFolder />
            <Text ml={1}>{folder._name}</Text>
            <Spacer />
            {showMenu &&
                <Flex onMouseEnter={() => setShowMenu(true)}>
                    <Tooltip label={'Folder Settings'} placement='top'>
                        <span> d<FiMoreHorizontal />
                        </span>
                    </Tooltip>
                    <Tooltip label='Create List or Doc' placement='top'>
                        <AddIcon ml={3} fontSize='xs' />
                    </Tooltip>
                </Flex>}

        </Box>
    )
}

export default Folders
