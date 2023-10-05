import Typography from '@mui/material/Typography';
import { UserDTO } from '../../common/types';

const defaultUser: UserDTO = {
  email:"",
  password: '',
  name: ''
};

export const CreateUser = () => {
  return <Typography>Create page</Typography>;
};
