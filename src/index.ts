import {
  commands,
  ConfigurationChangeEvent,
  ExtensionContext,
  window,
  workspace,
} from 'vscode';

import generateSnippets from './helpers/generateSnippets';
import snippetSearch from './helpers/snippetSearch';
import generatedSnippets from './snippets/generated.json';

const showRestartMessage = async ({
  affectsConfiguration,// 检查给定的部分是否更改
}: ConfigurationChangeEvent) => {
  if (affectsConfiguration('reactSnippets')) {
    await generateSnippets();
    setTimeout(() => {
      window
        .showWarningMessage(
          'React Snippets: Please restart VS Code to apply snippet formatting changes',
          'Restart VS Code',
          'Ignore',
        )
        .then((action?: string) => {
          if (action === 'Restart VS Code') {
            commands.executeCommand('workbench.action.reloadWindow');
          }
        });
    }, 1000);
  }
};
// 激活此扩展并返回他的公共api
export async function activate(context: ExtensionContext) {
  // 配置更改的时候给出提示
  workspace.onDidChangeConfiguration(showRestartMessage);
  if (JSON.stringify(generatedSnippets).length < 10) {
    await generateSnippets(); //组合snippets文件没有生成，则重新生成
  }
  // 注册插件指令
  const snippetSearchCommand = commands.registerCommand(
    'reactSnippets.search',
    snippetSearch,
  );

  context.subscriptions.push(snippetSearchCommand);
}

export function deactivate() {}
