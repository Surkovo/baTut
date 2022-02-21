import React from 'react';
import { Form, Formik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
interface registerProps {}

const REGISTER_MUT = ` mutation Register($username: String!, $password: String!){
    register(options: {username: $username, password: $password}) {
      errors {
        field
        message
      },
     user {
        id
        username
     }
    }
  }`; //copy the queries we ran in you apollo server. Note the Register is how we named the mutation, and the username and password are variables. Note the are both strings and not null as evidence by the ! after the type definition

const Register: React.FC<registerProps> = ({}) => {
  const [{}, register] = useMutation(REGISTER_MUT); //register is a name we made up for the function that gets call on the onSubmit
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => {
          register(values);
        }} // the forms state once the user submits the form. make sure the names that get passed match whats in the graphql schema or rename them before submission on the client side
      >
        {(
          { isSubmitting } //value comes from formik
        ) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            ></InputField>
            <Box mt={5}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              ></InputField>
            </Box>
            <Button
              type="submit"
              colorScheme="teal"
              mt={4}
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register; //you have to export default in next.js
