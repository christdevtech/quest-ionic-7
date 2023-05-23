import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonMenuButton,
  IonRow,
} from "@ionic/react";
import Logo from "../../assets/Logo-only.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useAuthContext } from "../../context/AuthContext";
import { Pagination } from "swiper";
import ".././Page.css";
import {
  bedOutline,
  bedSharp,
  busOutline,
  busSharp,
  carSport,
  carSportOutline,
  carSportSharp,
  cartOutline,
  cartSharp,
  cubeOutline,
  cubeSharp,
} from "ionicons/icons";
import { Link } from "react-router-dom";

interface QuestService {
  url: string;
  iosIcon: string;
  mdIcon: string;
  name: string;
}

export default function UserHome() {
  const { langPack } = useAuthContext() ?? {};

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
    {
      name: langPack.hotelOrFacility,
      url: "/hotel",
      iosIcon: bedOutline,
      mdIcon: bedSharp,
    },
    {
      name: langPack.busAgency,
      url: "/hotel",
      iosIcon: busOutline,
      mdIcon: busSharp,
    },
    {
      name: langPack.sales,
      url: "/market",
      iosIcon: cartOutline,
      mdIcon: cartSharp,
    },
  ];
  return (
    <IonContent>
      <IonGrid className="ion-align-items-center main-grid">
        <IonRow className="main-row">
          <IonCol></IonCol>
          <IonCol size="11">
            <IonGrid>
              <IonRow>
                <IonCol size="2">
                  <IonMenuButton></IonMenuButton>
                </IonCol>

                <IonCol id="pageTitle">
                  <h3>Quest</h3>
                </IonCol>

                <IonCol size="2">
                  <IonImg src={Logo}></IonImg>
                </IonCol>
              </IonRow>
            </IonGrid>

            <Swiper
              id="home-services"
              spaceBetween={15}
              slidesPerView={2.3}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
            >
              {questServices.map((service, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Link to={service.url} className="service-content">
                      <IonIcon
                        ios={service.iosIcon}
                        md={service.mdIcon}
                      ></IonIcon>
                      <p>{service.name}</p>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="home-special-offers padding-top-1">
              <h3>{langPack.specialOffers}</h3>
              <div className="special-1">
                <IonButton shape="round">{langPack.seeOffer}</IonButton>
              </div>
            </div>
          </IonCol>
          <IonCol></IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
