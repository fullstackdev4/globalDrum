import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useEffect } from "react";

const MultipleUnits = ({
  index,
  product,
  currentSelectedUnits,
  setFieldValue,
  values,
}: any) => {
  console.log(values, "values____++_+_+_+_+_+_+_+_+_");

  useEffect(() => {
    if (product.name) {
      currentSelectedUnits.map((item: any, currentindex: any) => {
        setFieldValue(`products.${index}.units.${currentindex}.id`, item.id);
        setFieldValue(`products.${index}.units.${currentindex}.value`, "");
      });
    }
  }, [currentSelectedUnits, product.name]);
  return (
    <FieldArray name={`products.${index}.units`}>
      {() => (
        <>
          {product?.units.length > 0 &&
            product?.units?.map((singleUnit: any, attrIndex: number) => (
              <div key={attrIndex}>
                <label htmlFor={`products.${index}.units.${attrIndex}.value`}>
                  Unit Stock value
                </label>
                <Field name={`products.${index}.units.${attrIndex}.value`} />
                <ErrorMessage
                  name={`products.${index}.units.${attrIndex}.value`}
                  component="div"
                />
              </div>
            ))}
        </>
      )}
    </FieldArray>
  );
};

export default MultipleUnits;
