import validate from './form-catalog-validations';
import datasets from '../../../test/fixtures/datasets';

xit('should validate without errors', () => {
  const dataset = datasets.datasetItems._embedded.datasets[0];
  expect(validate(dataset)).toEqual({});
});
