export const findField = (id: string, fields: any) => {
  if (fields) return fields.find((element: any) => element.display_id === id);
  return {};
};

export const listOptionOfField = (id: string, fields: any) => {
  if (id) {
    let currentField = findField(id, fields);
    if (currentField.display_id)
      return currentField.options?.sort(
        (a: any, b: any) => a.sort_id - b.sort_id,
      );
    return null;
  }
};

export const formatOption = (id: string, fields: any) => {
  let options = listOptionOfField(id, fields);

  if (options) {
    return options.map((option: any) => ({
      value: option.display_id || option.o_id,
      label: option.value,
    }));
  }
};

export const getSelectValue = (
  key: string,
  fields: any,
  currentValue: string | undefined
): { value: string; label: string } | string  => {
  if (!currentValue) return '';
  const options = formatOption(key, fields);
  return options.find(
    (option: { value: string; label: string }) => option.label === currentValue || option.value === currentValue
  ).value || '';
}
