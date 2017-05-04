import React from 'react';
import s from './neoview.scss';

export default function NeoViewDescription() {
  return (
    <div>
      <p className={s.neoviewDescription}>
        <span className={s.neoviewDescriptionHighlight}>What is this?</span> Slooh&apos;s telescopes go through a complex process of taking long exposures through various filters, ultimately combining that data into a single color image stream.  Ever see The Matrix?  Think of this as the &quot;Neo View&quot; as the exposure is being processed.
      </p>
    </div>
  );
}
