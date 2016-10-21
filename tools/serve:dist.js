/**
 * serve:dist脚本
 * @author Joe Zhong <zhong.zhi@163.com>
 * @module tools/serve:dist
 */

import path from 'path';
import Express from 'express';
import urlrewrite from 'packing-urlrewrite';
import packing, { rewriteRules } from '../config/packing';



const { assetsDist, templatesPagesDist, mockPageInit } = packing.path;
const port = packing.port.dist;

const app = new Express();
app.use(Express.static(path.join(__dirname, '..', assetsDist)));
app.use(urlrewrite(packing.rewriteRules));

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
