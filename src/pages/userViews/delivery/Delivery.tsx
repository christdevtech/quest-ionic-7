import React, { useState, useRef, useEffect } from "react";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonLabel,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import {
  locate,
  search,
  addCircle,
  chatbubblesOutline,
  homeOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import { useAuthContext } from "../../../context/AuthContext";
import "./Delivery.css";

import UsersDelivery from "../../../json/usersDelivery.json";
import ImageItem from "../../../assets/img/profile-1.jpg";

export default function Delivery() {
  const { langPack } = useAuthContext() ?? {};
  const history = useHistory();

  const myNavigator = (link: string) => {
    history.push(link);
  };

  const toHome = () => {
    history.push("/home");
  };

  return (
    <IonPage>
      <IonContent>
        <div className="header">
          <div className="top">
            <IonFab onClick={() => toHome()} id="toHomeFab">
              <IonFabButton color="dark">
                <IonIcon icon={homeOutline}></IonIcon>
              </IonFabButton>
            </IonFab>
            <div></div>
            <div></div>
          </div>
        </div>
        <IonGrid className="no-padding">
          <IonCol>
            <IonRow></IonRow>
            <IonRow>
              <div className="body">
                <div className="search-banner">
                  <h2>Track Your Package</h2>
                  <p>Enter the receipt number that you got from our officers</p>
                  <form action="">
                    <input type="text" />
                    <div className="search-icon">
                      <div>
                        <IonIcon icon={search} size="large" />
                      </div>
                    </div>
                  </form>
                </div>
                <div></div>
              </div>
            </IonRow>
            <IonRow>
              <IonCol size="12" style={{ marginBottom: 140 }}>
                {UsersDelivery.map((delivery: any, index: any) => {
                  return (
                    <div className="delivery-item" key={index}>
                      <div className="delivery-information">
                        <div className="delivery-image">
                          <img src={ImageItem} alt="" />
                        </div>
                        <div className="delivery-texts">
                          <p>
                            <span className="name">{delivery.name}</span>
                            <br />
                            <span className="package-id">
                              {delivery.package_id}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="delivery-status">
                        <span>{delivery.status}</span>
                      </div>
                    </div>
                  );
                })}
              </IonCol>
            </IonRow>
          </IonCol>
        </IonGrid>

        <div className="footer">
          <div>
            <div className="footer-links">
              <div>
                <IonIcon
                  onClick={() => myNavigator("/")}
                  icon={chatbubblesOutline}
                  style={{ color: "#333", fontSize: 45 }}
                />
              </div>
              <div>
                <IonLabel>Chat</IonLabel>
              </div>
            </div>
          </div>

          <div>
            <div className="footer-links">
              <div>
                <IonIcon
                  onClick={() => myNavigator("/")}
                  icon={addCircle}
                  style={{ color: "#333", fontSize: 65 }}
                />
              </div>
              <div>
                <IonLabel>Add</IonLabel>
              </div>
            </div>
          </div>

          <div>
            <div className="footer-links">
              <div>
                <IonIcon
                  onClick={() => myNavigator("/track")}
                  icon={locate}
                  style={{ color: "#333", fontSize: 45 }}
                />
              </div>
              <div>
                <IonLabel>Track</IonLabel>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
