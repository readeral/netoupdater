import React, { Component } from "react";
import "./App.css";
import "./flip.css";
import "./elevation.css";
import "./button.css";
import Drop from "./Components/Drop/Drop";
import Console from "./Components/Console/Console";
import Table from "./Components/Table/Table";
import ItemUpdate from "./Components/ItemUpdate";
import Parameters from "./Components/Parameters/Parameters";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
import MethodToggle from "./Components/MethodToggle/MethodToggle";
import MetaControls from "./Components/MetaControls/MetaControls";
import Papa from "papaparse";

class App extends Component {
  constructor(props) {
    super(props);
    this.onParse = this.onParse.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onDropped = this.onDropped.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.parseFile = this.parseFile.bind(this);
    this.send = this.send.bind(this);
    this.receive = this.receive.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.switchState = this.switchState.bind(this);
    this.handleAbout = this.handleAbout.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.state = {
      tabled: [],
      switch: false,
      console: ["Ready for document submission"],
      keyed: [],
      items: ["SKU", "Reorder Quantity"],
      itemValues: {},
      skus: [],
      json: [],
      files: [],
      submitted: false,
      waiting: { a: false, b: false },
      url: "",
      api: "",
      string: "Reorder Quantity",
      method: "increment",
      valueMethod: "increment",
      active: true
    };
  }

  writeConsole(value) {
    this.setState(previousState => ({
      console: [...previousState.console, value]
    }));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    if (name === "string") {
      this.setState({
        items: ["SKU", value]
      });
    }
  }

  onParse(data) {
    console.log(data);
    var collection = data.map(obj => {
      return Object.keys(obj)
        .filter(key => {
          return this.state.items.includes(key);
        })
        .map(key => {
          return { [key]: obj[key] };
        });
    });
    collection.forEach((value, index) => {
      if (value[0][this.state.string] !== "0") {
        var eachNewItem = new ItemUpdate(
          value[1].SKU,
          value[0][this.state.string],
          this.state.valueMethod
        );
        console.log(eachNewItem);
        this.setState(previousState => ({
          json: [...previousState.json, eachNewItem],
          skus: [...previousState.skus, value[1].SKU],
          console: [
            ...previousState.console,
            "JSON object created: " + JSON.stringify(eachNewItem)
          ]
        }));
      } else {
        this.writeConsole(
          "Item " +
            (index + 1) +
            " with SKU " +
            value[1].SKU +
            " skipped, reorder QTY is 0."
        );
      }
    });
    this.setState(previousState => ({
      submitted: true
    }));
  }

  onPreview() {
    if (this.state.json.length > 0) {
      this.writeConsole(
        "The following will be sent to server: " +
          JSON.stringify(this.state.json)
      );
    } else {
      this.writeConsole(
        "No CSV file data has been parsed. Please submit a file before attempting update."
      );
    }
    console.log(JSON.stringify(this.state.json));
    console.log(this.state.valueMethod);
  }

  onClear() {
    this.setState(previousState => ({
      tabled: [],
      console: ["Ready for document submission"],
      keyed: [],
      items: ["SKU", this.state.string],
      itemValues: {},
      skus: [],
      json: [],
      files: [],
      valueMethod: this.state.method,
      submitted: false,
      waiting: { a: false, b: false }
    }));
  }

  onDropped(acceptedFile) {
    if (!this.state.files.includes(acceptedFile[0].name)) {
      this.parseFile(acceptedFile)
        .then(response => {
          this.writeConsole(
            [acceptedFile[0].name] + " successfully submitted!"
          );
        })
        .then(response => {
          this.setState(previousState => ({
            files: [...previousState.files, acceptedFile[0].name]
          }));
          console.log(this.state.files);
        })
        .catch(response => {
          this.writeConsole(
            [acceptedFile[0].name] + " failed to be submitted."
          );
          console.log(response);
        });
    } else {
      this.writeConsole(
        [acceptedFile[0].name] +
          " appears already to exist. Please submit a new file, or ensure all files are uniquely named."
      );
    }
  }

  onDropRejected(rejectedFile) {
    this.writeConsole(
      [rejectedFile[0].name] + " failed to be submitted. Incorrect file type."
    );
  }

  parseFile(file) {
    Papa.parse(file[0], {
      header: true,
      complete: results => {
        this.data = [results.data];
        if (this.state.string in results.data[0]) {
          this.setState(
            {
              keyed: results.data
            },
            this.onParse(results.data)
          );
        } else {
          this.writeConsole(
            [file[0].name] +
              " does not include the specified quantity header. No JSON entries have been created for this file."
          );
        }
      }
    });
    return new Promise(resolve => {
      Papa.parse(file[0], {
        header: false,
        complete: results => {
          this.setState(previousState => ({
            tabled: [...previousState.tabled, results.data]
          }));
          console.log(this.state.tabled);
        }
      });
      resolve();
    });
  }

  send() {
    if (this.state.json.length > 0) {
      this.setState({ waiting: { a: true } });
      var a = this;
      fetch(
        "https://cors-anywhere.herokuapp.com/" +
          "https://www." +
          this.state.url +
          "/do/WS/NetoAPI",
        {
          method: "POST",
          headers: {
            NETOAPI_ACTION: "UpdateItem",
            NETOAPI_KEY: this.state.api,
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
          a.writeConsole(
            "Data has been sent to server and updated successfully."
          );
          a.writeConsole(
            "The following items were updated: " +
              json.Item
                .map(item => {
                  return item.SKU;
                })
                .join(", ")
          );
          console.log("parsed json", json);
        })
        .then(function(response) {
          a.setState({ waiting: { a: false } });
        })
        .catch(function(ex) {
          console.log("parsing failed", ex);
        });
    } else {
      console.log("no values");
      this.writeConsole(
        "No CSV file data has been parsed. Please submit a file before attempting update."
      );
    }
  }

  receive() {
    if (this.state.json.length > 0) {
      this.setState({ waiting: { b: true } });
      var a = this;
      fetch(
        "https://cors-anywhere.herokuapp.com/" +
          "https://www." +
          this.state.url +
          "/do/WS/NetoAPI",
        {
          method: "POST",
          headers: {
            NETOAPI_ACTION: "GetItem",
            NETOAPI_KEY: this.state.api,
            Accept: "application/json"
          },
          body: JSON.stringify({
            Filter: {
              SKU: this.state.skus,
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
          a.writeConsole(
            "Data retrieved: " +
              json.Item
                .map(item => {
                  let entry =
                    "[" +
                    item.SKU +
                    " - " +
                    item.WarehouseQuantity.Quantity +
                    "]";
                  return entry;
                })
                .join(", ")
          );
        })
        .then(function(response) {
          a.setState({ waiting: { b: false } });
        })
        .catch(function(ex) {
          console.log("parsing failed", ex);
        });
    } else {
      console.log("no values");
      this.writeConsole(
        "SKU values are required for retrieval. Please submit a file before attempting to retrieve existing stock levels."
      );
    }
  }

  handleChange(option) {
    this.setState(previousState => ({
      valueMethod: option
    }));
  }

  handleButtonState(key, value) {
    this.setState(previousState => ({
      [key]: value
    }));
  }

  handleType(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleClear(event) {
    this.setState({ console: ["Ready for document submission"] });
  }

  handleAbout() {
    this.writeConsole(
      "Created by Alan Reader (github.com/readeral) of Jetblack Espresso (jetblackespresso.com.au) for Neto API integration testing"
    );
  }

  switchState() {
    this.setState({
      switch: !this.state.switch,
      active: !this.state.active
    });
  }

  render() {
    return (
      <div className="Home-body">
        <div id="left">
          <h1>Neto API stock updater</h1>
          <div className="top">
            <div className="leftSub">
              <Drop
                onDropped={this.onDropped}
                onDropRejected={this.onDropRejected}
                console={this.state.console}
              />
              <MethodToggle
                valueMethod={this.state.valueMethod}
                handleChange={this.handleChange}
                active={this.state.active}
              />
            </div>
            <ControlPanel
              onParse={this.onParse}
              onPreview={this.onPreview}
              send={this.send}
              receive={this.receive}
              inputValue={this.state.inputValue}
              handleType={this.handleType}
              waiting={this.state.waiting}
              hasdata={this.state.keyed.length}
              onClear={this.onClear}
              active={this.state.active}
            />
          </div>
          <MetaControls
            switch={this.state.switch}
            switchState={this.switchState}
            handleAbout={this.handleAbout}
            handleClear={this.handleClear}
            active={this.state.active}
            class="mobile"
          />
          <div
            className={
              this.state.switch === true
                ? "hover flip-container"
                : "flip-container"
            }
          >
            <div className="flipper">
              <div className="front">
                <Console console={this.state.console} />
              </div>
              <div className="back">
                <Parameters
                  handleInputChange={this.handleInputChange}
                  url={this.state.url}
                  api={this.state.api}
                  string={this.state.string}
                  method={this.state.method}
                  value={this.state.items}
                />
              </div>
            </div>
          </div>
          <MetaControls
            switch={this.state.switch}
            switchState={this.switchState}
            handleAbout={this.handleAbout}
            handleClear={this.handleClear}
            active={this.state.active}
            writeConsole={this.writeConsole}
            class="desktop"
          />
        </div>
        <div id="right">
          <h2>CSV Preview</h2>
          <Table tabled={this.state.tabled} />

        </div>
      </div>
    );
  }
}

export default App;
