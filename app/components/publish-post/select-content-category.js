import React, { Component, PropTypes } from 'react';
import findIndex from 'lodash/findIndex';
import classnames from 'classnames';
import './select-content-category.scss';

export const categories = [
  {
    contentKey: 'scienceLogText',
    title: 'Science log',
    className: 'science-log',
    value: 'scienceLog',
  },
  {
    contentKey: 'artCultureText',
    title: 'Art & culture',
    className: 'art',
    value: 'artCulture',
  },
  {
    contentKey: 'humanSpiritText',
    title: 'Human spirit',
    className: 'spirit',
    value: 'humanSpirit',
  },
  {
    contentKey: 'diyText',
    title: 'diy',
    className: 'diy',
    value: 'diy',
  },
];

class SelectContentCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      highlightedIndex: 0,
    };

    this.handleChangeCategoryClick = this.handleChangeCategoryClick.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    /**
      when a new truth is passed into the component we need to sync up the
      highlighted and the selected indexs to match the parent expectations
    */
    const { contentCategory } = nextProps;
    const nextSelectedIndex =
      findIndex(categories, category => category.value === contentCategory);

    this.setState({
      selectedIndex: nextSelectedIndex,
      highlightedIndex: nextSelectedIndex,
    });
  }

  getRelevantContentDescription(contentKey) {
    const {
      artCultureText,
      diyText,
      humanSpiritText,
      scienceLogText,
    } = this.props;

    /**
      the api returns individual fields for each of the supported category
      types.  here we match against hard strings to connect the two
    */
    if (contentKey === 'artCultureText') {
      return artCultureText;
    }

    if (contentKey === 'diyText') {
      return diyText;
    }

    if (contentKey === 'humanSpiritText') {
      return humanSpiritText;
    }

    if (contentKey === 'scienceLogText') {
      return scienceLogText;
    }

    return '';
  }

  handleChangeCategoryClick(event, selectedIndex) {
    event.preventDefault();
    this.setState({
      selectedIndex,
    });
    this.props.handleCategoryClick(categories[selectedIndex].value);
  }

  handleMouseEnter(highlightedIndex) {
    this.setState({
      highlightedIndex,
    });
  }

  handleMouseLeave() {
    const { selectedIndex } = this.state;
    this.setState({
      highlightedIndex: selectedIndex,
    });
  }

  render() {
    const { highlightedIndex } = this.state;

    const categoryList = categories.map((category, index) => {
      const categoryClasses = classnames(`category-item ${category.className}`, {
        active: highlightedIndex == index,
      });

      return (
        <li
          key={index}
          className={categoryClasses}
          onMouseEnter={() => { this.handleMouseEnter(index); }}
          onMouseLeave={this.handleMouseLeave}
          onClick={(event) => { this.handleChangeCategoryClick(event, index); }}
        >
          <h4 className="category-name">{category.title}</h4>
          <p className="category-description">{this.getRelevantContentDescription(category.contentKey)}</p>
        </li>
      );
    });

    return (
      <ul className="category-wrapper">
        {categoryList}
      </ul>
    );
  }
}

SelectContentCategory.defaultProps = {
  artCultureText: '',
  diyText: '',
  humanSpiritText: '',
  scienceLogText: '',
};

SelectContentCategory.propTypes = {
  contentCategory: PropTypes.string.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
  artCultureText: PropTypes.string,
  diyText: PropTypes.string,
  humanSpiritText: PropTypes.string,
  scienceLogText: PropTypes.string,
};

export default SelectContentCategory;
