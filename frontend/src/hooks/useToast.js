//custo;m hook for toastas
import { useToast } from "@chakra-ui/react";

const useCustomToast = ({ title, description, status }) => {
  const toast = useToast();
  return toast({
    title: { title },
    description: { description },
    status: { status },
    duration: 9000,
    isClosable: true,
  });
};

export default useCustomToast;
