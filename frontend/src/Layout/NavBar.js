import React from "react";
import "./NavBar.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { createClient } from "@supabase/supabase-js";

import { NavLink } from "react-router-dom";
import { logout } from "../Services/Redux/actions/authActions";

function NavBar(props) {
  const supabase = createClient(
    "https://izscxrhuaeahiecswtad.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6c2N4cmh1YWVhaGllY3N3dGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk4MjExMjUsImV4cCI6MTk4NTM5NzEyNX0.JvoWJKvE3pzHx5rU7IRhR4pTmKfSFkjDwZxaNfPxLZQ"
  );
  const logout = async () => {
    await supabase.auth.signOut();
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
      <NavLink to="/" className="title" exact>
        ProfitOutcome
      </NavLink>

      <div style={{ display: "flex", justifyContent: "end" }} className="login">
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
            style={{ background: "none", borderWidth: 0, marginRight: 12 }}
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            activeStyle={{ color: "coral", textDecoration: "overline" }}
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: 12,
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
