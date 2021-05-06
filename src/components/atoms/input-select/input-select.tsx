import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SelectMaterial from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

interface PropTypes {
  id: string;
  defaultValue?: string | number;
  value?: string | number;
  options: {label: any; value: any;}[];
  label?: string;
  onChange?: (event?: any, propsValue?: any) => void | any;
}

const useFormStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    // minWidth: 140,
    width: '100%',
    height: '100%',
    // marginBottom: '28px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const useSelectStyles = makeStyles({
  root: {
    height: '100%',
  },
});

const Select: React.FunctionComponent<PropTypes> = ({
  id = '',
  defaultValue = null,
  label = '',
  options = [],
  onChange = () => {},
  value = null,
}: PropTypes) => {
  const formStyles = useFormStyles();
  const selectStyles = useSelectStyles();
  const valueProps = value || value === '' ? { value } : {};
  const defValueProps = defaultValue || defaultValue === '' ? { defaultValue } : {};
  // OTHER
  const onBeforeChange = (e, propsValue) => {
    onChange(e, { label: propsValue.props.children, value: propsValue.props.value });
  };
  return (
    <FormControl variant="outlined" size="small" className={formStyles.formControl}>
      <InputLabel id="select-outlined-label">{label}</InputLabel>
      <SelectMaterial
        id={id}
        onChange={onBeforeChange}
        label={label}
        fullWidth
        className={selectStyles.root}
        {...valueProps}
        {...defValueProps}
      >

        {options.map((val) => (
          <MenuItem value={val.value} key={val.value}>{val.label}</MenuItem>
        ))}
      </SelectMaterial>
    </FormControl>
  );
};

export default Select;
