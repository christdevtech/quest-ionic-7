import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonToggle,
} from "@ionic/react";
import React from "react";
import ".././Page.css";

//React Hook Form Import
import { useForm } from "react-hook-form";

//Logo
import Logo from "../../assets/Logo-only.svg";

//Context for User State and Authentication
import { useAuthContext } from "../../context/AuthContext";

//Navigation
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
      stayLoggedIn: true,
    },
  });

  const history = useHistory();

  let stayIn = false;

  const stayInStatus = () => {
    stayIn = !stayIn;
    console.log(stayIn);
  };

  const { accountType, updateUser, langPack } = useAuthContext() ?? {};

  const onSubmit = async (data: any) => {
    data.isLoggedIn = stayIn;
    const displayName = data.firstName + " " + data.lastName;
    console.log(data);
    try {
      updateUser?.(displayName, data.email, data.password);
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonPage>
      <IonContent className="auth-page">
        <IonGrid fixed={true} className="ion-align-items-center main-grid">
          <IonRow className="ion-align-items-center main-row">
            <IonCol></IonCol>
            <IonCol size="11" className="page-data">
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <IonCol size="4">
                    <IonImg src={Logo} alt="Quest Logo"></IonImg>
                  </IonCol>
                  <IonCol></IonCol>
                </IonRow>
              </IonGrid>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <small className="features">
                  Taxi | Booking | Sales | Rentals | Delivery
                </small> */}
                <h4>{langPack.createAccount}</h4>
                <small>{accountType}</small>
                <IonGrid class="padding-top-1">
                  <IonRow>
                    <IonCol></IonCol>
                    <IonCol size="11" class="space-types">
                      <IonList>
                        <IonItem color="dark">
                          <IonLabel position="floating">
                            {langPack.firstName}
                          </IonLabel>
                          <IonInput
                            placeholder="John"
                            {...register("firstName", { required: true })}
                          ></IonInput>
                        </IonItem>
                        {errors.firstName && (
                          <IonNote>{langPack.requiredFull}</IonNote>
                        )}

                        <IonItem color="dark">
                          <IonLabel position="floating">
                            {langPack.lastName}
                          </IonLabel>
                          <IonInput
                            placeholder="Smith"
                            {...register("lastName", { required: true })}
                          ></IonInput>
                        </IonItem>
                        {errors.lastName && (
                          <IonNote>{langPack.requiredFull}</IonNote>
                        )}

                        <IonItem color="dark">
                          <IonLabel position="floating">
                            {langPack.email}
                          </IonLabel>
                          <IonInput
                            type="email"
                            placeholder="name@gmail.com"
                            {...register("email", { required: true })}
                            id="email"
                          ></IonInput>
                        </IonItem>
                        {errors.email && (
                          <IonNote>{langPack.requiredFull}</IonNote>
                        )}

                        <IonItem color="dark">
                          <IonLabel position="floating">
                            {langPack.password}
                          </IonLabel>
                          <IonInput
                            type="password"
                            placeholder="********"
                            {...register("password", { required: true })}
                          ></IonInput>
                        </IonItem>
                        {errors.password && (
                          <IonNote>{langPack.requiredFull}</IonNote>
                        )}

                        <IonItem color="dark">
                          <IonLabel position="floating">
                            {langPack.confirmPassword}
                          </IonLabel>
                          <IonInput
                            type="password"
                            placeholder="********"
                            {...register("confirm", {
                              required: true,
                              validate: (val: string) => {
                                if (watch("password") !== val) {
                                  return langPack.passwordMismatch;
                                }
                              },
                            })}
                          ></IonInput>
                        </IonItem>
                        {errors.confirm && (
                          <IonNote>{langPack.passwordMismatch}</IonNote>
                        )}

                        <IonItem lines="none">
                          <IonToggle
                            slot="start"
                            onIonChange={stayInStatus}
                          ></IonToggle>
                          <IonLabel>{langPack.keepLoggedIn}</IonLabel>
                        </IonItem>
                        <IonButton
                          expand="block"
                          shape="round"
                          type="submit"
                          className="yellow-b"
                        >
                          {langPack.signUp}
                        </IonButton>
                      </IonList>
                    </IonCol>
                    <IonCol></IonCol>
                  </IonRow>
                </IonGrid>
              </form>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
