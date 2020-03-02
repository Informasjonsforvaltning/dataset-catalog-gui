import styled from 'styled-components';

const MaintenancePage = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
`;

const Subheading = styled.h2`
  margin-top: 30px;
  font-weight: normal;
`;

export default { MaintenancePage, PageContent, Heading, Subheading };
