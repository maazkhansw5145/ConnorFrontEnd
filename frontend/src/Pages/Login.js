import React from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import "./login.css";
import { connect } from "react-redux";
import { login } from "../Services/Redux/actions/authActions";
const supabase = createClient(
  "https://ffliriltakvqsejjjbxp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbGlyaWx0YWt2cXNlampqYnhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3MzY0MTMsImV4cCI6MTk4OTMxMjQxM30.3FJxD6lH0e7wGUNApdteMdTOmRhimBZDLLbJq14vhqQ"
);

function Login(props) {
  //   supabase.auth.onAuthStateChange(async (event) => {
  //     console.log(event);
  //     if (event !== "SIGNED_OUT") {
  //       supabase.auth.getUser().then((value) => {
  //         console.log("VALUE", value);
  // if (value.data?.user) {
  //   props.login({
  //     full_name: value.data.user.user_metadata.full_name,
  //     email: value.data.user.user_metadata.email,
  //     role: value.data.user.role,
  //     picture: value.data.user.user_metadata.picture,
  //     email_verified: value.data.user.user_metadata.email_verified,
  //   });
  //   toast.success("Login Successfully", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  //   props.history.push("/");
  // }
  //   });
  // } else {
  // props.history.push("/");
  //   }
  // });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="main"
    >
      <div
        style={{
          width: "90%",
          maxWidth: 545,
        }}
      >
        <hr />

        <div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={["discord"]}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
