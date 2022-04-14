import React, { Component } from "react";
import {
  Container,
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Table,
} from "react-bootstrap";

export default class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: "",
      cost: "",
      summaryCost: "",
      id: "",
      materialId: "",
      records: [],
      update: false,
      sell: false,
      produce: false,
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleChangeQuantity = (evt) => {
    const record = this.state.records.find(
      (record) => this.state.id === record.id
    );

    this.setState({
      [evt.target.name]: evt.target.value,
      summaryCost: record.cost * evt.target.value,
    });
  };

  componentWillMount() {
    this.fetchAllRecords();
  }

  addRecord = () => {
    if (!this.state.name || !this.state.cost) {
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      name: this.state.name,
      cost: this.state.cost,
    });
    fetch("http://localhost:8080/products", {
      method: "POST",
      headers: myHeaders,
      body: body,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          name: "",
          quantity: "",
          cost: "",
          summaryCost: "",
          id: "",
        });
        this.fetchAllRecords();
      });
  };

  fetchAllRecords = () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch("http://localhost:8080/products", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        this.setState({
          records: result,
        });
      })
      .catch((error) => console.log("error", error));
  };

  addMaterialToProduct = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      productId: this.state.id,
      materialId: this.state.materialId,
      count: this.state.quantity,
    });

    fetch("http://localhost:8080/products/" + this.state.id, {
      method: "POST",
      headers: myHeaders,
      body: body,
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          id: '',
          quantity: '',
          productId: '',
          update: false,
          sell: false,
          produce: false,
        });
      })
      .catch((error) => console.log("error", error));
  }

  editRecord = (id, name, cost) => {
    this.setState({
      id,
      name,
      cost,
      materialId: "",
      produce: false,
      update: true,
      sell: false,
    });
  };

  produceProduct = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      id: +this.state.id,
      quantity: +this.state.quantity,
    });

    fetch(`http://localhost:8080/produceproduct?id=${this.state.id}&quantity=${this.state.quantity}`, {
      method: "POST",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          id: '',
          quantity: '',
          update: false,
          sell: false,
          produce: false,
        });
      })
      .catch((error) => console.log("error", error));
  };

  produce = (id) => {
    this.setState({
      id,
      quantity: "",
      produce: true,
      update: false,
      sell: false,
    });
  };

  sellProduct = (id) => {
    this.setState({
      id,
      sell: true,
      update: false,
      produce: false,
      name: "",
      quantity: "",
      cost: "",
      summaryCost: "",
    });
  };

  updateRecord = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var body = JSON.stringify({
      name: this.state.name,
      surname: this.state.surname,
      salary: this.state.salary,
    });
    fetch("http://localhost:4000/employee/" + this.state.id, {
      method: "PATCH",
      headers: myHeaders,
      body: body,
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          update: false,
          name: "",
          quantity: "",
          cost: "",
          summaryCost: "",
          id: "",
        });
        this.fetchAllRecords();
      })
      .catch((error) => console.log("error", error));
  };

  cancel = () => {
    this.setState({
      sell: false,
      produce: false,
      update: false,
      name: "",
      quantity: "",
      cost: "",
      summaryCost: "",
      id: "",
    });
  };

  deleteRecord = (id) => {
    fetch("http://localhost:8080/products/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => {
        this.fetchAllRecords();
      })
      .catch((error) => console.log("error", error));
  };

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>quantity</th>
                  <th>price</th>
                  <th colSpan="4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.records.map((record) => {
                  return (
                    <tr>
                      <td>{record.id}</td>
                      <td>{record.name}</td>
                      <td>{record.quantity}</td>
                      <td>{record.cost}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => this.editRecord(record.id, record.name, record.cost)}
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => this.produce(record.id)}
                        >
                          Produce
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => this.sellProduct(record.id)}
                        >
                          Sell
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => this.deleteRecord(record.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>

          {this.state.update ? (
            <Row>
              <Form>
              <p>productId: {this.state.id}</p>
                <FormGroup>
                  <FormLabel>Enter the materialId</FormLabel>
                  <FormControl
                    type="number"
                    name="materialId"
                    placeholder="Enter the materialId"
                    onChange={this.handleChange}
                    value={this.state.materialId}
                  ></FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Enter the quantity</FormLabel>
                  <FormControl
                    type="number"
                    name="quantity"
                    placeholder="Enter the quantity"
                    onChange={this.handleChange}
                    value={this.state.quantity}
                  ></FormControl>
                </FormGroup>
                <br></br>
                <Button onClick={this.addMaterialToProduct}>add Material</Button>{" "}
                <Button onClick={this.cancel}>cancel</Button>
              </Form>
            </Row>
          ) : this.state.sell === true ? (
            <Row>
              <Form>
                <p>id: {this.state.id}</p>
                <FormGroup>
                  <FormLabel>Enter the quantity</FormLabel>
                  <FormControl
                    type="text"
                    name="quantity"
                    placeholder="Enter the cost"
                    onChange={this.handleChangeQuantity}
                    value={this.state.quantity}
                  ></FormControl>
                </FormGroup>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <p>profit: {this.state.summaryCost}</p>
                <br></br>
                <Button onClick={this.updateRecord}>sell</Button>{" "}
                <Button onClick={this.cancel}>cancel</Button>
              </Form>
            </Row>
          ) : this.state.produce === true ? (
            <Row>
              <Form>
                <p>id: {this.state.id}</p>
                <FormGroup>
                  <FormLabel>Enter the quantity</FormLabel>
                  <FormControl
                    type="number"
                    name="quantity"
                    placeholder="Enter the quantity"
                    onChange={this.handleChange}
                    value={this.state.quantity}
                  ></FormControl>
                </FormGroup>
                <br></br>
                <Button onClick={this.produceProduct}>produce</Button>{" "}
                <Button onClick={this.cancel}>cancel</Button>
              </Form>
            </Row>
          ) : (
            <Row>
              <Form>
                <FormGroup>
                  <FormLabel>Enter the name</FormLabel>
                  <FormControl
                    type="text"
                    name="name"
                    placeholder="Enter the name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  ></FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Enter the cost</FormLabel>
                  <FormControl
                    type="text"
                    name="cost"
                    placeholder="Enter the cost"
                    onChange={this.handleChange}
                    value={this.state.cost}
                  ></FormControl>
                </FormGroup>
                <br></br>
                <Button onClick={this.addRecord}>Save</Button>
              </Form>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}
