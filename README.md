# webpack-empty-files-cleanup-plugin
Webpack plugin for removing empty files, or classified as 0 bytes.


## Usage

```js
const WebpackEmptyFilesCleanUpPlugin = require('webpack-empty-files-cleanup-plugin');
let options = {verbose: true, dry: true}
/* ... */
plugins.push(new WebpackEmptyFilesCleanUpPlugin(options));
```

## Options

An optional parameter, object with properties.

### `verbose` (`boolean`)

When set to `true`, webpack output logs for this package.

### `dry` (`boolean`)

If set to `true`, webpack will not remove generated empty files.
