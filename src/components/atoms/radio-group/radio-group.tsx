import React, { FunctionComponent } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Theme } from '@material-ui/core/styles/MuiThemeProvider';
import withStyles from '@material-ui/styles/withStyles';

export interface IRadioGroupOption {
  value: string;
  label: string | number;
  checked?: boolean;
  labelPlacement: 'top' | 'bottom' | 'start' | 'end';
}

interface PropsTypes {
  id?: string;
  value?: string | number;
  options: IRadioGroupOption[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomRadio = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.customPrimary.main,
    '&$checked': {
      color: theme.palette.customPrimary.main,
    },
  },
  checked: {},
}))(Radio);

const RadioButton: FunctionComponent<PropsTypes> = ({
  options = [],
  value = null,
  onChange = () => {},
}: PropsTypes) => {
  // const [state, setState] = React.useState(value || null);
  // OTHER
  const onChangeStatus = (event) => {
    const { target } = event;
    // setState(target.value);
    onChange(target.value);
  };
  return (
    <RadioGroup
      row
      value={value}
      onChange={onChangeStatus}
    >
      {
        options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<CustomRadio />}
            checked={option.checked}
            label={option.label}
            labelPlacement={option.labelPlacement}
          />
        ))
      }
    </RadioGroup>
  );
};

export default RadioButton;
