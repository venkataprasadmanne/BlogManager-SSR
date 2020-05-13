import React from "react";
import RichTextEditor from "react-rte";
import PropTypes from "prop-types";

function MyStatefulEditor(props) {
  const { value, onChangeRTE } = props;
  return <RichTextEditor value={value} onChange={onChangeRTE} />;
}

MyStatefulEditor.propTypes = {
  onChangeRTE: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default MyStatefulEditor;
