import { useState } from "react";
import { ethers } from "ethers";
import { Adjust, CheckCircle, ArrowBack } from "@mui/icons-material";
import Loading from "../components/Loading";
import { connect } from "react-redux";
import { premiumPurchase } from "../Services/Redux/actions/authActions";
import "./Dashboard.css";

function BuyPremium(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const startPayment = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) {
        setError("No crypto wallet found. Please install it.");
        setLoading(false);
      } else {
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("provider", provider);
        const signer = provider.getSigner();
        provider
          .getNetwork()
          .then(async (network) => {
            console.log("Chain ID", network.chainId === 1); // Prints the network ID
            if (network.chainId === 1) {
              let userAddress = await signer.getAddress();
              console.log("user address", userAddress);
              provider
                .getBalance(userAddress)
                .then(async (balance) => {
                  // convert a currency unit from wei to ether
                  const balanceInEth = ethers.utils.formatEther(balance);
                  console.log(`balance: ${balanceInEth} ETH`);
                  const response = await fetch(
                    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
                  ); // make a request to the CoinGecko API
                  console.log(response);
                  const json = await response.json(); // parse the response as JSON
                  const ethPrice = json.ethereum.usd; // extract the ETH price in USD
                  if (balanceInEth * ethPrice < 12) {
                    setError("insufficient funds");
                    setLoading(false);
                  } else {
                    const tx = await signer.sendTransaction({
                      to: "0x56D3ca044e1C2B91F3d54c8eB1fe5D6c183e0a70",
                      value: ethers.utils.parseEther(
                        (12 / ethPrice).toString()
                      ),
                    });
                    const receipt = await tx.wait();
                    console.log("RECEIPT", receipt);
                    props.premiumPurchase(
                      receipt.transactionHash,
                      props.auth.user._id
                    );
                    setDone(true);
                    setLoading(false);
                  }
                })
                .catch((e) => {
                  console.log("Congeiko response error", e);
                  alert("Please check your internet connection and try again.");
                  setLoading(false);
                });
            } else {
              setError("You cannot purchase premium using test net");
              setLoading(false)
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (err) {
      console.log("Window ether error", err);

      alert("Please check your internet connection and try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (done) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <div>
            <h2
              style={{
                color: "rgb(0 254 132)",
                background: "rgba(100, 232, 237, 0.1)",
                padding: 20,
                borderRadius: 13,
              }}
            >
              Premium Purchases Successfully
            </h2>
            <CheckCircle
              style={{
                fontSize: 120,
                color: "rgb(0 255 132)",
              }}
            />
            <div style={{ marginTop: 40 }}>
              <h3>
                <span style={{ color: "coral" }}>Congratulations!</span> You
                have successfully purchases all the premium features.
              </h3>
              <h4>
                Click on the home page button below and enjoy the features.
              </h4>
            </div>
          </div>
          <button
            style={{
              background: "rgb(0 255 132)",
              border: "none",
              padding: "10px 20px",
              borderRadius: 20,
              color: "white",
              cursor: "pointer",
              margin: "20px 0",
            }}
            onClick={() => {
              setError("");
              props.history.push("/dashboard");
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <ArrowBack />{" "}
              <p style={{ fontSize: 18, margin: "0 0 0 10px" }}>Home Page</p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (error === "You cannot purchase premium using test net") {
    return (
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="dashboard"
      >
        <div style={{ textAlign: "center", margin: "auto" }}>
          <h2
            style={{
              color: "red",
              background: "rgb(252 189 189 / 40%)",
              padding: 20,
              borderRadius: 13,
            }}
          >
            You Cannot Purchase Premium Using Test Net
          </h2>
          <div style={{ margin: "30px 0" }}>
            <img
              src="/changeToMainNet.jpg"
              width={160}
              height={163}
              alt="metamask"
            />
          </div>
          <div style={{ margin: "10px 0" }}>
            <h3>
              Please change your network to{" "}
              <span style={{ color: "coral" }}>Mainnet</span>{" "}
              and then try again.
            </h3>
          </div>
          <button
            style={{
              background: "#f84300",
              border: "none",
              padding: "10px 40px",
              borderRadius: 20,
              color: "white",
              cursor: "pointer",
              margin: "20px 0",
            }}
            onClick={() => setError("")}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  if (error === "insufficient funds") {
    return (
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="dashboard"
      >
        <div style={{ textAlign: "center", margin: "auto" }}>
          <h2
            style={{
              color: "red",
              background: "rgb(252 189 189 / 40%)",
              padding: 20,
              borderRadius: 13,
            }}
          >
            Insufficient Funds
          </h2>
          <div style={{ margin: "30px 0" }}>
            <img src="/buyFunds.jpg" width={160} height={163} alt="metamask" />
          </div>
          <div style={{ margin: "10px 0" }}>
            <h3>
              Please add at least ethereum worth{" "}
              <span style={{ color: "coral" }}>12 USDC</span> to your account
              and then try again.
            </h3>
          </div>
          <button
            style={{
              background: "#f84300",
              border: "none",
              padding: "10px 40px",
              borderRadius: 20,
              color: "white",
              cursor: "pointer",
              margin: "20px 0",
            }}
            onClick={() => setError("")}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  if (error === "No crypto wallet found. Please install it.") {
    return (
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="dashboard"
      >
        <div style={{ textAlign: "center", margin: "auto" }}>
          <h2
            style={{
              color: "red",
              background: "rgb(252 189 189 / 40%)",
              padding: 20,
              borderRadius: 13,
            }}
          >
            No Wallet Found.
          </h2>
          <div style={{ margin: "30px 0" }}>
            <img src="/metamask.png" width={310} height={163} alt="metamask" />
          </div>
          <h3>Click on the Link below to install Metamask for Chrome</h3>
          <div style={{ margin: "30px 0" }}>
            <a
              target="_blank"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
            >
              Install Metamask Chrome Extension
            </a>
          </div>
          <button
            style={{
              background: "#f84300",
              border: "none",
              padding: "10px 40px",
              borderRadius: 20,
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => setError("")}
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      className="dashboard"
    >
      <div
        style={{
          // float: "left",
          // width: props.windowWidth > 600 ? "33.3%" : "100%",
          padding: 8,
          width: "90%",
          maxWidth: 400,
          margin: "auto",
        }}
      >
        <ul
          style={{
            listStyleType: "none",
            margin: 0,
            padding: 0,
            webkitTransition: "0.3s",
            transition: "0.3s",
            color: "white",
            fontSize: 18,
          }}
        >
          <li
            style={{
              background: "coral",
              color: "white",
              fontSize: 25,
              borderBottom: "1px solid #eee",
              paddingTop: 10,
              textAlign: "center",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <p
              style={{
                fontFamily: "Poppins",
                fontSize: 32,
                fontWeight: 600,
                margin: "0 0 10px 0",
              }}
            >
              Premium
            </p>
          </li>

          <li
            style={{
              padding: 20,
              background: "white",
              color: "black",
              display: "flex",
            }}
          >
            <Adjust style={{ marginRight: 20, color: "slateblue" }} />
            Access to Signup Offers
          </li>
          <li
            style={{
              padding: 20,
              background: "white",
              color: "black",
              display: "flex",
            }}
          >
            <Adjust style={{ marginRight: 20, color: "slateblue" }} />
            Access to Reload Offers
          </li>
          <li
            style={{
              padding: 20,
              background: "white",
              color: "black",
              display: "flex",
            }}
          >
            <Adjust style={{ marginRight: 20, color: "slateblue" }} />
            Access to Matched Betting Calculator
          </li>
          <li
            style={{
              padding: 20,
              background: "white",
              color: "black",
              display: "flex",
            }}
          >
            <Adjust style={{ marginRight: 20, color: "slateblue" }} />
            Access to Profit Tracker
          </li>

          <li
            style={{
              background: "#eee",
              fontSize: 20,
              padding: 20,
              textAlign: "center",
              borderRadius: "0 0 8px 8px",
            }}
          >
            <button
              style={{
                background: "#f84300",
                borderRadius: 4,
                padding: 10,
                borderWidth: 0,
                marginLeft: 20,
                cursor: "pointer",
                boxShadow: "0 0 4px 0 rgb(0 0 0 / 10%",
                color: "white",
              }}
              onClick={async () => {
                setError("");
                await startPayment();
              }}
            >
              Buy Now
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { premiumPurchase })(BuyPremium);
