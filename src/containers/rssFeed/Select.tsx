const SelectField = ({
  className,
  value,
  name,
  onChange,
  options = [],
  valueKey = "id",
  labelKey = "name",
  errorMessage = "",
}: any) => {
  return (
    <>
      <select
        className={className}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">-Select-</option>
        {options?.length &&
          options.map((option: any, i: any) => (
            <option key={i} value={option[valueKey]}>
              {option[labelKey]}
            </option>
          ))}
      </select>
      {errorMessage && <span>{errorMessage}</span>}
    </>
  );
};

export default SelectField;
