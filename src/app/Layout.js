import React, { Component } from "react";

export default class Layout extends Component {
  render() {
    return <div className="layout_background">{this.props.children}</div>;
  }
}
