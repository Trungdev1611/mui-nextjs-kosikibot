import React from 'react';
import { FieldErrors } from 'react-hook-form';

interface ErrorMessageProps {
  name: string;
  errors: FieldErrors;

}

export function MessageError(props: {msg: string}) {
  const {msg} = props
  return (
    <p className="text-red-500 text-sm mt-1">
      {msg} 
    </p>
  );
}

const ErrorField: React.FC<ErrorMessageProps> = ({ name, errors }) => {
  const errorMessage =errors[name]?.message;

  if (!errorMessage) return null;

  return (
    <MessageError msg={errorMessage as string}/>

  );
};

export default ErrorField;
