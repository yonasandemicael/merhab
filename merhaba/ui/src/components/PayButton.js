import { useEffect, useContext } from "react";
import GlobalState from "../context/globalState";
import { axiosInstance } from "../config/axiosInstance";

const PayButton = ({ cartItems, itemsCheckOut }) => {
  const { token } = useContext(GlobalState);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleCheckout = () => {
    axiosInstance
      .post(
        `stripe/create-checkout-session`,
        {
          itemsCheckOut,
        },
        config
      )
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
          localStorage.removeItem("shopping-cart");
        }
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    console.log("itemsCheckOut", itemsCheckOut);
  }, []);

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};
export default PayButton;
