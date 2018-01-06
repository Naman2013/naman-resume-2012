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
          background-size: 155px;
          background-position: 65px 25px;
          width: 218px;
          height: 65px;
          margin: 0 auto;
          margin-bottom: 80px;
        "
      ></div>

      <div
        style="
          background-color: rgba(0, 0, 0, 0.5);
          width: 448px;
          padding: 100px;
          margin: 0 auto;
          text-align: center;
          border-radius: 5px;
        "
      >
        ${content}
      </div>

    </div>
  `);
}
