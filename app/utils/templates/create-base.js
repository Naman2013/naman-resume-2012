export default function createPage(content = '') {
  return (`
    <div
      style="
        background: url(https://vega.slooh.com/assets/images/photos/stellar.jpg) no-repeat center center fixed;
        width: 100%;
        height: 100%;
      "
    >
      ${content}
    </div>
  `);
}
