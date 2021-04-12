import { reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { compose } from 'recompose';

import { Language } from '../../services/translations';

import FormCatalogPure from './form-catalog-pure';
import validate from './form-catalog-validations';
import { asyncValidateCatalog } from './async-validate-catalog';
import { textType } from '../../schemaTypes';

import './form-catalog.scss';

const formConfigurer = compose(
  reduxForm({
    form: 'catalog',
    validate,
    shouldAsyncValidate: _.stubTrue, // override default, save even if sync validation fails
    asyncValidate: asyncValidateCatalog
  }),
  connect(state => ({
    values: getFormValues('catalog')(state)
  }))
);

const mapStateToProps = (__, { catalog, catalogId }) => ({
  initialValues: {
    id: catalogId,
    title:
      _.get(catalog, ['title', Language.NB], '').length > 0
        ? _.get(catalog, ['title'])
        : textType,
    description:
      _.get(catalog, ['description', Language.NB], '').length > 0
        ? _.get(catalog, ['description'])
        : textType,
    publisher: _.get(catalog, ['publisher'])
  }
});

const enhance = compose(connect(mapStateToProps), formConfigurer);

export const FormCatalog = enhance(FormCatalogPure);
