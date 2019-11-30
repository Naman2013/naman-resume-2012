import * as React from 'react';

// name types like <component-name>Props
type ClassCompProps = {
  title: string;
};

// name types like <component-name>Props
type ClassCompState = {
  name: string;
};

export class ClassComp extends React.Component<ClassCompProps, ClassCompState> {
  // todo readonly ?
  state: ClassCompState = {
    name: 'test',
  };

  render() {
    // use destruction
    const { title } = this.props;
    const { name } = this.state;

    return (
      <>
        <h1>Class Comp</h1>
        <h2>{title}</h2>
        <h3>{name}</h3>
      </>
    );
  }
}
