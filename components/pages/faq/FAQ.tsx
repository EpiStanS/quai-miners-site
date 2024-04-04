import { Text, Flex } from '@chakra-ui/react';

const FAQ = ({ question, answer, answer2, answer3, answer4 }: FAQProps) => {
  return (
    <Flex direction="column" gap={2}>
      <Text variant="h3" pb={2}>
        {question}
      </Text>
      <Text variant="p2">{answer}</Text>
      {answer2 && <Text variant="p2">{answer2}</Text>}
      {answer3 && <Text variant="p2">{answer3}</Text>}
      {answer4 && <Text variant="p2">{answer4}</Text>}
    </Flex>
  );
};

export default FAQ;
