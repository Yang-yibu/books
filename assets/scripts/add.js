
// 使用 Vue 渲染
// var app6 = new Vue({
  // el: '#app-6',
  // data: {
    // message : 'Hello Vue'
  // }
// })

// 使用 JQuery
class Create {
  constructor() {
    this.btn = $('#js-btn')
  }

  fn() {
    this.btn.click(function () {
      alert(1);
      console.log(1)
    })
  }
}

// const s = new Create();
// s.fn();
export default Create;