import { useEffect, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";

import httpRequest from "../../axios";

import SelectField from "./Select";

import * as Yup from "yup";
import MultipleUnits from "./MultipleUnits";

const UnitSchema = Yup.object().shape({
  id: Yup.number().required("Key is required"),
  value: Yup.string().required("Unit Stock value is required"),
});
const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Product is required"),
  price: Yup.number().required("Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  units: Yup.array()
    .of(UnitSchema)
    .required("At least one product is required"),
});

const ProductsSchema = Yup.object().shape({
  products: Yup.array()
    .of(ProductSchema)
    .required("At least one product is required"),

  //   order_amount: Yup.string().required("order_amount is required"),
  //   payment_method: Yup.string().required("payment_method is required"),

  //   paid_amount: Yup.string().required("paid_amount is required"),

  //   scheduled_delivery_date: Yup.string().required(
  //     "scheduled_delivery_date is required"
  //   ),
  //   supplier_id: Yup.string().required("supplier_id is required"),
});

const FormAtt = ({
  type = "add",
  initialValues = {
    products: [
      {
        name: "",
        price: 0,
        quantity: 0,
        units: [
          {
            id: "",
            value: "",
          },
        ],
      },
    ],
    order_amount: "",
    payment_method: "",
    paid_amount: "",
    scheduled_delivery_date: "",
    supplier_id: "",
  },
}) => {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any>([]);
  const [profiles, setprofiles] = useState<any>([]);

  const [selectedProductOptions, setSelectedProductOptions] = useState<any>([]);

  console.log(posts, "posts");
  const createRssFeed = async (
    values: any,
    setSubmitting: any,
    resetForm: any
  ) => {
    setLoading(true);
    try {
      const { data } = await httpRequest.post("", {
        attribute_key_id: values.attr_type,
        value: values.attr_value,
      });
      if (data.status === "Success") {
      }
      setLoading(false);
      resetForm({});
    } catch (error) {
      setLoading(false);
    }
  };

  const getPosts = async () => {
    try {
      const { data } = await httpRequest.get("products");
      if (data.status === "Success") {
        let poss = data.data;
        if (poss.length) {
          poss = poss.map((item: any) => {
            return {
              ...item,
              label: item?.data?.name,
            };
          });
          setPosts(poss);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProfiles = async () => {
    try {
      const { data } = await httpRequest.get("profiles");
      if (data.status === "Success") {
        let poss = data.data;
        if (poss.length) {
          poss = poss.map((item: any) => {
            return {
              ...item,
              label: item?.data?.name,
            };
          });
          setprofiles(poss);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    getProfiles();
  }, []);

  const handleProductNameChange = (
    index: any,
    setFieldValue: any,
    value: any
  ) => {
    const newSelectedProductOptions = [
      ...selectedProductOptions,
      parseInt(value),
    ];
    // newSelectedProductOptions[index] = parseInt(value);
    setSelectedProductOptions(newSelectedProductOptions);
    setFieldValue(`products.${index}.name`, value);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: any, { setSubmitting, resetForm }: any) => {
        createRssFeed(values, setSubmitting, resetForm);
      }}
      enableReinitialize
      validationSchema={ProductsSchema}
    >
      {(props: any) => {
        const {
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          setFieldValue,
        } = props;

        console.log(errors, "______errors____");
        return (
          <Form className="form theme-form">
            <div className="card-body">
              {/* <div className="row">
                <Field
                  name={"order_amount"}
                  placeholder="Order Amount"
                  type="number"
                />
                <ErrorMessage name={"order_amount"} component="div" />
              </div>
              <div className="row">
                <Field
                  name={"payment_method"}
                  placeholder="Order Amount"
                  type="number"
                />
                <ErrorMessage name={"payment_method"} component="div" />
              </div>
              <div className="row">
                <Field
                  name={"paid_amount"}
                  placeholder="paid_amount Amount"
                  type="number"
                />
                <ErrorMessage name={"paid_amount"} component="div" />
              </div>

              <div className="row">
                <Field
                  name={"scheduled_delivery_date"}
                  placeholder="scheduled_delivery_date Amount"
                  type="number"
                />
                <ErrorMessage
                  name={"scheduled_delivery_date"}
                  component="div"
                />
              </div> */}

              {/* <SelectField
                className={"form-control digits"}
                name={`supplier_id`}
                value={values.supplier_id}
                onChange={handleChange}
                labelKey={"label"}
                onBlur={handleBlur}
                options={profiles}
                // errorMessage={`products.${index}.name`}
              />
              <ErrorMessage name={`supplier_id`} component="div" /> */}

              <FieldArray name="products">
                {({ push, remove }) => (
                  <>
                    {values.products.map((product: any, index: any) => {
                      const productOptionsForThisRow: any = [];
                      posts.forEach((option: any) => {
                        if (product.name) {
                          if (
                            product.name == option.id &&
                            selectedProductOptions.includes(option.id)
                          ) {
                            productOptionsForThisRow.push(option);
                          } else {
                            if (!selectedProductOptions.includes(option.id)) {
                              productOptionsForThisRow.push(option);
                            }
                          }
                        } else {
                          if (!selectedProductOptions.includes(option.id)) {
                            productOptionsForThisRow.push(option);
                          }
                        }
                      });

                      const sellingUnit = posts.find(
                        (post: any) => post.id == product.name
                      );

                      console.log(sellingUnit, "product___");

                      return (
                        <div key={index}>
                          <SelectField
                            className={"form-control digits"}
                            name={`products.${index}.name`}
                            value={product.name}
                            onChange={(event: any) =>
                              handleProductNameChange(
                                index,
                                setFieldValue,
                                event.target.value
                              )
                            }
                            labelKey={"label"}
                            onBlur={handleBlur}
                            options={productOptionsForThisRow}
                            // errorMessage={`products.${index}.name`}
                          />
                          <ErrorMessage
                            name={`products.${index}.name`}
                            component="div"
                          />

                          <Field
                            name={`products.${index}.price`}
                            placeholder="coast"
                            type="number"
                          />
                          <ErrorMessage
                            name={`products.${index}.price`}
                            component="div"
                          />
                          <Field
                            name={`products.${index}.quantity`}
                            placeholder="Stock Quantity"
                            type="number"
                          />
                          <ErrorMessage
                            name={`products.${index}.quantity`}
                            component="div"
                          />

                          <>
                            <MultipleUnits
                              index={index}
                              product={product}
                              currentSelectedUnits={
                                sellingUnit?.data?.units || []
                              }
                              setFieldValue={setFieldValue}
                              values={values}
                            />
                            {/* {sellingUnit?.data?.units?.map((unit: any) => (
                              <>
                                <label key={unit.id}>{unit.id}</label>
                                <input type="text" />
                              </>
                            ))} */}
                          </>
                          <button
                            type="button"
                            onClick={() => {
                              console.log(product.name);
                              const newSelectedProductOptions =
                                selectedProductOptions.filter(
                                  (item: any) => item != product.name
                                );

                              console.log(
                                newSelectedProductOptions,
                                "After removingggg"
                              );

                              setSelectedProductOptions(
                                newSelectedProductOptions
                              );
                              remove(index);
                            }}
                          >
                            -
                          </button>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() =>
                        push({
                          name: "",
                          price: 0,
                          quantity: 0,
                          units: [{ id: "", value: "" }],
                        })
                      }
                    >
                      +
                    </button>
                  </>
                )}
              </FieldArray>
            </div>

            {isLoading && <div>Loading...</div>}
            <div className="card-footer text-end">
              <button
                className={"btn btn-primary me-2"}
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default FormAtt;
