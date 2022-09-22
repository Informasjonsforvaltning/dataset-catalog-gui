import styled from 'styled-components';
import { Button as MuiButton } from '@mui/material';

const Button = styled(MuiButton)`
  && {
    border-radius: 4px;
    padding: 14px 20px;
    height: 52px;
    font-family: 'Heebo', sans-serif;

    :hover {
      color: white;
      background-color: black;
    }
  }
`;

export default { Button };
