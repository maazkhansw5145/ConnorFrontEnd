import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Link } from "react-router-dom";

function OfferCard(props) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* image & price */}
        <div style={{ marginBottom: 20 }}>
          <img width={182} height={128} src={props.offer.image} alt="offer" />
          <div style={{ background: "rgb(2, 122, 126)" }}>
            <p style={{ marginTop: 0, padding: 6, color: "white" }}>
              Training Guid: {props.offer.price} USDT
            </p>
          </div>
        </div>
        {/* desc, detailed desc etc */}
        <div style={{ marginLeft: 15, textAlign: "left", width: 340 }}>
          <h4 style={{ marginTop: 0 }}>{props.offer.title}</h4>
          <p>{props.offer.description}</p>
          <p>Steps Completed: 0/1</p>
          <LinearProgress
            variant="buffer"
            value={0}
            style={{ background: "lightgray" }}
          />
        </div>
      </div>

      {/* tags */}
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginRight: 10,
        }}
      >
        <div style={{ marginTop: "auto", display: "flex", marginRight: 15 }}>
          {props.offer.tags.map((tag) => {
            return (
              <p
                style={{
                  background: "lightgray",
                  fontWeight: 700,
                  padding: "2px 10px",
                  fontSize: 12,
                  marginRight: 5,
                }}
              >
                {tag.text}
              </p>
            );
          })}
        </div>
        <Link
          to={{
            pathname: `/offer/details/${props.offer._id}`,
            query: {
              id: props.offer._id,
              title: props.offer.title,
              description: props.offer.description,
              detailed_description: props.offer.detailed_description,
              tags: props.offer.tags,
              price: props.offer.price,
              image: props.offer.image,
              details_link: props.offer.details_link,
            },
          }}
          style={{
            background: "#eba21c",
            padding: "10px 4%",
            borderRadius: 10,
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "none",
            color: "black",
            boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
          }}
        >
          Offer Details
        </Link>
      </div>

      <hr style={{ margin: "10px 0" }} />
    </div>
  );
}

export default OfferCard;
