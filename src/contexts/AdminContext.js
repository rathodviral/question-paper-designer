import React, { createContext, useEffect, useState } from "react";
import { AppConstant } from "../utilities";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [adminData, setAdminData] = useState({
    school: [],
    standard: [],
    subject: [],
  });

  const getList = (type) => {
    return adminData[type];
  };

  const getPageConstant = (page) => {
    const { admin } = AppConstant;
    return admin[page];
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminData]);

  return (
    <AdminContext.Provider
      value={{
        setAdminData,
        getList,
        getPageConstant,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
