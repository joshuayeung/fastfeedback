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
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { createSite } from "@/lib/db";
import { useAuth } from "@/lib/auth";
import { mutate } from "swr";

const AddSiteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const auth = useAuth();
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = ({ name, url }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    };

    const { id } = createSite(newSite);

    toast({
      title: "Site added.",
      description: "We've added your site for you.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });

    mutate(
      ["/api/sites", auth.user.token],
      async (data) => {
        return { sites: [...data.sites, { id, ...newSite }] };
      },
      false
    );

    onClose();
  };

  return (
    <>
      <Button colorScheme="blue" variant="solid" onClick={onOpen}>
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl id="name" isRequired>
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
