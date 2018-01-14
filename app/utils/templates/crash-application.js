import createBase from './create-base';
import centeredBox from './centered-box';
import boxTitle from './components/box-title';
import boxSubtitle from './components/box-subtitle';
import primaryButton from './components/primary-button';

export default function crashApplication() {
  const message = `
    ${boxTitle('Oops')}
    ${boxSubtitle('We&#39;ve run into a problem, <br /> please reset the application.')}
    ${primaryButton('Reset', '/home')}
  `;
  const content = centeredBox(message);
  return createBase(content);
}
