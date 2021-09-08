import React, { useContext, useState, useEffect } from "react";
import { List } from "@material-ui/core";
import { AppCard, AppInputField, AppDivider } from "components";
import { AdminContext } from "contexts";
import { windowScrollTop } from "utilities";
import { EditSchoolDialog, SchoolListItem } from ".";

export default function School(props) {
  const { reloadData } = props;
  const type = "school";
  const { getList, getPageConstant } = useContext(AdminContext);
  const { search } = getPageConstant(type);
  const defaultList = getList(type);
  const defaultField = search;

  const [schoolList, setSchoolList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [showHideDialog, setShowHideDialog] = useState(false);
  const [selectedListObj, setSelectedListObj] = useState({
    schoolId: "",
    schoolName: "",
    schoolDetail: "",
  });

  useEffect(() => {
    windowScrollTop();
    setSchoolList(defaultList);
    setSearchField(defaultField);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultList]);

  const handleChange = (value) => {
    setSearchField({ ...searchField }, value);
    const list =
      value !== ""
        ? defaultList.filter((x) => x.name.toLowerCase().includes(value))
        : [...defaultList];
    setSchoolList(list);
  };

  const listItemClick = (id) => {
    const value = schoolList.find((x) => x.schoolId === id);
    setSelectedListObj({ ...value });
    toggleDialog(true);
  };

  const toggleDialog = (value) => {
    setShowHideDialog(value);
  };

  return (
    <div>
      <AppCard title={`${type} Categories`}>
        <AppInputField
          {...searchField}
          handleChange={handleChange}
        ></AppInputField>
        <AppDivider />
        <List component="div" disablePadding>
          {schoolList.map((item, i) => (
            <SchoolListItem
              key={i}
              {...item}
              listItemClick={listItemClick}
            ></SchoolListItem>
          ))}
        </List>
        <EditSchoolDialog
          editType={type}
          showHideDialog={showHideDialog}
          selectedListObj={selectedListObj}
          toggleDialog={toggleDialog}
          reloadData={reloadData}
        ></EditSchoolDialog>
      </AppCard>
    </div>
  );
}
