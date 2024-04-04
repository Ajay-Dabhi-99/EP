import React from 'react';
import upload2Image from "../../assest/images/upload-2.png";
import { useIntl } from "react-intl";


const ChatboatUserListItem = () => {
  const intl = useIntl();

    return (
        <div className="chat-user-holder">
            <div>
                <div className="user-img">
                    <img src={upload2Image} alt="upload-2" />
                </div>
            </div>
            <div className="user-info">
                <div>
                    <h3>{intl.formatMessage({ id: "MARK JECNO" })}</h3>
                    <p>{intl.formatMessage({ id: "6:40 PM" })}</p>
                </div>
                <span>{intl.formatMessage({ id: "HI, HOW ARE YOU?" })}</span>
            </div>
        </div>
    )
}

export default ChatboatUserListItem;
