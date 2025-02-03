import React from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/system';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';
import { DateType } from '@/interfaces/common';

interface DateTimePickerProps {
  value: Dayjs | null;
  onChange: (date: DateType) => void;
  name?:string
  className?: string
}

const CustomTextField = styled(TextField)({
  padding: '5px 16px !important',
  border: '1px solid #6F6F6F !important',
  borderRadius: '2px',
  width: '100%',
  '& .MuiInputBase-root': {
    padding: '0',
    fontWeight: 300,
    fontSize: '14px',
    fontFamily: 'Noto Sans JP'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-input': {
    padding: '0',
  },
});

const CustomDateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  className = ""
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          value={value}
          onChange={onChange}
          slots={{
            textField: CustomTextField
          }}

          slotProps={{
            textField: {
              className: className
            }
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDateTimePicker;

