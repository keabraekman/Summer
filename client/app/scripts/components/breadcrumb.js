import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { statement } from '@babel/template';
import { clickNode } from '../actions/app-actions';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { clickRelative } from '../actions/app-actions';
import { trackAnalyticsEvent } from '../utils/tracking-utils';
import MatchedText from './matched-text';
import {clickShowTopologyForNode} from '../actions/app-actions';
import ActionTypes from '../constants/action-types';
import {handleShowTopologyForNode} from './node-details';
import {getTopoFromId, getLabelAndParentsFromId, getNodeDetails} from '../utils/web-api-utils';
import { clickTopology } from '../actions/app-actions';
import { onTopologyClick} from './topologies'

// import {handleShowTopologyForNode} from '../actions/app-actions'

export class BreadCrumb extends React.Component{

  returnLabel = (label) => {
    return label;
  }

  getLabel(){
    if(this.props.details.toList().toJS()[0]){
      if(this.props.details.toList().toJS()[0]['details']){
        // console.log(this.props.details.toList().toJS()[0]['details']['label'])
        return (this.props.details.toList().toJS()[0]['details']['label'])
      }
    }
  }

  handleClick(ev, id, topologyId) {
    ev.preventDefault();
    this.props.clickRelative(
      id,
      topologyId,
    );
  }

  handleShowTopologyForNode = (ev, topologyId, nodeId) => {
    // console.log("WORKS")
    ev.preventDefault();
    this.props.clickShowTopologyForNode(topologyId, nodeId);
  }

  saveNodeRef(ref) {
    this.node = ref;
  }

  makeBreadcrumb(level){
    if(this.props.details.toList().toJS()[0]){
      if(this.props.details.toList().toJS()[0]['details']){
        if(this.props.details.toList().toJS()[0]['details']['parents']){
          if(level == 'processes'){
            return null;
          }
          // the host is the last element in the array
          else if(level == 'pods'){
            let parents = this.props.details.toList().toJS()[0]['details']['parents']
            let id = parents[parents.length-1]['id']
            let topologyId = parents[parents.length-1]['topologyId']
            return(
              <div>
              <BreadcrumbItem className = "breadcrumbitem"
              // onClick={ev => this.handleClick(ev,id, topologyId)}
              // onClick={ev => this.handleShowTopologyForNode(ev, getTopoFromId(parents[parents.length-1]['id']), parents[parents.length-1]['id'])}
              // onClick={ev => this.handleShowTopologyForNode(ev, topologyId, id)}
              >
                <span className = 'level'>Host:    </span>
              {parents[parents.length-1]['label'].toString()}
              </BreadcrumbItem>
              <BreadcrumbItem className = "breadcrumbitem">
                <b>
                <span className = 'level'>Pod:       </span>
                {this.getLabel()}
                </b>
                </BreadcrumbItem>
              </div>
            );
          }
          else if(level == 'containers' && this.props.details.toList().toJS()[0]['details']['parents'][2]){
            let parents = this.props.details.toList().toJS()[0]['details']['parents']
            return(
              <div>
              <BreadcrumbItem 
              className = "breadcrumbitem"
              // onClick={ev => this.handleShowTopologyForNode(ev)}
                ref={this.saveNodeRef}>
                <span className = 'level'>Host:   </span> {this.props.details.toList().toJS()[0]['details']['parents'][2]['label']}
                </BreadcrumbItem>
              <BreadcrumbItem 
              className = "breadcrumbitem"
              // onClick={ev => this.handleShowTopologyForNode(ev)}
                ref={this.saveNodeRef}>
                <span className = 'level'>Pod:   </span> {this.props.details.toList().toJS()[0]['details']['parents'][1]['label']}</BreadcrumbItem>
              <BreadcrumbItem className = "breadcrumbitem">
                <b>
                <span className = 'level'>Container:   </span>{this.getLabel()}
                </b></BreadcrumbItem>
              </div>
            );
          }
        }
        if(level != 'Processes'){
          return(<BreadcrumbItem className = "breadcrumbitem"
          // onClick={ev => this.handleShowTopologyForNode(ev, this.props.details.toList().toJS()[0]['topologyId'], this.props.details.toList().toJS()[0]['id'])}
          ><b><span className = 'level'> Host:   </span>{this.getLabel()}</b></BreadcrumbItem>)
        }
      }
    }
  }


  render() {
    let label = this.getLabel();
    // IF A NODE IS SELECTED
    if(this.props.details.toList().toJS()[0]){
      if(this.props.details.toList().toJS()[0]['details']){
        return (
          <div>
            <Breadcrumb className = "breadcrumb">
              {/* {console.log("TOPOLOGYID 1 = ", this.props.details.toList().toJS()[0]['topologyId'])}
              {console.log("TOPOLOGYID 2 = ", getTopoFromId(this.props.details.toList().toJS()[0]['id']))} */}
              {this.makeBreadcrumb(getTopoFromId(this.props.details.toList().toJS()[0]['id']))}
            </Breadcrumb>
          </div>
        );
      }
      else{
        // if(this.props.viewingNodeId){
        // }
        return (<Breadcrumb></Breadcrumb>)
      }
    }
    // VIEWING NODE, NO SELECTED NODE : 
    else{
      if(this.props.viewingNodeId){
        if(getTopoFromId(this.props.viewingNodeId) == 'hosts'){
          console.log("BREADCRUMB TOPOLOGY = ", this.props.topologies.toList().toJS())
          return(
            <Breadcrumb className = "breadcrumb">
            <BreadcrumbItem className = "breadcrumbitem"
            onClick={ev => this.onTopologyClick(ev, this.props.topology)}
            // onClick={ev => this.handleShowTopologyForNode(ev)}
            >
            <b><span className = 'level'> Host:  </span>
            {this.props.breadcrumb[0]}
            </b>
            </BreadcrumbItem>
            </Breadcrumb>
            )
        }
        else if(getTopoFromId(this.props.viewingNodeId) == 'pods' && this.props.breadcrumb[2]["2"]){
          return(
            <Breadcrumb className = "breadcrumb">
            <BreadcrumbItem className = "breadcrumbitem"
            onClick={ev => this.handleShowTopologyForNode(ev, this.props.breadcrumb[2]['2'].topologyId, this.props.breadcrumb[2]['2'].id)}> 
            <span className = 'level'> Host:  </span>
            {this.props.breadcrumb[2]["2"].label}
            {/* {this.props.breadcrumb[1]["0"]} */}
            </BreadcrumbItem>
            <BreadcrumbItem className = "breadcrumbitem"
            // onClick={ev => this.handleShowTopologyForNode(ev, getTopoFromId(this.props.breadcrumb[1]), this.props.breadcrumb[1])}
            > 
            <b><span className = 'level'> Pod:  </span>
            {this.props.breadcrumb[0]}
            </b>
            </BreadcrumbItem>
            </Breadcrumb>
          )
        }
      }
      return (<Breadcrumb></Breadcrumb>)
    }
  }
}

// export default Example;

function mapStatetoProps(state){
    return {
   topologies: state.get('topologies'),
   state: state,
   details : state.get('nodeDetails'),
   viewingNodeId : state.get('viewingNodeId'),
   breadcrumb : state.get('breadcrumb')
    };
}

export default connect(
 mapStatetoProps,
 { clickRelative, 
  clickShowTopologyForNode, 
  handleShowTopologyForNode, 
  getNodeDetails, 
  clickTopology,
  onTopologyClick }
)(BreadCrumb);