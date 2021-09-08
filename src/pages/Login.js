import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { AppInputField, AppCard, AppButton } from "components";
import { AppConstant, AppApiFetch, AppStorage, isFalsyValue } from "utilities";
import { useHistory } from "react-router-dom";
import { AppContext } from "contexts";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    height: "100vh",
    flexDirection: "column",
  },
});

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { showSnackbar, isUserLoggedIn } = useContext(AppContext);
  const {
    login: { fields, apiPath, storage, roles },
  } = AppConstant;
  const defaultFields = fields;

  const [userField, setUserField] = useState(null);
  const [passwordField, setPasswordField] = useState(null);

  useEffect(() => {
    if (isUserLoggedIn()) {
      history.replace({ pathname: "/admin" });
    } else {
      setValues(defaultFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultFields]);

  const getFormData = () => {
    return {
      username: userField.value,
      password: passwordField.value,
    };
  };

  const getFormFields = () => {
    return {
      userField,
      passwordField,
    };
  };

  const setValues = ({ username, password }) => {
    setUserField(username);
    setPasswordField(password);
  };

  const usernameFieldChange = (value, name) => {
    const field = { ...userField, value };
    setUserField(field);
  };

  const passwordFieldChange = (value, name) => {
    const field = { ...passwordField, value };
    setPasswordField(field);
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
    if (key === "userField") setUserField(obj);
    if (key === "passwordField") setPasswordField(obj);
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
    const options = {
      method: "POST",
      body: formData,
    };
    const response = await AppApiFetch(apiPath, options);
    const { status, data, message } = await response.json();
    if (status) {
      const { role } = data;
      AppStorage.setItemInStorage(storage, data);
      if (roles.admin === role) {
        history.replace({ pathname: "/admin" });
      } else {
        // history.replace({ pathname: "/user" });
      }
    } else {
      showSnackbar(message);
    }
  };

  return (
    <div className={classes.root}>
      <AppCard title="Question Paper Designer">
        <form noValidate autoComplete="off">
          <AppInputField {...userField} handleChange={usernameFieldChange} />
          <AppInputField
            {...passwordField}
            handleChange={passwordFieldChange}
          />
          <AppButton onClick={formSubmit}>Login</AppButton>
        </form>
      </AppCard>
    </div>
  );
}
