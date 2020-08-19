import axios from 'axios';

interface EnhetsregisteretOrganizationSearchParams {
  organisasjonsnummer?: string;
  navn?: string;
  size?: number;
}

export const searchOrganizations = async (
  params: EnhetsregisteretOrganizationSearchParams
) =>
  axios.get('https://data.brreg.no/enhetsregisteret/api/enheter', { params });
