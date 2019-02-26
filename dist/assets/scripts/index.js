console.log(1);

// CSR 客户端渲染 传统方式取数据操作 DOM
fetch('/test').then(res => {
  return res.json();
  // return res;
}).then(res => {
  console.log('fetch data: \n', res);
  // document.getElementById('app').innerHTML = res.data
})