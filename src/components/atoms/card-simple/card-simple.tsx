import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { INode } from 'src/types/common';

interface PropTypes {
  title?: string | null;
  action?: INode;
  children: INode;
}

const styles = makeStyles({
  root: {
    width: '100%',
  },
});

const CardSimple: React.FunctionComponent<PropTypes> = ({
  title = null,
  action = null,
  children = null,
}: PropTypes) => {
  const classes = styles();
  return (
    <Card
      classes={{
        root: classes.root,
      }}
    >
      {
        title && (
          <>
            <CardHeader title={title} action={action} />
            <Divider />
          </>
        )
      }
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default React.memo(CardSimple);
