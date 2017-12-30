import React from 'react';

function SVGClipView() {
  return (
    <div className="root">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <mask id="hole">
            <rect width="100%" height="100%" fill="white" />
            <circle r="38%" cx="50%" cy="50%" fill="black" />
          </mask>
        </defs>

        <rect id="portal" x="0" y="0" width="100%" height="100%" mask="url(#hole)" />
      </svg>

      <style jsx>{`
        .root {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

export default SVGClipView;
