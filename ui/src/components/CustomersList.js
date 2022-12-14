import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Customer from "../components/Customer";
import axios from "axios";
import GlobalState from "../context/globalState";
import { axiosInstance } from "../config/axiosInstance";

export default function CustomersList() {
  const { token } = useContext(GlobalState);
  const [customers, setCustomers] = useState([]);

  axiosInstance.defaults.headers.common["authorization"] = `Bearer ${token}`;
  useEffect(() => {
    axiosInstance
      .get("users")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>List of Customers</h1>
      <Row md={2} xs={1} lg={6} className="g-3">
        {customers &&
          customers.map((person) => (
            <Col key={person._id}>
              <Customer {...person} />
            </Col>
          ))}
      </Row>
    </>
  );
}
