import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
} from "@ionic/react";
import React from "react";
import ".././Page.css";
import Logo from "../../assets/White-Txt-Logo.svg";
import { useHistory } from "react-router";
import { useAuthContext } from "../../context/AuthContext";

export default function AuthChoice() {
  const { langPack } = useAuthContext() ?? {};
  const history = useHistory();
  const toSignUpPage = () => {
    history.push("/phone-login");
  };

  const toSignInPage = () => {
    history.push("/sign-in");
  };
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

              <div>
                <small className="features">{langPack.services}</small>

                <IonGrid className="padding-top-2">
                  <IonRow>
                    <IonCol></IonCol>
                    <IonCol size="6" className="space-btns">
                      <IonButton
                        className="yellow-b"
                        shape="round"
                        onClick={toSignUpPage}
                      >
                        {langPack.signUp}
                      </IonButton>
                      <IonButton
                        className="yellow-b"
                        shape="round"
                        onClick={toSignInPage}
                      >
                        {langPack.signIn}
                      </IonButton>
                    </IonCol>
                    <IonCol></IonCol>
                  </IonRow>
                </IonGrid>
              </div>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
