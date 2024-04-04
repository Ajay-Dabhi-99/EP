import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, s3Url } from "../../config";
import DefaultProfileImg from "../../assest/images/userdefault.jpg";
import { getOneInvoiceDetail } from "./invoiceSlice";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";

const InvoiceDetials = () => {
  const intl = useIntl();
  const [invoiceData, setInvoiceData] = useState([]);
  const navigate = useNavigate();
  const invoiceid = localStorage.getItem("invoiceId");
  const dispatch = useDispatch();

  const invoicedetialsList = async () => {
    try {
      let payload = {
        invoiceid: invoiceid,
      };
      const response = await dispatch(getOneInvoiceDetail(payload)).unwrap();
      setInvoiceData(response.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    invoicedetialsList();
  }, []);

  return (
    <div className="wrapper min-h-full">
      <div className="space-y-8 h-full">
        {/* <!-- title-holder  --> */}
        <div className="flex justify-between items-center">
          <div
            onClick={() => {
              navigate("../../invoice");
              localStorage.removeItem("invoiceId");
            }}
            className="flex items-center cursor-pointer"
          >
            <i className="icon-back-arrow mr-4 text-2xl"></i>
            <h1>{intl.formatMessage({ id: "INVOICE DETAILS" })}</h1>
          </div>
          <a
            href={
              invoiceData &&
                invoiceData.invoice_url &&
                invoiceData.invoice_url !== ""
                ? s3Url + "/" + invoiceData?.invoice_url
                : "#"
            }
            target="_blank"
            className="btn-primary small group"
          >
            {intl.formatMessage({ id: "DOWNLOAD INVOICE" })}
          </a>
        </div>
        {/* <!-- main-content  --> */}
        <div className="p-8 rounded-md bg-white">
          <div className="w-full flex items-center pb-9 border-b border-brightGray">
            <div className="w-14 h-14 rounded-full overflow-hidden">
              <img
                src={
                  invoiceData?.userid &&
                    invoiceData?.userid?.profile_pic &&
                    invoiceData?.userid?.profile_pic !== ""
                    ? s3Url + "/" + invoiceData?.userid?.profile_pic
                    : DefaultProfileImg
                }
                className="w-full h-full object-cover"
                alt="Invoice_Details_profile"
              />
            </div>
            <div className="text-left pl-4">
              <span className="block text-base font-bold">{intl.formatMessage({ id: "NAME" })}</span>
              <span className="block text-sm font-normal text-quicksilver">
                {invoiceData?.userid?.name}
              </span>
            </div>
          </div>
          <div className="pt-8 w-full space-y-5 xl:space-y-6">
            <div className="text-left">
              <span className="block text-base font-bold">{intl.formatMessage({ id: "EVENT NAME" })}</span>
              <span className="block text-sm font-normal text-quicksilver pt-1">
                {invoiceData?.name}
              </span>
            </div>
            <div className="text-left">
              <span className="block text-base font-bold">{intl.formatMessage({ id: "INVOICE NUMBER" })}</span>
              <span className="block text-sm font-normal text-quicksilver pt-1">
                {invoiceData?.invoice_no}
              </span>
            </div>
            <div className="text-left">
              <span className="block text-base font-bold">{intl.formatMessage({ id: "TRANSACTION ID" })}</span>
              <span className="block text-sm font-normal text-quicksilver pt-1">
                {invoiceData?.trans_Id}
              </span>
            </div>
            <div className="text-left">
              <span className="block text-base font-bold">{intl.formatMessage({ id: "YOU RECEIVED" })}</span>
              <span className="block text-sm font-normal text-quicksilver pt-1">
                ₹ {invoiceData?.totalPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetials;
