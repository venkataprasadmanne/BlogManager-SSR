import React, { Component } from "react";
import RichTextEditor from "react-rte";
import PropTypes from "prop-types";

/* class MyStatefulEditor extends Component {
  state = {
    // value: RichTextEditor.createEmptyValue()
  };

  onChange = value => {
    console.log("change in rte", value)
    this.props.onChangeRTE(value);
  };

  render() {
    const { value } = this.props;
    return <RichTextEditor value={value} onChange={this.onChange} />;
  }
}

MyStatefulEditor.propTypes = {
  onChangeRTE: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default MyStatefulEditor; */

function MyStatefulEditor(props) {
  const { value, onChangeRTE } = props;
  return <RichTextEditor value={value} onChange={onChangeRTE} />;
}

MyStatefulEditor.propTypes = {
  onChangeRTE: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default MyStatefulEditor;
