import { Card, CardBody, CardHeader, CardFooter, Badge, Button, VStack, HStack, Text, Heading, Box } from '@chakra-ui/react'

export default function ProductCard({ icon, title, description, category }) {
  return (
    <Card 
      h="100%" 
      boxShadow="0 8px 24px rgba(61, 153, 112, 0.1)"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="2xl"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "0 16px 48px rgba(61, 153, 112, 0.2)",
        borderColor: "#3d9970",
        transform: "translateY(-12px)"
      }}
    >
      <CardHeader 
        bg="linear-gradient(135deg, rgba(61, 153, 112, 0.08), rgba(61, 153, 112, 0.02))"
        borderBottom="2px solid"
        borderColor="gray.200"
        p={6}
      >
        <HStack justify="space-between" align="flex-start">
          <Box fontSize="3.5rem" transition="transform 0.3s ease">
            {icon}
          </Box>
          <Badge
            bg="#3d9970"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            fontWeight="700"
            letterSpacing="0.1em"
            textTransform="uppercase"
          >
            {category}
          </Badge>
        </HStack>
      </CardHeader>

      <CardBody p={6}>
        <VStack align="start" spacing={3}>
          <Heading 
            as="h3" 
            size="lg" 
            color="#0d0d0c"
            fontWeight={700}
          >
            {title}
          </Heading>
          <Text 
            fontSize="0.95rem" 
            color="#6b7066" 
            lineHeight={1.7}
          >
            {description}
          </Text>
        </VStack>
      </CardBody>

      <CardFooter 
        borderTop="1px solid"
        borderColor="gray.200"
        p={6}
        justify="center"
      >
        <Button
          as="a"
          href="#contact"
          w="100%"
          bg="#3d9970"
          color="white"
          borderRadius="full"
          fontWeight={600}
          fontSize="sm"
          py={2.5}
          transition="all 0.3s ease"
          _hover={{
            bg: "#2d6a59",
            boxShadow: "0 8px 20px rgba(61, 153, 112, 0.3)",
            transform: "scale(1.02)"
          }}
          _active={{
            transform: "scale(0.98)",
          }}
        >
          Solicitar Ahora
        </Button>
      </CardFooter>
    </Card>
  )
}
