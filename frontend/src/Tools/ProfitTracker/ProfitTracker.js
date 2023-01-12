import React, { useState, useEffect } from "react";
import "./ProfitTracker.css";
import Table from "../../components/Table";
import Loading from "../../components/Loading";
import url from "../../Config/URL";
import { connect } from "react-redux";

function ProfitTracker(props) {
  const [cacheProfits, setCacheProfits] = useState([]);
  const [profits, setProfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addRow, setAddRow] = useState(false);
  const [bookmaker, setBookmaker] = useState("all");
  const [month, setMonth] = useState("all");

  useEffect(() => {
    getProfits();
  }, []);

  const getProfits = () => {
    fetch(`${url}/user/profits/${props.auth.user.email}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.json().then((profits) => {
        setProfits(profits.profit_tracker);
        setCacheProfits(profits.profit_tracker);
      })
    );
    setLoading(false);
  };

  const deleteProfit = (id) => {
    fetch(`${url}/user/profit/${props.auth.user.email}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      setLoading(true);
      getProfits();
    });
  };

  const addProfit = (data) => {
    console.log(data);
    fetch(`${url}/user/profit/${props.auth.user.email}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
      setLoading(true);
      setAddRow(false);
      getProfits();
    });
  };

  const onFilterByBookmaker = (bookmaker) => {
    let filtered = cacheProfits.filter((p) => p.bookmaker === bookmaker);
    setProfits(filtered);
  };

  const onFilterByMonth = (month) => {
    let filtered = cacheProfits.filter(
      (p) => new Date(p.date).getMonth() === month - 1
    );
    setProfits(filtered);
  };

  if (loading) {
    return <Loading />;
  }

  if (props.auth.user?.role !== "gold") {
    return (
      <div className="casinoOffers" style={{ background: "aliceblue" }}>
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
            Kindly, purchase our{" "}
            <span style={{ color: "cornflowerblue", fontStyle: "italic" }}>
              gold
            </span>{" "}
            membership to access all the{" "}
            <span style={{ color: "cornflowerblue", fontStyle: "italic" }}>
              features.
            </span>
          </h4>
          <a
            href="https://discord.gg/jmw2Tcjjn6"
            style={{
              fontSize: 19,
              textDecoration: "none",
              fontStyle: "italic",
            }}
          >
            Visit The Discord Server
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="profitTracker" style={{ margin: "5%" }}>
      <h1 style={{ fontSize: "2em", marginBottom: "0.5em" }}>Profit Tracker</h1>
      <p style={{ fontSize: 19 }}>
        Here you can record how much profit you have made matched betting. You
        will be able to break down your earnings per month and also see the
        amount of profit you have made overall.
      </p>
      <hr style={{ margin: "30px 0" }} />
      <div
        style={{
          background: "aliceblue",
          borderRadius: 15,
          padding: 15,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "end",
        }}
      >
        <div>
          <p style={{ fontSize: 20, fontWeight: 400 }}>Filter By Month:</p>
          <select
            id="types"
            onChange={(e) => {
              setMonth(e.target.value);
              if (e.target.value === "all") {
                setProfits([...cacheProfits]);
              } else {
                onFilterByMonth(e.target.value);
              }
            }}
            value={month}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              width: "webkit-fill-available",
            }}
          >
            <option value="all">All</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">June</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div>
          <button
            style={{
              color: "white",
              backgroundColor: "#eba21c",
              padding: "10px 20px",
              marginTop: 0,
              display: "flex",
              justifyContent: "center",
              boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.75)",
              borderWidth: 0,
              cursor: "pointer",
            }}
            onClick={() => {
              setProfits([...cacheProfits]);
              setMonth("all");
              setBookmaker("all");
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <Table
          profits={profits}
          deleteProfit={deleteProfit}
          addProfit={addProfit}
          addRow={addRow}
          setAddRow={setAddRow}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button
          style={{
            color: "black",
            backgroundColor: "#eba21c",
            padding: "10px 20px",
            marginTop: 0,
            display: "flex",
            justifyContent: "center",
            borderWidth: 0,
            cursor: "pointer",
            marginRight: 25,
            borderRadius: 10,
          }}
          onClick={() => setAddRow(true)}
        >
          Add Row
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProfitTracker);
