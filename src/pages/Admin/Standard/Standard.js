import React, { useContext, useState, useEffect } from "react";
import { List } from "@material-ui/core";
import { AppCard, AppInputField, AppDivider } from "components";
import { AdminContext } from "contexts";
import { windowScrollTop } from "utilities";
import { EditStandardDialog, StandardListItem } from ".";

export default function Standard(props) {
  const { reloadData } = props;
  const type = "standard";
  const { getList, getPageConstant } = useContext(AdminContext);
  const { search } = getPageConstant(type);
  const defaultList = getList(type);
  const defaultField = search;

  const [standardList, setstandardList] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [showHideDialog, setShowHideDialog] = useState(false);
  const [selectedListObj, setSelectedListObj] = useState({
    standardId: "",
    standardName: "",
    standardDetail: "",
    school: null,
  });

  useEffect(() => {
    windowScrollTop();
    setstandardList(defaultList);
    setSearchField(defaultField);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultList]);

  const handleChange = (value) => {
    setSearchField({ ...searchField }, value);
    const list =
      value !== ""
        ? defaultList.filter((x) => x.name.toLowerCase().includes(value))
        : [...defaultList];
    setstandardList(list);
  };

  const listItemClick = (id) => {
    const value = standardList.find((x) => x.standardId === id);
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
          {standardList.map((item, i) => (
            <StandardListItem
              key={i}
              {...item}
              listItemClick={listItemClick}
            ></StandardListItem>
          ))}
        </List>
        <EditStandardDialog
          editType={type}
          showHideDialog={showHideDialog}
          selectedListObj={selectedListObj}
          toggleDialog={toggleDialog}
          reloadData={reloadData}
        ></EditStandardDialog>
      </AppCard>
    </div>
  );
}
