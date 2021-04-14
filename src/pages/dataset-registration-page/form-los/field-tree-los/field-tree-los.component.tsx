import React, { memo, FC } from 'react';
import { compose } from 'redux';
import type { WrappedFieldProps } from 'redux-form';
import TreeView from 'react-treeview';
import 'react-treeview/react-treeview.css';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../../providers/translations';

import {
  getAllLosParentNodes,
  getAllLosChildrenNodes
} from '../../../../entrypoints/main/redux/modules/referenceData';

import Translation from '../../../../components/translation';

import TreeLosOption from './field-tree-los-option.component';

import {
  isNodeActive,
  getTopicsToDisplay,
  hasActiveChildren
} from './field-tree-los-helper';
import { handleUpdateField } from '../form-helper';

import './field-tree-los.scss';

interface ExternalProps {
  losItems: any[];
  defaultOpenTree: boolean;
  defaultShowTopic: any;
}

interface Props extends ExternalProps, TranslationsProps, WrappedFieldProps {}

const FieldTreeLos: FC<Props> = ({
  losItems,
  input,
  defaultOpenTree,
  defaultShowTopic,
  translationsService
}) => (
  <div className='d-flex'>
    <div className='w-50'>
      <strong>
        <Translation id='schema.los.themeLabel' />
      </strong>
      {getAllLosParentNodes(losItems)?.map(node => {
        const children = node?.children ?? [];
        const nodeIsOpen =
          defaultOpenTree || hasActiveChildren(input, children);

        const nodeLabel = (
          <TreeLosOption
            itemKey={0.5}
            value={node.uri}
            label={translationsService.translate(node.name)}
            onClick={event => {
              handleUpdateField(input, event);
            }}
            activeNode={isNodeActive(input, node)}
            displayClass='inline-block'
          />
        );

        return (
          <div key={`${node.uri}-${defaultOpenTree}`}>
            <TreeView
              nodeLabel={nodeLabel}
              defaultCollapsed={!nodeIsOpen}
              itemClassName='tree-view_main d-flex flex-row-reverse justify-content-end align-items-center ml-2 py-2'
            >
              {getAllLosChildrenNodes(losItems, children)?.map(childNode => (
                <div key={childNode.uri}>
                  <TreeLosOption
                    key={childNode.uri}
                    itemKey={0.5}
                    value={childNode.uri}
                    label={translationsService.translate(childNode.name)}
                    onClick={event => {
                      handleUpdateField(input, event);
                    }}
                    activeNode={isNodeActive(input, childNode)}
                    displayClass='inline-block'
                  />
                </div>
              ))}
            </TreeView>
          </div>
        );
      })}
    </div>
    <div className='pl-5 border-left'>
      <strong>
        <Translation id='schema.los.topicsLabel' />
      </strong>
      {getTopicsToDisplay(input, losItems, defaultShowTopic)?.map(
        (topic, index) => (
          <div key={`topic-${topic.uri}-${index}`}>
            <TreeLosOption
              itemKey={0.5}
              value={topic.uri}
              label={translationsService.translate(topic.name)}
              onClick={e => {
                handleUpdateField(input, e);
              }}
              activeNode={isNodeActive(input, topic)}
              displayClass='inline-block'
            />
          </div>
        )
      )}
    </div>
  </div>
);

export default compose<FC<ExternalProps>>(memo, withTranslations)(FieldTreeLos);
