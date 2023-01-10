import React, { useState, useEffect } from "react";
import "./QualBet.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast } from "react-toastify";
import { connect } from "react-redux";

function QualBet(props) {
  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push("/");
    }
  }, [props.auth.isAuthenticated]);
  console.log(props.history);
  const [backBet, setBackBet] = useState();
  const [backOdds, setBackOdds] = useState();
  const [layOdds, setLayOdds] = useState();
  const [layCommision, setLayCommision] = useState();

  const [betType, setBetType] = useState("qualBet");

  const [layBet, setLayBet] = useState(0);
  const [layLiability, setLayLiability] = useState(0);
  const [backBetWins, setBackBetWins] = useState(0);
  const [layBetWins, setLayBetWins] = useState(0);

  const [showResults, setShowResults] = useState(false);

  // Working out optimal Lay Bet
  const calculateQual = () => {
    console.log("Qual bet calculation");
    let layBet = (
      (backOdds / (layOdds - layCommision / 100)) *
      backBet
    ).toFixed(2);
    let layLiability = (layBet * (layOdds - 1)).toFixed(2);
    let backBetWins = (
      (backOdds - 1) * backBet -
      (layOdds - 1) * layBet
    ).toFixed(2);
    let layBetWins = (layBet * (1 - layCommision / 100) - backBet).toFixed(2);
    console.log(layBet, layBetWins, layLiability);
    setLayBet(layBet);
    setLayLiability(layLiability);
    setBackBetWins(backBetWins);
    setLayBetWins(layBetWins);
    setShowResults(true);
  };

  // Working out optimal Lay Bet
  const calculateFree = () => {
    let layBet = (
      ((backOdds - 1) / (layOdds - layCommision / 100)) *
      backBet
    ).toFixed(2);
    let layLiability = (layBet * (layOdds - 1)).toFixed(2);
    let backBetWins = (
      (backOdds - 1) * backBet -
      (layOdds - 1) * layBet
    ).toFixed(2);
    let layBetWins = (layBet * (1 - layCommision / 100)).toFixed(2);

    setLayLiability(layLiability);
    setBackBetWins(backBetWins);
    setLayBet(layBet);
    setLayBetWins(layBetWins);
    setShowResults(true);
  };

  if (props.auth.user?.role !== "gold") {
    return (
      <div className="casinoOffers" style={{background:'aliceblue'}}>
        <div
          style={{
            textAlign: "center",
            color: "black",
            padding: 40,
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
              features
            </span>
          </h4>
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
    <div>
      <h1>Matched Betting Calculator</h1>
      <div className="calcContainer">
        <div className="calcOptions">
          <h3>Bet Type</h3>
          <div
            style={{ display: "flex", justifyContent: "end", margin: "6px 0" }}
          >
            <label>Select your bet type: </label>
            <select
              style={{ margin: "0 20px" }}
              value={betType}
              onChange={(e) => {
                setBetType(e.target.value);
                setShowResults(false);
              }}
            >
              <option value={"qualBet"}>Qualifying Bet</option>
              <option value={"freeBet"}>Free Bet</option>
            </select>
          </div>
        </div>

        {betType === "qualBet" ? (
          <>
            <div className="backBet">
              <div>
                <h4>Back Bet ($)</h4>
                <input
                  id="backBet"
                  onChange={(e) => setBackBet(e.target.value)}
                  value={backBet}
                ></input>
              </div>
              <div>
                <h4>Odds (Decimal)</h4>
                <input
                  id="backOdds"
                  onChange={(e) => setBackOdds(e.target.value)}
                  value={backOdds}
                ></input>
              </div>
            </div>
            <div className="layBet">
              <div>
                <h4>Lay Odds (Decimal)</h4>
                <input
                  id="layOdds"
                  onChange={(e) => setLayOdds(e.target.value)}
                  value={layOdds}
                ></input>
              </div>
              <div>
                <h4>Lay Commission %</h4>
                <input
                  id="layCommission"
                  onChange={(e) => setLayCommision(e.target.value)}
                  value={layCommision}
                ></input>
              </div>
            </div>
          </>
        ) : (
          <>
            {betType === "freeBet" ? (
              <div>
                <div className="backBet">
                  <div>
                    <h4>Free Bet ($)</h4>
                    <input
                      id="backBet"
                      onChange={(e) => setBackBet(e.target.value)}
                      value={backBet}
                    ></input>
                  </div>
                  <div>
                    <h4>Odds (Decimal)</h4>
                    <input
                      id="backOdds"
                      onChange={(e) => setBackOdds(e.target.value)}
                      value={backOdds}
                    ></input>
                  </div>
                </div>
                <div className="layBet">
                  <div>
                    <h4>Lay Odds (Decimal)</h4>
                    <input
                      id="layOdds"
                      onChange={(e) => setLayOdds(e.target.value)}
                      value={layOdds}
                    ></input>
                  </div>
                  <div>
                    <h4>Lay Commission %</h4>
                    <input
                      id="layCommission"
                      onChange={(e) => setLayCommision(e.target.value)}
                      value={layCommision}
                    ></input>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </>
        )}
        {showResults && (
          <>
            <div className="calcResult">
              <div className="calcTitle">
                <h3>Results</h3>
              </div>
              <div
                style={{ display: "flex", justifyContent: "end", margin: 10 }}
              >
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(layBet);
                    toast.success("Lay stake copied to clipboard", {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "cornflowerblue",
                    borderWidth: 0,
                    borderRadius: 10,
                    padding: "0px 25px",
                    cursor: "pointer",
                    boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
                    color: "white",
                  }}
                >
                  <ContentCopyIcon />
                  <p style={{ marginLeft: 10 }}>Copy to Clipboard</p>
                </button>
              </div>
              <p>
                At lay odds of <b>{layOdds}</b>, your lay stake is{" "}
                <b>${layBet}</b>
              </p>
              <p>
                Your liability will be <b>${layLiability}</b>
              </p>
              <p>
                If your Bookmaker Bet wins, your overall position will be{" "}
                <b>${backBetWins}</b>
              </p>
              <p>
                If your Exchange Lay wins, your overall position will be{" "}
                <b>${layBetWins}</b>
              </p>
              <p>The match rating for this bet is</p>
            </div>
          </>
        )}
        <div className="calculateResults">
          <button
            type="button"
            id="calcBtn"
            onClick={() => {
              if (betType === "freeBet") {
                calculateFree();
              } else {
                calculateQual();
              }
            }}
          >
            Calculate
          </button>
        </div>
      </div>

      <div className="calcInfo">
        <h2>Calculator Instructions</h2>
        <p>
          The matched betting calculator is one of the most important tools that
          you will use. You have two types of calculators which will be used to
          ensure maximum value of offers and the correct calculations are made
          throughout the process.
          <br></br>
          There are detailed instructions on how to use this tool *HERE*
        </p>
        <h4>Qualifying Bet</h4>
        <p>
          If you need to place a qualifying bet you will use this calculator. It
          will calculate the optimal lay bet for you with the odds you input.
          This will help you minimise qualifying losses which will save you
          money.
        </p>
        <h4>Free Bet</h4>
        <p>
          If you have qualified for a free bet then you will use the free bet
          calculator. This will also calculate the optimal lay bet for you,
          however will ensure you profit with the free bet you are using. Using
          this correctly will maximise your profits! Remember, every little
          helps.
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(QualBet);
