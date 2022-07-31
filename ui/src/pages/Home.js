import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductForHome from "../components/ProductForHome";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";

export default function Home() {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("products")
      .then((res) => setListItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h4 className="text display-3 m-3">
        Welcome To Merhaba Construction and Agricultural online Shopping
      </h4>

      <h5 className="text mb-5 mx-3">
        Please{" "}
        <Link to="/signin">
          {" "}
          <b>Login</b>{" "}
        </Link>{" "}
        if you have an account or{" "}
        <Link to="/signup">
          <b>Sign-up</b>{" "}
        </Link>{" "}
        today to see our best quality products with best offerdable prices!
      </h5>
      <Row md={2} xs={1} lg={3} className="g-3">
        {listItems.map((item) => (
          <Col key={item._id}>
            <ProductForHome {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
