import React from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

import "./login.css";
import { connect } from "react-redux";
import { login } from "../Services/Redux/actions/authActions";
const supabase = createClient(
  "https://izscxrhuaeahiecswtad.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6c2N4cmh1YWVhaGllY3N3dGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk4MjExMjUsImV4cCI6MTk4NTM5NzEyNX0.JvoWJKvE3pzHx5rU7IRhR4pTmKfSFkjDwZxaNfPxLZQ"
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
    <div style={{ width: "50%", margin: "100px auto 0" }}>
      <hr />

      <div style={{ height: 375 }}>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["discord"]}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
