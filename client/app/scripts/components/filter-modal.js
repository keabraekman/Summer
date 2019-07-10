import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import NetworkSelector from './networks-selector';
import Status from './status';
import TopologyOptions from './topology-options';
import Sidebar from './sidebar';

class FilterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const {
      isTableViewMode, isGraphViewMode, isResourceViewMode, showingNetworkSelector,
    } = this.props;

    return (
      <div>
        <Button color="Muted" onClick={this.toggle}>{this.props.buttonLabel}Filter</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><h1 className="ModalHeader">Filters:</h1></ModalHeader>
          <ModalBody>
            <Sidebar classNames={isTableViewMode ? 'sidebar-gridmode' : ''}>
              {showingNetworkSelector && isGraphViewMode && <NetworkSelector />}
              {!isResourceViewMode && <Status />}
              {!isResourceViewMode && <TopologyOptions />}
            </Sidebar>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Set</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default FilterModal;
