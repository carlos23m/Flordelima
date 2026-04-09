import { 
  Box, 
  Card, 
  CardBody, 
  CardHeader, 
  CardFooter, 
  Badge, 
  Button, 
  Heading, 
  Text, 
  Stack,
  HStack
} from '@chakra-ui/react'

export default function ProductCard({ icon, title, description, category }) {
  return (
    <Card
      height="100%"
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        boxShadow: "lg",
        transform: "translateY(-8px)",
      }}
      border="1px solid"
      borderColor="gray.200"
    >
      <CardHeader
        bgGradient="linear(to-br, rgba(61, 153, 112, 0.08), rgba(61, 153, 112, 0.02))"
        borderBottom="2px solid"
        borderColor="gray.200"
        pb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box fontSize="3.5rem" lineHeight="1">
          {icon}
        </Box>
        <Badge
          colorScheme="green"
          variant="solid"
          bg="#3d9970"
          color="white"
          px={3}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="700"
          letterSpacing="0.05em"
          textTransform="uppercase"
          whiteSpace="nowrap"
        >
          {category}
        </Badge>
      </CardHeader>

      <CardBody pt={6} pb={6} px={6}>
        <Stack spacing={3}>
          <Heading
            as="h3"
            size="md"
            color="#0d0d0c"
            fontWeight="700"
            lineHeight="1.3"
          >
            {title}
          </Heading>
          <Text
            fontSize="0.95rem"
            color="#6b7066"
            lineHeight="1.7"
          >
            {description}
          </Text>
        </Stack>
      </CardBody>

      <CardFooter
        borderTop="1px solid"
        borderColor="gray.200"
        pt={4}
        pb={4}
        px={6}
        justifyContent="center"
      >
        <Button
          as="a"
          href="#contact"
          width="100%"
          bg="#3d9970"
          color="white"
          borderRadius="full"
          fontWeight="600"
          fontSize="sm"
          py={2.5}
          transition="all 0.2s"
          _hover={{
            bg: "#2d6a59",
            boxShadow: "0 8px 20px rgba(61, 153, 112, 0.3)",
            transform: "scale(1.02)",
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
