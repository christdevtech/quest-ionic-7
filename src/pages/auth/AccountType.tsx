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

export default function AccountType() {
  const { chooseAccountType, langPack } = useAuthContext() ?? {};
  const history = useHistory();

  const accountList = [
    {
      label: langPack.user,
      value: "user",
    },
    {
      label: langPack.cabDriver,
      value: "cabDriver",
    },
    {
      label: langPack.deliveryAgent,
      value: "deliveryAgent",
    },
    {
      label: langPack.carRental,
      value: "carRental",
    },
    {
      label: langPack.hotelOrFacility,
      value: "hotelOrFacility",
    },
    {
      label: langPack.busAgency,
      value: "busAgency",
    },
    {
      label: langPack.truckServices,
      value: "truckServices",
    },
    {
      label: langPack.sales,
      value: "sales",
    },
  ];

  const signUp = async (type: string) => {
    console.log(type);
    await chooseAccountType?.(type);
    history.push("/sign-up");
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

                <IonGrid className="padding-top-1">
                  <IonRow>
                    <IonCol></IonCol>
                    <IonCol size="8" className="space-btns">
                      <h6>{langPack.chooseAccountType}</h6>
                      {accountList.map((accountType, index) => {
                        return (
                          <IonButton
                            key={index}
                            className="yellow-b"
                            shape="round"
                            expand="block"
                            onClick={() => signUp(accountType.value)}
                          >
                            {accountType.label}
                          </IonButton>
                        );
                      })}
                      {/* <p>Already have an account?</p>
                      <IonButton
                        fill="outline"
                        className="sign-in-btn"
                        shape="round"
                        expand="block"
                        onClick={toSignInPage}
                      >
                        SIGN IN
                      </IonButton> */}
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
