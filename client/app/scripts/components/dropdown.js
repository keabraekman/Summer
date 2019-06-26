import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import classnames from 'classnames';
import { searchMatchCountByTopologySelector } from '../selectors/search';
import { trackAnalyticsEvent } from '../utils/tracking-utils';
import { isResourceViewModeSelector } from '../selectors/topology';
import { clickTopology } from '../actions/app-actions';

// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  onTopologyClick = (ev, topology) => {
    ev.preventDefault();
    trackAnalyticsEvent('scope.topology.selector.click', {
      parentTopologyId: topology.get('parentId'),
      topologyId: topology.get('id'),
    });
    this.props.topologiesProps.clickTopology(ev.currentTarget.getAttribute('rel'));
  }

  renderSubTopology(subTopology) {
    const topologyId = subTopology.get('id');
    const isActive = subTopology === this.props.currentTopology;
    const searchMatchCount = this.props.searchM.get(topologyId) || 0;
    const title = basicTopologyInfo(subTopology, searchMatchCount);
    const className = classnames(`topologies-sub-item topologies-item-${topologyId}`, {
      'topologies-sub-item-active': isActive,
      // Don't show matches in the resource view as searching is not supported there yet.
      'topologies-sub-item-matched': !this.props.isResourceViewMode && searchMatchCount,
    });
    return (
      <div
        className={className}
        title={title}
        key={topologyId}
        rel={topologyId}
        onClick={ev => this.onTopologyClick(ev, subTopology)}>
        <DropdownItem>{subTopology.get('name')}
          </DropdownItem>>
      </div>
    );
  }
  
  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.props.title.get('name')}
        </DropdownToggle>
        <DropdownMenu>
        <DropdownItem>{this.props.title.get('sub_topologies').map(subTop => this.renderSubTopology(subTop))}
            </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentTopology: state.get('currentTopology'),
    isResourceViewMode: isResourceViewModeSelector(state),
    searchMatchCountByTopology: searchMatchCountByTopologySelector(state),
    topologies: state.get('topologies'),
  };
}
