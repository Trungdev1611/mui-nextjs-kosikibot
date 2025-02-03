'use client'

import React, { forwardRef } from 'react';
import { Select, MenuItem, InputBase, OutlinedInput } from '@mui/material';
import { styled } from '@mui/system';
interface SelectFieldProps {
  value: string | null;
  onChange: any;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

const CustomSelect = styled(Select)({
  fontSize: '14px',
  fontWeight: '300',
  color: '#000000',
  padding: '12px 16px',
  border: '1px solid #6F6F6F',
  borderRadius: '2px',
  maxHeight: '45px',
  width: '100%'
});



const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>(
  ({ value, onChange, options, placeholder }, ref) => {

const BootstrapInput = styled(OutlinedInput)({
  '& .MuiInputBase-input': {
    fontSize: 14,
    fontWeight: 300,
    color: value ? '#000000' : '#AAAAAA',
    padding: '0px',
    fontFamily: 'Noto Sans JP',
  },
});
    return (
      <CustomSelect
        value={value || ""}
        onChange={onChange}
        displayEmpty
        // inputProps={{'aria-label': 'Without label' }}
        input={<BootstrapInput />}
        className="flex-auto"
        ref={ref}
      >
        {placeholder && (
          <MenuItem  disabled>
            {placeholder}
          </MenuItem>
        )}
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CustomSelect>
    );
  },
);

export default SelectField;
