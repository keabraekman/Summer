import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { statement } from '@babel/template';
import { clickNode } from '../actions/app-actions';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

export class BreadCrumb extends React.Component{
  getLabel(){
    const details = this.props.details.toList().toJS()[0]
    if(details){
      if(details['details']){
        return (details['details']['label'])
      }
    }
  }

  makeBreadcrumb(level){
    const details = this.props.details.toList().toJS()[0]
    if(details){
      if(details['details']){
        if(details['details']['parents']){
          // the host is the last element in the array
          if(level == 'pods'){
            const parentsIndex = details['details']['parents'].length-1
            return(
              <div>
              <BreadcrumbItem className = "breadcrumbitem"><a href=''>{details['details']['parents'][
                parentsIndex
              ]['label'].toString()}</a></BreadcrumbItem>
              <BreadcrumbItem className = "breadcrumbitem" active>{this.getLabel()}</BreadcrumbItem>
              </div>
            );
          }
          else if(level == 'containers'){
            return(
              <div>
              <BreadcrumbItem className = "breadcrumbitem"><a href=''>{details['details']['parents'][2]['label']}</a></BreadcrumbItem>
              <BreadcrumbItem className = "breadcrumbitem"><a href=''>{details['details']['parents'][1]['label']}</a></BreadcrumbItem>
              <BreadcrumbItem className = "breadcrumbitem" active>{this.getLabel()}</BreadcrumbItem>
              </div>
            );
          }
          else if(level == 'processes'){
            if(details['details']['parents'][0] && details['details']['parents'][2]){
              return(<div>
                <BreadcrumbItem className = "breadcrumbitem"><a href=''>{details['details']['parents'][2]['label'].toString()}</a></BreadcrumbItem>
                <BreadcrumbItem className = "breadcrumbitem"><a href=''>{details['details']['parents'][1]['label'].toString()}</a></BreadcrumbItem>
                <BreadcrumbItem className = "breadcrumbitem" active>{this.getLabel()}</BreadcrumbItem>
                </div>)
            }
            else{
              return(
                <div>
                <BreadcrumbItem className = "breadcrumbitem"><a href=''>{details['details']['parents'][0]['label']}</a></BreadcrumbItem>
                <BreadcrumbItem className = "breadcrumbitem" active>{this.getLabel()}</BreadcrumbItem>
                </div>
              );
            }
          }
        }
        else{
          return(<BreadcrumbItem className = "breadcrumbitem">{this.getLabel()}</BreadcrumbItem>)
        }
      }
    }
  }

  render() {
    const details = this.props.details.toList().toJS()[0]
    let label = this.getLabel();
    if(details){
      if(details['details']){
        return (
          <div>
            <Breadcrumb className = "breadcrumb">
              {this.makeBreadcrumb(details['topologyId'])}
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
 { clickNode }
)(BreadCrumb);