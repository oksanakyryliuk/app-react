import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface TestMenuProps {
    menuAnchorEl: HTMLElement | null;
    handleMenuClose: () => void;
    handlePreviewClick: () => void;
    handleDeleteClick: () => void;
}

function TestMenu({ menuAnchorEl, handleMenuClose, handlePreviewClick, handleDeleteClick } : TestMenuProps) {
    return (
        <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            sx={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handlePreviewClick}>
                <PreviewIcon color={'primary'} style={{ paddingRight: '4px' }}/> Переглянути
            </MenuItem>
            <MenuItem onClick={handleDeleteClick}>
                <DeleteForeverIcon color={'error'} style={{ paddingRight: '4px' }}/> Видалити тест
            </MenuItem>
        </Menu>
    );
}

export default TestMenu;
