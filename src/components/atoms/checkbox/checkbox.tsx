import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Theme } from '@material-ui/core/styles/MuiThemeProvider';
import withStyles from '@material-ui/styles/withStyles';

interface PropTypes{
  label?: string;
  onChange?: (event?: any) => void | any;
  value?: string | number;
  disabled?: boolean;
  checked?: boolean | null;
  /**
   * #NOTE: this props is not used anymore
   * @deprecated
   */
  defaultCheck?: any;
  /**
   * #NOTE: this props is not used anymore
   * @deprecated
   */
  onClick?: any;
}

const CustomCheckbox = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.customPrimary.main,
    '&$checked': {
      color: theme.palette.customPrimary.main,
    },
  },
  checked: {},
}))(Checkbox);

const CheckboxComponent: React.FunctionComponent<PropTypes> = ({
  label = '',
  onChange = () => {},
  value = null,
  disabled = false,
  checked = null,
}: PropTypes) => {
  const valueProps = value || value === '' ? { value } : {};
  const checkedProps = checked !== null ? { checked } : {};
  return (
    <FormControlLabel
      control={(
        <CustomCheckbox
          size="small"
          disabled={disabled}
          onChange={(e) => {
            // [NOTE] REACT <= 16 EVENT POOLING https://reactjs.org/docs/legacy-event-pooling.html
            e.persist();
            onChange(e);
          }}
          {...checkedProps}
          {...valueProps}
        />
      )}
      label={label}
    />
  );
};

export default React.memo(CheckboxComponent);
