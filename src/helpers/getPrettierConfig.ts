import prettier, { Options } from 'prettier';

import extensionConfig from './extensionConfig';

let prettierConfig: prettier.Options | null;
prettier
  .resolveConfig('', { editorconfig: true })
  .then((config) => (prettierConfig = config));

  /** 获取vscode中 prettier项的配置, 没有的话则解析项目中的.editorconfig读取其中的配置*/ 
const getPrettierConfig = (): Options => {
  const { prettierEnabled } = extensionConfig();

  return {
    parser: 'typescript',
    ...(prettierEnabled && prettierConfig),
  };
};

export default getPrettierConfig;
