import schema from './form-reference-validations';
import datasets from '../../../test/fixtures/datasets';

it('should validate without errors', async () => {
  const dataset = datasets.datasetItems._embedded.datasets[0];
  await expect(schema.validate(dataset)).resolves.toBeTruthy();
});
