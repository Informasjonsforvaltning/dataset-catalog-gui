import axios from 'axios';

interface EnhetsregisteretOrganizationSearchParams {
  organisasjonsnummer?: string;
  navn?: string;
  size?: number;
}

export const searchOrganizations = async (
  params: EnhetsregisteretOrganizationSearchParams,
  isSubordinate?: boolean
) =>
  axios.get(
    `https://data.brreg.no/enhetsregisteret/api/${
      isSubordinate ? 'underenheter' : 'enheter'
    }`,
    { params }
  );
