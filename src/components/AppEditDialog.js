import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  makeStyles,
  IconButton,
  Typography,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { AppApiFetch, AppConstant, isFalsyValue } from "../utilities";
import { AdminContext, AppContext } from "../contexts";
import { AppButton, AppDivider, AppInputField } from ".";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  saveButton: {
    marginLeft: "auto",
  },
  title: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppEditDialog(props) {
  const classes = useStyles();
  const history = useHistory();
  const { type } = useParams();
  const { showAlertDialog, showSnackbar } = useContext(AppContext);
  const { getPageConstant } = useContext(AdminContext);

  const {
    editType,
    showHideDialog,
    selectedListObj,
    toggleDialog,
    reloadData,
  } = props;

  const { schoolDetail, schoolId, schoolName } = selectedListObj;
  const { apiPath, fields } = getPageConstant(editType);
  const defaultFields = fields;
  const [nameField, setNameField] = useState(null);
  const [detailField, setDetailField] = useState(null);

  useEffect(() => {
    setValues(defaultFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHideDialog]);

  const getFormData = () => {
    return {
      schoolName: nameField.value,
      schoolDetail: detailField.value,
      schoolId,
    };
  };

  const getFormFields = () => {
    return {
      nameField,
      detailField,
    };
  };

  const setValues = ({ name, detail }) => {
    setNameField({ ...name, value: schoolName });
    setDetailField({ ...detail, value: schoolDetail });
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

  const alertBtnClickDeleteListItem = (isDelete) => {
    if (isDelete) {
      deleteListItem();
    }
  };

  const alertDeleteListItem = () => {
    const obj = {
      title: `Delete ${editType}`,
      message: `Are you sure, you want to delete "${schoolName}".`,
      agreeBtnText: "Agree",
      disagreeBtnText: "Disagree",
      dialogBtnClick: alertBtnClickDeleteListItem,
    };
    showAlertDialog(obj);
  };

  const deleteListItem = async () => {
    const options = {
      method: "DELETE",
      queryParams: { id: schoolId },
    };
    const response = await AppApiFetch(apiPath.delete, options);
    const { status } = await response.json();
    if (status) {
      showSnackbar(`${editType} Deleted.`);
      reloadData();
      toggleDialog(false);
    } else {
      showSnackbar("Some Issue");
    }
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
    const { update } = apiPath;
    const options = {
      method: "PUT",
      body: { ...formData },
    };
    const response = await AppApiFetch(update, options);
    const { status, message } = await response.json();
    showSnackbar(message);
    if (status) {
      reloadData();
    } else {
      setValues(defaultFields);
    }
  };

  return (
    <Dialog
      fullScreen
      open={showHideDialog}
      onClose={(e) => toggleDialog(false)}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={(e) => toggleDialog(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {`Edit ${schoolName}`}
          </Typography>
          <IconButton
            className={classes.saveButton}
            edge="start"
            color="inherit"
            onClick={(e) => alertDeleteListItem()}
            aria-label="close"
          >
            <DeleteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ padding: "1rem" }}>
        {/* {isSubCategory && (
          <Typography variant="h6" style={{ textAlign: "center" }}>
            Edit Sub Category for {getListObj(isExpense, categoryId, "name")}
          </Typography>
        )}
        {isSubCategory && <AppDivider />} */}
        <form noValidate autoComplete="off">
          <AppInputField {...nameField} handleChange={nameFieldChange} />
          <AppInputField {...detailField} handleChange={detailFieldChange} />
          <AppButton onClick={formSubmit}>Save Detail</AppButton>
          {/* {!isSubCategory && (
            <AppButton onClick={(e) => history.push(`${type}/add/${id}`)}>
              Add Sub Category
            </AppButton>
          )} */}
        </form>
      </div>
    </Dialog>
  );
}
