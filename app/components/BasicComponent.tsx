import { withDeterministicId } from "@instructure/ui-react-utils";
import { Component } from "react";

@withDeterministicId()
class BasicComponent extends Component {
  private _defaultId = this.props.deterministicId!();
  get id() {
    return this.props.id || this._defaultId;
  }
  render() {
    return <p id={this.id}>I'm so basic</p>;
  }
}

export default BasicComponent;
