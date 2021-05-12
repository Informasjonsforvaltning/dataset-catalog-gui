import _ from 'lodash';
import moment from 'moment';

import TranslationsService from '../../services/translations';

export const titleValues = values => {
  if (values) {
    let retVal = '';
    const { title, description, landingPage } = values;

    retVal += TranslationsService.translate(title)
      ? `${TranslationsService.translate(title)}. `
      : '';
    retVal += TranslationsService.translate(description)
      ? `${TranslationsService.translate(description)}. `
      : '';
    retVal += _.get(landingPage, '[0]', '');

    if (retVal.trim().length > 0) {
      return retVal;
    }
  }
  return null;
};

export const accessRightsValues = values => {
  if (values) {
    let retVal = '';
    const {
      accessRights,
      legalBasisForRestriction,
      legalBasisForProcessing,
      legalBasisForAccess
    } = values;
    if (
      accessRights.uri ===
      'http://publications.europa.eu/resource/authority/access-right/RESTRICTED'
    ) {
      retVal += `${TranslationsService.translate(
        'datasets.formValues.accessRights.restricted'
      )}. `;
    } else if (
      accessRights.uri ===
      'http://publications.europa.eu/resource/authority/access-right/PUBLIC'
    ) {
      retVal += `${TranslationsService.translate(
        'datasets.formValues.accessRights.publicString'
      )}. `;
    } else if (
      accessRights.uri ===
      'http://publications.europa.eu/resource/authority/access-right/NON_PUBLIC'
    ) {
      retVal += `${TranslationsService.translate(
        'datasets.formValues.accessRights.nonPublic'
      )}. `;
    }

    if (legalBasisForRestriction) {
      legalBasisForRestriction
        .filter(item => item && item.uri && item.uri !== '')
        .forEach(item => {
          retVal += TranslationsService.translate(item.prefLabel)
            ? `${TranslationsService.translate(item.prefLabel)} - `
            : '';
          retVal += _.get(item, 'uri', null)
            ? `${_.get(item, 'uri', '')} `
            : '';
        });
    }

    if (legalBasisForProcessing) {
      legalBasisForProcessing
        .filter(item => item && item.uri && item.uri !== '')
        .forEach(item => {
          retVal += TranslationsService.translate(item.prefLabel)
            ? `${TranslationsService.translate(item.prefLabel)} - `
            : '';
          retVal += _.get(item, 'uri', null)
            ? `${_.get(item, 'uri', '')} `
            : '';
        });
    }

    if (legalBasisForAccess) {
      legalBasisForAccess
        .filter(item => item && item.uri && item.uri !== '')
        .forEach(item => {
          retVal += TranslationsService.translate(item.prefLabel)
            ? `${TranslationsService.translate(item.prefLabel)} - `
            : '';
          retVal += _.get(item, 'uri', null)
            ? `${_.get(item, 'uri', '')} `
            : '';
        });
    }
    if (retVal.trim().length > 0) {
      return retVal;
    }
  }
  return null;
};

export const themesValues = values => {
  if (values) {
    const { theme } = values;
    let retVal = '';
    theme.forEach(item => {
      retVal += TranslationsService.translate(item.title)
        ? `${TranslationsService.translate(item.title)}. `
        : '';
    });
    if (retVal.trim().length > 0) {
      return retVal;
    }
  }
  return null;
};

export const losValues = (values, losItems) => {
  if (!values) {
    return null;
  }
  const { theme } = values;
  let retVal = '';
  theme.forEach(item => {
    const losItem = _.find(losItems, { uri: item.uri });
    retVal += losItem
      ? `${TranslationsService.translate(_.get(losItem, 'name'))}. `
      : '';
  });
  return retVal;
};

export const typeValues = values => {
  if (values) {
    let retVal = '';
    const { type } = values;
    if (type) {
      retVal = type;
    }
    if (retVal.trim().length > 0) {
      return retVal;
    }
  }
  return null;
};

export const conceptValues = values => {
  if (values) {
    let retVal = '';
    const { concepts, keyword } = values;
    if (concepts) {
      concepts.forEach(item => {
        retVal += TranslationsService.translate(item.prefLabel)
          ? `${TranslationsService.translate(item.prefLabel)}. `
          : '';
      });
    }
    if (keyword) {
      (keyword[TranslationsService.getLanguage()] || []).forEach(item => {
        retVal += TranslationsService.translate(item)
          ? `${TranslationsService.translate(item)}. `
          : '';
      });
    }
    if (retVal.trim().length > 0) {
      return retVal;
    }
  }
  return null;
};

export const spatialValues = values => {
  if (values) {
    let retVal = '';
    const { temporal, issued, language } = values;

    if (temporal) {
      temporal
        .filter(item => item && JSON.stringify(item) !== '{}')
        .forEach(item => {
          if (item.startDate) {
            retVal += `${moment(item.startDate).format('DD.MM.YYYY')} `;
          }
          if (item.startDate && item.endDate) {
            retVal += '- ';
          }
          if (item.endDate) {
            retVal += `${moment(item.endDate).format('DD.MM.YYYY')} `;
          }
        });
    }
    if (issued && issued !== '') {
      retVal += `${moment(issued).format('DD.MM.YYYY')}. `;
    }
    if (language) {
      language.forEach(item => {
        retVal += `${TranslationsService.translate(`lang.${item.code}`)}. `;
      });
    }
    if (retVal.trim().length > 0) {
      return retVal;
    }
  }
  return null;
};

export const provenanceValues = values => {
  if (values) {
    let retVal = '';
    const {
      provenance,
      modified,
      hasCurrentnessAnnotation,
      accrualPeriodicity
    } = values;

    retVal +=
      provenance && TranslationsService.translate(provenance.prefLabel)
        ? `${TranslationsService.translate(provenance.prefLabel)}. `
        : '';

    retVal += _.get(accrualPeriodicity, 'code', null)
      ? `${TranslationsService.translate(
          `schema.provenance.accrualPeriodicity.${accrualPeriodicity.code}`
        )}. `
      : '';

    if (modified) {
      retVal += `${moment(modified).format('DD.MM.YYYY')}. `;
    }

    retVal += TranslationsService.translate(hasCurrentnessAnnotation.hasBody)
      ? `${TranslationsService.translate(hasCurrentnessAnnotation.hasBody)}. `
      : '';

    if (retVal.trim().length > 0) {
      return retVal;
    }
  }
  return null;
};

export const contentsValues = values => {
  if (values) {
    let retVal = '';
    const {
      conformsTo,
      hasRelevanceAnnotation,
      hasCompletenessAnnotation,
      hasAccuracyAnnotation,
      hasAvailabilityAnnotation
    } = values;
    if (conformsTo) {
      retVal += conformsTo.map(item =>
        TranslationsService.translate(item.prefLabel)
          ? `${TranslationsService.translate(item.prefLabel)}. `
          : ''
      );
    }

    retVal +=
      hasRelevanceAnnotation &&
      TranslationsService.translate(hasRelevanceAnnotation.hasBody)
        ? `${TranslationsService.translate(hasRelevanceAnnotation.hasBody)}. `
        : '';
    retVal +=
      hasCompletenessAnnotation &&
      TranslationsService.translate(hasCompletenessAnnotation.hasBody)
        ? `${TranslationsService.translate(
            hasCompletenessAnnotation.hasBody
          )}. `
        : '';
    retVal +=
      hasAccuracyAnnotation &&
      TranslationsService.translate(hasAccuracyAnnotation.hasBody)
        ? `${TranslationsService.translate(hasAccuracyAnnotation.hasBody)}. `
        : '';
    retVal +=
      hasAvailabilityAnnotation &&
      TranslationsService.translate(hasAvailabilityAnnotation.hasBody)
        ? `${TranslationsService.translate(
            hasAvailabilityAnnotation.hasBody
          )}. `
        : '';

    if (retVal.trim().length > 0) {
      return retVal;
    }
  }
  return null;
};

export const informationModelValues = values => {
  if (values) {
    let retVal = '';
    const { informationModel } = values;
    if (informationModel) {
      informationModel.forEach(item => {
        retVal += TranslationsService.translate(item.prefLabel)
          ? `${TranslationsService.translate(item.prefLabel)}`
          : '';
        retVal += _.get(item, 'uri', '') ? ` - ${_.get(item, 'uri', '')} ` : '';
      });
    }
    if (retVal.trim().length > 0) {
      return retVal;
    }
  }
  return null;
};

export const referenceValues = values => {
  if (values) {
    let countReferences = 0;
    const { references } = values;
    if (references) {
      countReferences = references.filter(({ source }) => source?.uri).length;
    }
    if (countReferences > 0) {
      return `${countReferences} ${TranslationsService.translate(
        'datasets.formValues.references'
      )}`;
    }
    return null;
  }
  return null;
};

export const contactPointValues = values => {
  if (values) {
    let retVal = '';
    const { contactPoint } = values;
    if (contactPoint) {
      contactPoint.forEach(item => {
        retVal += _.get(item, 'organizationUnit', null)
          ? `${_.get(item, 'organizationUnit', null)}. `
          : '';
        retVal += _.get(item, 'hasURL', null)
          ? `${_.get(item, 'hasURL', null)}. `
          : '';
        retVal += _.get(item, 'email', null)
          ? `${_.get(item, 'email', null)}. `
          : '';
        retVal += _.get(item, 'hasTelephone', null)
          ? `${_.get(item, 'hasTelephone', null)}. `
          : '';
      });
    }
    if (retVal.trim().length > 0) {
      return retVal;
    }
  }
  return null;
};

export const distributionValues = values => {
  if (values) {
    let countDistributions = 0;
    const { distribution } = values;
    if (distribution) {
      countDistributions = distribution.filter(
        item => item.accessURL && item.accessURL[0] !== ''
      ).length;
    }
    if (countDistributions > 0) {
      return `${countDistributions} ${TranslationsService.translate(
        'datasets.formValues.distributions'
      )}`;
    }
  }
  return null;
};

export const sampleValues = values => {
  if (values) {
    let countSamples = 0;
    const { sample } = values;
    if (sample) {
      countSamples = sample.filter(
        item => item.accessURL && item.accessURL[0] !== ''
      ).length;
    }
    if (countSamples > 0) {
      return `${countSamples} ${TranslationsService.translate(
        'datasets.formValues.sample'
      )}`;
    }
  }
  return null;
};
