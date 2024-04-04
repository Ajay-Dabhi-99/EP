import React from "react";
import { IntlProvider } from "react-intl";
import { IntlGlobalProvider } from "./IntlGlobalProvider";
import { useLanguage } from "../CommonSlice/languageSlice";

const LanguageProvider = (props) => {
  const { messages } = props;
  const language = useLanguage();

  return (
    <IntlProvider
      locale={language}
      key={language}
      messages={messages[language]}
    >
      <IntlGlobalProvider>
        {React.Children.only(props.children)}
      </IntlGlobalProvider>
    </IntlProvider>
  );
};

export default LanguageProvider;
