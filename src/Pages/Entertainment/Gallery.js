import React, { useEffect, useState } from "react";
import GalleryAll from "./GalleryAll";
import GalleryPhotos from "./GalleryPhotos";
import GalleryVideos from "./GalleryVideos";
import { userGallery } from "./gallerySlice";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import GalleryMyPost from "./GalleryMyPost";
import MyPost from "./MyPost";


const Gallery = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [tab, setTab] = useState(1);
  const [loading, setLoading] = useState(true);

  const getGallery = async () => {
    try {
      await dispatch(userGallery()).unwrap();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <div className="flex min-h-full wrapper">
      <div className="flex flex-wrap space-y-7 w-full">
        {/* <!-- title-holder  --> */}
        <div className="space-y-6 w-full">
          <h1 className="w-full"><span>{intl.formatMessage({ id: "ENTERTAINMENT" })}</span></h1>
          {/* <!-- tab-holder  --> */}
          <div className="teb-holder gallery-holder border-t border-b-0">
            <button
              type="button"
              data-tab="all"
              className={tab === 1 ? "active" : undefined}
              onClick={() => setTab(1)}
            >
              <span>{intl.formatMessage({ id: "ALL" })}</span>
            </button>
            <button
              type="button"
              data-tab="photo"
              className={tab === 2 ? "active" : undefined}
              onClick={() => setTab(2)}
            >
              <span>{intl.formatMessage({ id: "PHOTO" })}</span>
            </button>
            <button
              type="button"
              data-tab="video"
              className={tab === 3 ? "active" : undefined}
              onClick={() => setTab(3)}
            >
              <span>{intl.formatMessage({ id: "VIDEO" })}</span>
            </button>
            <button
              type="button"
              data-tab="myPost"
              className={tab === 4 ? "active" : undefined}
              onClick={() => setTab(4)}
            >
              <span>{intl.formatMessage({ id: "MY POST" })}</span>
            </button>
            {/* <button
              type="button"
              data-tab="mypost"
              className={tab === 4 ? "active" : undefined}
              onClick={() => setTab(4)}
            >
            <span>{intl.formatMessage({ id: "MYPOST" })}</span>
            </button> */}
          </div>
          {/* <!-- gallery-holder / --> */}
          <div className="gallery-holder">
            {tab === 1 && <GalleryAll loading={loading} />}
            {tab === 2 && <GalleryPhotos loading={loading} />}
            {tab === 3 && <GalleryVideos loading={loading} />}
            {tab === 4 && <MyPost loading={loading} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
