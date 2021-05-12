import set from 'lodash/set';

export function yupValidation(schema, values) {
  try {
    schema.validateSync(values, { abortEarly: false });
  } catch (errors) {
    return errors.inner.reduce(
      (previous, { path, message }) => set(previous, path, message),
      {}
    );
  }

  return {};
}
