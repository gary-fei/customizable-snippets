
# 简介

一个支持远程自定义的react代码片段vscode插件 [VS Code](https://code.visualstudio.com/)

## 安装
- 在插件市场搜索garyge-snippets即可安装该插件
- 你可以在[vscode 插件市场中查看](https://marketplace.visualstudio.com/items?itemName=garyge-snippets.garyge-snippets&ssr=false#overview)

### vscode 快捷键查看
- [_Linux_](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf): `Ctrl+P`
- [_macOS_](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf): `⌘P`
- [_Windows_](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf): `Ctrl+P`

<br>

### 自定义模板
- 该模板代码片段除了该插件内置的一些常用的react开发代码片段，还支持连接远程代码片段源
- 默认的是自己设置的[default url](https://gary-fei.github.io/css/json/test.json),你可以在安装插件后在vscode settings配置中修改remoteUrl重定向到你自己的代码片段("reactSnippets.settings.remoteUrl":"your url")

## Options

下面是插件支持的vscode配置项

|              选项 | 描述                                                                  |
| ---------------: | ---------------------------------------------------------------------------- |
|        remoteUrl | 自定义远程json代码片段，要求json类片段满足特定格式如下描述                                   |
|  prettierEnabled | 确定是否应该使用开启prettier的配置来解析片段         |
| importReactOnTop | 如果设置该配置项禁用状态，代码不会在顶部包含 `import React`. |
|       typescript | 添加额外的 typescript代码片段                                          |
### 远程remoteUrl返回的json 格式
```
[
//片段一
 {
    "key": "gary-reactTest",//唯一标识，最好是的唯一的，不然可能会被覆盖不生效
    "prefix": "gary-react",//文件中输入代码简写可触发的代码片段选择
    "body": [//body 代码片段体，$1...等支持光标位置停留，规则跟本地vscode自定义代码片段一致
      "import React from 'react'",
      "const $1='test'"
    ]
  },
  //片段二
 {
  "key": "gary-reactTest2",
    "prefix": "gary-reactTest2",
    "body": [
      "import React from 'react'",
      "const a='test2'"
    ]
  }
]
   
```
## [英文](./README-en.md)
## [内置的模板片段](./docs/Snippets.md)

