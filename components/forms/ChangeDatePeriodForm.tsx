import { Input } from '@chakra-ui/react';
import React from 'react';
import { FormBlock, Label } from './shared';

export const ChangeDatePeriodForm = ({
  date,
  setDate,
  close,
}: {
  date: string;
  setDate: React.SetStateAction<string>;
  close: () => void;
}) => {
  return (
    <>
      <FormBlock>
        <Label>Date</Label>
        <Input
          type="month"
          value={date}
          onChange={(e) => {
            // @ts-ignore
            setDate(e.target.value as string);
            close();
          }}
        />
      </FormBlock>
    </>
  );
};
