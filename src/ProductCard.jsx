import { Box, Card, CardBody, CardHeader, CardFooter, Badge, Button, VStack, HStack, Text, Heading } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export default function ProductCard({ icon, title, description, category }) {
  return (
    <MotionBox
      whileHover={{ y: -12 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
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
          borderColor: "#3d9970"
        }}
      >
        <CardHeader 
          bg="linear-gradient(135deg, rgba(61, 153, 112, 0.08), rgba(61, 153, 112, 0.02))"
          borderBottom="2px solid"
          borderColor="gray.200"
          p={6}
        >
          <HStack justify="space-between" align="flex-start">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ fontSize: '3.5rem' }}
            >
              {icon}
            </motion.div>
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ width: '100%' }}
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
              }}
              _active={{
                transform: "scale(0.98)",
              }}
            >
              Solicitar Ahora
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </MotionBox>
  )
}
