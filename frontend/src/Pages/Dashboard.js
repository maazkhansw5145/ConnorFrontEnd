import React, { useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import HttpsIcon from "@mui/icons-material/Https";
function Dashboard(props) {
  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push("/");
    }
  }, [props.auth.isAuthenticated]);

  console.log(props.auth.user.role);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="db_Actions">
          <ul>
            <div className="block" style={{
              background:'rgba(100, 149, 237,.2)'
            }}>
              <Link to="/startHere" style={{ textDecoration: "none" }} >
                <h3>Start Here</h3>
              </Link>
            </div>

            <div
              className="block"
              style={{
                background: "rgba(255,215,0,0.2)",
              }}
            >
              <Link to="/signupoffers" style={{ textDecoration: "none" }}>
                <h3>Signup Offers</h3>
              </Link>
              {props.auth.user.role !== "premium" && (
                <div
                  style={{
                    textAlign: "end",
                    margin: 10,
                    color: "coral",
                  }}
                >
                  <HttpsIcon />
                </div>
              )}
            </div>
            <div
              className="block"
              style={{
                background: "rgba(2, 122, 126,0.2)",
              }}
            >
              <Link to="/reloadOffers" style={{ textDecoration: "none" }}>
                <h3>Reload Offers</h3>
              </Link>
              {props.auth.user.role !== "premium" && (
                <div
                  style={{
                    textAlign: "end",
                    margin: 10,
                    color: "coral",
                  }}
                >
                  <HttpsIcon />
                </div>
              )}
            </div>

            <div
              className="block"
              style={{ background: "RGBA( 240, 128, 128, 0.3 )" }}
            >
              <Link to="/calculator" style={{ textDecoration: "none" }}>
                <h3>Calculator</h3>
              </Link>
              {props.auth.user.role !== "premium" && (
                <div
                  style={{
                    textAlign: "end",
                    margin: 10,
                    color: "coral",
                  }}
                >
                  <HttpsIcon />
                </div>
              )}
            </div>

            <div className="block" style={{ background: "aliceblue" }}>
              <Link to="/profitTracker" style={{ textDecoration: "none" }}>
                <h3>Profit Tracker</h3>
              </Link>
              {props.auth.user.role !== "premium" && (
                <div
                  style={{
                    textAlign: "end",
                    margin: 10,
                    color: "coral",
                  }}
                >
                  <HttpsIcon />
                </div>
              )}
            </div>

            <div className="block">
              {/* <Link to="./oddsmatcher"> */}
              <h3>
                Oddsmatcher <br></br>(Coming Soon)
              </h3>
              {/* </Link> */}
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
