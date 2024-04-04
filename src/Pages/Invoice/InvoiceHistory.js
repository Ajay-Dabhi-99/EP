import React from 'react'
import { useIntl } from 'react-intl';
import Advertisement from '../../component/Advertisement';
import InvoiceListItem from './InvoiceListItem';

const InvoiceHistory = () => {
    const intl = useIntl();

    return (
        <div className="wrapper min-h-full">

            <div className="space-y-8 h-full">
                {/* <!-- title-holder  --> */}
                <div className="flex justify-between items-center">
                    <a href="#" className="flex items-center"><i className="icon-back-arrow mr-4 text-2xl"></i><h1>{intl.formatMessage({ id: "INVOICE HISTORY" })}</h1></a>
                    <a href="#" className="btn-primary small group"><i className="icon-filter before:content-['\e904'] before:text-white before:group-hover:text-spiroDiscoBall mr-3 transition-all duration-300 inline-block"></i>{intl.formatMessage({ id: "FILTER" })}</a>
                </div>
                {/* <!-- main-content  --> */}
                <div className="space-y-2.5">
                    <InvoiceListItem />
                    <InvoiceListItem />
                    <InvoiceListItem />
                    <InvoiceListItem />
                    {/* <!-- advisement --> */}
                    <Advertisement />
                    <InvoiceListItem />
                    <InvoiceListItem />
                    <InvoiceListItem />
                </div>
            </div>
        </div>
    )
}

export default InvoiceHistory;
