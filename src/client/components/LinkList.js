
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, List, Transition } from 'semantic-ui-react'

import './LinkList.css';

const mapStateToProps = (state) => {
  return { urls: state.urls }
}

class LinkList extends React.Component {

  elapsed = (start) => {
    var result = '';
    var millis = Date.now() - start;
    var seconds = millis / 1000;
    if (seconds < 60) {
      return "just now";
    } else {
      var minutes = seconds / 60; 
      if (minutes < 60) {
        result = `${Math.floor(minutes)} minutes ago`
      } else {
        var hours = minutes / 60;
        if (hours < 24) {
          result = `${Math.floor(hours)} hours ago"`
        } else {
          var days = hours / 24;
          result = `${Math.floor(days)} days ago`
        }
      }
    }
    return result;
  }

  render() {
    return (
      <div className="list-container">
        <Transition.Group as={List} duration={200} size="large" divided relaxed="very" verticalAlign='middle'>
          { this.props.urls.map((item) => 
            <List.Item key={item.shorturl}>
              <List.Content>
                <List.Header as='a' href={item.shorturl} target='_blank'>{item.shorturl}</List.Header>
                <List.Description>{this.elapsed(item.created)}</List.Description>
              </List.Content>
            </List.Item>
          )}
        </Transition.Group>
      </div>
    );
  }
}

LinkList.propTypes = {
  urls: PropTypes.array.isRequired,
};

const ConnectedList = connect(mapStateToProps)(LinkList);
export default ConnectedList;