import { readFileSync } from 'fs';
import { SnippetString, window } from 'vscode';

import { parseSnippet } from './formatters';
import { Snippet } from './generateSnippets';
/** 根据输入选择提示的代码段，并且插入到当前页面中 */ 
const snippetSearch = async () => {
  const { showQuickPick, activeTextEditor } = window;

  const snippets = readFileSync(
    __dirname + '/../snippets/generated.json',
    'utf8',
  );

  const snippetsArray = Object.entries(JSON.parse(snippets)) as [
    string,
    Snippet,
  ][];

  const items = snippetsArray.map(
    ([shortDescription, { body, description, prefix: label }]) => ({
      body,
      description: description || shortDescription,
      label,
    }),
  );
  // showQuickPick  在编辑器中，输入指令可以快速打开一个选项输入框，返回选中的选项
  const rawSnippet = await showQuickPick(items, {
    matchOnDescription: true,
    matchOnDetail: true,
    placeHolder: 'Search snippet by prefix or description',
  });

  const body = rawSnippet ? parseSnippet(rawSnippet.body) : '';

  if (activeTextEditor) {
    // 往当前活动的编辑器插入上面选中的代码
    activeTextEditor.insertSnippet(new SnippetString(body));
  }
};

export default snippetSearch;
