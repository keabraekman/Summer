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
import {handleShowTopologyForNode} from './node-details'


export class BreadCrumb extends React.Component{
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

  // clickShowTopologyForNode(topologyId, nodeId) {
  //   console.log('Click Show Topology FOr Node')
  //   return (dispatch, getState) => {
  //     dispatch({
  //       nodeId,
  //       topologyId,
  //       type: ActionTypes.CLICK_SHOW_TOPOLOGY_FOR_NODE
  //     });
  //     updateTopology(dispatch, getState);
  //   };
  // }

  handleShowTopologyForNode = (ev, topologyId, nodeId) => {
    ev.preventDefault();
    console.log('this.props.topId = ', topologyId)
    console.log('this.props.nodeId = ', nodeId)
    this.props.clickShowTopologyForNode(topologyId, nodeId);
    // this.props.clickShowTopologyForNode(topologyId, nodeId);
  }


  // ORIGINAL HANDLECLICK
  // handleClick(ev) {
  //   ev.preventDefault();
  //   trackAnalyticsEvent('scope.node.relative.click', {
  //     topologyId: this.props.topologyId,
  //   });
  //   this.props.dispatch(clickRelative(
  //     this.props.id,
  //     this.props.topologyId,
  //     this.props.label,
  //     this.node.getBoundingClientRect()
  //   ));
  // }

  saveNodeRef(ref) {
    this.node = ref;
  }

  makeBreadcrumb(level){
    if(this.props.details.toList().toJS()[0]){
      if(this.props.details.toList().toJS()[0]['details']){
        if(this.props.details.toList().toJS()[0]['details']['parents']){
          // Keep if we get rid of processes breadcrumb
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
              onClick={ev => this.handleShowTopologyForNode(ev, topologyId, id)}
              >
                <span className = 'level'>Host :    </span> 
              {parents[parents.length-1]['label'].toString()}
              </BreadcrumbItem>
              <BreadcrumbItem className = "breadcrumbitem">
                <span className = 'level'>Pod :       </span>
                {this.getLabel()}
                </BreadcrumbItem>
              </div>
            );
          }
          else if(level == 'containers'){
            let parents = this.props.details.toList().toJS()[0]['details']['parents']
            return(
              <div>
              <BreadcrumbItem 
              className = "breadcrumbitem"
              onClick={ev => this.handleShowTopologyForNode(ev, parents[2]['topologyId'], parents[2]['id'])}
              // onClick={ev => this.handleClick(
              //   ev,
              //   parents[2]['id'], 
              //   parents[2]['topologyId'])}
                ref={this.saveNodeRef}>
                <span className = 'level'>Host:   </span> {this.props.details.toList().toJS()[0]['details']['parents'][2]['label']}
                </BreadcrumbItem>
              <BreadcrumbItem 
              className = "breadcrumbitem"
              onClick={ev => this.handleShowTopologyForNode(ev, parents[1]['topologyId'], parents[1]['id'])}
              // onClick={ev => this.handleClick(
              //   ev,
              //   parents[1]['id'], 
              //   parents[1]['topologyId'])}
                ref={this.saveNodeRef}
              ><span className = 'level'>Pod:   </span> {this.props.details.toList().toJS()[0]['details']['parents'][1]['label']}</BreadcrumbItem>
              <BreadcrumbItem className = "breadcrumbitem">
                <span className = 'level'>Container:   </span>{this.getLabel()}</BreadcrumbItem>
              </div>
            );
          }
          // Commented out because we got rid of processes breadcrumb
          // else if(level == 'processes'){
          //   if(this.props.details.toList().toJS()[0]['details']['parents'][0] && this.props.details.toList().toJS()[0]['details']['parents'][2]){
          //     return(<div>
          //       <BreadcrumbItem className = "breadcrumbitem"><a href=''>{this.props.details.toList().toJS()[0]['details']['parents'][2]['label'].toString()}</a></BreadcrumbItem>
          //       <BreadcrumbItem className = "breadcrumbitem"><a href=''>{this.props.details.toList().toJS()[0]['details']['parents'][1]['label'].toString()}</a></BreadcrumbItem>
          //       <BreadcrumbItem className = "breadcrumbitem" active>{this.getLabel()}</BreadcrumbItem>
          //       </div>)
          //   }
          //   else{
          //     return(
          //       <div>
          //       <BreadcrumbItem className = "breadcrumbitem"><a href=''>{this.props.details.toList().toJS()[0]['details']['parents'][0]['label']}</a></BreadcrumbItem>
          //       <BreadcrumbItem className = "breadcrumbitem" active>{this.getLabel()}</BreadcrumbItem>
          //       </div>
          //     );
          //   }
          // }
        }
        if(level != 'Processes'){
          return(<BreadcrumbItem className = "breadcrumbitem"> <span className = 'level'> Host:   </span>{this.getLabel()}</BreadcrumbItem>)
        }
      }
    }
  }

  render() {
    let label = this.getLabel();
    if(this.props.details.toList().toJS()[0]){
      if(this.props.details.toList().toJS()[0]['details']){
        return (
          <div>
            <Breadcrumb className = "breadcrumb">
              {this.makeBreadcrumb(this.props.details.toList().toJS()[0]['topologyId'])}
            </Breadcrumb>
          </div>
        );
      }
      else{
        return (<Breadcrumb></Breadcrumb>)
      }
    }
    else{
      return (<Breadcrumb></Breadcrumb>)
    }
  }
}

// export default Example;

function mapStatetoProps(state){
    return {
   state: state,
   details : state.get('nodeDetails')
    };
}

export default connect(
 mapStatetoProps,
 { clickRelative, clickShowTopologyForNode }
)(BreadCrumb);