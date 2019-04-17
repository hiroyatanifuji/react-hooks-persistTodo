## React-hooks-todoApp
React Hooksを使用したTodoアプリケーションです。通常のTodo管理に加えて、ボタン一つでWebSocketによるリアルタイムシェアやTwitterシェアすることができます。タイムライン上では仲間のTodoをご覧になることができます。ブラウザのタブを二つ用意し、Todoを送信いただくとリアルタイムで受信されるのを確認することができます。

## ソフトウェア構成
```
`react: 16.8.6,`
`react-dom: 16.8.6,`
`react-redux: 6.0.1,`
`react-scripts: 2.1.8,`
`redux: 4.0.1,`
`@material-ui/core: 3.9.3,`
`@material-ui/icons: 3.0.2,`
`classnames: 2.2.6,`
`prop-types: 15.7.2,`
`express: 4.16.4,`
`react-share: 2.4.0,（Social Share用ライブラリ）`
`concurrently: 4.1.0,（npmコマンドを同時に実行するためのライブラリ）`
`socket.io-client: 2.2.0,（Web Socketのためのフロント側のライブラリ）`
`socket.io: 2.2.0（Web Socketのためのサーバー側のライブラリ）`
```


## セットアップ方法
`   git clone git@github.com:hiroyatanifuji/react-hooks-todoApp.git  
    cd react-hooks-todoApp  
    npm install  
    cd client  
    npm install  
    cd ..  
    npm run dev  
`

## 機能
-　ToDoフィルタリング  
　ToDoを全て/未完了/完了でフィルタリング管理  
-　ToDoの削除  
　間違って追加してしまったToDoの削除機能  
-　Todoのリアルタイムシェア、Twitterシェア  
    コミュニティーにシェアすることで、モチベーションアップやTodoに強制力を持たせて生産性をあげるための機能

