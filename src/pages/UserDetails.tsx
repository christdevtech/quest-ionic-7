import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
} from "@ionic/react";
import { useAuthContext } from "../context/AuthContext";
import defaultImg from "../assets/user.svg";
import {
  addCircleOutline,
  cashOutline,
  chevronBack,
  flagOutline,
  personOutline,
  phonePortraitOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { ref } from "firebase/storage";
import { storage } from "../../firebase";

export default function UserDetails() {
  const {
    user,
    logout,
    setResetPassword,
    langPack,
    userdbData,
    uploadProfilePicture,
    getdbUserData,
  } = useAuthContext() ?? {};

  const history = useHistory();

  const navBack = () => {
    history.go(-1);
  };

  const handleLogout = async () => {
    await logout?.();
    history.push("/locale");
  };
  const onResetPassword = () => {
    setResetPassword?.(true);
    console.log("Reset initiated");
    history.push("/phone-login");
  };

  const getAccountType = (value: string) => {
    let accountSpelling = "user";
    if (userdbData) {
      switch (value) {
        case "sales":
          accountSpelling = langPack.sales;
          break;

        case "truckServices":
          accountSpelling = langPack.truckServices;
          break;

        case "busAgency":
          accountSpelling = langPack.busAgency;
          break;

        case "hotelOrFacility":
          accountSpelling = langPack.hotelOrFacility;
          break;

        case "carRental":
          accountSpelling = langPack.carRental;
          break;

        case "deliveryAgent":
          accountSpelling = langPack.deliveryAgent;
          break;

        case "cabDriver":
          accountSpelling = langPack.cabDriver;
          break;

        default:
          accountSpelling = langPack.user;
          break;
      }
      return accountSpelling;
    }
  };

  const convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  //funtion to take a photo and upload it to the database
  const takePhoto = async () => {
    console.log("taking photo");
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    // console.log(image);
    const userProfileRef = ref(
      storage,
      `users/${user.uid}/profile.${image.format}`
    );
    //display image on screen

    if (image.webPath) {
      const blob = await fetch(image.webPath).then((r) => r.blob());
      convertBlobToBase64(blob).then((base64) => {
        // console.log(userProfileRef);
        const file = new File([blob], "filename", {
          type: blob.type,
          lastModified: Date.now(),
        });
        uploadProfilePicture?.(file, userProfileRef);
      });
    }
  };

  return (
    <IonPage>
      <IonContent className="profile-page">
        <IonGrid className="ion-align-items-center main-grid">
          <IonRow className="main-row">
            <IonCol></IonCol>
            <IonCol size="11">
              <IonGrid>
                <IonRow>
                  <IonCol size="2">
                    <IonMenuButton></IonMenuButton>
                  </IonCol>

                  <IonCol id="pageTitle"></IonCol>

                  <IonCol size="2">
                    <IonFabButton
                      color="dark"
                      onClick={() => {
                        navBack();
                      }}
                    >
                      <IonIcon icon={chevronBack}></IonIcon>
                    </IonFabButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
              {/* <h2>{langPack.userDetails}</h2> */}
              <div className="user-card">
                {!user.photoURL && (
                  <IonAvatar onClick={() => takePhoto()}>
                    <img src={defaultImg} alt="default user silhouette" />
                  </IonAvatar>
                )}
                {user.photoURL && (
                  <IonAvatar onClick={() => takePhoto()}>
                    <img src={user.photoURL} alt="" />
                  </IonAvatar>
                )}
                <h1>{user.displayName}</h1>
                <span>{user.email}</span>
                {/* {user.photoURL && <p>{user.photoURL}</p>} */}
              </div>

              <IonList inset={true} className="">
                {/* <IonItem lines="full" color="light">
                  <IonIcon icon={personOutline} slot="start"></IonIcon>
                  <IonLabel>{user && user.displayName}</IonLabel>
                </IonItem>

                <IonItem lines="full" color="light">
                  <IonIcon icon={mailOutline} slot="start"></IonIcon>
                  <IonLabel>{user && user.email}</IonLabel>
                </IonItem> */}

                {userdbData.wallet && (
                  <IonItem lines="full" color="light" routerLink="/wallet">
                    <IonIcon icon={cashOutline} slot="start"></IonIcon>
                    <IonLabel>{userdbData.wallet} FCFA</IonLabel>
                    <IonIcon icon={addCircleOutline} slot="end"></IonIcon>
                  </IonItem>
                )}

                <IonItem lines="full" color="light">
                  <IonIcon icon={phonePortraitOutline} slot="start"></IonIcon>
                  <IonLabel>{user && user.phoneNumber}</IonLabel>
                </IonItem>

                {/* {userdbData && (
                  <IonItem lines="full" color="light">
                    <IonIcon icon={mailOutline} slot="start"></IonIcon>
                    <IonLabel>{userdbData.email}</IonLabel>
                  </IonItem>
                )} */}

                {userdbData && (
                  <IonItem lines="full" color="light">
                    <IonIcon icon={flagOutline} slot="start"></IonIcon>
                    <IonLabel>{userdbData.country}</IonLabel>
                  </IonItem>
                )}

                {userdbData && (
                  <IonItem lines="full" color="light">
                    <IonIcon icon={personOutline} slot="start"></IonIcon>
                    <IonLabel>
                      {langPack.accountType}:{" "}
                      {getAccountType(userdbData.accountType)}
                    </IonLabel>
                  </IonItem>
                )}

                {userdbData && (
                  <IonItem
                    lines="full"
                    color={userdbData.validated ? "success" : "danger"}
                  >
                    <IonIcon icon={personOutline} slot="start"></IonIcon>
                    <IonLabel>
                      Validation:{" "}
                      {userdbData.validated ? "Validated" : "Not Validated"}
                    </IonLabel>
                  </IonItem>
                )}
              </IonList>
              {!userdbData.validated && (
                <IonButton
                  className="yellow-b"
                  shape="round"
                  onClick={() => getdbUserData?.()}
                >
                  Refresh Validation Status
                </IonButton>
              )}
              <IonButton
                className="yellow-b"
                shape="round"
                onClick={onResetPassword}
              >
                {langPack.resetPassWord}
              </IonButton>
              <IonButton
                className="yellow-b"
                shape="round"
                onClick={handleLogout}
              >
                {langPack.logout}
              </IonButton>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
