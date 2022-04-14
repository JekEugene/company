import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "../header/header";
import { CompanyServiceProvider } from "../company-service-context/company-service-context";
import { EmployeePage, MaterialPage, ProductPage, HomePage } from "../pages";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      alertMsg: "",
      alertType: "",
      balance: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount = async () => {
    try {
      const res = await fetch("http://localhost:4000/account/balance", {
        method: "GET",
      });
      const result = await res.json();
      this.setState({
        balance: result.money,
      });
    } catch (err) {
      console.log(err);
    }
  };

  paySalary = async () => {
    console.log("here");
    await fetch("http://localhost:4000/employee/paysalary", {
      method: "PATCH",
    });
    const res = await fetch("http://localhost:4000/account/balance", {
      method: "GET",
    });
    const result = await res.json();
    this.setState({
      balance: result.money,
    });
  };

  render() {
    return (
      <CompanyServiceProvider value={this.state.companyService}>
        <Router>
          <div className="container">
            <Header balance={this.state.balance} />
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route
                path="/employee"
                exact
                element={<EmployeePage paySalary={() => this.paySalary()} />}
              />
              <Route
                path="/product"
                exact
                element={<ProductPage />}
              />
              <Route
                path="/material"
                exact
                element={<MaterialPage />}
              />

              <Route render={() => <h2>Page not found</h2>} />
            </Routes>
          </div>
        </Router>
      </CompanyServiceProvider>
    );
  }
}
