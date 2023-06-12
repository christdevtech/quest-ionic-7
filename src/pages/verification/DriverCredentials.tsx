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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/Logo-only.svg";
import { useAuthContext } from "../../context/AuthContext";
import UploadSelfie from "./driverVerificationSteps/UploadSelfie";
import UploadDriverLicense from "./driverVerificationSteps/UploadDriverLicense";
// import { VerifyHandler } from "../../context/VerifyContext";

function DriverCredentials() {
  const { userdbData, verifyStep, setVerifyStep } = useAuthContext() ?? {
    verifyStep: 1,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  useEffect(() => {
    const updateStage = () => {
      setVerifyStep?.(userdbData.verifyStep);
    };

    return () => {
      updateStage();
    };
  }, [userdbData]);

  return (
    <IonPage>
      <IonContent>
        <div className="verify-header">
          <img src={logo} alt="logo" id="quest-logo" />
          <h1>Verify your Account</h1>
          <span>
            Please provide all the required information <br />
            Step {verifyStep}
          </span>
        </div>
        {verifyStep === 1 && <UploadSelfie />}
        {verifyStep === 2 && <UploadDriverLicense />}
      </IonContent>
    </IonPage>
  );
}

export default DriverCredentials;
