import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import "swiper/css";
import "swiper/css/pagination";
import { useAuthContext } from "../context/AuthContext";
import {
  carSport,
  carSportOutline,
  carSportSharp,
  cubeOutline,
  cubeSharp,
} from "ionicons/icons";
import UserHome from "./userViews/UserHome";
import { useEffect, useState } from "react";
import DriverTaxiHome from "./cabDriverViews/DriverTaxiHome";
import DriverCredentials from "./verification/DriverCredentials";
import CarRentalHome from "./carRentalViews/CarRentalHome";

interface QuestService {
  url: string;
  iosIcon: string;
  mdIcon: string;
  name: string;
}

export default function Home() {
  const { langPack, userdbData, getdbUserData } = useAuthContext() ?? {};
  const [loading, setLoading] = useState(true);
  const questServices: QuestService[] = [
    {
      name: langPack.cabDriver,
      url: "/taxi",
      iosIcon: carSportOutline,
      mdIcon: carSportSharp,
    },
    {
      name: langPack.deliveryAgent,
      url: "/delivery",
      iosIcon: cubeOutline,
      mdIcon: cubeSharp,
    },
    {
      name: langPack.carRental,
      url: "/car-renter",
      iosIcon: carSportOutline,
      mdIcon: carSport,
    },
    // {
    //   name: langPack.hotelOrFacility,
    //   url: "/hotel",
    //   iosIcon: bedOutline,
    //   mdIcon: bedSharp,
    // },
    // {
    //   name: langPack.busAgency,
    //   url: "/hotel",
    //   iosIcon: busOutline,
    //   mdIcon: busSharp,
    // },
    // {
    //   name: langPack.sales,
    //   url: "/market",
    //   iosIcon: cartOutline,
    //   mdIcon: cartSharp,
    // },
  ];

  useEffect(() => {
    if (userdbData) {
      setLoading(false);
    } else {
      getdbUserData?.();
      console.log("attempting to pull user data");
    }
  }, [userdbData]);

  return (
    <IonPage>
      {!userdbData && (
        <>
          <IonContent className="centralize">
            <p>Connecting to Quest Taxi Database</p>
            <IonSpinner name="circular"></IonSpinner>
          </IonContent>
        </>
      )}

      {userdbData && userdbData.accountType === "user" && <UserHome />}

      {userdbData &&
        userdbData.accountType === "cabDriver" &&
        userdbData.validated && <DriverTaxiHome />}
      {userdbData &&
        userdbData.accountType === "cabDriver" &&
        !userdbData.validated && <DriverCredentials />}

      {userdbData &&
        userdbData.accountType === "carRental" &&
        userdbData.validated && <CarRentalHome />}
      {userdbData &&
        userdbData.accountType === "carRental" &&
        !userdbData.validated && <DriverCredentials />}

      {userdbData &&
        userdbData.accountType === "deliveryAgent" &&
        userdbData.validated && <DriverTaxiHome />}
      {userdbData &&
        userdbData.accountType === "deliveryAgent" &&
        !userdbData.validated && <DriverCredentials />}

      {userdbData &&
        userdbData.accountType === "hotelOrFacility" &&
        userdbData.validated && <DriverTaxiHome />}
      {userdbData &&
        userdbData.accountType === "hotelOrFacility" &&
        !userdbData.validated && <DriverCredentials />}

      {userdbData &&
        userdbData.accountType === "sales" &&
        userdbData.validated && <DriverTaxiHome />}
      {userdbData &&
        userdbData.accountType === "sales" &&
        !userdbData.validated && <DriverCredentials />}

      {userdbData &&
        userdbData.accountType === "truckServices" &&
        userdbData.validated && <DriverTaxiHome />}
      {userdbData &&
        userdbData.accountType === "truckServices" &&
        !userdbData.validated && <DriverCredentials />}
    </IonPage>
  );
}
