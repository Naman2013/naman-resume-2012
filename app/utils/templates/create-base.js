export default function createPage(content = '') {
  return (`
    <div
      style="
        background: url(https://vega.slooh.com/assets/images/photos/stellar.jpg) no-repeat center center fixed;
        background-size: cover;
        width: 100vw;
        height: 100vh;
      "
    >
      ${content}
    </div>
  `);
}
