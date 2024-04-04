import React, { useState, useEffect } from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  TelegramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";
import { toast } from "react-toastify";
import copy from "../../assest/images/Clip.png";
import { useDispatch } from "react-redux";
import {
  getProfileDetails,
  useProfileDetails,
} from "../../Pages/Profile/profileSlice";
import { useIntl } from "react-intl";

export default function EventPopUpShareEvent({ handleClose, url }) {
  const profileDetails = useProfileDetails();
  const dispatch = useDispatch();
  const intl = useIntl();

  const getProfile = async () => {
    try {
      await dispatch(getProfileDetails()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(`Give 20 Coin, Get 10 Coin
        Refer Friends to allset and give them 10 coin with your referral code ${profileDetails?.my_refer_code} once they order, you get 20 coin too. www.eventopackage.com`);
    toast.success(`${intl.formatMessage({ id: "EVENT DETAILS COPIED." })}`);
  };

  useEffect(() => {
    getProfile();
  }, []);
  const size = 50;
  url = `Give 10 Coin, Get 10 Coin
    Refer Friends to allset and give them 10 coin with your referral code ${profileDetails?.my_refer_code} once they order, you get 10 coin too. www.eventopackage.com`;
  return (
    <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
      <div className="table-cell align-middle">
        <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
          <div className="bg-brightGray p-12 max-[768px]:p-5">
            <div className="space-y-10">
              <div className="flex justify-between">
                <h1 className="h1">
                  {intl.formatMessage({ id: "SHARE EVENT" })}
                </h1>
                <button
                  onClick={() => handleClose(false)}
                  href="#"
                  className="text-xl"
                >
                  <i className="icon-close"></i>
                </button>
              </div>
              <div className="flex flex-wrap share-event">
                <div className="w-2/12 mb-5">
                  <WhatsappShareButton url={url}>
                    <WhatsappIcon size={size} round={true} />
                  </WhatsappShareButton>
                </div>
                <div className="w-2/12 mb-5">
                  <FacebookShareButton url={url}>
                    <FacebookIcon size={size} round={true} />
                  </FacebookShareButton>
                </div>
                <div className="w-2/12 mb-5">
                  <TelegramShareButton url={url}>
                    <TelegramIcon size={size} round={true} />
                  </TelegramShareButton>
                </div>
                <div className="w-2/12 mb-5">
                  <TwitterShareButton url={url}>
                    <TwitterIcon size={size} round={true} />
                  </TwitterShareButton>
                </div>
                <div className="w-2/12 mb-5">
                  <EmailShareButton url={url}>
                    <EmailIcon size={size} round={true} />
                  </EmailShareButton>
                </div>
                {/* <div className="w-2/12 mb-5">
                                    <LinkedinShareButton url={url}>
                                        <LinkedinIcon size={size} round={true} />
                                    </LinkedinShareButton>
                                </div> */}
                <img
                  src={copy}
                  style={{ width: "50px", height: "50px" }}
                  alt="copy"
                  onClick={() => copyCode()}
                  className="cope-event"
                />
                {/* <button className="text-sm font-bold uppercase" >Copy<br />Code</button> */}
                {/* <div className="w-2/12 mb-5">
                                    <OKShareButton url={url}>
                                        <OKIcon size={size} round={true} />
                                    </OKShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <PinterestShareButton url={url}>
                                        <PinterestIcon size={size} round={true} />
                                    </PinterestShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <RedditShareButton url={url}>
                                        <RedditIcon size={size} round={true} />
                                    </RedditShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <TumblrShareButton url={url}>
                                        <TumblrIcon size={size} round={true} />
                                    </TumblrShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <VKShareButton url={url}>
                                        <VKIcon size={size} round={true} />
                                    </VKShareButton>
                                </div>
                                <div className="w-2/12 mb-5">
                                    <InstapaperShareButton url={url}>
                                        <InstapaperIcon size={size} round={true} />
                                    </InstapaperShareButton>
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
