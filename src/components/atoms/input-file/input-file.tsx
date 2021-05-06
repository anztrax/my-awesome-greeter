import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import Button from 'src/components/atoms/button';

interface PropTypes {
  id?: string;
  label?: string;
  value?: any;
  onChange?: (event?: any, newValue?: string) => void | any;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  multiple?: boolean;
  preview?: boolean;
  accept?: string;
}

const styles = makeStyles({
  root: {
    marginTop: '0px',
  },

  errorMessage: {
    color: 'red',
  },
});

const Input: React.FunctionComponent<PropTypes> = ({
  id = '',
  label = 'Choose File',
  onChange = () => {},
  error = false,
  errorMessage = '',
  disabled = false,
  value = null,
  multiple = false,
  preview = false,
  accept = '.csv',
}: PropTypes) => {
  const classes = styles();

  const previewName = (isMultiple) => {
    let name = '';

    if (isMultiple) {
      for (let i = 0; i < value.length; i += 1) {
        name += `${value[i].name}`;

        if (i !== (value.length - 1)) {
          name += ', ';
        }
      }
    } else {
      name = value.name;
    }

    return name;
  };

  return (
    <>
      <FormControl>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Button
            onClick={() => document.getElementById(id || 'input-file').click()}
            disabled={disabled}
          >
            {label}
          </Button>
          {
            !preview && value && (<div style={{ marginLeft: 10, fontSize: 14 }}>{ previewName(multiple) }</div>)
          }
        </div>
        <input
          id={id || 'input-file'}
          multiple={multiple}
          accept={accept}
          type="file"
          value={(value && value.filename) || ''}
          onChange={onChange}
          disabled={disabled}
          style={{
            visibility: 'hidden',
            width: '0px',
            height: '0px',
          }}
        />
        <FormHelperText className={classes.errorMessage}>{error && errorMessage}</FormHelperText>
      </FormControl>
    </>
  );
};

export default Input;
