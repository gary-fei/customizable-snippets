import { writeFile } from 'fs';
import fetch from 'node-fetch'
import componentsSnippets, {
  ComponentsSnippet,
} from '../sourceSnippets/components';
import consoleSnippets, { ConsoleSnippet } from '../sourceSnippets/console';
import hooksSnippets, { HooksSnippet } from '../sourceSnippets/hooks';
import importsSnippets, { ImportsSnippet } from '../sourceSnippets/imports';
import othersSnippets, { OthersSnippet } from '../sourceSnippets/others';
import propTypesSnippets, {
  PropTypesSnippet,
} from '../sourceSnippets/propTypes';
import reactNativeSnippets, {
  ReactNativeSnippet,
} from '../sourceSnippets/reactNative';
import reduxSnippets, { ReduxSnippet } from '../sourceSnippets/redux';
import testsSnippets, { TestsSnippet } from '../sourceSnippets/tests';
import typescriptSnippets, {
  TypescriptSnippet,
} from '../sourceSnippets/typescript';

import extensionConfig from './extensionConfig';
import parseSnippetToBody from './parseSnippetToBody';
import { replaceSnippetPlaceholders } from './snippetPlaceholders';

export type SnippetKeys =
  | OthersSnippet['key']
  | HooksSnippet['key']
  | ImportsSnippet['key']
  | ReactNativeSnippet['key']
  | TypescriptSnippet['key']
  | ReduxSnippet['key']
  | ComponentsSnippet['key']
  | ConsoleSnippet['key']
  | PropTypesSnippet['key']
  | TestsSnippet['key'];

export type Snippet =
  | OthersSnippet
  | HooksSnippet
  | ImportsSnippet
  | ReactNativeSnippet
  | TypescriptSnippet
  | ReduxSnippet
  | ComponentsSnippet
  | ConsoleSnippet
  | PropTypesSnippet
  | TestsSnippet;

export type Snippets = {
  [key in SnippetKeys]: Snippet;
};

const getNewSnippets = async () => {
  const { typescript, languageScopes,remoteUrl } = extensionConfig();
  // const testObj= await fetch('https://gary-fei.github.io/css/json/test.json', {}).then((res:any) => res.json())
  const testObj= await fetch(remoteUrl, {}).then((res:any) => res.json()).catch((e?:Error)=>{ if (e){return []}})
  const snippets = [
    ...(typescript ? typescriptSnippets : []),
    ...componentsSnippets,
    ...consoleSnippets,
    ...hooksSnippets,
    ...importsSnippets,
    ...propTypesSnippets,
    ...reactNativeSnippets,
    ...reduxSnippets,
    ...testsSnippets,
    ...othersSnippets,
    ...testObj,
  ].reduce((acc, snippet) => {
    acc[snippet.key] = Object.assign(snippet, {
      body: parseSnippetToBody(snippet),
      scope: languageScopes,
    });
    return acc;
  }, {} as Snippets);
  // json序列化后,替换需光标停留的部分代码
  return replaceSnippetPlaceholders(JSON.stringify(snippets, null, 2));
};
/** 将拼接后的代码片段写入到一个文件 */ 
const generateSnippets = () =>
  new Promise((resolve) => {
    // const jsonSnippets = getSnippets();
     getNewSnippets().then((jsonSnippets:any)=>{
     writeFile(
        __dirname + '/../snippets/generated.json',
        jsonSnippets,
        (error) => {
          if (error) {
            console.error(error);
          }
          return resolve(true);
        },
      );
    })
    // .catch(()=>{
    //   resolve(true)
    // });
  
  });

export default generateSnippets;
