import React from 'react'
import { useIntl } from "react-intl";
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { removeToken } from '../../auth/authSlice';

function SignOutPopUp({ handleClose }) {
    const intl = useIntl();
    const dispatch = useDispatch();

    const handleLogout = () => {
        setTimeout(() => {
            dispatch(removeToken());
            localStorage.clear();
        }, 1000);
        toast.success(`${intl.formatMessage({ id: "LOGOUT SUCCESSFULLY." })}`);
    };

    return (
        <div className="popup table fixed w-full inset-0 z-40 bg-black bg-opacity-75 h-screen">
            <div className="table-cell align-middle">
                <div className="popin max-w-2xl w-full mx-auto max-h-[calc(100vh-55px)] overflow-y-auto lg:px-9">
                    <div className="bg-brightGray p-12  max-[640px]:p-8">
                        <div className="flex justify-between items-center max-[640px]:items-start max-[640px]:flex-col">
                            <div className="flex items-center justify-start">
                                <i className="w-6 block text-center text-xl icon-logout"></i>
                                <h1 className="h1 pl-3">{intl.formatMessage({ id: "SIGN OUT" })}</h1>
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
                        <p className="text-base text-[#2E363F] font-normal pt-10 pb-12">{intl.formatMessage({ id: "DO YOU WANT TO SIGN OUT?" })}</p>
                        <div className="flex items-center space-x-5">
                            <button
                                onClick={() => {
                                    handleLogout();
                                    handleClose(false);
                                }}
                                className="btn-primary bg-magicPotion hover:text-magicPotion hover:border-magicPotion btn-cancel w-full"
                            >
                                {intl.formatMessage({ id: "SIGN OUT" })}
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
            <ToastContainer
                position="bottom-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}

export default SignOutPopUp;