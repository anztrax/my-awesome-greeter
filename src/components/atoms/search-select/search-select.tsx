import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((_: Theme) => ({
  root: {
    marginBottom: 0,
  },
}));

export interface ISearchSelectOptions {
  label?: string;
  value?: string | number;
}

interface PropTypes {
  id?: string;
  label?: string;
  options?: ISearchSelectOptions[];
  value?: ISearchSelectOptions | ISearchSelectOptions[];
  onChange?: (val?: any | ISearchSelectOptions) => any;
  disableClear?: boolean;
  multiple?: boolean;
}

const SearchSelect: React.FunctionComponent<PropTypes> = ({
  id = '',
  label = '',
  options = [],
  value = null,
  onChange = () => {},
  disableClear = true,
  multiple = false,
}: PropTypes) => {
  const valueProps = value ? { value } : {};
  const classes = useStyles();
  return (
    <>
      <Autocomplete
        id={id}
        multiple={multiple}
        options={options}
        className={classes.root}
        getOptionLabel={(option: any) => option.label}
        disableClearable={disableClear}
        {...valueProps}
        getOptionSelected={(option, current: any) => {
          if (current.value === '') {
            return false;
          }
          if (option.value === current.value) {
            return true;
          }
          return false;
        }}
        onChange={(e, val) => {
          if (val) {
            onChange(val);
          } else {
            onChange({
              label: '',
              value: '',
            });
          }
        }}
        fullWidth
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            size="small"
            fullWidth
            variant="outlined"
          />
        )}
      />
    </>
  );
};

export default React.memo(SearchSelect);
