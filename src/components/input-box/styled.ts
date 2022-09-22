import styled from 'styled-components';
import { TextField as MuiTextField } from '@mui/material';

const TextField = styled(MuiTextField)`
  && {
    label {
      font-weight: 400;
      font-size: 20px;
      line-height: 26px;
      font-family: 'Heebo', sans-serif;
      background-color: #ffffff;
      padding-right: 5px;
    }
  }
`;

export default { TextField };
