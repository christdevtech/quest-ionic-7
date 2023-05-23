import {
  IonActionSheet,
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
} from "@ionic/react";
import {
  addCircleOutline,
  close,
  person,
  personOutline,
  trash,
} from "ionicons/icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/Logo-only.svg";
import { useAuthContext } from "../../context/AuthContext";
import UploadSelfie from "./driverVerificationSteps/UploadSelfie";
// import { VerifyHandler } from "../../context/VerifyContext";

function DriverCredentials() {
  const { userdbData } = useAuthContext() ?? {};
  // const { currentStep } = VerifyHandler();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="verify-header">
          <img src={logo} alt="logo" />
          <h1>Verify your Account</h1>
          <span>Please provide all the required information</span>
        </div>
        <UploadSelfie />
      </IonContent>
    </IonPage>
  );
}

export default DriverCredentials;
