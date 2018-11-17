import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class BirdList extends Component {

  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeBird: {
          id: id,
          __typename: 'BirdType',
          likes: likes + 1
        }
      }
    });
  }

  renderBirds() {
    return this.props.birds.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}
          {/*<div className="vote-box">
            <i 
              className="material-icons"
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
      </div>*/}
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <div>
          <h3>Bird List</h3>
        </div>        
        <ul className="collection">
          {this.renderBirds()}
        </ul>
      </div>
    )
  }
}

const mutation = gql`
  mutation LikeBird($id: ID) {
    likeBird(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(BirdList);
