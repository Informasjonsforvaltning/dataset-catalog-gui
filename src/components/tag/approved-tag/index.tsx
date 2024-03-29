import React from 'react';
import { localization } from '../../../utils/language/localization';
import Icon from '../../icon';
import SC from './styled';

const ApprovedTag = () => <SC.ApprovedTag text={localization.tag.approve} icon={<Icon name='circleCheckStroke' />} />;

export default ApprovedTag;
