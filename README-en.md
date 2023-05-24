
# VS Code React snippets

custom code snippets  in ES7+ with Babel plugin features for [VS Code](https://code.visualstudio.com/)

## Installation

### Visual Studio Marketplace

Launch _Quick Open_:

- [_Linux_](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf): `Ctrl+P`
- [_macOS_](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf): `⌘P`
- [_Windows_](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf): `Ctrl+P`

<br>

### Customizable template 
- Customizable json is dynamically obtained through [default url](https://gary-fei.github.io/css/json/test.json)
- The remoteUrl can be repaired by vscode settings("reactSnippets.settings.remoteUrl")

## Options

From version 5 extension provides options to customize the behavior of the snippets:

|           Option | Description                                                                  |
| ---------------: | ---------------------------------------------------------------------------- |
|        remoteUrl | custome snippets json by request remoteUrl                                   |
|   languageScopes | list of supported languages / files recognition                              |
|  prettierEnabled | determines if snippets should be parsed with project prettier config         |
| importReactOnTop | If disabled, snippets won't contain `import React` on top. React 17+ support |
|       typescript | adds additional typescript snippets                                          |

## [Snippets](./docs/Snippets.md)

