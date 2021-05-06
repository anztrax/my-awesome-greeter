import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface propsTypes {
  id: string;
  label?: string;
  value: string | number;
  name: string;
  checked: boolean;
  position: 'top' | 'bottom' | 'start' | 'end';
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FunctionComponent<propsTypes> = ({
  name = '',
  label = '',
  value = '',
  checked = false,
  position = 'top',
  handleChange = () => {},
}: propsTypes) => (
  <FormControl component="fieldset">
    <RadioGroup value={value} name={name} onChange={handleChange}>
      <FormControlLabel
        value={value}
        control={<Radio color="primary" checked={checked} />}
        label={label}
        labelPlacement={position}
      />
    </RadioGroup>
  </FormControl>
);

export default RadioButton;
