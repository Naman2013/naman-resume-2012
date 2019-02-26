import React from 'react';
import PropTypes from 'prop-types';
import MultipleChoiceItem from 'components/common/form-fields/multiple-choice-item';
import CircleCharacter from 'components/common/medallions/circle-character';
import styles from './content-category-selector.style';

const ContentCategorySelector = (props) => {
  const {
    selectedContentCategory,
    onSelectContentCategory,
    contentCategories,
    contentCategoriesDescText,
  } = props
  return (
    <div className="root">
      {contentCategories.map((cat, i) => (
        <MultipleChoiceItem
          halfWidth
          isActive={selectedContentCategory === cat.value}
          renderIcon={() => <CircleCharacter size={35} character={cat.title[0]} />}
          title={cat.title}
          onClickItem={onSelectContentCategory}
          value={cat.value}
          status={contentCategoriesDescText[cat.contentKey]}
        />
      ))}
      <style jsx>{styles}</style>
    </div>
  )
}
ContentCategorySelector.propTypes = {
    onSelectContentCategory: PropTypes.func.isRequired,
    contentCategories: PropTypes.arrayOf(PropTypes.shape({})),
}

ContentCategorySelector.defaultProps = {
    contentCategories: [],
}



export default ContentCategorySelector;
