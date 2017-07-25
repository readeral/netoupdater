import React, { Component } from "react";
import Drop from "../../Components/Drop/Drop";
import MethodToggle from "../../Components/MethodToggle/MethodToggle";
import ControlPanel from "../../Components/ControlPanel/ControlPanel";
import MetaControls from "../../Components/MetaControls/MetaControls";
import Console from "../../Components/Console/Console";
import Parameters from "../../Components/Parameters/Parameters";
import "./Left.css";

class Left extends Component {
  constructor(props) {
    super(props);
    this.switchState = this.switchState.bind(this);
    this.state = {
      switch: false
    };
  }

  switchState() {
    this.setState({
      switch: !this.state.switch
    });
  }

  render() {
    return (
      <div id="left">
        <h1>Neto API stock updater</h1>
        <div className="top">
          <div className="leftSub">
            <Drop
              onDropped={this.props.onDropped}
              onDropRejected={this.props.onDropRejected}
              console={this.props.console}
            />
            <MethodToggle
              valueMethod={this.props.valueMethod}
              handleChange={this.props.handleChange}
              switch={this.state.switch}
            />
          </div>
          <ControlPanel
            onParse={this.props.onParse}
            onPreview={this.props.onPreview}
            send={this.props.send}
            receive={this.props.receive}
            inputValue={this.props.inputValue}
            handleType={this.props.handleType}
            waiting={this.props.waiting}
            hasdata={this.props.files.length}
            onClear={this.props.onClear}
            switch={this.state.switch}
          />
        </div>
        <MetaControls
          switch={this.state.switch}
          switchState={this.switchState}
          handleAbout={this.props.handleAbout}
          handleClear={this.props.handleClear}
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
              <Console console={this.props.console} />
            </div>
            <div className="back">
              <Parameters
                handleInputChange={this.props.handleInputChange}
                url={this.props.url}
                api={this.props.api}
                string={this.props.string}
                method={this.props.method}
                value={this.props.items}
              />
            </div>
          </div>
        </div>
        <MetaControls
          switch={this.state.switch}
          switchState={this.switchState}
          handleAbout={this.props.handleAbout}
          handleClear={this.props.handleClear}
          writeConsole={this.props.writeConsole}
          class="desktop"
        />
      </div>
    );
  }
}

export default Left;
