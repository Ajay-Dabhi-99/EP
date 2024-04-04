import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { baseUrl, s3Url } from '../../config';
import EyeIcon from '../../assest/svg/eye-icon.svg'

// import LightGallery"./styles.css";
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
import { useGallery } from "../../Pages/Entertainment/gallerySlice";
import { MoonLoader } from "react-spinners";
import Modal from '../../Common/Modals/Modal';
import GalleryComments from '../../component/Popups/DashboardPopup/GalleryComments';

const GalleryAll = ({ loading }) => {
	const galleryPic = useGallery();
	const [gallery, setGallery] = useState([]);
	const [isCommentPopUp, setIsCommentPopUp] = useState(false);
	const [galleryComment, setGalleryComment] = useState([]);

	useEffect(() => {
		setGallery(galleryPic);
	}, [galleryPic]);

	useEffect(() => {
		if(isCommentPopUp){			
		  document.body.style.overflow = "hidden"
		}	  
		return () => {
		  document.body.style.overflow = "unset"
		}
	  }, [isCommentPopUp])

	const onInit = () => { };

	const getItems = useCallback(() => {
		return gallery.map((e) => {
			const videoSrc = s3Url + "/" + e?.url
			const videoUrl = {
				source: [
					{
						src: videoSrc,
						type: 'video/mp4',
					},
				],
				tracks: [
					{
						src: videoSrc,
						kind: "captions",
						srclang: "en",
						label: "English",
						default: true
					}
				],
				attributes:
				{
					preload: true,
					playsinline: true,
					controls: true,
					animateThumb: false,
					zoomFromOrigin: true,
					allowMediaOverlap: true,
					toggleThumb: true,
					videojs: true
				}

			}
			return (
				(e.type === "photo") ?
					<div
						key={encodeURI.id}
						data-lg-size={encodeURI.size}
						className="gallery-preview relative mb-[15px] block"
						data-src={s3Url + "/" + e?.url}
					>
						<div className="group cursor-pointer">
							<img className="img-responsive w-full relative" src={s3Url + "/" + e?.url} />
							<img src={EyeIcon} alt="Eye icon" className='block absolute top-1/2 left-1/2 -translate-x-1/2 group-hover:-translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 group-hover:scale-125 anim' />
							<span className='box absolute inset-0 block w-full h-full group-hover:bg-[#000000] group-hover:opacity-50 anim'></span>
						</div>
					</div>
					:
					<div
						data-lg-size={encodeURI.size}
						data-video={JSON.stringify(videoUrl)}
						className="gallery-preview relative mb-[15px] block cursor-pointer"
					>
						<video className="w-full" src={videoSrc} />
					</div>
			);
		});
	}, [gallery]);

	return (
		<>
			{
				loading ?
					<MoonLoader
						cssOverride={{ margin: "100px auto" }}
						color={"#20c0E8"}
						loading={loading}
						size={50}
						aria-label="Loading Spinner"
						data-testid="loader"
					/>
					:
					<div className="w-full relative tab-main active" id="all">
						<div className="container photo-show">
							{/* <LightGallery
								onInit={onInit}
								speed={500}
								width="70%"
								plugins={[lgVideo, lgFullscreen, lgHash, lgRotate, lgZoom, lgShare]}
							>
								{getItems()}
							</LightGallery > */}
							{gallery.map((e, i) => (
								(e.type === "photo") ?
									<div className="relative group cursor-pointer mb-3 overflow-hidden" key={e.i} onClick={() => { setIsCommentPopUp(true); setGalleryComment(e); }}>
										<img src={s3Url + "/" + e.url} alt="Alt Text" className='w-full h-auto object-contain object-center rounded-md' />
										<img src={EyeIcon} alt="Eye icon" className='block absolute top-1/2 left-1/2 -translate-x-1/2 group-hover:-translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 group-hover:scale-125 anim' />
										<span className='box absolute inset-0 block w-full h-full group-hover:bg-[#000000] group-hover:opacity-50 anim'></span>
									</div>
									:
									<div className="relative group cursor-pointer mb-3 overflow-hidden" key={e.i} onClick={() => { setIsCommentPopUp(true); setGalleryComment(e); }}>
										<video className="w-full h-auto object-contain object-center rounded-md" src={s3Url + "/" + e?.url} />
										<img src={EyeIcon} alt="Eye icon" className='block absolute top-1/2 left-1/2 -translate-x-1/2 group-hover:-translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 group-hover:scale-125 anim' />
										<span className='box absolute inset-0 block w-full h-full group-hover:bg-[#000000] group-hover:opacity-50 anim'></span>
									</div>
							))}
						</div >
					</div >
			}
			<Modal isOpen={isCommentPopUp}>
				<GalleryComments handleClose={setIsCommentPopUp} galleryComment={galleryComment} />
			</Modal>
		</>
	)
}

export default GalleryAll;
