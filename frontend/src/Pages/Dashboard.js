import React, { useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Dashboard(props) {
  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push("/");
    }
  }, [props.auth.isAuthenticated]);
  
  return (
    <div className="dashboard">
      <div className="container">
        <div className="db_Actions">
          <ul>
            <div className="block">
              <Link to="./starthere">
                <h3>Start Here</h3>
              </Link>
            </div>

            <div className="block">
              <Link to="./signupoffers">
                <h3>Signup Offers</h3>
              </Link>
            </div>

            <div className="block">
              <Link to="./casinoOffers">
                <h3>Casino Offers</h3>
              </Link>
            </div>

            <div className="block">
              <Link to="./calculator">
                <h3>Calculator</h3>
              </Link>
            </div>

            <div className="block">
              <Link to="./profitTracker">
                <h3>Profit Tracker</h3>
              </Link>
            </div>

            <div className="block">
              <Link to="./oddsmatcher">
                <h3>
                  Oddsmatcher <br></br>(Coming Soon)
                </h3>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
