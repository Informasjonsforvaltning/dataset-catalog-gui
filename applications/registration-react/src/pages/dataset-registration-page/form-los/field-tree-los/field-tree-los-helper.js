import _ from 'lodash';

import { getTopicsLosChildren } from '../../../../redux/modules/referenceData';

export const isNodeActive = (input, node) =>
  _.filter(_.get(input, 'value', []), item => item.uri === node.uri).length > 0;

export const hasActiveChildren = (input, children) =>
  _.filter(_.get(input, 'value', []), item => _.includes(children, item.uri))
    .length > 0;

export const getTopicsToDisplay = (input, losItems) => {
  const topicsToShow = [];
  input.value
    .map(item => _.find(losItems, item))
    .map(tema =>
      getTopicsLosChildren(losItems, _.get(tema, 'children', [])).map(item =>
        topicsToShow.push(item)
      )
    );
  return topicsToShow;
};

export const getLosItemsFromInput = (input, losItems) =>
  input.value.map(item => _.find(losItems, item));