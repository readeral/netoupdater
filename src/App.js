import React, { Component } from "react";
import "./App.css";
import Drop from "./Components/Drop/Drop";
import Console from "./Components/Console/Console";
import Table from "./Components/Table/Table";
import ItemUpdate from "./Components/ItemUpdate";
import ControlPanel from "./Components/ControlPanel/ControlPanel";
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
    this.state = {
      tabled: [],
      console: ["View output information here"],
      keyed: [],
      items: ["SKU", "Reorder Quantity"],
      itemValues: {},
      skus: [],
      json: []
    };
  }

  onParse() {
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
        json: [...previousState.json, eachNewItem],
        skus: [...previousState.skus, value[1].SKU],
        console: [
          ...previousState.console,
          "JSON object created: " + JSON.stringify(eachNewItem)
        ]
      }));
    });
  }

  onPreview() {
    if (this.state.json.length > 0) {
      this.setState(previousState => ({
        console: [
          ...previousState.console,
          "The following will be sent to server: " +
            JSON.stringify(this.state.json)
        ]
      }));
    } else {
      this.setState(previousState => ({
        console: [
          ...previousState.console,
          "No CSV file data has been parsed. Please upload a file and select Create JSON Objects"
        ]
      }));
    }
    console.log(JSON.stringify(this.state.json));
  }

  onClear() {
    this.setState(previousState => ({
      tabled: [],
      console: ["View output information here"],
      keyed: [],
      items: ["SKU", "Reorder Quantity"],
      itemValues: {},
      skus: [],
      json: []
    }));
  }

  onDropped(acceptedFile) {
    this.setState(previousState => ({
      console: [
        ...previousState.console,
        [acceptedFile[0].name] + " successfully uploaded!"
      ]
    }));
    console.log(acceptedFile[0].name + "woo!");
    this.parseFile(acceptedFile);
  }

  onDropRejected(rejectedFile) {
    this.setState(previousState => ({
      console: [
        ...previousState.console,
        [rejectedFile[0].name] + " failed to be uploaded. Incorrect file type."
      ]
    }));
  }

  parseFile(file) {
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
    if (this.state.json.length > 0) {
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
    } else {
      console.log("no values");
      this.setState(previousState => ({
        console: [
          ...previousState.console,
          "No CSV file data has been parsed. Please upload a file and select Create JSON Objects"
        ]
      }));
    }
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
            <Drop
              onDropped={this.onDropped}
              onDropRejected={this.onDropRejected}
              console={this.state.console}
            />
            <Console console={this.state.console} />
            <ControlPanel
              hasdata={this.state.keyed.length}
              onParse={this.onParse}
              onPreview={this.onPreview}
              send={this.send}
              receive={this.receive}
              onClear={this.onClear}
            />
          </div>
          <div id="right">
            <h1>CSV Preview</h1>
            <Table tabled={this.state.tabled} keyed={this.state.keyed} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
