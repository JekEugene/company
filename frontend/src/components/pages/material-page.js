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

export default class MaterialPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: "",
      cost: "",
      summaryCost: "",
      id: "",
      records: [
        { id: 1, name: "iron", quantity: 20, cost: 14 },
        { id: 2, name: "wood", quantity: 45, cost: 8 },
      ],
      update: false,
      buy: false,
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

  // componentWillMount() {
  //   this.fetchAllRecords();
  // }

  // add a record
  addRecord = () => {
    if (!this.state.name || !this.state.surname || !this.state.salary) {
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      name: this.state.name,
      surname: this.state.surname,
      salary: +this.state.salary,
    });
    fetch("http://localhost:4000/employee", {
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
    fetch("http://localhost:4000/employee", {
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

  editRecord = (id, name, cost) => {
    // fetch("http://localhost:4000/employee/" + id, {
    //   method: "GET",
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     this.setState({
    //       id: id,
    //       name: result.name,
    //       surname: result.surname,
    //       salary: result.salary,
    //       update: true,
    //       buy: false
    //     });
    //   })
    //   .catch((error) => console.log("error", error));
    this.setState({
      id,
      name,
      cost,
      update: true,
      buy: false,
    });
  };

  buyMaterial = (id) => {
    this.setState({
      id,
      buy: true,
      update: false,
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

  cancelUpdate = () => {
    this.setState({
      update: false,
      name: '',
      quantity: '',
      cost: '',
      summaryCost: '',
      id: '',
    });
  };

  cancelBuy = () => {
    this.setState({
      buy: false,
      name: '',
      quantity: '',
      cost: '',
      summaryCost: '',
      id: '',
    });
  };

  deleteRecord = (id) => {
    fetch("http://localhost:4000/employee/" + id, {
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
                  <th>costPerMaterial</th>
                  <th colSpan="3">Actions</th>
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
                          onClick={() => this.editRecord(record.id)}
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => this.buyMaterial(record.id)}
                        >
                          Buy
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
                <Button onClick={this.updateRecord}>update</Button>{" "}
                <Button onClick={this.cancelUpdate}>отменить</Button>
              </Form>
            </Row>
          ) : this.state.buy === true ? (
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
                <p>summary cost: {this.state.summaryCost}</p>
                <br></br>
                <Button onClick={this.updateRecord}>buy</Button>{" "}
                <Button onClick={this.cancelBuy}>отменить</Button>
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
