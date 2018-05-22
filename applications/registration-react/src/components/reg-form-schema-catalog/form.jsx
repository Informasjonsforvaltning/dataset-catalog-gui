import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import cx from 'classnames';
import { Collapse } from 'reactstrap';

import Helptext from '../reg-form-helptext';
import InputField from '../reg-form-field-input';
import InputTitleField from '../reg-form-field-input-title';
import TextAreaField from '../reg-form-field-textarea';

class FormCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTitle = this.toggleTitle.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
    this.state = {
      collapseTitle: false,
      collapse: false
    };
  }

  toggleTitle() {
    this.setState({ collapseTitle: !this.state.collapseTitle });
  }

  toggleDescription() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { helptextItems, initialValues, values } = this.props;
    const { title, publisher } = initialValues;

    const collapseClass = cx(
      'fdk-reg_collapse',
      'fdk-reg_backgroundDefault',
      'fdk-datasets-description',
      {
        'fdk-reg_collapse_open': this.state.collapse
      }
    );

    const fieldClass = cx('fdk-title-input', {
      'w-100': this.state.collapseTitle
    });

    return (
      <form className="mb-5 fdk-reg-catalogs">
        <div className="d-none">
          <Field name="id" component={InputField} label="Beskrivelse" />
        </div>
        <div className="d-flex align-items-center justify-content-between">
          {title &&
            title.nb &&
            !this.state.collapseTitle && (
              <h1 className="w-75 fdk-text-strong">{title.nb}</h1>
            )}
          <div className={fieldClass}>
            <Field
              name="title.nb"
              component={InputTitleField}
              label="Tittel"
              hideInput={this.state.collapseTitle}
              onToggleTitle={this.toggleTitle}
            />
          </div>
        </div>

        {publisher &&
          publisher.name && (
            <div className="fdk-reg-datasets-publisher mt-2 mb-4">
              Eies av {publisher.name}
            </div>
          )}

        <div className={collapseClass}>
          <div className="d-flex justify-content-between w-100">
            <div className="d-flex fdk-color1">{values.description.nb}</div>
            <button
              onClick={e => {
                e.preventDefault();
                this.toggleDescription();
              }}
            >
              <i className="fa fa-pencil mr-2" />
              Rediger beskrivelse
            </button>
          </div>
          <Collapse className="mt-3" isOpen={this.state.collapse}>
            <div className="form-group">
              <Helptext
                title="Beskrivelse"
                required
                helptextItems={helptextItems.Catalog_title}
              />
              <Field
                name="description.nb"
                component={TextAreaField}
                label="Beskrivelse"
              />
            </div>
          </Collapse>
        </div>
      </form>
    );
  }
}

FormCatalog.defaultProps = {
  initialValues: null,
  values: null
};
FormCatalog.propTypes = {
  helptextItems: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  values: PropTypes.object
};

export default FormCatalog;
