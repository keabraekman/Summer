import React from 'react';
import { Badge, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ErrorToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

  render() {
    return (
      <div>
        <Button onClick={this.handleClick} className="err-toggle" color="danger" outline>
          {this.state.isToggleOn ? 'Hide Errors' : 'Show Errors'} <Badge color="danger">4</Badge>
        </Button>
      </div>
    );
  }
}