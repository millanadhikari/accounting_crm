import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";


interface Props { 
    createSpace:any
    setCreateSpace: any
}

const Createspace = ({createSpace, setCreateSpace, spaceInput, setSpaceInput, addSpace}) => {
  return (
    <Modal isOpen={createSpace} onClose={()=> setCreateSpace(!createSpace)}> 
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Space</ModalHeader>
        <ModalCloseButton onClose={()=> setCreateSpace(!createSpace)}/>
        <ModalBody>
            <Text fontWeight="semibold" fontSize="15px">Space name</Text>
            <Input value={spaceInput} onChange={(e)=> setSpaceInput(e.target.value) } mt={2} placeholder="Enter space name" size="sm"/>

        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={addSpace}>
            Save
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Createspace;
  