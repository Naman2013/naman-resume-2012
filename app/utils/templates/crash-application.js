import createBase from './create-base';
import centeredBox from './centered-box';

export default function crashApplication() {
  const content = centeredBox();
  return createBase(content);
}
