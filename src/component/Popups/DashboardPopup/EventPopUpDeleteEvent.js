import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { removeEvent } from './AddPlace/eventAddPlaceSlice';

const EventPopUpDeleteEvent = () => {
 

  return (
    <div className="w-full flex items-center">
    <div className="w-full px-7 py-5 bg-white rounded">
        <div className="flex items-start justify-between max-[768px]:flex-col-reverse">
            <div className='max-[768px]:pt-3 max-[768px]:w-full'>
                <h2 className='max-[768px]:w-full max-[768px]:text-ellipsis max-[768px]:overflow-hidden max-[768px]:whitespace-nowrap'>{displayName}</h2>
                <span className="text-sm text-spiroDiscoBall font-medium tracking-wider">{categoryName}</span>
            </div>
            <div className="flex max-[768px]:justify-end max-[768px]:w-full">
                <div className="flex items-center text-xs text-quicksilver font-semibold tracking-wider pr-4 border-r border-quicksilver cursor-pointer" onClick={deleteClickHandler}><i className="icon-fill-delete mr-1"></i>{intl.formatMessage({ id: "DELETE" })}</div>
                <div className="flex items-center text-xs text-quicksilver font-semibold tracking-wider pl-4 cursor-pointer" onClick={editClickHandler}><i className="icon-edit mr-1"></i>{intl.formatMessage({ id: "EDIT" })}</div>
            </div>
        </div>
    </div>
    <Modal isOpen={isCreateNewPopUpOpen} >
        <EventPopUpCreateNew handleClose={setIsCreateNewPopUpOpen} selectedCategory={categoryName} displayName={displayName} edit={true} eventId={eventId} />
    </Modal>
</div>
  )
};

export default EventPopUpDeleteEvent;
