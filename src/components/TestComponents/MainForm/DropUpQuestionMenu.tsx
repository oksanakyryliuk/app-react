import React, { MouseEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddQuestion from '../../../common/icons/addon_64.png';
import RadioIcon from '../../../common/icons/radio-button.png';
import CheckboxIcon from '../../../common/icons/checkbox.png';
import BinaryChoiceIcon from '../../../common/icons/true-false.png';
import FillBankIcon from '../../../common/icons/writing.png';
import AddOptionIcon from '../../../common/icons/plus.png';
import {Button, Divider, ListItemIcon, ListItemText} from "@mui/material";
import StickyBox from "react-sticky-box";
import {Tooltip} from "evergreen-ui";

interface DropUpQuestionMenuProps {
    onOptionSelect: (option: string) => void;
}

export function DropUpQuestionMenu({ onOptionSelect }: DropUpQuestionMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (option: string) => {
        onOptionSelect(option);
        handleCloseMenu();
    };

    return (
        <>
            <StickyBox
                style={{
                    paddingBlock: '14px',
                    paddingInline: '68px',
                    margin: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button
                    color="success"
                    sx={{
                        width: '70%',
                    }}
                    startIcon={< img src={AddOptionIcon} alt={'add'} style={{width:'24px'}}/>}
                    onClick={handleOpenMenu}
                >
                    Додати запитання
                </Button>
            </StickyBox>
            <Tooltip content="Додати запитання" position='left'>
                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleOpenMenu}
                    sx={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '30px',
                        zIndex: 1000,
                        textAlign: 'right'
                    }}
                    size='small'
                >
                    <img src={AddQuestion} alt='add'/>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <ListItemText sx={{ marginLeft: 1 }}>Типи запитань</ListItemText>
                <Divider sx={{marginBlock: 1}}/>
                <MenuItem onClick={() => handleMenuItemClick('single')}>
                    <ListItemIcon><img src={RadioIcon} alt='single' /></ListItemIcon>
                    <ListItemText sx={{ marginLeft: 1 }}>Один варіант відповіді</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('multiple')}>
                    <ListItemIcon><img src={CheckboxIcon} alt='multiple' /></ListItemIcon>
                    <ListItemText sx={{ marginLeft: 1 }}>Декілька варіантів відповіді</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('binary')}>
                    <ListItemIcon><img src={BinaryChoiceIcon} alt='binary'/></ListItemIcon>
                    <ListItemText sx={{ marginLeft: 1 }}>Бінарний вибір</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('blank')}>
                    <ListItemIcon><img src={FillBankIcon} alt='blank' /></ListItemIcon>
                    <ListItemText sx={{ marginLeft: 1 }}> Заповнення пропусків</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
