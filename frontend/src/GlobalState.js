import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  currentUserInfo: {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions for changing state

  function setCurrentUser(item) {
    //console.log(item);
    dispatch({
      type: "ADD_ITEM",
      payload: item,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        currentUserInfo: state.currentUserInfo,
        setCurrentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
