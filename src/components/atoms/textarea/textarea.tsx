import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

interface PropTypes {
  defaultValue?: string;
  placeholder?: string;
  error?: boolean;
  errorMsg?: string;
  onChange?: (event?: any) => void;
  rows?: number;
  className?: string;
  name?: string;
  id?: string;
  value?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& textarea': {
      width: '100%',
      boxSizing: 'border-box',
      padding: '10px',
      outline: 'none',
    },
  },
  error: {
    marginBottom: '6px',
    '& textarea': {
      borderColor: theme.palette.customWarning.main,
    },
  },
  errorLabel: {
    color: theme.palette.customWarning.main,
    margin: '0px',
    left: '0px',
    bottom: '10px',
  },
}));

const TextArea: React.FunctionComponent<PropTypes> = ({
  defaultValue = '',
  placeholder = '',
  error = false,
  errorMsg = '',
  onChange = () => {},
  className = '',
  rows = 4,
  name = '',
  id = '',
  value = null,
}: PropTypes) => {
  const styles = useStyles();

  return (
    <div className={`${styles.root} ${className} ${error && styles.error}`}>
      {
        !value ? (
          <textarea
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={onChange}
            rows={rows}
            name={name}
            id={id}
          />
        ) : (
          <textarea
            placeholder={placeholder}
            onChange={onChange}
            rows={rows}
            name={name}
            id={id}
            value={value}
          />
        )
      }
      {
        error && (
          <p className={styles.errorLabel}>{errorMsg}</p>
        )
      }
    </div>
  );
};

export default React.memo(TextArea);
