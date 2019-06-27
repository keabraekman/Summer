import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { trackAnalyticsEvent } from '../utils/tracking-utils';
import { searchMatchCountByTopologySelector } from '../selectors/search';
import { isResourceViewModeSelector } from '../selectors/topology';
import { clickTopology } from '../actions/app-actions';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



function basicTopologyInfo(topology, searchMatchCount) {
  const info = [
    `Nodes: ${topology.getIn(['stats', 'node_count'])}`,
    `Connections: ${topology.getIn(['stats', 'edge_count'])}`
  ];
  if (searchMatchCount) {
    info.push(`Search Matches: ${searchMatchCount}`);
  }
  return info.join('\n');
}

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const topologyId = topology.get('id');
    const isActive = topology === this.props.currentTopology;
    const searchMatchCount = this.props.searchMatchCountByTopology.get(topology.get('id')) || 0;
    const className = classnames(`tour-step-anchor topologies-item-main topologies-item-${topologyId}`, {
      'topologies-item-main-active': isActive,
      // Don't show matches in the resource view as searching is not supported there yet.
      'topologies-item-main-matched': !this.props.isResourceViewMode && searchMatchCount,
    });
    const title = basicTopologyInfo(topology, searchMatchCount);
    return (
    //     <div className="tour-step-anchor topologies-selector">
    //     {this.props.currentTopology && this.props.topologies.map(t => this.renderTopology(t))}
    //   </div>
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <div
          className={className}
          title={title}
          rel={topologyId}
          onClick={ev => this.onTopologyClick(ev, topology)}>
        <DropdownToggle caret>
        Processes
        </DropdownToggle>
        </div>
        <DropdownMenu>
          <DropdownItem>Default</DropdownItem>
          <DropdownItem>By Name</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
    // <div
    //       className={className}
    //       title={title}
    //       rel={topologyId}
    //       onClick={ev => this.onTopologyClick(ev, topology)}>
    //       <div className="topologies-item-label">
    //         {topology.get('name')}
    //       </div>
    //     </div>
  }
}







