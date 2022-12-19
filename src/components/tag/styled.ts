import { theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const Tag = styled.div`
  height: ${theme.spacing('S24')};
  padding: ${theme.spacing('S8')};
  border-radius: ${theme.spacing('S48')};
  display: flex;
  align-items: center;
  width: fit-content;

  svg {
    width: ${theme.spacing('S12')};
    height: ${theme.spacing('S12')};
  }
`;

const TagText = styled.span`
  height: ${theme.spacing('S16')};
  font-style: normal;
  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS16')};
  line-height: ${theme.spacing('S16')};
  margin-left: ${theme.spacing('S4')};
  white-space: nowrap;
`;

export default { Tag, TagText };
