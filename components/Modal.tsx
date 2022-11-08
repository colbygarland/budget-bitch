import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  body,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};
