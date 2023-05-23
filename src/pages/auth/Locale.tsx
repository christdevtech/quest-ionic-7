import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import ".././Page.css";
import Logo from "../../assets/White-Txt-Logo.svg";
import { useHistory } from "react-router";
// import { useForm } from "react-hook-form";

import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

function Locale() {
  const history = useHistory();

  const { modifyLanguage, modifyCountry, user, langPack } =
    useAuthContext() ?? {};

  const [first, setFirst] = useState(false);

  const [second, setSecond] = useState(false);

  const onModifyLanguage = (lang: string) => {
    console.log(lang);
    modifyLanguage?.(lang);
    setFirst(true);
  };

  const onModifyCountry = (chosenCountry: string) => {
    console.log(chosenCountry);
    modifyCountry?.(chosenCountry);
    setSecond(true);
  };

  const onNextPage = () => {
    console.log("Navigate Away");
    if (user) {
      history.push("/home");
    } else {
      history.push("/auth-choice");
    }
  };

  const languages = [
    { label: langPack.english, value: "en" },
    { label: langPack.french, value: "fr" },
  ];

  const countryList = [
    {
      value: langPack.cameroon,
    },
    {
      value: langPack.caf,
    },
    {
      value: langPack.congo,
    },
    {
      value: langPack.eqg,
    },
    {
      value: langPack.gabon,
    },
    {
      value: langPack.ivoryCoast,
    },
    {
      value: langPack.nigeria,
    },
    {
      value: langPack.tanzania,
    },
    {
      value: langPack.uga,
    },
  ];

  return (
    <IonPage>
      <IonContent className="auth-page">
        <IonGrid fixed={true} className="ion-align-items-center main-grid">
          <IonRow className="ion-align-items-center main-row">
            <IonCol></IonCol>
            <IonCol size="11" className="page-data">
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <IonCol size="5">
                    <IonImg src={Logo} alt="Quest Logo"></IonImg>
                  </IonCol>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>

              <h4>{langPack.localeTitle}</h4>
              <form></form>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <IonCol size="7" className="margin-top-1">
                    <IonList id="locale">
                      <IonItem>
                        <IonSelect
                          interface="action-sheet"
                          mode="ios"
                          placeholder={langPack.country}
                          onIonChange={(e) => {
                            onModifyCountry(e.target.value);
                          }}
                        >
                          {countryList.map((country, index) => {
                            return (
                              <IonSelectOption
                                value={country.value}
                                key={index}
                              >
                                {country.value}
                              </IonSelectOption>
                            );
                          })}
                        </IonSelect>
                      </IonItem>

                      <IonItem>
                        <IonSelect
                          interface="action-sheet"
                          mode="ios"
                          placeholder={langPack.language}
                          onIonChange={(e) => {
                            onModifyLanguage(e.target.value);
                          }}
                        >
                          {languages.map((lang, index) => {
                            return (
                              <IonSelectOption value={lang.value} key={index}>
                                {lang.label}
                              </IonSelectOption>
                            );
                          })}
                        </IonSelect>
                      </IonItem>
                    </IonList>
                    {first && second && (
                      <IonButton
                        expand="block"
                        shape="round"
                        className="yellow-b"
                        onClick={(e) => {
                          onNextPage();
                        }}
                      >
                        {langPack.next}
                      </IonButton>
                    )}
                  </IonCol>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      {/* {countryList.map((country, index) => {
        return <p>{country.value}</p>;
      })}
      {languages.map((language, index) => {
        return <p>{language}</p>;
      })} */}
    </IonPage>
  );
}

export default Locale;
