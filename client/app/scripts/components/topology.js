import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { trackAnalyticsEvent } from '../utils/tracking-utils';
import { searchMatchCountByTopologySelector } from '../selectors/search';
import { isResourceViewModeSelector } from '../selectors/topology';
import { clickTopology } from '../actions/app-actions';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { thisExpression } from '@babel/types';




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

    onTopologyClick = (id) => {
        // ev.preventDefault();
        // console.log("PARENT ", topology.get('parentId'))
        // console.log('ID = ', topology.get('id'))
        // console.log("THIS THING ", ev.currentTarget.getAttribute('rel'))
        // this.props.clickTopology(ev.currentTarget.getAttribute('rel'));
        const currentUrl = window.location.href
        const newId = id
        const newUrl = currentUrl.replace(/(topologyId=).*?(&)/,'$1' + newId + '$2');
        console.log("stuff")
        // console.log('ran succesfully',);
      }

    renderSub(sub){
        if(sub.length == 1){
            return(
                <DropdownItem>
                    {sub[0]}
                    </DropdownItem>
            )
        }
        else{
            return(
                <div>
                <DropdownItem>
                    {sub[0]}
                    </DropdownItem>
                <DropdownItem>
                {sub[1]}
                </DropdownItem>
                </div>
            );
        }
    }
  
    render() {
      return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <div
            onClick={this.onTopologyClick(this.props.id)}>
          <DropdownToggle caret>
            {this.props.name}
          </DropdownToggle>
          </div>
          <DropdownMenu>
            {this.renderSub(this.props.sub)}
          </DropdownMenu>
        </Dropdown>
      );
    }
  }