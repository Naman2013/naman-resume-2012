import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import CenterColumn from 'components/common/CenterColumn';
import StoryTile from 'components/common/tiles/story-tile';
import StoryExcerptTile from 'components/common/tiles/story-excerpt-tile';

import style from './stories-tiles.style';

class StoriesTiles extends Component {
  static propTypes = {
    stories: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    })).isRequired,
    isMobile: PropTypes.bool,
  };

  state = {
    activeId: null,
  }

  setActiveTile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { id } = e.currentTarget.dataset;
    const parsedId = Number(id);
    if (this.state.activeId !== parsedId) {
      this.setState(() => ({
        activeId: Number(parsedId),
      }));
    }
  }

  removeActiveTile = (e) => {
    e.preventDefault();
    if (this.state.activeId) {
      this.setState(() => ({
        activeId: null,
      }));
    }
  }


  render() {
    const { stories, isMobile } = this.props;
    const { activeId } = this.state;
    return (
      <CenterColumn widths={['645px', '965px', '965px']}>
        <ul className="story-tiles-root">
          {!isMobile && stories.map(story => (
            <li
              key={uniqueId()}
              className="tile"
              data-id={story.postId}
              onMouseOver={this.setActiveTile}
              onMouseLeave={this.removeActiveTile}
            >
              <div>
                <StoryTile {...story} isMobile={isMobile} photoSize={100} />
              </div>
              <div className={classnames('excerpt', {
                'show-excerpt': activeId === story.postId,
              })}>
                <StoryExcerptTile {...story} />
              </div>
            </li>
          ))}
          {isMobile && stories.map(story => (
            <li
              key={uniqueId()}
              className="tile"
            >
              <StoryTile {...story} isMobile={isMobile} photoSize={50} />
            </li>
          ))}
        </ul>
        <style jsx>{style}</style>
      </CenterColumn>
    );
  }
}

export default StoriesTiles;
