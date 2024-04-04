import React from "react";
import userImage from "../../../../../assest/images/user-1.png";
import { useIntl } from "react-intl";

const ExistingUserPromoteListItem = () => {
  const intl = useIntl();

  return (
    <div className="flex items-center bg-white rounded-md cursor-pointer w-full p-4">
      <label className="checkbox w-8 h-8">
        <input type="checkbox" className="bg-white" />
        <i className="icon-right"></i>
      </label>
      <div className="flex items-center ml-5">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-5">
          <img
            src={userImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-base text-japaneseIndigo font-bold">
        {intl.formatMessage({id: "CHRISTOPHER COLON"})}
        </span>
      </div>
    </div>
  );
}

export default ExistingUserPromoteListItem;
