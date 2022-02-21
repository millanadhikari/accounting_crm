import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Collapse, Flex, Input } from '@chakra-ui/react'
import { AddIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import SpaceMenuAccordion from './SpaceMenuAccordion'
import { Space } from './spaceMode'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import {createNewSpace, fetchAllSpaces} from '../../space/spaceAction'
import { createSpaceFail, createSpaceLoading, createSpaceSuccess } from '../../space/spaceSlice'
import Createspace from './Createspace'
import uuid from 'react-uuid'
import { GiConsoleController } from 'react-icons/gi'


const SpaceAccordion = () => {

    const [searchSpace, setSearchSpace] = useState<boolean>(false)
    const [showSpace, setShowSpace] = useState<boolean>(false)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [createSpace, setCreateSpace] = useState<boolean>(false)
    const [spaceInput, setSpaceInput] = useState<string>()

    const [spaces, setSpaces] = useState<Space[]>([
       
    ])
    const [name, setName] = useState<String>('milan')
    const dispatch = useAppDispatch()
    const databaseSpaces = useAppSelector((state) => state.space.spaces)



    const handleAdd = () => {
        setCreateSpace(!createSpace)

    }

    const addSpace = async (e:React.MouseEventHandler<SVGElement>) => {
        dispatch(createSpaceLoading())
       try {
           const result = await createNewSpace(
               {
                   _id:uuid(),
                   _name:spaceInput

               }
               )
            if (result.status === "error") {
                 dispatch(createSpaceFail(result.message) )
            } else {
                dispatch(createSpaceSuccess())
                dispatch(fetchAllSpaces())
                setCreateSpace(!createSpace)

            }
           

       } catch (error:any) {
           dispatch(createSpaceFail(error.message) )
       }


    }

    useEffect(() => {

        dispatch(fetchAllSpaces())
        setSpaces(databaseSpaces)
    }, [])
    return (
        <Box w="300px" position="relative" h="full"   onMouseMove={() => setShowMenu(true)}
        onMouseOut={() => setShowMenu(false)}>
            <h2>
                <Flex _expanded={{ color: 'black' }} w="18.8rem"
                alignItems="center"
                    color="gray.500" display="flex" px="4"
                    borderTop="1px solid gray"
                    borderColor="gray.300"
                    py="12px"
                    onClick={() => setShowSpace(!showSpace)}
                    _hover={{backgroundColor:"gray.100"}}
                    cursor="pointer" >
                    <Box flex='1' textAlign='left' fontSize="11px" fontWeight="semibold" >
                        SPACES
                    </Box>
                    <Box>
                        <SearchIcon mr="7px" _hover={{ color: "purple.500" }} onClick={() => setSearchSpace(!searchSpace)} />
                        {showSpace ? <ChevronDownIcon fontSize='sm' />
                            : <ChevronRightIcon fontSize='sm' onClick={() => setShowSpace(!showSpace)} />}
                    </Box>
                </Flex>



            </h2>
            <Collapse in={showSpace} animateOpacity>
                <Box border="none" pt={2} >
                <Box
                    backgroundColor="gray.100"
                    p="2" textAlign="center" fontSize="11px" fontWeight="bold" color="gray.400"
                    cursor="pointer"
                    onClick={handleAdd}
                    mx="4"
                    _hover={{backgroundColor:"gray.200"}}


                ><AddIcon fontSize="10px" mr="3"
                    /> 
                    NEW SPACE


                </Box>
                <Box top="0" left="0" max-h="100%" mt="2">
                    {databaseSpaces.map((space) => (
                        <SpaceMenuAccordion key={space._id} space={space} showMenu={showMenu} setShowMenu={setShowMenu} />

                    ))}
                </Box>
            </Box>
            </Collapse>

            {/* <AccordionItem>
                <h2>
                    <AccordionButton _expanded={{ color: 'black' }} w="18.8rem" color="gray.500" >
                        <Box flex='1' textAlign='left' fontSize="sm" fontWeight="semibold">
                            DOCS
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                </AccordionPanel>
            </AccordionItem> */}
            <Createspace createSpace={createSpace} setCreateSpace={setCreateSpace} spaceInput={spaceInput} setSpaceInput={setSpaceInput} addSpace={addSpace}/>
        </Box>
    )
}

export default SpaceAccordion
