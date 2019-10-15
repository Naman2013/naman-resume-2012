import * as React from 'react'; // import * as React and use it as React.<any>
import './index.scss'; // keep import styles at the end
import { ClassComp } from '../class-comp';

// name types like <component-name>Props
type FuncComponentProps = {
  title: string;
};

export const FuncComponent: React.FC<FuncComponentProps> = props => {
  // use destruction
  const { title } = props;

  return (
    <>
      <h1>Func Comp</h1>
      <h2>{title}</h2>
      <ClassComp title="A title" />
    </>
  );
};
