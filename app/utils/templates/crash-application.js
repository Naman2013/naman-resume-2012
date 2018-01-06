import createBase from './create-base';
import centeredBox from './centered-box';
import boxTitle from './components/box-title';

export default function crashApplication() {
  const message = `
    ${boxTitle('Oops')}
  `;
  const content = centeredBox(message);
  return createBase(content);
}
