import React from "react";

function PremiumExpires(props) {
  return (
    <div className="casinoOffers" style={{ background: "aliceblue" }}>
      <div
        style={{
          textAlign: "center",
          color: "black",
          padding: "90px 40px 0 40px",
        }}
      >
        <h2 style={{ color: "lightseagreen", fontSize: 28, marginBottom: 40 }}>
          Sorry, Your premium subscription has ended up.
        </h2>
        <h4 style={{ margin: "20px 0", fontSize: 19 }}>
          Kindly, renew your{" "}
          <span style={{ color: "cornflowerblue", fontStyle: "italic" }}>
            premium
          </span>{" "}
          membership to access all the{" "}
          <span style={{ color: "cornflowerblue", fontStyle: "italic" }}>
            features.
          </span>
        </h4>
        <button
          onClick={() => props.history.push("/buy/premium")}
          style={{
            fontSize: 20,
            textDecoration: "none",
            border: "none",
            padding: "10px 20px",
            background: "coral",
            borderRadius: 20,
            color: "white",
            marginTop: 40,
            cursor: "pointer",
            boxShadow: "0px 1px 1px 0px rgba(0,0,0,0.75)",
          }}
        >
          Renew Membership
        </button>
        <div
          style={{
            margin: "60px 0 30px 0",
          }}
        ></div>
      </div>
    </div>
  );
}

export default PremiumExpires;
