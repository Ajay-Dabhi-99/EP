import React from 'react'
import { useSelector } from 'react-redux';
import { useIntl } from "react-intl";

const NotificationStepProgressBar = () => {
  const intl = useIntl();
    const NotificationHYP = [`${intl.formatMessage({id: "SELECT BUSINESS"})}`, `${intl.formatMessage({id: "USER"})}`, `${intl.formatMessage({id: "PUBLISH DATE & TIME"})}`, `${intl.formatMessage({id: "BILL DETAILS"})}`, `${intl.formatMessage({id: "PAYMENT"})}`];
    const nCount = useSelector(state => state?.notificationstepPogressCount?.nCount);
    return (
        <div className="w-full overflow-hidden">
            <ul className="flex justify-between step-progress-holder">
                {NotificationHYP.map((element, index) => (
                    <li className={nCount >= (index + 1) ? "active" : ""} key={index}>
                        <div>
                            <span className={nCount >= (index + 1) ? "active" : ""}>{index + 1}</span>
                        </div>
                        <h3>{element}</h3>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NotificationStepProgressBar