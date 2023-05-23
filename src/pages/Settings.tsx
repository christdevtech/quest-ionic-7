import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import React from "react";
import { useAuthContext } from "../context/AuthContext";
import Logo from "../assets/Logo-only.svg";

function Settings() {
  const { langPack, language, modifyLanguage } = useAuthContext() ?? {};

  const onModifyLanguage = (lang: string | undefined) => {
    console.log(lang);
    if (lang) modifyLanguage?.(lang);
  };

  return (
    <IonPage>
      <IonContent className="settings-page">
        <IonGrid className="ion-align-items-center main-grid">
          <IonRow>
            <IonCol></IonCol>
            <IonCol size="11">
              <IonGrid>
                <IonRow>
                  <IonCol size="2">
                    <IonMenuButton></IonMenuButton>
                  </IonCol>

                  <IonCol></IonCol>

                  <IonCol size="2">
                    <IonImg src={Logo}></IonImg>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol></IonCol>
                  <IonCol size="11">
                    <h2 id="main-title">{langPack.settingsTitle}</h2>
                    <h4>{langPack.language}</h4>

                    <IonSegment
                      color="primary"
                      value={language}
                      mode="ios"
                      onIonChange={(event) => {
                        onModifyLanguage(event.detail.value);
                      }}
                    >
                      <IonSegmentButton value="en">
                        <IonLabel>{langPack.english}</IonLabel>
                      </IonSegmentButton>
                      <IonSegmentButton value="fr">
                        <IonLabel>{langPack.french}</IonLabel>
                      </IonSegmentButton>
                    </IonSegment>
                  </IonCol>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default Settings;
