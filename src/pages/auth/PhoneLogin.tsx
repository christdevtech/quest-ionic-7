import React from "react";
import { useState } from "react";
import ".././Page.css";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import Logo from "../../assets/Logo-only.svg";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";

export default function PhoneLogin() {
  useIonViewWillEnter(() => {
    setRequested(false);
  });
  const [presentAlert] = useIonAlert();
  const [requested, setRequested] = useState(false);
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    otpSucceeded,
    generateRecaptcha,
    requestCode,
    confirmCode,
    resetPassword,
    langPack,
    country,
  } = useAuthContext() ?? { country: "Cameroon" };

  const getOTP = async (data: any) => {
    const phone = data.code + data.tel;
    console.log(phone);
    setRequested(!requested);
    generateRecaptcha?.();
    await requestCode?.(phone);
    presentAlert({
      mode: "ios",
      header: langPack.otpHeader,
      message: langPack.otpConfirmMessage + phone,
      buttons: ["OK"],
      onDidDismiss(event) {
        console.log(phone);
      },
    });
  };

  const validateOTP = async (data: any) => {
    console.log(data);
    await confirmCode?.(data.otp);
    setValidated(true);
  };

  const getCountryCode = (country: string) => {
    let countryCode = "";
    switch (country) {
      case langPack.cameroon:
        countryCode = "+237";
        break;

      case langPack.caf:
        countryCode = "+236";
        break;

      case langPack.congo:
        countryCode = "+243";
        break;

      case langPack.eqg:
        countryCode = "+240";
        break;

      case langPack.gabon:
        countryCode = "+241";
        break;

      case langPack.ivoryCoast:
        countryCode = "+225";
        break;

      case langPack.nigeria:
        countryCode = "+234";
        break;

      case langPack.tanzania:
        countryCode = "+255";
        break;

      case langPack.uga:
        countryCode = "+256";
        break;

      default:
        countryCode = "+237";
        break;
    }

    return countryCode;
  };

  const nextPage = () => {
    if (resetPassword) {
      history.push("/reset-password");
    } else {
      history.push("/account-type");
    }
  };
  const prevPage = () => {
    history.goBack();
  };
  const onSignIn = () => {
    history.push("/sign-in");
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

              {!requested && (
                <form onSubmit={handleSubmit(getOTP)}>
                  <h4>{langPack.enterNumber}</h4>

                  <IonGrid className="padding-top-1">
                    <IonRow>
                      <IonCol></IonCol>
                      <IonCol size="12" className="space-types">
                        <IonGrid>
                          <IonRow>
                            <IonCol size="4">
                              <IonList>
                                <IonItem color="dark">
                                  <IonInput
                                    className="phone-field"
                                    type="text"
                                    id="code"
                                    minlength={4}
                                    maxlength={4}
                                    value={getCountryCode?.(country)}
                                    {...register("code", { required: false })}
                                  ></IonInput>
                                </IonItem>
                                {errors.code && (
                                  <IonNote>{langPack.required}</IonNote>
                                )}
                              </IonList>
                            </IonCol>

                            <IonCol>
                              <IonList>
                                <IonItem color="dark">
                                  <IonInput
                                    className="phone-field"
                                    type="number"
                                    id="tel"
                                    placeholder="673094943"
                                    {...register("tel", { required: true })}
                                  ></IonInput>
                                </IonItem>
                                {errors.tel && (
                                  <IonNote>{langPack.requiredFull}</IonNote>
                                )}
                              </IonList>
                            </IonCol>
                          </IonRow>
                        </IonGrid>

                        <IonGrid>
                          <IonRow>
                            <IonCol></IonCol>
                            <IonCol size="10">
                              <IonButton
                                expand="block"
                                shape="round"
                                type="submit"
                                className="yellow-b"
                              >
                                {resetPassword
                                  ? langPack.requestResetOTP
                                  : langPack.signUp}
                              </IonButton>
                              {!resetPassword ? (
                                <>
                                  <p>{langPack.alreadyHaveAccount}</p>
                                  <IonButton
                                    fill="outline"
                                    className="sign-in-btn"
                                    shape="round"
                                    expand="block"
                                    onClick={() => {
                                      onSignIn();
                                    }}
                                  >
                                    {langPack.signIn}
                                  </IonButton>
                                </>
                              ) : (
                                ""
                              )}
                            </IonCol>
                            <IonCol></IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonCol>
                      <IonCol></IonCol>
                    </IonRow>
                  </IonGrid>
                </form>
              )}

              {requested && (
                <form onSubmit={handleSubmit(validateOTP)}>
                  <h4>{langPack.enterOTP}</h4>

                  <IonGrid className="padding-top-1">
                    <IonRow>
                      <IonCol></IonCol>
                      <IonCol size="10">
                        <IonList>
                          <IonItem color="dark">
                            <IonInput
                              className="phone-field"
                              type="text"
                              id="otp"
                              minlength={6}
                              maxlength={6}
                              placeholder="* * * * * *"
                              {...register("otp", { required: true })}
                            ></IonInput>
                          </IonItem>
                          {errors.code && (
                            <IonNote>{langPack.required}</IonNote>
                          )}
                        </IonList>
                        {!validated && (
                          <IonButton
                            expand="block"
                            shape="round"
                            type="submit"
                            className="yellow-b"
                          >
                            {langPack.submitOtp}
                          </IonButton>
                        )}
                        {validated && (
                          <IonButton
                            expand="block"
                            shape="round"
                            onClick={otpSucceeded ? nextPage : prevPage}
                            className="yellow-b"
                          >
                            {otpSucceeded ? langPack.next : langPack.tryAgain}
                          </IonButton>
                        )}
                      </IonCol>
                      <IonCol></IonCol>
                    </IonRow>
                  </IonGrid>
                </form>
              )}
              <div id="sign-in-button"></div>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
