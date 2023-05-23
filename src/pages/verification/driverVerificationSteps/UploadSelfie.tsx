import {
  IonActionSheet,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
} from "@ionic/react";
import { personOutline, addCircleOutline, trash, close } from "ionicons/icons";
import React, { useState } from "react";
import { usePhotoGallery, UserPhoto } from "../../../hooks/usePhotoGallery";
// import { VerifyHandler } from "../../../context/VerifyContext";

function UploadSelfie() {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();

  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  // const { currentStep, setCurrentStep } = VerifyHandler();

  const takeSelfie = () => {
    console.log("Taking Selfie");
    takePhoto();
  };
  const uploadPhoto = () => {
    // setCurrentStep(currentStep + 1);
  };
  return (
    <IonGrid className="ion-align-items-center">
      <IonRow className="verify-body">
        <IonCol>
          <div className="step1">
            <h4>Step 1</h4>
            <IonList lines="none">
              <IonItem color="light">
                <IonIcon icon={personOutline} slot="start"></IonIcon>
                <IonLabel>Take a Selfie</IonLabel>

                {photos.length < 1 && (
                  <IonIcon
                    icon={addCircleOutline}
                    slot="end"
                    onClick={() => takeSelfie()}
                  ></IonIcon>
                )}
              </IonItem>
            </IonList>

            {photos.map((photo, index) => (
              <div className="selfie-box">
                <IonImg src={photo.webviewPath}></IonImg>
                <IonButton onClick={() => setPhotoToDelete(photo)}>
                  <IonIcon icon={trash} slot="start"></IonIcon>
                  Delete Photo
                </IonButton>
              </div>
            ))}
            <IonButton
              shape="round"
              className="yellow-b"
              onClick={() => {
                uploadPhoto();
              }}
            >
              Upload
            </IonButton>
          </div>
          <IonActionSheet
            isOpen={!!photoToDelete}
            buttons={[
              {
                text: "Delete",
                role: "destructive",
                icon: trash,
                handler: () => {
                  if (photoToDelete) {
                    deletePhoto(photoToDelete);
                    setPhotoToDelete(undefined);
                  }
                },
              },
              {
                text: "Cancel",
                role: "cancel",
                icon: close,
              },
            ]}
            onDidDismiss={() => setPhotoToDelete(undefined)}
          />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default UploadSelfie;
