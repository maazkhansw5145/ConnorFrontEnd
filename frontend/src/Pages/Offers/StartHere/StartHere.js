import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import url from "../../../Config/URL";
import InstructionsCard from "../../../components/InstructionsCard";
import Loading from "../../../components/Loading";
import "./StartHere.css";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

function Instructions(props) {
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push("/");
    } else {
      getInstructions();
    }
  }, [props.auth.isAuthenticated]);

  const getInstructions = () => {
    let role = props.auth.user?.role === "premium" ? "premium" : "non-premium";
    fetch(`${url}/instructions/${role}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((instructions) => {
          setInstructions(instructions);
          setLoading(false);
        });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="startHere">
      {instructions.length === 0 ? (
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
              <span style={{ color: "Cornflowerblue" }}>Sorry!</span> we don't
              have any instructions yet.
            </h2>
          </div>
        </div>
      ) : (
        <div
          style={{
            boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
            padding: 8,
            borderRadius: 10,
            maxWidth: 580,
            width: "90%",
            margin: "20px auto",
          }}
        >
          <h3 style={{ textAlign: "start", marginLeft: 15 }}>
            Following are the instructions for{" "}
            {props.auth.user?.role === "premium" ? "premium" : "non premium"} users
          </h3>
          <hr style={{ margin: "25px 0" }} />
          {instructions.map((instruction, index) => {
            return (
              <InstructionsCard
                {...props}
                instructions={instruction}
                key={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Instructions);
