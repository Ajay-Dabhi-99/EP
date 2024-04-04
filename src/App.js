import React from "react";
import AllRoutes from "./routes/allRoutes";
import LanguageProvider from "./Common/LanguageSelector/LanguageSelector";
import enTranslationMessages from "./Common/translations/en.json";
import hiTranslationMessages from "./Common/translations/hi.json";
import grTranslationMessages from "./Common/translations/gr.json";
import thTranslationMessages from "./Common/translations/th.json";
import frTranslationMessages from "./Common/translations/fr.json";
import chTranslationMessages from "./Common/translations/ch.json";
import "swiper/css";
import "swiper/css/navigation";

const App = () => {
  document
    .querySelector("body")
    ?.classList.add("app");
  return (
    <React.Fragment>
      <LanguageProvider
        messages={{
          en: enTranslationMessages,
          hi: hiTranslationMessages,
          gr: grTranslationMessages,
          th: thTranslationMessages,
          fr: frTranslationMessages,
          ch: chTranslationMessages,
        }}
      >
        <AllRoutes />
      </LanguageProvider>
    </React.Fragment>
  );
};

export default App;
