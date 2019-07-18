import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { statement } from '@babel/template';
import { clickNode } from '../actions/app-actions';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

export class BreadCrumb extends React.Component{
  getLabel(){
    if(this.props.details.toList().toJS()[0]){
      if(this.props.details.toList().toJS()[0]['details']){
        // console.log(this.props.details.toList().toJS()[0]['details']['label'])
        return (this.props.details.toList().toJS()[0]['details']['label'])
      }
    }
  }

  makeBreadcrumb(level){
    if(this.props.details.toList().toJS()[0]){
      if(this.props.details.toList().toJS()[0]['details']){
        if(this.props.details.toList().toJS()[0]['details']['parents']){
          console.log(this.props.details.toList().toJS()[0]['details']['parents'])
          // the host is the last element in the array
          if(level == 'pods'){
            return(
              <div>
              <BreadcrumbItem className = "breadcrumbitem"><a href=''>{this.props.details.toList().toJS()[0]['details']['parents'][
                this.props.details.toList().toJS()[0]['details']['parents'].length-1
              ]['label'].toString()}</a></BreadcrumbItem>
              <BreadcrumbItem className = "breadcrumbitem" active>{this.getLabel()}</BreadcrumbItem>
              </div>
            );
          }
          else if(level == 'containers'){
            return(
              <div>
              <BreadcrumbItem className = "breadcrumbitem"><a href=''>{this.props.details.toList().toJS()[0]['details']['parents'][2]['label']}</a></BreadcrumbItem>
              <BreadcrumbItem className = "breadcrumbitem"><a href=''>{this.props.details.toList().toJS()[0]['details']['parents'][1]['label']}</a></BreadcrumbItem>
              <BreadcrumbItem className = "breadcrumbitem" active>{this.getLabel()}</BreadcrumbItem>
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
          return(<BreadcrumbItem className = "breadcrumbitem">{this.getLabel()}</BreadcrumbItem>)
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
 { clickNode }
)(BreadCrumb);