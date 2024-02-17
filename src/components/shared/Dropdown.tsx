import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface IDropdown {
  id: string,
  name: string,
  action: (id: string, action: string) => void
}

const Dropdown = ({ options }: { options: IDropdown[] }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color='primary'
        sx={{ mr: 2 }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onSelect={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option.name} href='' onClick={() => option.action(option.id, option.name)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Dropdown;