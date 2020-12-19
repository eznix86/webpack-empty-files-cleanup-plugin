import { validate } from 'schema-utils';
const chalk = require('chalk');
const fs = require('fs');

const schema = {
    "type": "object",
    "properties": {
      "dry": {
        "type": "boolean",
        "default": false,
        "description": "will dry-run without performing the removal of empty files"
      },
      "verbose": {
        "type": "boolean",
        "default": false,
        "description": "will be verbose"
      }
    },
    "additionalProperties": false
  }
const configuration = { name: 'WebpackEmptyFilesCleanUp' };

class WebpackEmptyFilesCleanUpPlugin {
    constructor(options) {
        validate(schema, options, configuration)
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tap('WebpackEmptyFilesCleanUpPlugin', (stats) => {
            for (let asset in stats.compilation.assets) {
                let assetPath = `${stats.compilation.outputOptions.path}/${asset}`
                let file = stats.compilation.assets[asset];
                let emptyAsset = stats.compilation.assets[asset].size() === 0;
                let exists = fs.existsSync(assetPath);
                if (exists && emptyAsset) {
                    if (!this.options.dry) {
                        fs.unlinkSync(assetPath);
                    }

                    if (this.options.verbose) {
                        console.log (chalk.bold('\n[webpack-empty-files-cleanup-plugin]'), 'asset', chalk.green(chalk.bold(asset)), chalk.red(chalk.bold(`removed due to ${file.size()} bytes\n`)))
                    }
                }
            }
        });
    }
}


module.exports = WebpackEmptyFilesCleanUpPlugin;