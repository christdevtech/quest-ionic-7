import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { en, fr } from "./Translation";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

interface AuthContextValue {
  createUser: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<User | undefined>;
  otpSucceeded: boolean;
  user: any;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<UserCredential>;
  language: string;
  modifyLanguage: (chosenLanguage: string) => void;
  langPack: any;
  country: string;
  modifyCountry: (chosenCountry: string) => void;
  generateRecaptcha: () => void;
  requestCode: (phoneNumber: string) => void;
  confirmCode: (otp: string) => void;
  accountType: string;
  chooseAccountType: (type: string) => void;
  updateUser: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<void>;
  updatePhotoURL: (photoURL: string) => Promise<void>;
  resetPassword: boolean;
  setResetPassword: (value: boolean) => void;
  setNewPassword: (password: string) => void;
  userdbData: any;
  getdbUserData: () => Promise<void>;
  uploadProfilePicture: (file: File, userPhotoURLRef: any) => Promise<void>;
  validated: boolean;
  verifyStep: number;
  setVerifyStep: (step: number) => void;
  currentMessage: string;
  setCurrentMessage: (message: string) => void;
  processInfo: boolean;
  setProcessInfo: (state: boolean) => void;
}

const UserContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [userCredentials, setUserCredentials] = useState<any>();
  const [userdbData, setUserdbData] = useState<any>();
  const [user, setUser] = useState<any>();
  const [resetPassword, setResetPassword] = useState(false);
  const [language, setLanguage] = useState("en");
  const [country, setCountry] = useState("Cameroon");
  const [otpSucceeded, setOtpSucceeded] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [validated, setValidated] = useState(false);
  const [verifyStep, setVerifyStep] = useState(1);
  const [currentMessage, setCurrentMessage] = useState("Welcome to Quest Taxi");
  const [processInfo, setProcessInfo] = useState(false);

  auth.languageCode = language;
  let userDocSnap: any = undefined;

  const eng = en;
  const fre = fr;

  const modifyLanguage = (chosenLanguage: string) => {
    setLanguage(chosenLanguage);
    auth.languageCode = language;
    switch (chosenLanguage) {
      case "en":
        setLangPack(eng);
        break;
      case "fr":
        setLangPack(fre);
        break;
      default:
        setLangPack(eng);
    }
  };

  const [langPack, setLangPack] = useState(eng);

  const modifyCountry = (chosenCountry: string) => {
    setCountry(chosenCountry);
  };

  const generateRecaptcha = () => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response: any) => {
          console.log(response);
        },
      },
      auth
    );
  };

  const requestCode = (phoneNumber: string) => {
    let appVerifier = (window as any).recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setCurrentMessage("code requested");
        (window as any).confirmationResult = confirmationResult;
      })
      .catch((error) => {
        setCurrentMessage(error.message);
      });
  };

  const confirmCode = (otp: string) => {
    let confirmationResult = (window as any).confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result: any) => {
        setOtpSucceeded(true);
        setUserCredentials(result);
        setUser(result.user);
      })
      .catch((error: any) => {
        setOtpSucceeded(false);
        console.log(error);
      });
  };

  const createUser = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredentials.user, {
        displayName: displayName,
      });
      return userCredentials.user;
    } catch (error) {
      console.log(error);
      // return error;
    }
  };

  const updateUser = async (
    displayName: string,
    email: string,
    password: string
  ) => {
    if (auth.currentUser) {
      const user = auth.currentUser;

      try {
        await updateProfile(user, {
          displayName: displayName,
        });
        setCurrentMessage("Display Name updated to " + displayName);
      } catch (error: any) {
        setCurrentMessage(error.message);
      }

      try {
        await updatePassword(user, password);
        reauthenticateWithCredential(user, userCredentials);
        console.log("Password updated to " + password);
      } catch (error) {
        console.log(error);
      }

      try {
        await updateEmail(user, email);
        setCurrentMessage("Email updated to " + email);
      } catch (error: any) {
        setCurrentMessage(error.message);
      }

      try {
        await setDoc(doc(db, "users", user.uid), {
          displayName: displayName,
          email: user.email,
          phone: user.phoneNumber,
          accountType: accountType,
          country: country,
          language: language,
          wallet: 0,
          validated: validated,
          verifyStep: 1,
        });
      } catch (error: any) {
        setCurrentMessage(error.message);
      }
    }
  };

  const updatePhotoURL = async (photoURL: string) => {
    if (auth.currentUser) {
      const user = auth.currentUser;
      try {
        await updateProfile(user, {
          photoURL: photoURL,
        });
        setCurrentMessage("Photo URL updated to " + photoURL);
      } catch (error: any) {
        setCurrentMessage(error.message);
      }
    }
  };

  const setNewPassword = (password: string) => {
    const user = auth.currentUser;
    if (user) {
      updatePassword(user, password)
        .then(() => {
          setCurrentMessage("Password updated");
        })
        .catch((error) => {
          setCurrentMessage(error.message);
        });
    }
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
    setCurrentMessage("Signed Out Successfully");
  };

  const chooseAccountType = (type: string) => {
    setAccountType(type);
    setCurrentMessage("Account type set to " + type);
    if (type === "User / Client") {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  const getdbUserData = async () => {
    console.log("Beginning to get the user data");
    try {
      const userDocRef = doc(db, "users", user.uid);
      userDocSnap = await (await getDoc(userDocRef)).data();

      if (userDocSnap) {
        updateUserData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserData = () => {
    setUserdbData(userDocSnap);
    console.log("User data successfully set");
  };

  const uploadProfilePicture = async (file: File, userPhotoURLRef: any) => {
    try {
      const storageRef = ref(storage, `users/${user.uid}`);
      setCurrentMessage("Uploading profile Photo");
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await updateProfile(user, {
        photoURL: downloadURL,
      });

      // setDoc(doc(db, "users", user.uid), {
      //   photoURL: downloadURL,
      // });

      userPhotoURLRef.current = downloadURL;
      setCurrentMessage("Profile picture uploaded");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userdbData) {
      const updateVerificationStep = () => {
        if (userdbData.verifyStep) setVerifyStep(userdbData.verifyStep);
      };

      return () => {
        updateVerificationStep();
      };
    } else {
      getdbUserData();
    }
  }, [userdbData]);

  useEffect(() => {
    if (userdbData) {
      const updateUserdbData = async () => {
        if (verifyStep !== userdbData.verifyStep) {
          console.log("Uploading the new verifyStep");
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            verifyStep: verifyStep,
          });
          getdbUserData();
        }
      };

      return () => {
        updateUserdbData();
      };
    }
  }, [verifyStep]);

  return (
    <UserContext.Provider
      value={{
        createUser,
        otpSucceeded,
        user,
        logout,
        login,
        language,
        modifyLanguage,
        langPack,
        country,
        modifyCountry,
        generateRecaptcha,
        requestCode,
        confirmCode,
        accountType,
        chooseAccountType,
        updateUser,
        updatePhotoURL,
        resetPassword,
        setResetPassword,
        setNewPassword,
        userdbData,
        getdbUserData,
        uploadProfilePicture,
        validated,
        verifyStep,
        setVerifyStep,
        currentMessage,
        setCurrentMessage,
        processInfo,
        setProcessInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuthContext = () => useContext(UserContext);
