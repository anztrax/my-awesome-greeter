import React from 'react';
import Divider from '@material-ui/core/Divider';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { INode } from 'src/types/common';

interface PropTypes extends DialogProps{
  component?: INode;
  header?: string;
  hasHeader?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  onClose: () => void;
}

const ModalStateless: React.FunctionComponent<PropTypes> = ({
  component: Component,
  header,
  hasHeader,
  onClose,
  open,
  size,
  ...rest
}: PropTypes) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth={size}
    {...rest}
  >
    {
      hasHeader && (
        <>
          <DialogTitle>{header}</DialogTitle>
          <Divider />
        </>
      )
    }
    {Component}
  </Dialog>
);

export default ModalStateless;
