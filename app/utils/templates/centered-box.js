export default function centeredBox(content = '') {
  return (`
    <div
      style="
        padding-top: 50px;
      "
    >

      <div
        style="
          background: url(https://vega.slooh.com/assets/icons/header/Slooh_Logo_White_5.svg) no-repeat center center;
          width: 218px;
          height: 65px;
          margin: 0 auto;
          background-size: 155px;
          background-position: 65px 25px;
        "
      ></div>

      <div
        style="
          width:33%;
          padding: 50px;
          margin: 0 auto;
          text-align: center;
        "
      >
        ${content}
      </div>

    </div>
  `);
}
