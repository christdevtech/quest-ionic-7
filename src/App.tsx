import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { AuthContextProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Locale from "./pages/auth/Locale";
import AuthChoice from "./pages/auth/AuthChoice";
import AccountType from "./pages/auth/AccountType";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import PhoneLogin from "./pages/auth/PhoneLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import ResetPassword from "./pages/auth/ResetPassword";
import Delivery from "./pages/userViews/delivery/Delivery";
import DriverCredentials from "./pages/verification/DriverCredentials";
import LiveTrack from "./pages/userViews/delivery/LiveTracking";
import TaxiHome from "./pages/userViews/TaxiHome";
import UserDetails from "./pages/UserDetails";
import Chat from "./pages/Chat";

setupIonicReact();

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/home" />
              </Route>

              <Route path="/locale">
                <Locale />
              </Route>

              <Route path="/auth-choice">
                <AuthChoice />
              </Route>

              <Route path="/account-type">
                <AccountType />
              </Route>

              <Route path="/sign-up">
                <SignUp />
              </Route>

              <Route path="/sign-in">
                <SignIn />
              </Route>

              <Route path="/phone-login">
                <PhoneLogin />
              </Route>

              <Route path="/reset-password">
                <ProtectedRoute>
                  <ResetPassword />
                </ProtectedRoute>
              </Route>

              <Route path="/home">
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              </Route>

              <Route path="/delivery">
                <ProtectedRoute>
                  <Delivery />
                </ProtectedRoute>
              </Route>

              <Route path="/account">
                <ProtectedRoute>
                  <UserDetails />
                </ProtectedRoute>
              </Route>

              <Route path="/chat/:user">
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              </Route>

              <Route path="/verify-driver">
                <ProtectedRoute>
                  <DriverCredentials />
                </ProtectedRoute>
              </Route>

              <Route path="/track">
                <ProtectedRoute>
                  <LiveTrack />
                </ProtectedRoute>
              </Route>

              <Route path="/settings">
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              </Route>

              <Route path="/taxi">
                <ProtectedRoute>
                  <TaxiHome />
                </ProtectedRoute>
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </AuthContextProvider>
  );
};

export default App;
