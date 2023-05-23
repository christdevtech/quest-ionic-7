import React from "react";
import { useAuthContext } from "../../context/AuthContext";
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
import Logo from "../../assets/Logo-only.svg";
import { useForm } from "react-hook-form";
import ".././Page.css";
import { useHistory } from "react-router";

export default function ResetPassword() {
  const history = useHistory();
  const { setNewPassword, langPack } = useAuthContext() ?? {};
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
      stayLoggedIn: true,
    },
  });

  let stayIn = true;
  const stayInStatus = () => {
    stayIn = !stayIn;
    console.log(stayIn);
  };

  const onSubmit = (data: any) => {
    data.stayLoggedIn = stayIn;
    console.log(data);
    setNewPassword?.(data.password);
    history.push("/home");
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
                <h4>{langPack.enterNewPassword}</h4>
                <IonGrid className="padding-top-1">
                  <IonRow>
                    <IonCol></IonCol>
                    <IonCol size="12" className="space-types">
                      <IonList>
                        <IonItem color="dark">
                          <IonLabel position="floating">
                            {langPack.password}
                          </IonLabel>
                          <IonInput
                            type="password"
                            id="password"
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
                            id="confirmPassword"
                            {...register("confirmPassword", {
                              required: true,
                              validate: (val: string) => {
                                if (watch("password") !== val) {
                                  return langPack.passwordMismatch;
                                }
                              },
                            })}
                          ></IonInput>
                        </IonItem>
                        {errors.confirmPassword && (
                          <IonNote>{langPack.passwordMismatch}</IonNote>
                        )}
                        <IonItem lines="none">
                          <IonToggle
                            id="keepLoggedIn"
                            slot="start"
                            checked
                            onIonChange={stayInStatus}
                            // {...register("keepLoggedIn", { required: true })}
                          ></IonToggle>
                          <IonLabel>{langPack.keepLoggedIn}</IonLabel>
                        </IonItem>

                        <IonButton
                          expand="block"
                          shape="round"
                          type="submit"
                          className="yellow-b"
                        >
                          {langPack.update}
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
