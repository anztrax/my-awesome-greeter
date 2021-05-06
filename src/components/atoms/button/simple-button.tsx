import React, { FunctionComponent } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Button from '@material-ui/core/Button';
import { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { INode } from '../../../types/common';

export type IColor = 'primary' |
  'primary-darkest' |
  'primary-light' |
  'primary-lighter' |
  'rose' |
  'rose-light' |
// [NOTE] DELETE LATER
  'danger' |
  'success' |
  'info' |
  'warning' |
  'btn btn-success' |
  'outline-primary';

interface PropTypes extends ButtonBaseProps{
  loading?: boolean;
  icon?: INode;
  color?: IColor;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'large' | 'medium' | 'small';
  onClick?: () => void;
  /**
   * #NOTE: this props is not used anymore
   * @deprecated
   */
  label?: INode;
  /**
   * #NOTE: this props is not used anymore
   * @deprecated
   */
  outline?: boolean;
  /**
   * #NOTE: this props is not used anymore
   * @deprecated
   */
  submit?: boolean;
}

const useStyles = (color?: IColor) => makeStyles((theme: Theme) => {
  let backgroundColor;
  switch (color) {
    case 'primary':
      backgroundColor = theme.palette.customPrimary.main;
      break;
    case 'primary-darkest':
      backgroundColor = theme.palette.customPrimary.dark;
      break;
    case 'primary-light':
      backgroundColor = theme.palette.customPrimary.light;
      break;
    case 'primary-lighter':
      backgroundColor = theme.palette.customPrimary.lighter;
      break;
    case 'rose':
      backgroundColor = theme.palette.customWarning.main;
      break;
    case 'rose-light':
      backgroundColor = theme.palette.customWarning.light;
      break;
    default:
      backgroundColor = theme.palette.customPrimary.main;
      break;
  }

  return {
    root: {
      backgroundColor,
      color: '#fff',
      '&:hover': {
        backgroundColor,
      },
      '&:focus': {
        outline: 'none',
      },
    },
    loading: {
      color: '#fff',
    },
  };
});

const SimpleButton: FunctionComponent<PropTypes> = ({
  children = null,
  icon = '',
  onClick = () => {},
  disabled = false,
  loading = false,
  id = '',
  size = 'medium',
  variant = 'contained',
  color = 'primary',
  className = '',
  type = 'button',
  style = {},
  ...others
}: PropTypes) => {
  const classes = useStyles(color)();
  return (
    <Button
      id={id}
      classes={{ root: classes.root }}
      variant={variant}
      size={size}
      startIcon={icon || null}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
      style={style}
      {...others}
    >
      {loading
        ? (<CircularProgress size={21} thickness={5} classes={{ root: classes.loading }} />)
        : children}
    </Button>
  );
};

export default SimpleButton;
