import React, { useState, useRef, useEffect } from "react";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonLabel,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import {
  locationOutline,
  homeOutline,
  callOutline,
  chatboxEllipsesOutline,
  closeOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import { useAuthContext } from "../../../context/AuthContext";
import "./Delivery.css";
import "./LiveTracking.css";
import LocationTrack from "../../../assets/img/map-track.jpeg";
import driverImg from "../../../assets/img/profile-1.jpg";

export default function LiveTrack() {
  const { langPack } = useAuthContext() ?? {};
  const history = useHistory();

  const useGeoLocation = () => {
    const [location, setLocation] = useState({
      loaded: false,
      coordinates: { lat: "", lng: "" },
    });

    const onSuccess = (location: any) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
      });
    };

    const onError = (error: any) => {
      setLocation({
        loaded: true,
        ...error,
      });
    };

    useEffect(() => {
      if (!("geolocation" in navigator)) {
        onError({
          code: 0,
          message: "Geolocation not supported",
        });
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });
    return location;
  };

  const previousPage = () => {
    console.log("trying to go back");
    history.go(-1);
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid style={{ marginBottom: 20 }}>
          <IonCol>
            <IonRow style={{ width: "90vw", margin: "auto", paddingTop: 20 }}>
              <IonCol size="10">
                <h2 style={{ fontSize: 35, fontWeight: "bold" }}>
                  Live Tracking
                </h2>
              </IonCol>
              <IonCol size="2">
                <IonIcon
                  icon={closeOutline}
                  size="2"
                  onClick={() => {
                    previousPage();
                    console.log("closeiconclicked");
                  }}
                  style={{ fontSize: 35, marginTop: 10, marginLeft: "5vw" }}
                />
              </IonCol>
            </IonRow>
            <IonRow
              style={{
                width: "90vw",
                height: "45vh",
                background: "grey",
                margin: "auto",
                marginTop: "5vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <img
                src={LocationTrack}
                alt=""
                width="100%"
                height="100%"
                style={{ borderRadius: 10, objectFit: "cover" }}
              />
            </IonRow>

            <IonRow>
              <div className="location-container">
                <div className="drivers-location">
                  <div className="icon">
                    <IonIcon icon={locationOutline} size="large" />
                  </div>
                  <div>
                    <h4>Driver's Location</h4>
                    <span>1237 street, Douala</span>
                  </div>
                </div>
                <div className="drivers-destination">
                  <div className="icon">
                    <IonIcon icon={homeOutline} size="large" />
                  </div>
                  <div>
                    <h4>Delivery Destination</h4>
                    <span>1237 street, Douala</span>
                  </div>
                </div>
              </div>
            </IonRow>

            <IonRow>
              <div className="delivery-informations">
                <div className="contact-agent ion-justify-content-between">
                  <div className="agent-info">
                    <div className="agent-pic">
                      <img
                        src={driverImg}
                        alt=""
                        width="100%"
                        height="100%"
                        style={{ borderRadius: "50%" }}
                      />
                    </div>
                    <div>
                      <h4>Ramuald Dione</h4>
                    </div>
                  </div>

                  <div className="contacts">
                    <div className="call">
                      <IonIcon icon={callOutline} size="large" />
                    </div>
                    <div className="message">
                      <IonIcon icon={chatboxEllipsesOutline} size="large" />
                    </div>
                  </div>
                </div>

                <div className="package-info" style={{ marginTop: 20 }}>
                  <div className="package-weight">
                    <span>package weight</span>
                  </div>
                  <div className="delivery-status">
                    <span>status</span>
                  </div>
                </div>
                <div className="package-info">
                  <div className="weight">
                    <h2>0.83kg</h2>
                  </div>
                  <div className="status">
                    <div>Processing</div>
                  </div>
                </div>
              </div>
            </IonRow>
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
