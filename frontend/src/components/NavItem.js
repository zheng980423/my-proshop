import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem } from '@material-ui/core';

const NavItem = ({ href, icon: Icon, title, ...rest }) => {
  const location = useLocation();

  const active = href
    ? !!matchPath(
        {
          path: href,
          end: false,
        },
        location.pathname
      )
    : false;

  return (
    <ListItem
      disableGutters
      style={{
        display: 'flex',
        paddingBottom: 0,
      }}
      {...rest}
    >
      <Button
        component={RouterLink}
        style={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          paddingBottom: 1.25,
          textTransform: 'none',
          width: '100%',
          ...(active && {
            color: 'primary.main',
          }),
          '& svg': {
            marginRight: '8px',
          },
        }}
        to={href}
      >
        {Icon && <Icon size="20" style={{ marginRight: '8px' }} />}
        <span>{title}</span>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
};

export default NavItem;
