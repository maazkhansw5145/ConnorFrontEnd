import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Services/Redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import StartHere from "./Pages/Offers/StartHere/StartHere";
import SignupOffers from "./Pages/Offers/SignupOffers/SignupOffers";
import CasinoOffers from "./Pages/Offers/CasinoOffers/CasinoOffers";
import Calculator from "./Tools/Calculator/Calculator";
import Oddsmatcher from "./Tools/Oddsmatcher/Oddsmatcher";
import ProfitTracker from "./Tools/ProfitTracker/ProfitTracker";
import OfferDetails from "./Pages/Offers/OfferDetails";
import InstructionsDetails from "./Pages/Offers/StartHere/InstructionsDetails";
// Layout
import NavBar from "./Layout/NavBar";
import Footer from "./Layout/Footer";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/startHere" component={StartHere} />
              <Route
                exact
                path="/instructions/details/:id"
                component={InstructionsDetails}
              />

              <Route exact path="/signupOffers" component={SignupOffers} />
              <Route exact path="/casinoOffers" component={CasinoOffers} />
              <Route exact path="/offer/details/:id" component={OfferDetails} />
              <Route exact path="/calculator" component={Calculator} />
              <Route exact path="/oddsmatcher" component={Oddsmatcher} />
              <Route exact path="/profitTracker" component={ProfitTracker} />
            </Switch>
            <Footer />
          </Router>
          <ToastContainer />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
