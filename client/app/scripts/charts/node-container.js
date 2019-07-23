import React from 'react';
import { connect } from 'react-redux';
import { List as makeList } from 'immutable';
import { GraphNode } from 'weaveworks-ui-components';

import {
  getMetricValue,
  getMetricColor,
} from '../utils/metric-utils';
import { clickNode, enterNode, leaveNode } from '../actions/app-actions';
import { trackAnalyticsEvent } from '../utils/tracking-utils';
import { getNodeColor } from '../utils/color-utils';
import MatchedResults from '../components/matched-results';
import { GRAPH_VIEW_MODE } from '../constants/naming';

import NodeNetworksOverlay from './node-networks-overlay';
import { rgb } from 'polished';

import { ashGetGraphWidth } from './nodes-layout';

var ashColorCode = 0;

class NodeContainer extends React.Component {

  saveRef = (ref) => {
    this.ref = ref;
  };

  handleMouseClick = (nodeId, ev) => {
    ev.stopPropagation();
    trackAnalyticsEvent('scope.node.click', {
      layout: GRAPH_VIEW_MODE,
      parentTopologyId: this.props.currentTopology.get('parentId'),
      topologyId: this.props.currentTopology.get('id'),
    });
    this.props.clickNode(nodeId, this.props.label, this.ref.getBoundingClientRect());
  };

  ashShape(ashShapeString)
  {
    if (ashShapeString === 'square')
    {
      ashColorCode = 1;
    }
    else if (ashShapeString === 'hexagon')
    {
      ashColorCode = 2;
    }
    else if (ashShapeString === 'heptagon')
    {
      ashColorCode = 3;
    }
    else if (ashShapeString === 'circle')
    {
      ashColorCode = 4;
    }

    ashShapeString = 'visualkube';
    return ashShapeString;
  }

  ashColor(rank, label, pseudo)
  {
    // if (ashColorCode === 1)
    // {
    //   return rgb(112, 234, 251);
    // }
    // else if (ashColorCode === 2)
    // {
    //   return rgb(135, 245, 153);
    // }
    // else if (ashColorCode === 3)
    // {
    //   return rgb(173, 206, 255);
    // }
    // else if (ashColorCode === 4)
    // {
    //   return rgb(151, 255, 205);
    // }
    // else {
    //   return rgb(0,0,0);
    // }

    return rgb(177, 156, 217);
  }

  renderPrependedInfo = () => {
    const { showingNetworks, networks } = this.props;
    if (!showingNetworks) return null;

    return (
      <NodeNetworksOverlay networks={networks} />
    );
  };

  renderAppendedInfo = () => {
    const matchedMetadata = this.props.matches.get('metadata', makeList());
    const matchedParents = this.props.matches.get('parents', makeList());
    const matchedDetails = matchedMetadata.concat(matchedParents);
    return (
      <MatchedResults matches={matchedDetails} searchTerms={this.props.searchTerms} />
    );
  };

  render() {
    const {
      rank, label, pseudo, metric, showingNetworks, networks
    } = this.props;
    const { hasMetric, height, formattedValue } = getMetricValue(metric);
    const metricFormattedValue = !pseudo && hasMetric ? formattedValue : '';
    const labelOffset = (showingNetworks && networks) ? 10 : 0;

    return (
      <GraphNode
        id={this.props.id}
        shape={this.ashShape(this.props.shape)}
        tag={this.props.tag}
        label={this.props.label}
        labelMinor={this.props.labelMinor}
        labelOffset={labelOffset}
        stacked={this.props.stacked}
        highlighted={this.props.highlighted}
        color={this.ashColor(rank, label, pseudo)}
        // color={getNodeColor(rank, label, pseudo)}
        size={this.props.size}
        isAnimated={this.props.isAnimated}
        contrastMode={this.props.contrastMode}
        forceSvg={this.props.exportingGraph}
        searchTerms={this.props.searchTerms}
        metricColor={getMetricColor(metric)}
        metricFormattedValue={metricFormattedValue}
        metricNumericValue={height}
        renderPrependedInfo={this.renderPrependedInfo}
        renderAppendedInfo={this.renderAppendedInfo}
        onMouseEnter={this.props.enterNode}
        onMouseLeave={this.props.leaveNode}
        onClick={this.handleMouseClick}
        graphNodeRef={this.saveRef}
        x={this.props.x}
        y={this.props.y}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    contrastMode: state.get('contrastMode'),
    currentTopology: state.get('currentTopology'),
    exportingGraph: state.get('exportingGraph'),
    searchTerms: [state.get('searchQuery')],
    showingNetworks: state.get('showingNetworks'),
    nodeDetails: state.get('nodeDetails'),
  };
}

export default connect(
  mapStateToProps,
  { clickNode, enterNode, leaveNode }
)(NodeContainer);
