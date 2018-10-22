import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import uniqueId from 'lodash/uniqueId';
import fill from 'lodash/fill';
import ShowMoreFullSet from '../../app/components/common/ShowMoreFullSet';

const allComments = fill(Array(10), { id: uniqueId() });

class Mock extends Component {
  state = {
    comments: allComments,
    displayedSet: [allComments[0]],
    page: 1,
    count: 1,
  };

  handle = (updatedDataSet, newPage) => {
    this.setState({
      page: newPage,
      displayedSet: updatedDataSet,
    });
  }

  render() {
    const {
      comments,
      displayedSet,
      page,
      count,
    } = this.state;
    return (<div>
      {displayedSet.map((item, idx) => <div>{`id: ${idx + 1}`}</div>)}
      <ShowMoreFullSet
        handleShowMore={this.handle}
        fullDataSet={comments}
        count={count}
        totalCount={comments.length}
        page={page}
        idField="id"
      />
    </div>)
  }
}

storiesOf('ShowMoreFullSet', module)
  .add('Renders a button that reveals more items in a list', () => (
    <Mock />
  ));
