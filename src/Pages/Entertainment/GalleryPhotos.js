
import React, { useState, useEffect } from 'react';
import { s3Url } from "../../config";
import { useGallery } from "./gallerySlice";
import EyeIcon from '../../assest/svg/eye-icon.svg'
// import LightGallery "./styles.css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";
import "lightgallery/css/lg-fullscreen.css"
import "lightgallery/css/lg-rotate.css"
import "lightgallery/css/lg-share.css"

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgHash from "lightgallery/plugins/hash";
import lgRotate from "lightgallery/plugins/rotate";
import lgShare from "lightgallery/plugins/share";
import { MoonLoader } from "react-spinners";
import Modal from '../../Common/Modals/Modal';
import GalleryComments from '../../component/Popups/DashboardPopup/GalleryComments';

const GalleryPhotos = ({ loading }) => {
    const galleryPic = useGallery();
    const [preview, setPreview] = useState(false);
    const [gallery, setGallery] = useState([]);
    const [isCommentPopUp, setIsCommentPopUp] = useState(false);
    const [galleryComment, setGalleryComment] = useState([]);

    useEffect(() => {
        setGallery(galleryPic?.filter((photo) => photo.type === "photo"));
    }, [galleryPic]);

    const onInit = () => { };
    return (
        <>
            {loading ?
                <MoonLoader
                    cssOverride={{ margin: "100px auto" }}
                    color={"#20c0E8"}
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                :
                <div className="w-full relative" id="photo">
                    <div className="container">
                        {/* <LightGallery
                            onInit={onInit}
                            speed={500}
                            plugins={[lgVideo, lgFullscreen, lgHash, lgRotate, lgZoom, lgShare]}
                        > */}
                            {gallery.map(e => (
                                <div
                                    key={encodeURI.id}
                                    data-lg-size={encodeURI.size}
                                    className="group gallery-preview relative mb-[15px] block rounded-lg overflow-hidden cursor-pointer"
                                    data-src={s3Url + "/" + e?.url}
                                    onClick={() => { setIsCommentPopUp(true); setGalleryComment(e); }}
                                >
                                    <div className="cursor-pointer">
                                        <img className="img-responsive w-full relative" src={s3Url + "/" + e?.url} />
                                        <img src={EyeIcon} alt="Eye icon" className='block absolute top-1/2 left-1/2 -translate-x-1/2 group-hover:-translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 group-hover:scale-125 anim' />
                                    </div>
                                        <span className='box absolute inset-0 block w-full h-full group-hover:bg-[#000000] group-hover:opacity-50 anim'></span>
                                </div>
                            ))}
                        {/* </LightGallery > */}
                    </div>
                </div>
            }
            <Modal isOpen={isCommentPopUp}>
                <GalleryComments handleClose={setIsCommentPopUp} galleryComment={galleryComment} />
            </Modal>
        </>

    )
}

export default GalleryPhotos;
