import React from "react";
import "./Calculator.css";
import QualBet from "./Variants/QualBet";
import { CheckPremium } from "../../utils/CheckPremium";
import PremiumExpires from "../../components/PremiumExpires";
import { premiumEnd } from "../../Services/Redux/actions/authActions";
import { connect } from "react-redux";

function Calculator(props) {
  if (props.auth.user?.role !== "premium") {
    props.history.push("/buy/premium");
  } else if (!CheckPremium(props.auth.user.premium.bought_at)) {
    props.premiumEnd(props.auth.user._id);
    return <PremiumExpires {...props} />;
  }
  return (
    <div className="calculator">
      <QualBet {...props} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { premiumEnd })(Calculator);
