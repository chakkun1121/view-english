# 和訳表示サイト4.0.0
! 今までのコードは使い回さない
## 仕様
本体はタブの機能のみと拡張機能の追加を可能にする。和訳ファイルの処理も拡張機能に任せる(もちろんヘルプページも)
準備が整い次第githubに投げ込む
## 標準拡張機能
### tabメゾット
|関数、変数|内容|return|
|:--|:--|:--|
|new(title,HTMLdata,position)|新しいタブを開きます|number(新しいタブのID)|
|close(tabID)|指定されたタブを閉じます。|undefined| 
|changeTabOrder(TabInfoArrey)|指定された並び順にタブを並び替えます。|undefined|
|view(TabID)|指定されたタブを表示します。|undefined|
|viewHTMLcontent(tabID,HTMLcontent)|htmlコンテンツを変更します。|undefined|
### wayakuファイル操作関連
wayakuメゾット内の関数、変数(和訳ファイル操作拡張機能(デフォルト(ないと大変なので最初に入れておく))内に内蔵)
|関数、変数|内容|return|
|:--|:--|:--|
|htmlToWayaku(HTMLdata)|.html->.wayaku|wayakuData|
|wayakuToArray(stringWayakuData)|和訳ファイルから配列に変換|Array(arrayWayakuData)|
|arrayToWayaku(arrayWayakuData)|配列から和訳ファイルに変換|string(stringWayakuData)|
|arrayToViewHTML(arrayWayakuData)|配列から表示用のHTMLに変換|string(viewHTMLwayakuData)|
|viewHTMLtoArray(viewHTMLwayakuData)|表示用のHTMLから配列に変換(編集後の保存時はこれを必ずやること)|Array(arrayWayakuData)|
|textToArray(title,data)|タイトルと改行、タブで別れているtextをArrayへ変換します。|Array(arrayWayakuData)
|arrayToText(arrayWayakuData)|arrayWayakuDataからtitle,本文データ(改行で分割済み)を出力します。|\[title,data]
|openWayakuFile(callback)|和訳ファイルを開きます。(読み込み完了時に第一引数にstringWayakuData、第2引数にfileTitleを入れて発火します。複数ファイルが来たらそれぞれで発火します。非同期処理です。)|undefined|
|isWayakuTitle(title)|拡張子が.wayakuかを確認します。|true or false|
<!-- |isWayakuData(string)|和訳ファイルかを判定します|true or false| -->

<!-- ### HTMLリクエスト関連(これも面倒とともにセキュリティの面から必ずこちらを使用すること)
HTMLrequestメゾット内
|関数、変数|内容|return|
|:--|:--|:--|
|request(get or post,url,callback)|指定したURLにgetかpostします。|undefined (callback関数内に第1引数に成功時のみサイトの内容,第2引数にhttpステータスを渡す)| -->
### 和訳ファイルの表示切替(拡張機能が使うことはあるのか?)
|関数、変数|内容|返り値|
|:--|:--|:--|
|changeStyle()|スタイルを変更します。|undefined|
|changeStyleAsColor(enColor,jaColor)|指定した色に変更します。|undefined|
### その他イベント関連
ターゲットは \<div id="appEvent">
|イベント名|内容|
|:--|:--|
|init|すべての拡張機能が準備完了したときに発火します。|
|
### 諸注意
それぞれのscriptの準備が完了したら、 finishedScriptNumber を1増やしてください。忘れると本体が読み込み終わりません。
