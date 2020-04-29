import { licenseType, textType } from '../../../schemaTypes';

export const distributionTypes = values => {
  let distributions = null;
  if (values && values.length > 0) {
    distributions = values.map(({ accessService, ...item }) => ({
      id: item.id ? item.id : '',
      title: item.title ? item.title : textType,
      description: item.description ? item.description : textType,
      accessURL: item.accessURL ? item.accessURL : [],
      downloadURL: item.downloadURL ? item.downloadURL : [],
      license: item.license ? item.license : licenseType,
      conformsTo: item.conformsTo ? item.conformsTo : [],
      page: item.page && item.page.length > 0 ? item.page : [licenseType],
      format: item.format ? item.format : [],
      type: item.type ? item.type : '',
      accessService: (Array.isArray(accessService)
        ? accessService
        : [accessService]
      ).filter(Boolean)
    }));
  } else {
    distributions = [];
  }
  return distributions;
};
