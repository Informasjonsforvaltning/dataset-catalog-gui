import _ from 'lodash';

export const getAllLosParentNodes = losItems =>
  _.filter(losItems, { parents: null });

export const getAllLosChildrenNodes = (losItems, children) =>
  _.filter(losItems, item => item.isTheme && _.includes(children, item.uri));

export const getTopicsLosChildren = (losItems, children) =>
  _.filter(losItems, item => !item.isTheme && _.includes(children, item.uri));

export const getLosReferences = (losItems, references, key) => {
  let items = [];
  if (references) {
    _.filter(losItems, item => {
      if (_.includes(references, item.uri)) {
        items = [...items, ...getLosReferences(losItems, item[key])];
        items.push(item);
      }
    });
  }
  return items;
};

export const getLosItemParentsAndChildren = (losItems, item) => {
  if (!item) {
    return losItems;
  }
  const parents = getLosReferences(losItems, _.get(item, 'parents'), 'parents');
  const children = getLosReferences(
    losItems,
    _.get(item, 'children'),
    'children'
  );
  return [item, ...parents, ...children];
};

export const isNapTheme = (losItems, themeUris) =>
  _.some(themeUris, theme => {
    const losItem = _.find(losItems, { uri: theme.uri });
    const losPaths = _.get(losItem, 'losPaths', []);
    return _.some(
      losPaths,
      path =>
        _.startsWith(path, 'trafikk-og-transport/mobilitetstilbud') ||
        _.startsWith(path, 'trafikk-og-transport/trafikkinformasjon') ||
        _.startsWith(path, 'trafikk-og-transport/veg-og-vegregulering') ||
        _.startsWith(path, 'trafikk-og-transport/yrkestransport')
    );
  });
