import createBase from './create-base';
import centeredBox from './centered-box';
import boxTitle from './components/box-title';
import boxSubtitle from './components/box-subtitle';

export default function crashApplication() {
  const message = `
    ${boxTitle('Oops')}
    ${boxSubtitle('We&#39;ve run into a problem, <br /> please reset the application.')}
  `;
  const content = centeredBox(message);
  return createBase(content);
}
