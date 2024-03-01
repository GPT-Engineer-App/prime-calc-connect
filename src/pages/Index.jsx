import React, { useState } from "react";
import { Container, Heading, Text, Button, VStack, HStack, Input, useToast } from "@chakra-ui/react";
import { FaCalculator } from "react-icons/fa";

const Index = () => {
  const [number, setNumber] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [mersennePrimes, setMersennePrimes] = useState([]);
  const toast = useToast();

  const handleCalculate = () => {
    const num = parseInt(number);
    if (isNaN(num) || num <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid positive integer.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsCalculating(true);
    setTimeout(() => {
      const primes = calculateMersennePrimes(num);
      setMersennePrimes(primes);
      setIsCalculating(false);
    }, 500);
  };

  const calculateMersennePrimes = (maxExponent) => {
    const primes = [];
    for (let exponent = 2; exponent <= maxExponent; exponent++) {
      const mersenne = Math.pow(2, exponent) - 1;
      if (isPrime(mersenne)) {
        primes.push(mersenne);
      }
    }
    return primes;
  };

  const isPrime = (num) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Mersenne Prime Calculator
        </Heading>
        <Text textAlign="center">Calculate Mersenne primes! A Mersenne prime is a prime number that is one less than a power of two.</Text>
        <HStack>
          <Input placeholder="Enter max exponent" value={number} onChange={(e) => setNumber(e.target.value)} isDisabled={isCalculating} />
          <Button leftIcon={<FaCalculator />} colorScheme="teal" onClick={handleCalculate} isLoading={isCalculating} loadingText="Calculating">
            Calculate
          </Button>
        </HStack>
        {mersennePrimes.length > 0 && (
          <VStack spacing={2} mt={4}>
            <Heading as="h2" size="md">
              Mersenne Primes
            </Heading>
            {mersennePrimes.map((prime, index) => (
              <Text key={index}>
                2<sup>{Math.log2(prime + 1)}</sup> - 1 = {prime}
              </Text>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
