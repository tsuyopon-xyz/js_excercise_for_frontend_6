// グローバル空間に変数や関数をセットしないために即時関数で閉じ込めている
(() => {
  // - 入力したTodoタスクの一覧を保持する配列を定義する
  //   - 変数名は `todos` とする
const todos = [];
  // - HTMLのID値を使って以下のDOM要素を取得する
  //   - テキストボックス(input[type="text"])
  //   - 追加ボタン(button要素)
  //   - Todoリストを一覧表示するul要素
const inputbox = document.getElementById("input-todo-box");
const addbutton = document.getElementById("add-button");
const todolist = document.getElementById("todo-list");



  // `pickupTodoFromTextBox関数` を実装する
  // - 実現したい機能
  //   - `input[type="text"]`から文字列を取得する
  //   - 文字列を取得した後は`input[type="text"]`を空にする
  // - 引数
  //   - 無し
  // - 戻り値
  //   - `input[type="text"]`から取得した文字列を返す

const pickupTodoFromTextBox = () =>{
  const todo = inputbox.value;
  inputbox.value = '';
  return todo;
};



  // `validateTodo関数` を実装する
  // - 実現したい機能
  //   - テキストが空の時は「何も入力されていません」という文字列をErrorオブジェクトにセットして例外として投げる
  //   - 既に同名のタスクがある場合は「同じ名前のタスクは既に作成されています」という文字列をErrorオブジェクトにセットして例外として投げる
  // - 引数
  //   - todo : 文字列を受け取る。
  // - 戻り値
  //   - 引数で受け取ったtodoをそのまま返す

  const validateTodo = (todo) =>{
    if(todo == null){
      throw new Error('何も入力されていません');
    }
    const todovalidate = todos.filter((_todo)=>{
      return todo === _todo;
    })
    if(todovalidate.length > 0){
      throw new Error('同じ名前のタスクは既に作成されています');
    }
    return todo;
  };

  // `addTodo関数` を実装する
  // - 実現したい機能
  //   - 引数に受け取ったTodoを配列todosに追加する
  // - 引数
  //   - todo
  // - 戻り値
  //   - 無し

const addTodo = (todo) =>{
  todos = todo.push;
};

  // `showTodos関数` を実装する
  // - 実現したい機能
  //   - Todoタスクの一覧を表示している要素を全削除する
  //   - 全削除後、todosに格納されているタスク一覧を表示する
  //   - 各タスクの右に削除ボタンを配置する
  //   - 削除ボタンをクリックしたら後述の「promiseTaskOfDeletingTodo関数」実行する
  // - 引数
  //   - 無し
  // - 戻り値
  //   - 無し

  const showTodos = () => {
    while(todolist.firstChild){
      todolist.removeChild(todolist.firstChild);
    };

    todos.forEach((todo,index) => {
      newtodolist = document.createElement('li')
      tasknumber = index + 1;
      
      newtodolist.textContent(tasknumber + ':' + todo);
      newtodolist.appendChild(todos);

      const deletebotton = document.createElement("button");
      deletebotton.textContent("削除");
      newtodolist.appendChild('deletebotton');
      deletebotton.addEventListener('click',(event) => {
        //eventにはbutton要素のDOM情報が格納されている
        promiseTaskOfDeletingTodo(index);
      })
    })
  };


  // `deleteTodo関数` を実装する
  // - 実現したい機能
  //   - 配列todosから対応するtodo情報を削除する
  // - 引数
  //   - index : 配列から削除したい要素のインデックス番号

  const deleteTodo = (index) => {
    todos.splice(index,1)
    //index番目から1つ削除
  };

  
  // `promiseTaskOfAddingTodo関数を実装する`
  // - 実現したい機能
  //   - Promiseを使って以下のフローを実現する
  //     - Promise.resolveメソッドでPromiseオブジェクトを作成する
  //     - Promiseのthenにここまでに実装した関数をセットする。(メソッドチェーンの形式実装する)
  //       - 関数をセットする順番は以下の通り
  //         ①. `input[type="text"]` を取得する関数
  //         ②. ①で取得した文字列が配列todosに追加しても良いか事前に検証する関数
  //         ③. ②の検証を通過したタスクを配列todosに追加する関数
  //         ④. ③で配列todosにタスクを追加した後にWebページ上にタスク一覧を表示する関数
  //     - ②の検証で例外が発生したときに、Promiseのcatchを使ってエラーオブジェクトを受け取りメッセージ内容をアラート表示する
  // - 引数
  //   - 無し
  // - 戻り値
  //   - 無し

  const promiseTaskOfAddingTodo = () =>{
    Promise
    .resolve()
    .then(pickupTodoFromTextBox)
    .then(validateTodo)
    .then(addTodo)
    .then(showTodos)
    .catch(error => {
      alert(error.message);
    })
  };

  // `promiseTaskOfDeletingTodo関数を実装する`
  // - 実現したい機能
  //   - Promiseを使って以下のフローを実現する
  //     - Promise.resolveメソッドでPromiseオブジェクトを作成する。その際にresolveに引数indexを渡す
  //     - Promiseのthenにここまでに実装した関数をセットする(メソッドチェーンの形式実装する)
  //       - 関数をセットする順番は以下の通り
  //         ①. 配列todosから指定した要素を削除する関数
  //         ②. ①で配列todosから指定したタスクを削除した後にWebページ上にタスク一覧を表示する関数
  // - 引数
  //   - index : 配列から削除したい要素のインデックス番号
  // - 戻り値
  //   - 無し
  const promiseTaskOfDeletingTodo = (index) => {
    Promise
    .resolve(index)
    .then(deleteTodo)
    .then(showTodos);
  };

  // 追加ボタンをクリックしたら `promiseTaskOfAddingTodo` を実行する
addbutton.addEventListener('click', () =>{
 promiseTaskOfAddingTodo()
})
})();
