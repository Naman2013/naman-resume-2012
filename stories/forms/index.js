import React from 'react';
import { storiesOf } from '@storybook/react';
import BarHeader from '../../app/components/common/form-sections/bar-header';
import IntroText from '../../app/components/common/form-sections/intro-text';
import SectionHeader from '../../app/components/common/form-sections/section-header';
import SelectList from '../../app/components/common/form-sections/select-list';

let selectListValue = '';
const handleSelectListChange = (event) => {
  const { value } = event.target;
  selectListValue = value;
};

const SELECT_LIST_OPTIONS = [
  {
    label: 'Apple',
    value: 'apple',
  },
  {
    label: 'Banana',
    value: 'banana',
  },
  {
    label: 'Orange',
    value: 'orange',
  },
  {
    label: 'Blueberry',
    value: 'blueberry',
  },
  {
    label: 'Avocado',
    value: 'avo',
  },
];
const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed erat tincidunt, commodo nisi non, rhoncus ex. Sed vitae pellentesque metus, quis finibus est. Aliquam erat volutpat. Cras efficitur porttitor bibendum. Suspendisse aliquet volutpat ultricies. Aliquam a quam iaculis, placerat odio at, congue elit. Mauris ligula nibh, pharetra ut lacinia eget, pellentesque ut ex. Donec pharetra lacus arcu, sit amet gravida nisi pharetra non. Proin quis magna a tortor iaculis fermentum ac quis mauris. Maecenas quis ultrices enim. Nulla cursus mauris ipsum, non semper dolor viverra suscipit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus efficitur, lorem a volutpat blandit, risus sapien interdum est, vitae hendrerit sem velit eget arcu. Vestibulum ac libero urna. Curabitur lacinia dictum lobortis. Praesent eu sem blandit, sodales risus a, posuere lorem.`;
storiesOf('Form Components', module)
  .add('Bar Header', () => (
    <BarHeader title="Submit a Story" />
  ))
  .add('IntroText', () => (
    <IntroText desc={lorem} />
  ))
  .add('SectionHeader', () => (
    <SectionHeader title="Title!" desc="With an optional desc" />
  ))
  .add('SelectList', () => (
    <SelectList
      handleSelectChange={handleSelectListChange}
      options={SELECT_LIST_OPTIONS}
      selectedValue={selectListValue}
      name="story-object-categories"
    />
  ));
