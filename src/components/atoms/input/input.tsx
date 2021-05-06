import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { VisibilityOffOutlined, VisibilityOutlined } from '@material-ui/icons';
import makeStyles from '@material-ui/core/styles/makeStyles';

interface PropTypes {
  type?: 'text' | 'password' | 'number';
  id?: string;
  label?: string;
  name?: string;
  value?: string | number;
  handleChange?: (event?: any, newValue?: string) => void | any;
  handleBlur?: (event?: any) => void | any;
  showPass?: boolean;
  classVisible?: any;
  togglePass?: (event?: any) => void | any;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  defaultValue?: any;
  className?: string;
}

const styles = makeStyles({
  root: {
    marginBottom: '0px',
    marginTop: '0px',
  },
  // helperRoot: {
  //   '&.Mui-error': {
  //     position: 'absolute',
  //     bottom: '-20px',
  //   },
  // },
});

const Input: React.FunctionComponent<PropTypes> = ({
  type = 'text',
  id = '',
  label = '',
  name = '',
  handleChange = () => {},
  handleBlur = () => {},
  showPass = false,
  classVisible = {},
  togglePass = () => {},
  error = false,
  errorMessage = '',
  disabled = false,
  defaultValue = null,
  className = '',
  value = null,
}: PropTypes) => {
  const classes = styles();
  const valueProps = value || value === '' ? { value } : {};
  const defValueProps = defaultValue || defaultValue === '' ? { defaultValue } : {};
  return (
    <>
      <TextField
        classes={{
          root: classes.root,
        }}
        className={className}
        variant="outlined"
        margin="normal"
        size="small"
        fullWidth
        type={type}
        id={id}
        label={label}
        name={name}
        onChange={(e) => {
          // [NOTE] REACT <= 16 EVENT POOLING https://reactjs.org/docs/legacy-event-pooling.html
          e.persist();
          handleChange(e);
        }}
        onKeyUp={handleBlur}
        error={error}
        InputProps={{
          endAdornment:
            showPass ? (
              <InputAdornment
                position="end"
              >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => togglePass()}
                  classes={classVisible}
                >
                  {showPass
                    ? <VisibilityOutlined />
                    : <VisibilityOffOutlined />}
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
        helperText={error ? errorMessage : null}
        // FormHelperTextProps={{
        //   classes: {
        //     root: classes.helperRoot,
        //   },
        // }}
        disabled={disabled}
        {...valueProps}
        {...defValueProps}
      />
    </>
  );
};

export default Input;
