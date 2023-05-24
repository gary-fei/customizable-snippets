import { workspace } from 'vscode';

export type ExtensionSettings = {
  languageScopes: string;
  prettierEnabled: boolean;
  importReactOnTop: boolean;
  typescript: boolean;
  typescriptPropsStatePrefix: 'type' | 'interface';
};
/** 获取当前插件在vscode中的配置 **/ 
const extensionConfig = () =>
  workspace.getConfiguration(
    'reactSnippets.settings',
  ) as unknown as ExtensionSettings;

export default extensionConfig;
