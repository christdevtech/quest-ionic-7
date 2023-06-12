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
import { useAuthContext } from "../../../context/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

function UploadSelfie() {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const [uploading, setUploading] = useState(false);
  // const [processInfo, setProcessInfo] = useState(false);

  const { user, verifyStep, setVerifyStep, currentMessage, setCurrentMessage } =
    useAuthContext() ?? {
      verifyStep: 1,
    };
  const takeSelfie = () => {
    console.log("Taking Selfie");
    takePhoto();
  };
  const updateSelfieLink = async (link: string) => {
    const userVerifyRef = doc(db, "verify", user.uid);
    try {
      await setDoc(userVerifyRef, {
        verifyStep: verifyStep + 1,
        selfieUrl: link,
      }).then(() => setVerifyStep?.(verifyStep + 1));
    } catch (error) {
      setUploading(false);
    }
  };
  const uploadPhoto = async () => {
    setUploading(true);
    if (photos.length > 0) {
      const photo = photos[0];
      if (photo.webviewPath) {
        const fileExtension = photo.format;
        console.log(
          fileExtension
            ? `Photo extension is ${fileExtension}`
            : "Photo Type unknown"
        );
        const fileRef = ref(
          storage,
          `verify/${user.uid}/selfie.${fileExtension}`
        );
        const blob = await fetch(photo.webviewPath).then((r) => r.blob());
        const file = new File([blob], "selfie", {
          type: blob.type,
          lastModified: Date.now(),
        });
        setCurrentMessage?.("Beginning to upload image");
        const uploadTask = await uploadBytes(fileRef, file);
        const downloadlink = await getDownloadURL(uploadTask.ref);

        setCurrentMessage?.("Upload complete, now update storage locations");
        updateSelfieLink(downloadlink);
      } else {
        setUploading(false);
        setCurrentMessage?.("No photo selected");
      }
    } else {
      setUploading(false);
      setCurrentMessage?.("No photo selected");
    }
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
              <div className="selfie-box" key={index}>
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
              disabled={uploading ? true : false}
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
