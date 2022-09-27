import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const Title = styled.h1`
  font-size: ${theme.fontSize('FS40')};
  font-weight: ${theme.fontWeight('FW700')};
`;

const SubTitle = styled.h2`
  font-size: ${theme.fontSize('FS20')};
  font-weight: ${theme.fontWeight('FW400')};
`;

const Page = styled.section`
  margin-top: ${theme.spacing('S24')};
`;

export default {
  Title,
  SubTitle,
  Page,
};
