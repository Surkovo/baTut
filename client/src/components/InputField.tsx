import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
}; // this allows the Inputfield to take any props a regular input field would take. have to add a mandatory name field to make useField happy

// '' = false
// 'some sort of error message' = true

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  //take the label off of the props. took off size as well to make the input component happy
  const [field, { error }] = useField(props); //hook from formik
  return (
    //cast the error to a boolean to make the isValid handler happy
    //the htmlFor matches the id for the field, so only the remaining ...props get pass to the input component
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
