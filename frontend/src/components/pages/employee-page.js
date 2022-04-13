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

export default class EmployeePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      salary: "",
      records: [],
      id: "",
      update: false,
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  componentWillMount() {
    this.fetchAllRecords();
  }

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
          surname: "",
          salary: "",
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

  editRecord = (id) => {
    fetch("http://localhost:4000/employee/" + id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          id: id,
          name: result.name,
          surname: result.surname,
          salary: result.salary,
          update: true,
        });
      })
      .catch((error) => console.log("error", error));
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
          id: "",
          name: "",
          surname: "",
          salary: "",
        });
        this.fetchAllRecords();
      })
      .catch((error) => console.log("error", error));
  };

  cancelUpdate = () => {
    this.setState({
      update: false,
      name: "",
      surname: "",
      salary: "",
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
                  <th>surname</th>
                  <th>salary</th>
                  <th colSpan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.records.map((record) => {
                  return (
                    <tr>
                      <td>{record.id}</td>
                      <td>{record.name}</td>
                      <td>{record.surname}</td>
                      <td>{record.salary}</td>
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

          {/* Insert Form */}
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
                <FormLabel>Enter the surname</FormLabel>
                <FormControl
                  type="text"
                  name="surname"
                  placeholder="Enter the surname"
                  onChange={this.handleChange}
                  value={this.state.surname}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Enter the salary</FormLabel>
                <FormControl
                  type="number"
                  name="salary"
                  onChange={this.handleChange}
                  placeholder="Enter the salary"
                  value={this.state.salary}
                ></FormControl>
              </FormGroup>
              <br></br>
              {this.state.update === true ? (
                <>
                  <Button onClick={this.updateRecord}>update</Button>{" "}
                  <Button onClick={this.cancelUpdate}>отменить</Button>
                </>
              ) : (
                <Button onClick={this.addRecord}>Save</Button>
              )}
            </Form>
          </Row>
          <br></br>
          <hr></hr>
          <br></br>
          <Row>
            <div className="mb-2">
              <p>
                summary salary:{" "}
                {this.state.records.reduce((acc, cur) => {
                  return acc + +cur.salary;
                }, 0)}
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={this.props.paySalary}
              >
                Pay salary
              </Button>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}
