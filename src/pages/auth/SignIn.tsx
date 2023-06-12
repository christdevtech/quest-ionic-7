import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
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
import React, { useEffect, useState } from "react";
import ".././Page.css";
import Logo from "../../assets/Logo-only.svg";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import { refreshOutline } from "ionicons/icons";

export default function SignIn() {
  const { login, setResetPassword, langPack, userdbData, user, getdbUserData } =
    useAuthContext() ?? {};

  let [loading, setLoading] = useState(false);

  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      stayLoggedIn: true,
    },
  });
  let stayIn = true;

  const onForgotPassword = () => {
    setResetPassword?.(true);
    history.push("/phone-login");
  };
  const stayInStatus = () => {
    stayIn = !stayIn;
    console.log(stayIn);
  };

  const onSubmit = async (data: any) => {
    setLoading(!loading);
    data.stayLoggedIn = stayIn;
    // console.log(data);
    try {
      await login?.(data.email, data.password);
      setLoading(!loading);
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  useEffect(() => {
    const goToHome = () => {
      if (userdbData) {
        history.push("/home");
      } else if (user) {
        getdbUserData?.();
      }
    };

    return () => {
      goToHome();
    };
  }, []);

  const toSignUpPage = () => {
    history.push("/phone-login");
  };
  return (
    <IonPage>
      <IonContent className="auth-page">
        <IonGrid fixed={true} className="ion-align-items-center main-grid">
          <IonRow className="ion-align-items-center main-row">
            <IonCol></IonCol>
            <IonCol size="11" class="page-data">
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
                <h4>{langPack.signIn}</h4>
                <IonGrid className="padding-top-1">
                  <IonRow>
                    <IonCol></IonCol>
                    <IonCol size="12" className="space-types">
                      <IonList>
                        <IonItem color="dark">
                          <IonInput
                            label={langPack.email}
                            labelPlacement="floating"
                            type="email"
                            id="email"
                            {...register("email", { required: true })}
                          ></IonInput>
                        </IonItem>
                        {errors.email && (
                          <IonNote>{langPack.requiredFull}</IonNote>
                        )}
                        <IonItem color="dark">
                          <IonInput
                            label={langPack.password}
                            labelPlacement="floating"
                            type="password"
                            id="password"
                            {...register("password", { required: true })}
                          ></IonInput>
                        </IonItem>
                        {errors.password && (
                          <IonNote>{langPack.requiredFull}</IonNote>
                        )}
                        <IonItem lines="none">
                          <IonToggle
                            id="keepLoggedIn"
                            labelPlacement="start"
                            checked
                            onIonChange={stayInStatus}
                            // {...register("keepLoggedIn", { required: true })}
                          >
                            {langPack.keepLoggedIn}
                          </IonToggle>
                        </IonItem>
                        <IonButton
                          expand="block"
                          shape="round"
                          type="submit"
                          className="yellow-b"
                          color="warning"
                        >
                          {loading ? (
                            <IonIcon
                              id="loading"
                              md={refreshOutline}
                              ios={refreshOutline}
                            ></IonIcon>
                          ) : (
                            ""
                          )}
                          {langPack.signIn}
                        </IonButton>

                        <p onClick={onForgotPassword} id="forgot-password-text">
                          {langPack.forgotPassword}
                        </p>
                        <br />
                        <p>{langPack.noAccount}</p>
                        <IonButton
                          fill="outline"
                          className="sign-in-btn"
                          shape="round"
                          expand="block"
                          onClick={toSignUpPage}
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
