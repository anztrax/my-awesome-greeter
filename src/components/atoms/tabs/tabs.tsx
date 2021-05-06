import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles/MuiThemeProvider';
import {INode} from "../../../types/common";

interface PropTypes {
  options: {
    value?: string | number;
    label: string | number;
    component: INode | string;
  }[];
}

const CustomTabs = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.customPrimary.main,
    color: 'white',
    marginBottom: '1rem',
  },
}))(Tabs);

const CustomTab = withStyles((theme: Theme) => ({
  root: {
    '&$selected': {
      backgroundColor: theme.palette.customPrimary.light,
    },
  },
  selected: {},
}))(Tab);

const TabsComponent: React.FunctionComponent<PropTypes> = ({
  options = [],
}: PropTypes) => {
  const [position, setPosition] = React.useState(0);
  // OTHER
  const onChange = (event, newPosition) => {
    setPosition(newPosition);
  };
  return (
    <>
      <CustomTabs
        value={position}
        onChange={onChange}
        TabIndicatorProps={{
          style: {
            backgroundColor: 'transparent',
          },
        }}
      >
        {
          options.map((option, key) => (
            <CustomTab
              key={`custom-tab-component-${option.value}`}
              label={option.label}
              value={key}
            />
          ))
        }
      </CustomTabs>
      {
        options[position].component
      }
    </>
  );
};

export default React.memo(TabsComponent);
