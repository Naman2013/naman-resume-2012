import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectContentCategory } from '../../modules/community-content/publish-post';
import style from './select-content-category.scss';

const categories = [
  {
    title: 'Science log',
    className: 'science-log',
    description: 'The science category involves stats and data, historical context and explorers, and overall astronomy.'
  },
  {
    title: 'Art & culture',
    className: 'art',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi esse praesentium quibusdam saepe.'
  },
  {
    title: 'Human spirit',
    className: 'spirit',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam obcaecati rem sit tempora?'
  },
  {
    title: 'diy',
    className: 'diy',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A fuga praesentium repudiandae saepe!'
  },
];

const mapStateToProps = ({publishPost}) => ({
  ...publishPost
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    selectContentCategory
  }, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
class SelectContentCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.setCategory = this.setCategory.bind(this);
  }

  setCategory(category) {
    this.props.actions.selectContentCategory(category);
  }

  render() {
    const categoryList = categories.map((category, key) => {
      return (
        <li
          key={key}
          onClick={() => this.setCategory(category.title)}
          className={`category-item ${category.className} ${category.title === this.props.selectedCategory ? 'active' : ''}`}
        >
          <h4 className="category-name">{category.title}</h4>
          <p className="category-description">{category.description}</p>
        </li>
      )
    });

    return (
      <ul className="category-wrapper">
        {categoryList}
      </ul>
    )
  }
}

export default SelectContentCategory;
