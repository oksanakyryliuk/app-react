import {createTheme} from "@mui/material";
import { green, purple } from '@mui/material/colors';
export const muiDarkTheme = createTheme({
    palette: {
        primary: {
            main: `#5e1ec1`,
        },
        secondary: {
            main: `#E0C2FF`,
        },
        success: {
            main: `#b191ff`,
        },
    },
    typography: {
        fontFamily: '"Segoe UI"',
    },
});



