import superagent from 'superagent-use';
import prefix from 'superagent-prefix';
import promise from 'superagent-promise-plugin';

superagent.use(prefix('https://saturn.slooh.com:444'));
superagent.use(promise);

export default superagent;
