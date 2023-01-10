import React, { useEffect, useState } from "react";
import "./Home.css";
import ngMap from "../Assets/nigeria.png";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { login } from "../Services/Redux/actions/authActions";
import Loading from "../components/Loading";
function Home(props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      setLoading(true);
      getUser();
    }
  }, [props.auth.isAuthenticated]);
  const supabase = createClient(
    "https://izscxrhuaeahiecswtad.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6c2N4cmh1YWVhaGllY3N3dGFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk4MjExMjUsImV4cCI6MTk4NTM5NzEyNX0.JvoWJKvE3pzHx5rU7IRhR4pTmKfSFkjDwZxaNfPxLZQ"
  );
  const getUser = () => {
    supabase.auth.getUser().then(async (value) => {
      console.log("VALUE", value);
      if (value.data?.user) {
        await props.login({
          full_name: value.data.user.user_metadata.full_name,
          email: value.data.user.user_metadata.email,
          picture: value.data.user.user_metadata.picture,
          email_verified: value.data.user.user_metadata.email_verified,
        });
        toast.success("Login Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setLoading(false);
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="home">
      <div className="startScreen">
        <div className="leftScreen">
          <div className="infoLeft">
            <h2>Want to beat the Gambling Industry?</h2>
            <p>
              Learn how to make money gambling using verified methods to ensure
              you always come out the winner. <br />
              Start with as little as $80 and complete our free trial to make as
              much as $24 profit!
            </p>
          </div>
        </div>

        <></>

        <div className="infoRight">
          <p>
            Get access to offers worth $100s, make money in your spare time and
            don't forget to follow the instructions!
          </p>
          <form action="https://discord.gg/jmw2Tcjjn6">
            <button className="joinBtn">JOIN DISCORD</button>
          </form>
        </div>
      </div>
      <></>

      <div className="faq">
        <h2>FAQ & Info</h2>
        <div className="faqQuestions">
          <h3>What is Matched Betting?</h3>
          <p>
            Matched betting is a proven technique that can be used to extract
            profit from the free bets and incentives offered by bookmakers. It
            is based on the application of math and the ability to cover all
            outcomes of a bet.
          </p>
        </div>
        <div className="faqQuestions">
          <h3>Is Matched Betting legal?</h3>
          <p>
            Yes, Matched Betting is perfectly legal. It can be done by anyone
            who is eligible to open an online betting account i.e. Over 18's
            only! As profits made with Matched Betting are classed as betting
            winnings, it's also tax-free.
          </p>
        </div>
        <div className="faqQuestions">
          <h3> Do I need to learn about sports or betting?</h3>
          <p>
            We teach you everything you need to know to be successful at Matched
            Betting. The best bets for Matched Betting are never selected using
            sports knowledge or betting tips!
          </p>
        </div>
        <div className="faqQuestions">
          <h3>How much money can I make?</h3>
          <p>
            Even if you can only spare a little time each day it's possible to
            get very good results with Matched Betting. Of course, the more time
            you can put in - both to learning and doing - the more you can get
            out of it. You cannot put a physical number on how much you can
            make, it is down to what offers you do and how much time you put in.
          </p>
        </div>
        <div className="faqQuestions">
          <h3>How long does Matched Betting take?</h3>
          <p>
            One of the good things about Matched Betting is that it is super
            flexible and you can do it in your own time. As with any new skill,
            it can feel a bit slow when you're first learning how to do it. Once
            you've got the hang of it though it gets much faster.
          </p>
        </div>
      </div>

      <></>

      <div className="locationInfo">
        <div className="map">
          <img alt="MapOfNigeria" src={ngMap}></img>
        </div>

        <div>
          <h1>Nigeria</h1>
          <p>
            Currently out platform only supports Nigerian Citizens. This is to
            help the insanely high 63% poverty rate, which is approximately 133
            million people.
            <br />
            <br />
            The average monthly wage is currently 71,185 naira. This platforms
            aims to give you an extra income source. This will help with the
            rising cost of living and expenses!
            <br />
            <br />
            We aim to become the largest Nigerian matched betting community, as
            well as the most profitable community.
          </p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Home);
