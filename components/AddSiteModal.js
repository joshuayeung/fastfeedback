import { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Box,
  Button,
  Flex,
  Link,
  Avatar,
  Icon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { createSite } from "@/lib/db";

const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => createSite(data);

  return (
    <>
      <Button onClick={onOpen}>Add Your First Site</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={register({ required: true })}
                placeholder="My Site"
                name="site"
              />
              {errors.site && (
                <FormErrorMessage>This field is required</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                ref={register({ required: true })}
                placeholder="https://website.com"
                name="website"
              />
              {errors.website && (
                <FormErrorMessage>This field is required</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
