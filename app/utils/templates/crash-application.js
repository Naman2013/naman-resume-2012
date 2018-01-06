import createBase from './create-base';

export default function crashApplication() {
  const content = `
    <h1>CRASHED!</h1>
  `;
  return createBase(content);
}
