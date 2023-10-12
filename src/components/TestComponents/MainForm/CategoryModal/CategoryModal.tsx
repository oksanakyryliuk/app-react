import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StyledCategoryList from './StyledCategoryList';
import { Stack } from "@mui/material";

const style = {
    position: 'fixed' as 'fixed',
    top: '0',
    right: '0',
    width: '400px',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    bgcolor: 'background.paper',
    borderRadius: '3',
    boxShadow: '0 0 16px rgba(0,0,0,0.2)',
    padding: '32px',
};

interface CategoryModalProps {
    open: boolean;
    onClose: () => void;
}

const handleSaveCategories = (selectedCategories: string[]) => {
    // Операція для збереження категорій
    console.log("Saving selected categories:", selectedCategories);
};

export function CategoryModal({ open, onClose }: CategoryModalProps) {

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingBottom: '18px'
                            }}
                        >
                            Категорії
                        </Typography>
                        <Stack>
                            <StyledCategoryList open={open} onSave={handleSaveCategories} onClose={onClose} />
                        </Stack>
                    </Box>
            </Fade>
        </Modal>
    );
}
