import React from "react";
import "./NavBar.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { createClient } from "@supabase/supabase-js";

import { NavLink } from "react-router-dom";
import { logout } from "../Services/Redux/actions/authActions";

function NavBar(props) {
  const supabase = createClient(
    "https://ffliriltakvqsejjjbxp.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbGlyaWx0YWt2cXNlampqYnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3MzY0MTMsImV4cCI6MTk4OTMxMjQxM30.3FJxD6lH0e7wGUNApdteMdTOmRhimBZDLLbJq14vhqQ"
  );
  const logout = async () => {
    supabase.auth.signOut();
    props.logout();
    toast.success("Log Out Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <div className="navbar">
      <NavLink to="/" className="title" exact style={{ fontSize: "1.2em" }}>
        ProfitOutcome
      </NavLink>

      <div style={{ display: "flex", justifyContent: "end",alignItems:'center' }} className="login">
        <div
          style={{
            borderLeft: "1px solid rgb(148 242 227)",
            height: 35,
            marginRight: 12,
          }}
        />
        {props.auth.isAuthenticated ? (
          <button
            onClick={() => logout()}
            className="login"
            style={{
              background: "none",
              borderWidth: 0,
              marginRight: 12,
            }}
          >
            <p style={{ fontSize: "1.2em", margin: 0 }}>Logout</p>
          </button>
        ) : (
          <NavLink
            to="/login"
            activeStyle={{ color: "coral", textDecoration: "overline" }}
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: 12,
              fontSize: "1.2em",
            }}
          >
            Login
          </NavLink>
        )}

        <div
          style={{
            borderLeft: "1px solid rgb(148 242 227)",
            height: 35,
          }}
        />
      </div>
      {props.auth.isAuthenticated && (
        <NavLink
          to="/dashboard"
          activeStyle={{ color: "coral", textDecoration: "overline" }}
          className="login"
          style={{
            fontSize: "1.2em",
          }}
        >
          Dashboard
        </NavLink>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
