import React, { Component } from "react";
import "./App.css";
import Drop from "./Components/Drop/Drop";
import Console from "./Components/Console/Console";
import Table from "./Components/Table/Table";
import ItemUpdate from "./Components/ItemUpdate";
import Papa from "papaparse";

class App extends Component {
  constructor(props) {
    super(props);
    this.onTestButton = this.onTestButton.bind(this);
    this.onResultButton = this.onResultButton.bind(this);
    this.onClearButton = this.onClearButton.bind(this);
    this.onDropped = this.onDropped.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.send = this.send.bind(this);
    this.receive = this.receive.bind(this);
    this.state = {
      tabled: [],
      console: [],
      keyed: [],
      items: ["SKU", "Reorder Quantity"],
      itemValues: {},
      json: []
    };
  }

  onTestButton() {
    var collection = this.state.keyed.map(obj => {
      return Object.keys(obj)
        .filter(key => {
          return this.state.items.includes(key);
        })
        .map(key => {
          return { [key]: obj[key] };
        });
    });
    collection.forEach(value => {
      var eachNewItem = new ItemUpdate(
        value[1].SKU,
        value[0]["Reorder Quantity"]
      );
      console.log(eachNewItem);
      this.setState(previousState => ({
        json: [...previousState.json, eachNewItem]
      }));
    });
  }

  onResultButton() {
    console.log(this.state.json);
    console.log(JSON.stringify(this.state.json));
    console.log(this.state.console);
  }

  onClearButton() {
    this.setState(previousState => ({
      tabled: [],
      console: [],
      keyed: [],
      items: ["SKU", "Reorder Quantity"],
      itemValues: {},
      json: []
    }));
  }

  onDropped(acceptedFile) {
    this.setState(previousState => ({
      console: [...previousState.console, acceptedFile]
    }));
    this.handleFileUpload(acceptedFile);
  }

  onDropRejected(rejectedFile) {
    this.setState(previousState => ({
      console: [...previousState.console, rejectedFile]
    }));
  }

  handleFileUpload(file) {
    Papa.parse(file[0], {
      header: true,
      complete: results => {
        this.setState(previousState => ({
          keyed: results.data
        }));
      }
    });
    Papa.parse(file[0], {
      header: false,
      complete: results => {
        this.setState(previousState => ({
          tabled: results.data
        }));
      }
    });
  }

  send() {
    fetch(
      "https://cors-anywhere.herokuapp.com/" +
        "https://www.jetblackespresso.com.au/do/WS/NetoAPI",
      {
        method: "POST",
        headers: {
          NETOAPI_ACTION: "UpdateItem",
          NETOAPI_KEY: "7cFrlopIR9QC7tBjJOEiE3vbvLjPxJ4m",
          Accept: "application/json"
        },
        body: JSON.stringify({
          Item: this.state.json
        })
      }
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log("parsed json", json);
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  }

  receive() {
    fetch(
      "https://cors-anywhere.herokuapp.com/" +
        "https://www.jetblackespresso.com.au/do/WS/NetoAPI",
      {
        method: "POST",
        headers: {
          NETOAPI_ACTION: "GetItem",
          NETOAPI_KEY: "7cFrlopIR9QC7tBjJOEiE3vbvLjPxJ4m",
          Accept: "application/json"
        },
        body: JSON.stringify({
          Filter: {
            SKU: ["30569", "64494"],
            OutputSelector: "WarehouseQuantity"
          }
        })
      }
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        console.log("parsed json", json.Item);
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  }

  render() {
    return (
      <div className="Home-body">
        <div id="main">
          <div id="left">
            <h1>File upload</h1>
            <h2>Only CSV is accepted</h2>
            <Drop
              onDropped={this.onDropped}
              onDropRejected={this.onDropRejected}
              console={this.state.console}
            />
            <Console console={this.state.console} />
            <div id="control-panel" className="left-box">
              All buttons exist here
              <button onClick={this.send}>Update new values</button>
              <button onClick={this.receive}>Download split CSV</button>
              <button onClick={this.onTestButton}>Test button</button>
              <button onClick={this.onResultButton}>Result button</button>
              <button onClick={this.onClearButton}>CLEAR</button>
            </div>
          </div>
          <div id="right">
            <h1>CSV Preview</h1>
            <h2>Please check details before hitting submit</h2>
            <Table tabled={this.state.tabled} keyed={this.state.keyed} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
