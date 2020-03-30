import React, { Component } from "react";
import RichTextEditor from "react-rte";
import PropTypes from "prop-types";

class MyStatefulEditor extends Component {
  state = {
    value: RichTextEditor.createEmptyValue()
  };

  onChange = value => {
    console.log(value.toString("html"));
    this.setState({ value });
    this.props.onChangeRTE(value);
    console.log(this);
  };

  render() {
    const { value } = this.state;
    return <RichTextEditor value={value} onChange={this.onChange} />;
  }
}

MyStatefulEditor.propTypes = {
  onChangeRTE: PropTypes.func.isRequired
};

export default MyStatefulEditor;
