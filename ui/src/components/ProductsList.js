import { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Product } from "../components/Product";
import GlobalState from "../context/globalState";
import { axiosInstance } from "../config/axiosInstance";

// use custom create axios are declare it as below to avoid code duplication or repeation

// axios.defaults.baseURL =
//   "http://finalproject-ENV-1.EBA-ANMHDZKZ.US-east-1.elasticbeanstalk.com/api/";

export default function ProductList() {
  const { listItems, setListItems } = useContext(GlobalState);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("construction");
  useEffect(() => {
    axiosInstance
      .get("products")
      .then((res) => setListItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let url = "";
    if (searchValue === "") {
      url = `products/filter/${category}`;
    } else if (searchValue !== "") {
      url = `products/filter/${searchValue}/${category}`;
    }
    axiosInstance
      .get(url)
      .then((res) => setListItems(res.data))
      .catch((err) => console.log(err));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setSearchValue("");
    axiosInstance
      .get("products")
      .then((res) => setListItems(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h1>Products</h1>
      <Row className="d-flex">
        <div className="d-flex flex-row border boredr-1 p-3 mb-2 justify-content-end">
          <label>Search by name:</label>
          <input
            className="form-control input-lg w-100 "
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.trim())}
          ></input>
          <select
            className="form-select mx-2 w-25 btn-info"
            style={{ height: "40px" }}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="construction" defaultChecked>
              construction
            </option>
            <option value="agricultural">agricultural</option>
          </select>
          <button
            className=" form-control btn btn-primary"
            style={{ width: "120px" }}
            onClick={(e) => handleSearch(e)}
          >
            {" "}
            Search
          </button>
          <button
            className=" form-control btn btn-danger ms-2 "
            style={{ width: "150px" }}
            onClick={(e) => handleCancel(e)}
          >
            {" "}
            Cancel
          </button>
        </div>
      </Row>
      <Row md={2} xs={1} lg={3} className="g-3">
        {listItems.map((item) => (
          <Col key={item._id}>
            <Product {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
