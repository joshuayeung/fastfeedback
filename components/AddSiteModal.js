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
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { createSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";

const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const auth = useAuth();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = ({ name, url }) => {
    createSite({
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    });
    toast({
      title: "Site added.",
      description: "We've added your site for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Add Your First Site</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl id="site" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                ref={register({ required: true })}
                placeholder="My Site"
                name="name"
              />
              {errors.site && (
                <FormErrorMessage>This field is required</FormErrorMessage>
              )}
            </FormControl>

            <FormControl id="url" mt={4} isRequired isInvalid={errors.website}>
              <FormLabel>Link</FormLabel>
              <Input
                ref={register({ required: true })}
                placeholder="https://website.com"
                name="url"
              />

              <FormErrorMessage>This field is required</FormErrorMessage>
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
