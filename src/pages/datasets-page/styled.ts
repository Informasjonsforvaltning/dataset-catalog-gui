import { Colour, theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

import Button from '../../components/button';
import Breakpoint from '../../utils/styles/break-point';

const Page = styled.section`
  display: flex;
  flex-direction: column;

  tr:first-child {
    width: auto !important;
  }

  ${Breakpoint.SMALL} {
    tbody > tr {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      td {
        width: 100%;
        margin-bottom: ${theme.spacing('S4')};
      }
    }
    thead {
      tr {
        flex-direction: column;
        margin-bottom: ${theme.spacing('S32')};
        th {
          width: 100% !important;
          margin-bottom: ${theme.spacing('S4')};
        }
      }
    }
  }
`;

const Title = styled.h1`
  width: 1110px;
  height: ${theme.spacing('S56')};

  font-style: normal;
  font-weight: ${theme.fontWeight('FW700')};
  font-size: ${theme.fontSize('FS48')};
  line-height: ${theme.spacing('S56')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
`;

const SubTitle = styled.h2`
  width: 1110px;
  height: ${theme.spacing('S32')};
  font-style: normal;
  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS20')};
  line-height: ${theme.spacing('S32')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
`;

const AddDiv = styled.div`
  display: flex;
  margin: ${theme.spacing('S32')} 0 ${theme.spacing('S24')} 0;

  span:first-child {
    margin-right: ${theme.spacing('S10')};
  }

  ${Breakpoint.MEDIUM} {
    flex-direction: column;
    span {
      width: 100%;
      margin: 0 0 ${theme.spacing('S10')} 0;
    }
  }
`;

const HostButton = styled(Button)`
  background-color: ${theme.colour(Colour.BLUE, 'B30')};
  color: ${theme.colour(Colour.BLUE, 'B60')};
  min-width: 220px;
  margin-left: ${theme.spacing('S10')};

  & button {
    color: ${theme.colour(Colour.BLUE, 'B60')};
  }

  & svg {
    & * {
      stroke: ${theme.colour(Colour.BLUE, 'B60')};
    }
  }

  ${Breakpoint.SMALL} {
    margin-left: 0;
  }
`;

export default {
  AddDiv,
  Title,
  SubTitle,
  Page,
  HostButton,
};
