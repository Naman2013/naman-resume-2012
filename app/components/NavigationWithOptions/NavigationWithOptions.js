// @flow
import React, { memo, useState } from 'react';
import cn from 'classnames';
import Btn from 'app/atoms/Btn';
import './NavigationWithOptions.scss';

type TNavigation = {
  navItems: Array | Object,
};

// TODO: create options logic, work on tablet/mobile versions
export const NavigationWithOptions = memo(function Navigation(
  props: TNavigation
) {
  const { navItems } = props;
  const [activeIndex, handleNavItemClick] = useState(1);

  const generateNavigation = items => {
    return (
      items &&
      items.map((item, i) => (
        <span
          className={cn('navigation-with-options-link', {
            active: activeIndex,
          })}
          key={`${item.linkAction}-${item.linkLabel}`}
          onClick={() => handleNavItemClick(i)}
        >
          {item.linkLabel}
        </span>
      ))
    );
  };

  return (
    <div className="navigation-with-options">
      <div className="navigation-with-options-bar">
        <div className="navigation-with-options-links">
          {generateNavigation(navItems)}
        </div>
        <div className="navigation-with-options-filter">
          <Btn>Options</Btn>
        </div>
      </div>
    </div>
  );
});
