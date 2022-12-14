import { useContext } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import GlobalState from "../context/globalState";
import { formatCurrency } from "../utilities/formatCurrency";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";

export function Product({
  _id,
  name,
  price,
  productImage,
  desc,
  catagories,
  inStock,
}) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    role,
    token,
  } = useContext(GlobalState);
  const quantity = getItemQuantity(_id);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axiosInstance
      .delete(`api/products/${id}`, config)
      .then((res) => {
        alert("Are you sure you want to delete");
        navigate("/products");
      })
      .catch((err) => {
        navigate(-1);
      });
  };
  const handleEdit = (e) => {
    navigate("/products/edit", {
      state: {
        _id,
        name,
        price,
        productImage,
        desc,
        catagories,
        inStock,
      },
    });
  };

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={productImage}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-1.5">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="">
          Description: {""}
          {desc}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Catagory:{""}
            {catagories &&
              catagories.map((item, i) => <span key={i}>{item}</span>)}
          </li>
          <li className="list-group-item">
            Availability:
            {""}
            {inStock ? "available" : "not available"}
          </li>
        </ul>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(_id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(_id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(_id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(_id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-center mt-4">
          <Row>
            <Col>
              {role && (
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={(e) => handleEdit(e)}
                >
                  Edit
                </button>
              )}
            </Col>
            <Col>
              {role && (
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(_id)}
                >
                  Delete
                </button>
              )}
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
}
