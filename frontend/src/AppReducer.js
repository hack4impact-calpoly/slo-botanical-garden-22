import React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        currentUserInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
