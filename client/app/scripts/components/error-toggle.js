import React from 'react';
import { Badge, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {changeVisibility, getNumErrors} from './error-bar';

export default class ErrorToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => (
            {isToggleOn: !state.isToggleOn}
        ));

        changeVisibility();
    }

  render() {
    return (
      <div>
        <Button onClick={this.handleClick} className={(this.state.isToggleOn && getNumErrors() > 0) ? 'err-toggle err-toggle-open' : 'err-toggle err-toggle-closed'} color="danger" outline>
          <Badge color="danger">{getNumErrors()}</Badge> Alerts 
        </Button>
      </div>
    );
  }
}