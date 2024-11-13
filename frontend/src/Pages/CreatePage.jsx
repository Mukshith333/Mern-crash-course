import {
  Button,
  Center,
  Container,
  Heading,
  useColorMode,
  useColorModeValue,
  VStack,
  Box,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product.js";

const CreatePage = () => {
  const [newProduct, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }

    setProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="product Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="product image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
