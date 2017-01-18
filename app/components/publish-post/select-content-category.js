import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import style from './select-content-category.scss';

const categories = [
  {
    title: 'Science log',
    className: 'science-log',
    description: 'The science category involves stats and data, historical context and explorers, and overall astronomy.',
    value: 'scienceLog',
  },
  {
    title: 'Art & culture',
    className: 'art',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi esse praesentium quibusdam saepe.',
    value: 'artCulture',
  },
  {
    title: 'Human spirit',
    className: 'spirit',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam obcaecati rem sit tempora?',
    value: 'humanSpirit',
  },
  {
    title: 'diy',
    className: 'diy',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A fuga praesentium repudiandae saepe!',
    value: 'diy',
  },
];

class SelectContentCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };

    this.handleChangeCategoryClick = this.handleChangeCategoryClick.bind(this);
  }

  handleChangeCategoryClick(event, selectedIndex) {
    event.preventDefault();
    this.setState({
      selectedIndex,
    });
    this.props.handleCategoryClick(categories[selectedIndex].value);
  }

  render() {
    const { selectedIndex } = this.state;

    const categoryList = categories.map((category, index) => {
      const categoryClasses = classnames(`category-item ${category.className}`, {
        active: selectedIndex == index,
      });

      return (
        <li
          key={index}
          className={categoryClasses}
          onClick={(event) => { this.handleChangeCategoryClick(event, index); }}
        >
          <h4 className="category-name">{category.title}</h4>
          <p className="category-description">{category.description}</p>
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

SelectContentCategory.propTypes = {
  handleCategoryClick: PropTypes.func.isRequired,
};

export default SelectContentCategory;
