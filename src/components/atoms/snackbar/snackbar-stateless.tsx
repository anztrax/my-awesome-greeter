import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert, { Color } from '@material-ui/lab/Alert';

interface PropTypes {
  open?: boolean,
  type?: Color,
  message?: string
}

const SnackbarStateless:React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    open: isOpen = false,
    type = 'success',
    message = '',
  } = props;
  const mounted = React.useRef(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (mounted.current) {
      setOpen(!open);
    } else {
      mounted.current = true;
    }
  }, [isOpen]);
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackbarStateless;
