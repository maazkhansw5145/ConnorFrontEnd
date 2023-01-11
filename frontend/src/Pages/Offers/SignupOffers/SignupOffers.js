import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import url from "../../../Config/URL";
import OfferCard from "../../../components/OfferCard";
import Loading from "../../../components/Loading";
import "./SignupOffers.css";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function SignupOffers(props) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push("/");
    } else {
      getOffers();
    }
  }, [props.auth.isAuthenticated]);

  const getOffers = () => {
    fetch(`${url}/offers/sports`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((offers) => {
          setOffers(offers);
          setLoading(false);
        });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  
  if (props.auth.user?.role !== "gold") {
    return (
      <div className="signupOffers" style={{background:'aliceblue'}}>
        <div
          style={{
            textAlign: "center",
            color: "black",
            padding: "90px 40px 0 40px",
          }}
        >
          <h2
            style={{ color: "lightseagreen", fontSize: 28, marginBottom: 40 }}
          >
            You are not authorized to view this page
          </h2>
          <h4 style={{ margin: "20px 0", fontSize: 19 }}>
            Kindly, purchase our {" "}
            <span style={{ color: "cornflowerblue", fontStyle: "italic" }}>
              gold
            </span>{" "}
            membership to access all the{" "}
            <span style={{ color: "cornflowerblue", fontStyle: "italic" }}>
              features.
            </span>
          </h4>
          <a href="https://discord.gg/jmw2Tcjjn6" style={{fontSize:19,textDecoration:'none',fontStyle:'italic'}}>Visit The Discord Server</a>
          <div
            style={{
              margin: "60px 0 30px 0",
            }}
          ></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="casinoOffers">
      {offers.length === 0 ? (
        <div style={{ paddingTop: 80 }}>
          <div
            style={{
              width: 600,
              background: "aliceblue",
              padding: 50,
              borderRadius: 20,
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <SentimentVeryDissatisfiedIcon
              style={{ fontSize: 60 }}
              color="cornflowerblue"
            />
            <h2>
              <span style={{ color: "coral" }}>Sorry!</span> we don't have any
              offers yet.
            </h2>
          </div>
        </div>
      ) : (
        <div
          style={{
            boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
            padding: 8,
            borderRadius: 10,
            width: 580,
            margin: "16px 30px 17px",
          }}
        >
          <h3 style={{ textAlign: "start", marginLeft: 15 }}>
            Following are the sports offers
          </h3>
          <hr style={{ margin: "25px 0" }} />
          {offers.map((offer, index) => {
            return <OfferCard {...props} offer={offer} key={index} />;
          })}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SignupOffers);
