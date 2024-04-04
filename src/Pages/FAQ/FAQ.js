import React, { useEffect } from "react";
import $ from "jquery";
import { useIntl } from "react-intl";

const FAQ = () => {
  const intl = useIntl();

  useEffect(() => {
    var $titleTab = $(".title_tab");
    $(".title_tab.active").next(".inner_content").slideDown();
    $titleTab.on("click", function (e) {
      e.preventDefault();
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).next().stop().slideUp(500);
        $(this).next().find("p").removeClass("show");
      } else {
        $(this).addClass("active");
        $(this).next().stop().slideDown(500);
        $(this)
          .parent()
          .siblings()
          .children(".title_tab")
          .removeClass("active");
        $(this).parent().siblings().children(".inner_content").slideUp(500);
        $(this)
          .parent()
          .siblings()
          .children(".inner_content")
          .find("p")
          .removeClass("show");
        $(this).next().find("p").addClass("show");
      }
    });
  }, []);

  return (
    <div className="wrapper min-h-full">
      <div className="space-y-7 h-full">
        {/* <!-- title-holder  --> */}
        <div className="w-full space-y-7">
          <h1>{intl.formatMessage({ id: "FAQs" })}</h1>
          <div className="Accordions w-full space-y-5">
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "LOGIN" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5>{intl.formatMessage({ id: "WHAT SHALL I DO IF I DO NOT RECEIVE OTP?" })}</h5>
                  <p>{intl.formatMessage({ id: "IF  YOU  DID  NOT  RECEIVE  OTP  BY  EMAIL  OR MOBILE NUMBER, THEN PLEASE CONTACT US AND SEND YOUR COMPLAINT VIA EMAIL ON THE EMAIL ADDRESS" })}
                    <b> help@eventopackage.com</b>
                  </p>
                </div>
                <div>
                  <h5>{intl.formatMessage({ id: "WHILE SETTING THE PASSWORD, IT SHOWS PASSWORD ERROR." })}</h5>
                  <p>
                    {intl.formatMessage({ id: "WHILE SETTING THE PASSWORD, MAKE SURE YOUR PASSWORD IS OF 8 CHARACTERS, 5 ALPHABETS, 2 NUMBER AND 1 SYMBOL." })}<b>{intl.formatMessage({ id: "FOR EXAMPLE-" })} ABCDE12$</b>
                  </p>
                </div>
                <div>
                  <h5>{intl.formatMessage({ id: "WHAT SHOULD I DO IF I FORGET MY PASSWORD?" })}</h5>
                  <p>{intl.formatMessage({ id: "IN CASE YOU FORGET YOUR PASSWORD, PLEASE FOLLOW THE FOLLOWINGSTEPS:" })}<br />
                    <p className="pl-7">- {intl.formatMessage({ id: "CLICK ON THE FORGOT PASSWORD OPTION." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "ENTER YOUR MOBILE NUMBER." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "CONFIRM YOUR OTP ONCE YOU RECEIVE IT ON THE ABOVE ENTERED NUMBER." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "RESET YOUR PASSWORD." })}</p>
                  </p>
                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "APP FUNCTIONING" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5>{intl.formatMessage({ id: "DASHBOARD SCREEN" })}</h5>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "DASHBOARD SCREEN OF THE APP IS NOT PROPERLY VISIBLE. AND NOT FILTERATION,HOW CAN I SOLVE IT?" })}</h5>
                  <p className="pl-3">
                    {intl.formatMessage({ id: "IF THE MAIN SCREEN OF THE APP IS NOT PROPERLY VISIBLE, PLEASE EMAIL THE FOLLOWING THINGS TO US ON" })}<b> help@eventopackage.com</b> <br />
                    <p className="pl-7">- {intl.formatMessage({ id: "NAME OF YOUR DEVICE FROM WHICH YOU ARE USING THE APP." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "UPLOAD SCREENSHOTS OF THE PROBLEM THAT IS OCCURRING ON THE SCREEN." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "DESCRIBE THE PROBLEM IN 250 WORDS." })}</p>
                  </p>
                </div>
                <div>
                  <h5>{intl.formatMessage({ id: "SEARCH SCREEN" })}</h5>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHY IS THE SEARCH TAB NOT WORKING PROPERLY ON MY DEVICE?" })}</h5>
                  <p className="pl-3">
                    {intl.formatMessage({ id: "THE SEARCH ENGINE MAY NOT GIVE PROPER OUTPUT IN CASE OF TWO SITUATIONS:" })}<br />
                    <p className="pl-7">- {intl.formatMessage({ id: "YOUR DEVICE CAPACITY MAY NOT BE SUITABLE WITH THE APP." })}</p>
                  </p>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "THE SEARCH SCREEN IS NOT PROPERLY VISIBLE ON THE DEVICE." })}</h5>
                  <p className="pl-3">
                    {intl.formatMessage({ id: "IF THE SEARCH SCREEN OF THE APP IS NOT PROPERLY VISIBLE, PLEASE EMAIL THE FOLLOWING THINGS TO US ON" })} <b>help@eventopackage.com </b> <br />
                    <p className="pl-7">- {intl.formatMessage({ id: "NAME OF YOUR DEVICE FROM WHICH YOU ARE USING THE APP." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "UPLOAD SCREENSHOTS OF THE PROBLEM THAT IS OCCURRING ON THE SCREEN." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "DESCRIBE THE PROBLEM IN 250 WORDS." })}</p>
                  </p>
                </div>
                <div>
                  <h5>{intl.formatMessage({ id: "CREATE FORM" })}</h5>
                  <p className="pl-3">
                    {intl.formatMessage({ id: "IF ANY PROBLEM OCCURS IN THE FLOW WHILE CREATING A SERVICE, PLEASE EMAIL THE FOLLOWING THINGS TO US ON" })} <b>help@eventopackage.com</b> <br />
                    <p className="pl-7">- {intl.formatMessage({ id: "NAME OF YOUR DEVICE FROM WHICH YOU ARE USING THE APP." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "UPLOAD SCREENSHOTS OF THE PROBLEM THAT IS OCCURRING ON THE SCREEN." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "DESCRIBE THE PROBLEM IN 250 WORDS." })}</p>
                  </p>
                </div>
                <div>
                  <h5>{intl.formatMessage({ id: "ENTERTAINMENT SCREEN" })}</h5>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHAT IS THE USE OF THE ENTERTAINMENT SCREEN?" })}</h5>
                  <p className="pl-3">
                    {intl.formatMessage({ id: "THE ENTERTAINMENT SCREEN IS THE BASE OF THE ORGANIZER PORTAL. THE EVENTS SERVICES IMAGES AND VIDEOS ARE SHOWN HERE." })} </p>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHAT TO DO IF THE ENTERTAINMENT SCREEN IS NOT VISIBLE PROPERLY?" })}</h5>
                  <p className="pl-3">
                    {intl.formatMessage({ id: "IF THE ENTERTAINMENT SCREEN OF THE APP IS NOT PROPERLY VISIBLE, PLEASE EMAIL THE FOLLOWING THINGS TO US ON" })} <b>help@eventopackage.com </b> <br />
                    <p className="pl-7">- {intl.formatMessage({ id: "NAME OF YOUR DEVICE FROM WHICH YOU ARE USING THE APP." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "UPLOAD SCREENSHOTS OF THE PROBLEM THAT IS OCCURRING ON THE SCREEN." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "DESCRIBE THE PROBLEM IN 250 WORDS." })}</p>
                  </p>
                </div>
                <div>
                  <h5>{intl.formatMessage({ id: "BOOKING SCREEN" })}</h5>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHAT SHALL I REMEMBER WHILE BOOKING EVENT SERVICE?" })}</h5>
                  <p className="pl-7">- {intl.formatMessage({ id: "SERVICES WILL ONLY BE BOOKED ONCE THE PAYMENT IS DONE." })}</p>
                  <p className="pl-7">- {intl.formatMessage({ id: "ONCE YOU MAKE PAYMENT, YOU DO NOT CANCEL AND ASK FOR A REFUND." })}</p>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "IF YOU CANNOT GENERATE BARCODES, PLEASE FOLLOW THE BELOW GIVEN STEPS." })}</h5>
                  <p className="pl-7">- {intl.formatMessage({ id: "PLEASE EMAIL US THE FOLLOWING DETAILS ON." })} <b>help@eventopackage.com</b></p>
                  <p className="pl-7">- {intl.formatMessage({ id: "NAME OF YOUR DEVICE FROM WHICH YOU ARE USING THE APP." })}</p>
                  <p className="pl-7">- {intl.formatMessage({ id: "UPLOAD SCREENSHOTS OF THE PROBLEM THAT IS OCCURRING ON THE SCREEN." })}</p>
                  <p className="pl-7">- {intl.formatMessage({ id: "DESCRIBE THE PROBLEM IN 250 WORDS." })}</p>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "IF NOT ABLE TO SCAN BARCODES PROPERLY, PLEASE DO THE FOLLOWING." })}</h5>
                  <p className="pl-3">
                    {intl.formatMessage({ id: "ALONG WITH THAT PLEASE EMAIL US THE FOLLOWING DETAILS ON" })} <b>info@eventopackage.com </b> <br />
                    <p className="pl-7">- {intl.formatMessage({ id: "NAME OF YOUR DEVICE FROM WHICH YOU ARE USING THE APP." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "UPLOAD SCREENSHOTS OF THE PROBLEM THAT IS OCCURRING ON THE SCREEN." })}</p>
                    <p className="pl-7">- {intl.formatMessage({ id: "DESCRIBE THE PROBLEM IN 250 WORDS." })}</p>
                  </p>
                </div>

              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "REFERRAL EARN AND REDEEM COIN" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHERE CAN I SHARE THE LINKS TO REFER TO OTHER PEOPLE?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span>	<span className="inline-block pl-2 ">{intl.formatMessage({ id: "YOU CAN REFER BY SMS, ON TELEGRAM, TWITTER, WHATSAPP, VIA E-MAIL, AND OTHER SOCIAL MEDIA APPS." })}</span></p>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "HOW CAN I EARN POINTS BY REFERRING?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span>	<span className="inline-block pl-2 ">{intl.formatMessage({ id: "WHEN YOU SEND IT FOR THE FIRST TIME, YOU EARN 10 POINTS FOR SENDING IT TO OTHER USERS AND 20 POINTS FOR SENDING IT TO OTHER SHOPKEEPERS AND ORGANIZERS. YOU ALSO RECEIVE 10 POINTS EVERY TIME A USER OR SHOPKEEPER, THAT YOU REFERRED TO, OPENS AN ACCOUNT FOR THE FIRST TIME." })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span>	<span className="inline-block pl-2 ">{intl.formatMessage({ id: "1 INR = 25 POINTS. REFERRAL POINTS EXPIRE AFTER 9 MONTHS AT FIRST TIME ONCE YOU LOGIN DATE. COIN EXPIRES EVERY 3 MONTHS OF COIN EARN." })}</span></p>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "HOW CAN I EARN POINTS BY REDEEM?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2 ">{intl.formatMessage({ id: "EVERYONE CAN EARN COINS BY REDEEM EVENT AND OFFER DETAILS, WHICH IS SET BY DEFAULT WITH OUR FAM SYSTEM." })}</span></p>
                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "RATINGS AND REVIEWS" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "HOW DOES THE RATING AND REVIEW FEATURE WORKS?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2">{intl.formatMessage({ id: "USERS CAN GIVE RATINGS AND REVIEWS TO THE ORGANIZERS. ORGANIZERS AND USERS CAN SEE EACH OTHER'S RATINGS AND REVIEWS." })}</span></p>
                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "LANGUAGE" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHICH LANGUAGES ARE SUPPORTED BY THE APP?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2">{intl.formatMessage({ id: "THE APP SUPPORTS MULTIPLE LANGUAGES WHICH CAN BE TRANSLATED AS PER NEEDED. THE ORGANIZERS CANNOT TRANSLATE THE LANGUAGE THOUGH." })}</span></p>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "THE FOLLOWING LANGUAGES ARE AVAILABLE." })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2">{intl.formatMessage({ id: "ENGLISH, HINDI, SPANISH, FRENCH, BENGALI, RUSSIAN, PORTUGUESE, URDU, GERMAN, JAPANESE, MARATHI, TELEGU, WESTERN PUNJABI, TAMIL, TURKISH." })}</span></p>
                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "CURRENCY" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "THE MULTIPLE CURRENCIES SUPPORTED BY THE APP ARE." })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2">{intl.formatMessage({ id: "INDIAN RUPEES (INR), US DOLLAR (USD), EURO (EUR), JAPANESE YEN (JPY), BRITISH POUNDS (GBP), AUSTRALIAN DOLLARS (AUD), CANADIAN DOLLARS (CAD), NEW ZEALAND DOLLARS (NZD), SINGAPORE DOLLARS (SGD), HONG KONG DOLLARS (HKD), TURKISH LIRA (TRY), RUSSIAN RUBLE (RUB), SWISS FRANCS (CHF)." })}</span></p>
                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "CUSTOMER SUPPORT" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHAT ARE THE CUSTOMER SUPPORT OPTIONS AVAILABLE?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2">{intl.formatMessage({ id: "CUSTOMERS CAN EMAIL US ON" })} <b>help@eventopackage.com</b> {intl.formatMessage({ id: "ANYTIME TO SOLVE THEIR COMPLAINTS. THERE IS ALSO A CHATBOT AVAILABLE TO SOLVE THE DOUBTS IMMEDIATELY. AT LAST, CUSTOMERS CAN GO THROUGH THE FAQ SECTION TO KNOW MORE. AND ALSO AVAILABLE CALL ICON TO SUPPORT TEAM." })}</span></p>
                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "REDEMPTION" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "COIN REDEEM BY BANK OR BY PRODUCT" })}<span className="inline-block pl-2"></span></span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "BY BANK REDEEMING CAN BE DONE AFTER A COLLECTION OF 200 COINS." })}<span className="inline-block pl-2"></span></span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "IF YOU REDEEM THROUGH A BANK ACCOUNT, 5% BANK CHARGES AND GST APPLIED." })}<span className="inline-block pl-2"></span></span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "IF YOU WANT TO REDEEM BY PRODUCT THEN YOU CAN REDEEM AT THE TIME OF PAYMENT AND TRANSFER BY OUR SCANNER." })}<span className="inline-block pl-2"></span></span></p>
                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "SHARE LINK" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHAT ARE THE SHARING OPTIONS AVAILABLE?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2">{intl.formatMessage({ id: "YOU CAN SHARE THE EVENT SERVICES LINK YOU LIKE WITH YOUR FRIENDS AND FAMILY THROUGH NUMEROUS SOCIAL MEDIAS." })}</span></p>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHAT ARE THE SUBSCRIPTION OPTIONS AVAILABLE FOR EVENT ORGANIZERS?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2">{intl.formatMessage({ id: "WHEN AN EVENT ORGANIZER REGISTERS FOR THE FIRST TIME, THEY CAN REGISTER 5 EVENTS FOR FREE, VALID FOR A YEAR. LATER, SUBSCRIPTION IS MANDATORY." })}</span></p>
                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "INVOICES" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHAT IS THE PROCESS OF GETTING AN INVOICE?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span>	<span className="inline-block pl-2">{intl.formatMessage({ id: "AFTER THE EVENT ENDS, THE INVOICE WILL BE MADE IN SAME DAYS. ONCE THE INVOICE IS MADE, PAYMENT MUST BE RELEASED IN 2-3 WORKING DAYS. BANK CHARGES MUST BE COLLECTED FROM THE CUSTOMERS. ALSO, IT CAN TAKE UP TO 3 BUSINESS DAYS FOR THE TRANSFER." })}</span></p>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "THERE IS AN ERROR COMING WHILE DOWNLOADING HISTORY PDF. IF YOU ARE NOT ABLE TO DOWNLOAD HISTORY PDF, PLEASE EMAIL THE FOLLOWING THINGS TO US ON" })} <b> help@eventopackage.com</b>
                  </h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "NAME OF YOUR DEVICE FROM WHICH YOU ARE USING THE APP." })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "UPLOAD SCREENSHOTS OF THE PROBLEM THAT IS OCCURRING ON THE SCREEN." })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "DESCRIBE THE PROBLEM IN 250 WORDS." })}</span></p>
                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "NOTIFICATION" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5 className="mt-3 pl-3"> {intl.formatMessage({ id: "WHEN ARE THE NOTIFICATIONS SENT?" })} </h5>
                  <p className="pl-3 flex">{intl.formatMessage({ id: "COMPANY WILL SEND NOTIFICATION IN THE FOLLOWING CASES:" })}</p>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2">{intl.formatMessage({ id: "WHEN EVENT STARTS AND END" })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2">{intl.formatMessage({ id: "WHEN ANY PAYMENT IS MADE" })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2">{intl.formatMessage({ id: "WHEN ANY GIFT ADDED IN THE LIST" })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2">{intl.formatMessage({ id: "WHEN COIN TRANSACTION IS MADE" })}</span></p>

                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "REMINDER" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHEN ARE THE REMINDERS SENT?" })}</h5>
                  <p className="pl-3 flex">{intl.formatMessage({ id: "THE APP SENDS REMINDER IN FOLLOWING CASES:" })}</p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "SMS REMINDERS IN CASE ANY INVOICE IS GENERATED" })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "WHEN ANY EVENT SERVICE IS BOOKED" })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "AT THE TIME OF SUBSCRIPTION AND EXPIRY OF SUBSCRIPTION" })} </span></p>
                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "PROMOTION" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHAT CAN I DO WHEN PROMOTION TAB IS NOT WORKING?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "WHEN YOU CLICK ON THE PROMOTE BUTTON AND IT'S NOT WORKING, PLEASE EMAIL THE FOLLOWING THINGS TO US ON" })} <b>info@festumevento.com </b></span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "NAME OF YOUR DEVICE FROM WHICH YOU ARE USING THE APP." })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "UPLOAD SCREENSHOTS OF THE PROBLEM THAT IS OCCURRING ON THE SCREEN." })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "DESCRIBE THE PROBLEM IN 250 WORDS." })}</span></p>
                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "GIFT" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHAT IS THE USE OF THE GIFT SCREEN?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block"> {intl.formatMessage({ id: "THE GIFT SCREEN SHOWS THE BRAND COMPANY'S SHOPPING OFFER VOUCHER." })} </span></p>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHAT TO DO IF THE GIFT SCREEN IS NOT VISIBLE PROPERLY OR OFFLINE OFFER VOUCHER NOT DOWNLOADING?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2"> {intl.formatMessage({ id: "IF THE GIFT SCREEN OF THE APP IS NOT PROPERLY VISIBLE OR OFFLINE OFFER VOUCHER NOT DOWNLOADING, PLEASE EMAIL THE FOLLOWING THINGS TO US ON" })} <b>help@eventopackage.com </b> </span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2">{intl.formatMessage({ id: "NAME OF YOUR DEVICE FROM WHICH YOU ARE USING THE APP." })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2"> {intl.formatMessage({ id: "UPLOAD SCREENSHOTS OF THE PROBLEM THAT IS OCCURRING ON THE SCREEN." })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span><span className="inline-block pl-2"> {intl.formatMessage({ id: "DESCRIBE THE PROBLEM IN 250 WORDS." })}</span></p>

                </div>
              </div>
            </div>
            <div className="Accordion_item">
              <h3 className="title_tab">
                {intl.formatMessage({ id: "ANY OTHERS" })}
                <span>
                  <i className="icon-plus"></i>
                  <i className="icon-minus text-[3px]"></i>
                </span>
              </h3>
              <div className="inner_content" style={{ display: "none" }}>
                <div>
                  <h5 className="mt-3 pl-3">{intl.formatMessage({ id: "WHAT SHALL I DO IF I HAVE ANY OTHER COMPLAINTS?" })}</h5>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "PLEASE EMAIL THE FOLLOWING THINGS TO US ON" })}  <b> help@eventopackage.com</b> </span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "NAME OF YOUR DEVICE FROM WHICH YOU ARE USING THE APP." })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "UPLOAD SCREENSHOTS OF THE PROBLEM THAT IS OCCURRING ON THE SCREEN." })}</span></p>
                  <p className="pl-7 flex"><span className="inline-block">-</span> <span className="inline-block pl-2">{intl.formatMessage({ id: "DESCRIBE THE PROBLEM IN 250 WORDS." })}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;