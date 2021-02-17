import { Namespace, Fetcher, graph } from 'rdflib';

import type { AdministrativeUnit } from '../../../types';

const res = Namespace('http://www.w3.org/2005/sparql-results#');

export const searchAdministrativeUnits = async (
  search: string,
  size: number
): Promise<AdministrativeUnit[]> => {
  const fetcher = new Fetcher(graph(), { withCredentials: false });

  await fetcher.load(
    `https://rdf.kartverket.no/api/1.0/adminstrative_unit/search?search=${search}&format=text/turtle`,
    {}
  );

  const variables = fetcher.store
    .statementsMatching(null, res('resultVariable'), null)
    .map(node => node.object.value);

  return fetcher.store
    .statementsMatching(null, res('solution'), null)
    .slice(0, size)
    .map(({ object: solutionObject }) =>
      fetcher.store
        .statementsMatching(solutionObject as any, res('binding'), null)
        .reduce((previous, { object: bindingObject }) => {
          const variable = fetcher.store.anyStatementMatching(
            bindingObject as any,
            res('variable'),
            null
          )?.object.value;

          const value = fetcher.store.anyStatementMatching(
            bindingObject as any,
            res('value'),
            null
          )?.object.value;

          return variable && variables.includes(variable)
            ? { ...previous, [variable]: value }
            : previous;
        }, {} as Record<string, any>)
    )
    .map(({ uri, enh_type: type, enh_navn: name }) => ({ uri, type, name }));
};
