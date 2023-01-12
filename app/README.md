# 和訳表示サイト 4.0.8

## 仕様

本体はタブの機能のみと拡張機能の追加を可能にする。和訳ファイルの処理も拡張機能に任せる(もちろんヘルプページも)

## 標準拡張機能

### tab メゾット

| 関数,変数                                   | 内容                                                                                                                          | return                  |
| :------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------- | :---------------------- |
| new(title,HTMLdata,position,purpose)        | 新しいタブを開きます                                                                                                          | number(新しいタブの ID) |
| close(tabID)                                | 指定されたタブを閉じます。                                                                                                    | undefined               |
| view(TabID)                                 | 指定されたタブを表示します。                                                                                                  | undefined               |
| HTMLcontent.change(tabID,HTMLcontent,title) | html コンテンツを変更します。                                                                                                 | undefined               |
| HTMLcontent.get(tabID)                      | 今表示中の html コンテンツを取得します。                                                                                      |
| purpose.change(tabID,newPurpose),           | タブの目的[^1]の変更                                                                                                          |
| purpose.get(tabID)                          | 指定された ID のタブの目的を取得                                                                                              | purpose                 |
| title.get(tabID)                            |                                                                                                                               |                         |
| title.change(tabID,newTitle)                |                                                                                                                               |                         |
| openedTab(position="left")                  | 今開いている tabID を表示します。                                                                                             | tabID                   |  |
| save(isNotAdapt[^2])                        |                                                                                                                               |                         |
| newTabData                                  | 新しいタブ用のデータを入れます(tabID は`<tabID/>`としておけば勝手に変換されます)(init をはたかれてから拡張機能で変更できます) |
| tabHTMLdata                                 | タブ部分のhtmlです。(`<tabID/>`はタブIDに`<title/>`はタイトルに変換されます。)(上と同様)                                      |
| adaptationTabInfoToHTML()                   | tabInfo の内容を HTML に適応します。(これ以外のやつは自動変更なし)                                                            |                         |

[^1]newTab,wayakuContent,setting などのタブの使われ方
[^2]これは基本的に false でどうしても変更してはいけないときに true にすることで tabInfo のみ書き換えられる

### wayaku ファイル操作関連(wayaku.js)

wayaku メゾット内の関数、変数(和訳ファイル操作拡張機能(デフォルト(ないと大変なので最初に入れておく))内に内蔵)

| 関数、変数                          | 内容                                                                                                                                                                        | return                     |
| :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------- |
| htmlToWayaku(HTMLdata)              | .html->.wayaku                                                                                                                                                              | wayakuData                 |
| wayakuToArray(stringWayakuData)     | 和訳ファイルから配列に変換                                                                                                                                                  | Array(arrayWayakuData)     |
| arrayToWayaku(arrayWayakuData)      | 配列から和訳ファイルに変換                                                                                                                                                  | string(stringWayakuData)   |
| arrayToViewHTML(arrayWayakuData)    | 配列から表示用の HTML に変換                                                                                                                                                | string(viewHTMLwayakuData) |
| viewHTMLtoArray(viewHTMLwayakuData) | 表示用の HTML から配列に変換(編集後の保存時はこれを必ずやること)                                                                                                            | Array(arrayWayakuData)     |
| textToArray(title,data)             | タイトルと改行、タブで別れている text を Array へ変換します。                                                                                                               | Array(arrayWayakuData)     |
| arrayToText(arrayWayakuData)        | arrayWayakuData から title,本文データ(改行で分割済み)を出力します。                                                                                                         | \[title,data]              |
| openWayakuFile(callback)            | 和訳ファイルを開きます。(読み込み完了時に第一引数に stringWayakuData、第 2 引数に fileTitle を入れて発火します。複数ファイルが来たらそれぞれで発火します。非同期処理です。) | undefined                  |
| isWayakuTitle(title)                | 拡張子が.wayaku かを確認します。                                                                                                                                            | true or false              |

### 和訳ファイルの表示切替(拡張機能が使うことはあるのか?)(script/wayakuStyle.js)

| 関数、変数                          | 内容                     | 返り値    |
| :---------------------------------- | :----------------------- | :-------- |
| changeStyle()                       | スタイルを変更します。   | undefined |
| changeStyleAsColor(enColor,jaColor) | 指定した色に変更します。 | undefined |

### 和訳ファイル編集用(script/wayakuOperation.js)

| 関数、変数                       | 内容                                                                                                                   | 返り値                                                          |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| editWayakuTabData                | 和訳ファイル編集時のスタイルを指定します。(title 部分は`<title/>`,本体部分は`<main/>`としておけば勝手に変換されます。) |
| getEditWayakuTabData(title,main) | 和訳ファイルの編集時のスタイルの変更(拡張機能での書き換え用)                                                           | 和訳ファイル編集用の HTMLdata(必ずこれを返すようにしておくこと) |

### その他イベント関連

ターゲットは `<div id="appEvent">`

| 関数                              | 内容                           | return |
| :-------------------------------- | :----------------------------- | :----- |
| creatEvent(type)                  | イベントを作成し、発火させます |
| creatEventListener(type,callback) | イベントリスナーを作成します   |

| イベント名 | 内容                                             |
| :--------- | :----------------------------------------------- |
| init       | すべての拡張機能が準備完了したときに発火します。 |

### 諸注意

それぞれの script の準備が完了したら、 `finishedScriptNumber` を必ず 1 増やしてください。拡張機能も例外ではありません。忘れると本体が読み込み終わりません。
