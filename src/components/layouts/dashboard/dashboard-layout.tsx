import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './style';

export interface RenderElementProps{
  onCloseDrawer: () => void;
}

interface PropTypes {
  children?: React.ReactChild | React.ReactChild[] | Element | Element[];
  renderSidebar: (props: RenderElementProps) => React.ReactElement;
  renderNavbar: () => React.ReactElement;
  sidebarWidth: number,
}

const DashboardLayout: React.FunctionComponent<PropTypes> = (props: PropTypes) => {
  const {
    renderSidebar,
    renderNavbar,
    children,
    sidebarWidth = 240,
  } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up('md'));
  const classes = useStyles(sidebarWidth);
  const mainContainerInlineStyle = {
    marginLeft: !isMobile ? 0 : sidebarWidth,
  };

  /** handlers */
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOnCloseDrawerToggle = () => {
    setMobileOpen(false);
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            {renderNavbar()}
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden mdUp implementation="css">
            <Drawer
              container={window.document.body}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {renderSidebar({
                onCloseDrawer: handleOnCloseDrawerToggle,
              })}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {renderSidebar({
                onCloseDrawer: handleOnCloseDrawerToggle,
              })}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div style={mainContainerInlineStyle}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
