import {
  IonAvatar,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonRow,
  IonToast,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import {
  carSportOutline,
  carSportSharp,
  helpCircleOutline,
  homeOutline,
  homeSharp,
  informationCircleOutline,
  logOutOutline,
  logOutSharp,
  personCircleOutline,
  personCircleSharp,
  refreshOutline,
  settingsOutline,

  // added by Ramses
  carSharp,
} from "ionicons/icons";
import "./Menu.css";
import defaultImg from "../assets/user.svg";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const Menu: React.FC = () => {
  const {
    user,
    logout,
    langPack,
    processInfo,
    setProcessInfo,
    currentMessage,
    setCurrentMessage,
  } = useAuthContext() ?? {};

  const appPages: AppPage[] = [
    {
      title: langPack.home,
      url: "/home",
      iosIcon: homeOutline,
      mdIcon: homeSharp,
    },

    {
      title: langPack.account,
      url: "/account",
      iosIcon: personCircleOutline,
      mdIcon: personCircleSharp,
    },

    {
      title: langPack.menuDelivery,
      url: "/delivery",
      iosIcon: carSharp,
      mdIcon: carSharp,
    },

    {
      title: langPack.taxi,
      url: "/taxi",
      iosIcon: carSportOutline,
      mdIcon: carSportSharp,
    },
  ];

  const lowerMenu = [
    { title: langPack.support, url: "/support", iosIcon: helpCircleOutline },
    { title: langPack.info, url: "/info", iosIcon: informationCircleOutline },
    {
      title: langPack.settingsTitle,
      url: "/settings",
      iosIcon: settingsOutline,
    },
  ];
  const history = useHistory();

  const location = useLocation();

  const toProfile = () => {
    history.push("/account");
  };

  const handleLogout = async () => {
    await logout?.();
    history.push("/locale");
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const openToast = () => {
      setProcessInfo?.(true);
    };

    return () => {
      openToast();
    };
  }, [currentMessage]);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          {user ? (
            <IonListHeader>
              <IonMenuToggle>
                <IonGrid>
                  <IonRow onClick={toProfile}>
                    <IonCol size="auto">
                      {!user.photoURL ? (
                        <IonAvatar className="profile-img">
                          <IonImg src={defaultImg} alt="user avatar"></IonImg>
                        </IonAvatar>
                      ) : (
                        <IonAvatar className="profile-img">
                          <IonImg
                            src={user.photoURL}
                            alt="user avatar"
                          ></IonImg>
                        </IonAvatar>
                      )}
                    </IonCol>
                    <IonCol id="mobile-menu-user-name">
                      <span id="profile-tag">{langPack.profile}</span>
                      <p id="username">
                        {user ? user.displayName : "No current User"}
                      </p>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonMenuToggle>
            </IonListHeader>
          ) : (
            ""
          )}
          {/* <IonNote>hi@ionicframework.com</IonNote> */}
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonMenuToggle>
            <IonItem onClick={handleLogout} lines="none">
              <IonIcon
                ios={logOutOutline}
                md={logOutSharp}
                slot="start"
              ></IonIcon>
              <IonLabel>{langPack.signOut}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem onClick={handleRefresh} lines="none">
              <IonIcon
                ios={refreshOutline}
                md={refreshOutline}
                slot="start"
              ></IonIcon>
              <IonLabel>{langPack.refresh}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>

        <IonFooter>
          {lowerMenu.map((menuitem, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                lines="none"
                className={location.pathname === menuitem.url ? "selected" : ""}
                routerLink={menuitem.url}
                routerDirection="none"
              >
                <IonIcon
                  slot="start"
                  ios={menuitem.iosIcon}
                  md={menuitem.iosIcon}
                />
                <IonLabel>{menuitem.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonFooter>

        <IonToast
          isOpen={processInfo}
          message={currentMessage}
          onDidDismiss={() => setProcessInfo?.(false)}
          duration={5000}
        ></IonToast>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
