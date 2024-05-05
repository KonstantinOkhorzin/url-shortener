import { FC, useEffect } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Status } from '../types';

interface Props {
  setFullUrl: (text: string) => void;
  setError: (text: string) => void;
  setStatus: (status: Status) => void;
  status: Status;
}

interface FormValues {
  url: string;
}

const schema = yup
  .object({
    url: yup.string().url('URL is invalid').required('URL is empty!'),
  })
  .required();

const UrlForm: FC<Props> = ({ setFullUrl, setError, setStatus, status }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => setFullUrl(data.url);

  useEffect(() => {
    if (isSubmitSuccessful && status === Status.FULFILLED) {
      reset();
    }
  }, [isSubmitSuccessful, reset, status]);

  useEffect(() => {
    if (!errors.url) {
      setError('');
      setStatus(Status.IDLE);
    } else {
      setError(errors.url.message ?? '');
      setStatus(Status.REJECTED);
    }
  }, [setError, setStatus, errors.url]);

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete='off'
      sx={{ display: 'grid', gridTemplateColumns: '1fr 98px', position: 'relative' }}
    >
      <TextField
        autoFocus
        type='url'
        {...register('url')}
        variant='outlined'
        placeholder='Original URL'
        sx={{ background: 'white' }}
      />
      <Button
        type='submit'
        variant='contained'
        color='success'
        disabled={status === Status.PENDING}
      >
        {status === Status.PENDING ? <CircularProgress size={24} /> : 'Shorten'}
      </Button>

      {errors.url && (
        <Typography color='error' sx={{ position: 'absolute', bottom: '-35px', left: '14px' }}>
          {errors.url.message}
        </Typography>
      )}
    </Box>
  );
};

export default UrlForm;
