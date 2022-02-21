import React, { useState, useEffect } from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Collapse, Flex, Input, Text, Tooltip } from '@chakra-ui/react'
import { AddIcon, ChevronRightIcon, SearchIcon, UpDownIcon } from '@chakra-ui/icons'
import { Space, Folder, File } from './spaceMode'
import Folders from './Folders'
import { FiMoreHorizontal } from 'react-icons/fi'


interface Props {
    space: Space,
    showMenu: boolean,
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>
}



const SpaceMenuAccordion = ({ space, showMenu, setShowMenu }: Props) => {
    const [projectsMenu, setProjectsMenu] = useState<boolean>(false)
    const [folders, setFolders] = useState<Folder[]>([])
    const [files, setFiles] = useState<File[]>([])

    const handleFolder = () => {
        setFolders([...folders, { _id: 229, _name: 'magarni' }])
        console.log(folders)
    }



    useEffect(() => {
        console.log(showMenu)
    }, [showMenu])
    return (
        <Box
            zIndex="999"
        >
            <Box onClick={() => setProjectsMenu(!projectsMenu)} _hover={{ backgroundColor: 'gray.50' }} display="flex" alignItems="center" cursor="pointer" justifyContent="space-between" px="4" py="2"
            >
                {showMenu && <ChevronRightIcon color="gray.900" position={'absolute'} left="0" fontSize='xs' zIndex='1' onMouseEnter={() => setShowMenu(true)}
                    onMouseOut={() => setShowMenu(false)} />}
                <Box display="flex" alignItems="center">
                    <Tooltip label={space._name} placement='top'>
                        <Box
                            backgroundColor="red"
                            p="2" rounded="5px" mr="3" color="white"
                            w="28px"
                            h="26px"
                            textAlign="center"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="14px"
                            fontWeight="semibold">
                            {space._name.charAt(0).toUpperCase()}
                        </Box>
                    </Tooltip>
                    <Text fontSize="14px">{space._name}</Text>
                </Box>
                {showMenu && <Flex color="gray.400" onMouseEnter={() => setShowMenu(true)}
                    >
                    <Tooltip label='Space Settings' placement='top'>
                       <span> <FiMoreHorizontal fontSize="xs" /></span>
                    </Tooltip>
                    <Tooltip label='Create doc or list' placement="top" >
                        <AddIcon ml="2" fontSize="xs" onClick={() => console.log('hey')} />

                    </Tooltip>
                </Flex>
                }

            </Box>

            <Collapse in={projectsMenu} animateOpacity>
                <Box onClick={handleFolder}> Add Folder +
                    {folders.map((folder) => (
                        <Folders key={folder._id} folder={folder} showMenu={showMenu} setShowMenu={setShowMenu} />
                    ))}</Box></Collapse>

        </Box>
    )

}



export default SpaceMenuAccordion