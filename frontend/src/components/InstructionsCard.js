import React from "react";

import { Link } from "react-router-dom";

function InstructionsCard(props) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        {/* image & price */}
        <img width={182} height={128} src={props.instructions.image} alt="offer" />

        {/* desc, detailed desc etc */}
        <div style={{ marginLeft: 15, textAlign: "left", width: 340 }}>
          <h4 style={{ marginTop: 0 }}>{props.instructions.title}</h4>
          <p>{props.instructions.description}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "80px 20px 0 20px",
        }}
      >
        <div style={{ marginTop: "auto", display: "flex" }}>
          <p
            style={{
              background:
                props.instructions.type !== "premium" ? "lightgray" : "gold",
              fontWeight: 700,
              padding: "4px 10px",
              fontSize: 12,
              marginRight: 5,
              textTransform: "uppercase",
            }}
          >
            {props.instructions.type}
          </p>
        </div>
        <Link
          to={{
            pathname: `/instructions/details/${props.instructions._id}`,
            query: {
              id: props.instructions._id,
              title: props.instructions.title,
              description: props.instructions.description,
              detailed_description: props.instructions.detailed_description,
              type: props.instructions.type,
              image: props.instructions.image,
              details_link: props.instructions.details_link,
            },
          }}
          style={{
            background: "#eba21c",
            padding: "10px 30px",
            borderRadius: 10,
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "none",
            color: "black",
          }}
        >
          Instructions Details
        </Link>
      </div>
      <hr style={{ margin: "25px 0" }} />
    </div>
  );
}

export default InstructionsCard;
