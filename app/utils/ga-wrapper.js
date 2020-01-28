/**
  a simple wrapper against the ga global to add any required
  defensive code to the application
*/

export default function firePageview({ location }) {
  if (typeof ga === 'undefined') { console.log("GA Undefined!"); return; }

  ga('send', {
    hitType: 'pageview',
    location,
  });
}
