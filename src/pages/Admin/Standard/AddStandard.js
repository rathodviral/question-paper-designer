import React, { useContext, useState, useEffect } from "react";
import { AppCard, AppInputField, AppButton } from "components";
import { useParams } from "react-router-dom";
import { AppApiFetch, isFalsyValue } from "utilities";
import { AdminContext, AppContext } from "contexts";

export default function AddStandard(props) {
  const { reloadData } = props;
  const { type } = useParams();
  const { showSnackbar } = useContext(AppContext);
  const { getPageConstant } = useContext(AdminContext);
  const { fields, apiPath } = getPageConstant(type);
  const defaultFields = fields;

  const [nameField, setNameField] = useState(null);
  const [detailField, setDetailField] = useState(null);

  useEffect(() => {
    setValues(defaultFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultFields]);

  const getFormData = () => {
    return {
      schoolName: nameField.value,
      schoolDetail: detailField.value,
    };
  };

  const getFormFields = () => {
    return {
      nameField,
      detailField,
    };
  };

  const setValues = ({ name, detail }) => {
    setNameField(name);
    setDetailField(detail);
  };

  const nameFieldChange = (value, name) => {
    const field = { ...nameField, value };
    setNameField(field);
  };

  const detailFieldChange = (value, name) => {
    const field = { ...detailField, value };
    setDetailField(field);
  };

  const validateObject = (formObject) => {
    return {
      ...formObject,
      isError: true,
      label: "Error",
      helperText: `Enter ${formObject.label}, it's required field`,
    };
  };

  const updateFieldValue = (key, obj) => {
    if (key === "name") setNameField(obj);
    if (key === "detail") setDetailField(obj);
  };

  const formSubmit = async () => {
    const formFields = getFormFields();
    const formData = getFormData();
    if (Object.values(formData).some((item) => isFalsyValue(item))) {
      Object.keys(formFields).forEach((item) => {
        const field = formFields[item];
        const fieldObj = isFalsyValue(field.value)
          ? validateObject(field)
          : field;
        updateFieldValue(item, fieldObj);
      });
      return;
    }
    const { create } = apiPath;
    const options = {
      method: "POST",
      body: {
        ...formData,
      },
    };

    const response = await AppApiFetch(create, options);
    const { status, message } = await response.json();
    showSnackbar(message);
    setValues(defaultFields);
    if (status) {
      reloadData();
    }
  };

  return (
    <div>
      <AppCard title={`Add ${type}`}>
        <form noValidate autoComplete="off">
          <AppInputField {...nameField} handleChange={nameFieldChange} />
          <AppInputField {...detailField} handleChange={detailFieldChange} />
          <AppButton onClick={formSubmit}>Save {type}</AppButton>
        </form>
      </AppCard>
    </div>
  );
}
