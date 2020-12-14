import React from 'react';
import { getTranslateText } from '../../services/translateText';

import { Container } from './styled';

const wipTitle = {
  no: 'Arbeid Pågår',
  en: 'Work in Progress'
};

const wipBody = {
  no:
    'Vi jobber med å forbedre tjenesten. Prøv igjen om kort tid. Vi beklager ulempen.',
  en:
    'We are working on improving the service. Please try again later. We apologize for the inconvenience.'
};

export const WipPage = () => (
  <Container>
    <img src="../../img/illustration-maintenance.gif" alt="Under utvikling" />
    <h1>{getTranslateText(wipTitle)}</h1>
    <p>{getTranslateText(wipBody)}</p>
  </Container>
);
