import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
  variant?: 'small' | 'regular'; //using this we can conditionally change box css prperties like max width below
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = 'regular',
}) => {
  return (
    <Box
      maxWidth={variant === 'regular' ? '800px' : '400px'}
      mt={8}
      mx="auto"
      w="100%"
    >
      {children}
    </Box>
  );
};
