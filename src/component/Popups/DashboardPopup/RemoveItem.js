import React from 'react'
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../../Pages/Dashboard/Event/AddItems/addItemsSlice';

function RemoveItem({ handleClose, setReload, data, }) {
    const intl = useIntl();
    const dispatch = useDispatch();

    const deleteHandler = async () => {
        try {
            let payload = {
                itemid: data._id,
            };
            await dispatch(deleteItem(payload)).unwrap();
            setReload((current) => !current);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
            <div className="table-cell align-middle">
                <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
                    <div className="bg-brightGray p-12  max-[640px]:p-8">
                        <div className="flex justify-between items-center max-[640px]:items-start max-[640px]:flex-col">
                            <div className="flex items-center justify-start">
                                <svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.3511 4.00014H17.886V3.00011C17.886 1.34317 16.5514 0 14.905 0H10.9303C9.28394 0 7.94932 1.34317 7.94932 3.00011V4.00014H2.48416C1.11222 4.00014 0 5.11949 0 6.50023V8.5003C0 9.05263 0.444852 9.50033 0.993666 9.50033H24.8416C25.3905 9.50033 25.8353 9.05263 25.8353 8.5003V6.50023C25.8353 5.11949 24.7231 4.00014 23.3511 4.00014ZM9.93666 3.00011C9.93666 2.44884 10.3826 2.00007 10.9303 2.00007H14.905C15.4527 2.00007 15.8986 2.44884 15.8986 3.00011V4.00014H9.93666V3.00011Z" fill="#FE4D5F" />
                                    <path d="M1.88912 11.5C1.71181 11.5 1.57053 11.6491 1.57897 11.8274L2.39875 29.1431C2.47451 30.7457 3.78243 32.0007 5.37602 32.0007H20.4661C22.0597 32.0007 23.3676 30.7457 23.4433 29.1431L24.2631 11.8274C24.2716 11.6491 24.1303 11.5 23.953 11.5H1.88912ZM16.8957 14.0001C16.8957 13.4476 17.3404 13.0001 17.8894 13.0001C18.4384 13.0001 18.883 13.4476 18.883 14.0001V27.0005C18.883 27.5531 18.4384 28.0006 17.8894 28.0006C17.3404 28.0006 16.8957 27.5531 16.8957 27.0005V14.0001ZM11.9274 14.0001C11.9274 13.4476 12.372 13.0001 12.921 13.0001C13.47 13.0001 13.9147 13.4476 13.9147 14.0001V27.0005C13.9147 27.5531 13.47 28.0006 12.921 28.0006C12.372 28.0006 11.9274 27.5531 11.9274 27.0005V14.0001ZM6.95905 14.0001C6.95905 13.4476 7.40372 13.0001 7.95272 13.0001C8.50172 13.0001 8.94638 13.4476 8.94638 14.0001V27.0005C8.94638 27.5531 8.50172 28.0006 7.95272 28.0006C7.40372 28.0006 6.95905 27.5531 6.95905 27.0005V14.0001Z" fill="#FE4D5F" />
                                </svg>
                                <h1 className="h1 pl-5">{intl.formatMessage({ id: "DELETE ITEM" })}</h1>
                            </div>
                            <div className="flex items-center space-x-6 max-[640px]:justify-between max-[640px]:space-x-20">
                                <button
                                    onClick={() => handleClose(false)}
                                    href="#"
                                    className="text-xl max-[640px]:pl-6"
                                >
                                    <i className="icon-close"></i>
                                </button>
                            </div>
                        </div>
                        <p className="text-base text-[#2E363F] font-normal pt-10 pb-12">{intl.formatMessage({ id: "ARE YOU SURE WANT TO DELETE THIS ITEM PERMANENTLY?" })}</p>
                        <div className="flex items-center space-x-5">
                            <button
                                onClick={() => {
                                    deleteHandler();
                                    handleClose(false);
                                }}
                                className="btn-primary bg-magicPotion hover:text-magicPotion hover:border-magicPotion btn-cancel w-full"
                            >
                                {intl.formatMessage({ id: "DELETE" })}
                            </button>
                            <div
                                className="btn-primary w-full"
                                onClick={() => { handleClose(false); }}
                            >
                                {intl.formatMessage({ id: "CANCEL" })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveItem