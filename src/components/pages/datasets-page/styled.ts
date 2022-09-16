import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const Title = styled.h1`
  font-size: ${theme.fontSize('FS40')};
  font-weight: ${theme.fontWeight('FW700')};
`;

const SubTitle = styled.h2`
  font-size: ${theme.fontSize('FS20')};
  font-weight: ${theme.fontWeight('FW400')};
`;

const Breadcrumbs = styled.nav`
  margin-top: -${theme.spacing('S16')};
  padding: ${theme.spacing('S10')} 0;
  border-bottom: 1px solid ${theme.colour(Colour.NEUTRAL, 'N30')};
`;

const Page = styled.section`
  margin-top: ${theme.spacing('S24')};
`;

const ListActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${theme.spacing('S16')};
`;

const CreateButton = styled.button`
  align-items: center;
  background-color: ${theme.colour(Colour.BLUE, 'B60')};
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(45, 55, 65, 0.3);
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  display: flex;
  font-size: ${theme.fontSize('FS14')};
  padding: ${theme.spacing('S10')} ${theme.spacing('S12')};

  &:disabled {
    opacity: 0.25;
    pointer-events: none;
  }

  & > svg {
    margin-right: ${theme.spacing('S4')};
    fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

const SearchBox = styled.div`
  border: 1px solid;
  border-radius: 4px;
  align-items: stretch;
  display: flex;
  flex: 1 1 0;
  flex-flow: row nowrap;
  position: relative;
  margin-left: ${theme.spacing('S10')};
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  align-items: center;
`;

const SearchField = styled.input`
  height: 100%;
  border-radius: 4px;
  flex: 1 1 0;
  border: none;
  outline: none;
  padding: 0 ${theme.spacing('S8')};
`;

export default {
  Title,
  SubTitle,
  Breadcrumbs,
  Page,
  ListActions,
  CreateButton,
  SearchBox,
  SearchField,
};
