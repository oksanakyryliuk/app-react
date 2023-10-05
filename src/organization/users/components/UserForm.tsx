import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { User, UserDTO } from '../../../common/types';
//
// interface FormProps {
//   initialData: User | null;
//   readOnly?: boolean;
//   onSubmit: (data: UserDTO) => void;
// }
//
// const UserForm: React.FC<FormProps> = ({ initialData, onSubmit, readOnly }) => {
//   const { handleSubmit, register } = useForm({
//     defaultValues: initialData || {},
//   });
//
//   const handleFormSubmit = (data: UserDTO) => {
//     onSubmit(data);
//   };
//
//   return (
//     <Container maxWidth="sm">
//       <Stack
//         direction="column"
//         spacing={3}
//         component="form"
//         onSubmit={handleSubmit(handleFormSubmit)}>
//         <TextField
//           label="Email"
//           {...register('email')}
//           InputProps={{ readOnly }}
//           required
//         />
//
//         <TextField
//           label="Last Name"
//           {...register('lastName')}
//           required
//           InputProps={{ readOnly }}
//         />
//
//         <TextField
//           label="Phone"
//           {...register('phone')}
//           required
//           InputProps={{ readOnly }}
//         />
//
//         <FormControl component="fieldset">
//           <FormLabel component="legend">Gender</FormLabel>
//           <RadioGroup
//             row
//             aria-label="gender"
//             {...register('gender')}
//             defaultValue={initialData?.gender}>
//             <FormControlLabel value="male" control={<Radio />} label="Male" />
//             <FormControlLabel
//               value="female"
//               control={<Radio />}
//               label="Female"
//             />
//             <FormControlLabel value="other" control={<Radio />} label="Other" />
//           </RadioGroup>
//         </FormControl>
//
//         <TextField
//           label="Date of Birth"
//           type="date"
//           {...register('birth')}
//           InputProps={{ readOnly }}
//           required
//         />
//
//         <TextField
//           label="Telegram User ID"
//           type="number"
//           {...register('tgUserId')}
//           InputProps={{ readOnly }}
//         />
//
//         {!readOnly && <Button type="submit">Save</Button>}
//       </Stack>
//     </Container>
//   );
// };
//
// export default UserForm;
