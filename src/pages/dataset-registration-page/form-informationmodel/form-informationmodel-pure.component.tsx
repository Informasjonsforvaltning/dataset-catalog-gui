import React, { memo, FC } from 'react';
import { compose } from 'redux';
import { FieldArray } from 'redux-form';

import {
  withTranslations,
  Props as TranslationsProps
} from '../../../providers/translations';

import Helptext from '../../../components/helptext/helptext.component';
import ExternalInformationModels from './external-information-models/external-information-models.component';
import FdkInformationModels from './fdk-information-models/fdk-information-models.component';

interface ExternalProps {
  languages: any[];
  isReadOnly: boolean;
  dispatch: (arg: any) => void;
  catalogId: string;
  datasetId: string;
}

interface Props extends ExternalProps, TranslationsProps {}

const FormInformationModel: FC<Props> = ({
  languages,
  isReadOnly,
  dispatch,
  catalogId,
  datasetId,
  translationsService
}) => (
  <form>
    <div className='form-group'>
      <div className='mt-4'>
        <div className='form-group'>
          <Helptext
            title={translationsService.translate(
              'schema.informationModel.helptext.fdkInformationModel'
            )}
            term='Dataset_fdkInformationModel'
          />
          <FieldArray
            name='informationModel'
            component={FdkInformationModels}
            isReadOnly={isReadOnly}
            dispatch={dispatch}
            catalogId={catalogId}
            datasetId={datasetId}
          />
          <Helptext
            title={translationsService.translate(
              'schema.informationModel.helptext.externalInformationModel'
            )}
            term='Dataset_externalInformationModel'
          />
          <FieldArray
            name='informationModel'
            component={ExternalInformationModels}
            titleLabel={translationsService.translate(
              'schema.informationModel.titleLabel'
            )}
            linkLabel={translationsService.translate(
              'schema.informationModel.linkLabel'
            )}
            addLabel={translationsService.translate(
              'schema.informationModel.addLabel'
            )}
            languages={languages}
            isReadOnly={isReadOnly}
            dispatch={dispatch}
            catalogId={catalogId}
            datasetId={datasetId}
          />
        </div>
      </div>
    </div>
  </form>
);

export default compose<FC<ExternalProps>>(
  memo,
  withTranslations
)(FormInformationModel);
