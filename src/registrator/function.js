import {assertDefAndNotNull} from '../assertions';
import {isFunction, isObject} from 'metal';

export default {
  test(filename, module, magnet) {
    return isObject(module.route) && isFunction(module.default);
  },
  register(filename, module, magnet) {
    let path = module.route.path;
    let method = module.route.method || 'get';

    assertDefAndNotNull(path, `Route configuration path must be specified, ` +
      `check ${filename.substring(magnet.getServerDistDirectory().length)}.`);

    let app = magnet.getServer().getEngine();

    app[method.toLowerCase()](path, module.default);
  },
};