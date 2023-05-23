import React, { useState, useRef, useEffect } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonPage,
  IonRow,
  IonAvatar,
  useIonActionSheet,
} from "@ionic/react";
import { arrowBackOutline, callOutline, sendOutline } from "ionicons/icons";
import Logo from "../assets/Logo-only.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useAuthContext } from "../context/AuthContext";
import { Pagination } from "swiper";
import { Link, useParams } from "react-router-dom";
import Chats from "../json/chats.json";
import Agent from "../json/deliveryAgents.json";
import "./Chat.css";
import Phone from "../assets/icon/phone.png";

export default function Chat() {
  const { langPack } = useAuthContext() ?? {};

  const user: any = useParams();
  const loggedInUser = "You";

  return (
    <IonPage>
      <IonContent style={{ width: "100vw" }}>
        <IonGrid
          style={{
            width: "100%",
            backgroundColor: "#fff",
            position: "fixed",
            top: 0,
            boxShadow: "-3px -3px 30px rgba(136, 136, 136, .15)",
          }}
        >
          <IonRow style={{ boxShadow: "12px lightgrey", borderRadius: 10 }}>
            <IonCol size="2">
              <IonIcon name={arrowBackOutline} style={{ color: "#000" }} />
            </IonCol>
            <IonCol size="8">
              {Agent.map((agent: any, index: any) => {
                if (agent.user == user.user) {
                  return (
                    <div className="chat-header-middle">
                      <div className="chat-header-avatar">
                        <IonAvatar>
                          <img alt={agent.user} src={agent.image} />
                        </IonAvatar>
                      </div>
                      <div className="chat-header-user">
                        <div>
                          <h3 className="user-fullname">{agent.fullname}</h3>
                        </div>
                        <span className="online-status">
                          {agent.online_status}
                        </span>
                      </div>
                    </div>
                  );
                }
              })}
            </IonCol>
            <IonCol size="2">
              <img
                src={Phone}
                width="45px"
                height="45px"
                style={{ marginTop: 10, marginRight: 10 }}
              />
            </IonCol>
          </IonRow>
        </IonGrid>

        <div className="chat-container">
          {Chats.map((chat: any, index: any) => {
            if (chat.user == user.user) {
              return (
                <>
                  {chat.message.map((message: any) => {
                    if (message.user == user.user) {
                      return (
                        <div className="chat-left">
                          <div className="chat-left-message">
                            {message.message}
                          </div>
                          <span className="chat-left-timestamp">
                            Friday 23, 2023
                          </span>
                        </div>
                      );
                    }
                    if (message.user == loggedInUser) {
                      return (
                        <div className="chat-right">
                          <div className="chat-right-message">
                            {message.message}
                          </div>
                          <span className="chat-right-timestamp">
                            Friday 23, 2023
                          </span>
                        </div>
                      );
                    }
                  })}
                </>
              );
            }
          })}
        </div>

        <IonGrid style={{ width: "100vw", position: "fixed", bottom: 0 }}>
          <form className="send-message-form">
            <div className="send-message-container">
              <div className="send-message-input-container">
                <input type="search" placeholder="text here" />
              </div>
              <div className="send-message-button-container">
                <button>
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M48 0H0V48H48V0Z"
                      fill="white"
                      fill-opacity="0.01"
                    />
                    <path
                      d="M42 6L4 20.1383L24 24.0083L29.0052 44L42 6Z"
                      stroke="#333"
                      stroke-width="1"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M24.0083 24.0083L29.6651 18.3515"
                      stroke="#333"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
