import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

import DatasetSVG from '../../images/icon-catalog-dataset-lg.svg';
import DataServiceSVG from '../../images/icon-catalog-api-lg.svg';
import ConceptSVG from '../../images/icon-catalog-concept-lg.svg';
import ProtocolSVG from '../../images/icon-catalog-protocol-xl.svg';

const DatasetIcon = styled(DatasetSVG)`
  height: 40px;
  width: 40px;
  min-height: 40px;
  min-width: 40px;
`;

const DataServiceIcon = styled(DataServiceSVG)`
  height: 40px;
  width: 40px;
  min-height: 40px;
  min-width: 40px;
`;

const ConceptIcon = styled(ConceptSVG)`
  height: 40px;
  width: 40px;
  min-height: 40px;
  min-width: 40px;
`;

const ProtocolIcon = styled(ProtocolSVG)`
  height: 40px;
  width: 40px;
  min-height: 40px;
  min-width: 40px;
`;

const Title = styled.h3`
  margin-top: ${theme.spacing('S10')};
  margin-bottom: ${theme.spacing('S4')};
  font-size: ${theme.fontSize('FS20')};
  font-weight: ${theme.fontWeight('FW700')};
`;

export default {
  DatasetIcon,
  DataServiceIcon,
  ConceptIcon,
  ProtocolIcon,
  Title
};
