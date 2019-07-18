import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { statement } from '@babel/template';
import { clickNode } from '../actions/app-actions';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { clickRelative } from '../actions/app-actions';
import { trackAnalyticsEvent } from '../utils/tracking-utils';
import MatchedText from './matched-text';

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
    // trackAnalyticsEvent('scope.node.relative.click', {
    //   topologyId: this.props.topologyId,
    // });
    this.props.clickRelative(
      id,
      topologyId,
      // label
      // this.props.id,
      // this.props.topologyId,
      // this.props.label,
      // this.node.getBoundingClientRect()
    );
  }

  saveNodeRef(ref) {
    this.node = ref;
  }

  makeBreadcrumb(level){
    if(this.props.details.toList().toJS()[0]){
      if(this.props.details.toList().toJS()[0]['details']){
        if(this.props.details.toList().toJS()[0]['details']['parents']){
          // the host is the last element in the array
          if(level == 'pods'){
            let parents = this.props.details.toList().toJS()[0]['details']['parents']
            let id = parents[parents.length-1]['id']
            let topologyId = parents[parents.length-1]['topologyId']
            return(
              <div>
              <BreadcrumbItem className = "breadcrumbitem"
              onClick={ev => this.handleClick(ev, id, topologyId)}
              >Host: {parents[parents.length-1]['label'].toString()}</BreadcrumbItem>
              <BreadcrumbItem className = "breadcrumbitem" active>Active Pod: {this.getLabel()}</BreadcrumbItem>
              </div>
            );
          }
          else if(level == 'containers'){
            let parents = this.props.details.toList().toJS()[0]['details']['parents']
            return(
              <div>
              <BreadcrumbItem 
              className = "breadcrumbitem"
              onClick={ev => this.handleClick(
                ev,
                parents[2]['id'], 
                parents[2]['topologyId'])}
                ref={this.saveNodeRef}>
                Host: {this.props.details.toList().toJS()[0]['details']['parents'][2]['label']}
                </BreadcrumbItem>
              <BreadcrumbItem 
              className = "breadcrumbitem"
              onClick={ev => this.handleClick(
                ev,
                parents[1]['id'], 
                parents[1]['topologyId'])}
                ref={this.saveNodeRef}
              >Pod: {this.props.details.toList().toJS()[0]['details']['parents'][1]['label']}</BreadcrumbItem>
              <BreadcrumbItem className = "breadcrumbitem" active>Active Container: {this.getLabel()}</BreadcrumbItem>
              </div>
            );
          }
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
        else{
          return(<BreadcrumbItem className = "breadcrumbitem">Active: {this.getLabel()}</BreadcrumbItem>)
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
 { clickRelative }
)(BreadCrumb);