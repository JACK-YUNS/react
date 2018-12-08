// 使用 Mock
import Mock from 'mockjs';
var arr = [
    { name: 'fei', age: 20, id: 1 },
    { name: 'liang', age: 30, id: 2 },
    { name: 'jun', age: 40, id: 3 },
    { name: 'ming', age: 50, id: 4 }
]

/*参数处理*/
function parseQueryStr(queryStr) {
    let queryData = {};

    console.log("queryStr==", queryStr)

    let queryStrList = queryStr.split('&');//去除所有的&连接符
    console.log(queryStrList);

    for (let [index, queryStr] of queryStrList.entries()) {
        let itemList = queryStr.split('=');
        queryData[itemList[0]] = decodeURIComponent(itemList[1]);
    }
    return queryData
}
/*模拟删除数据的方式*/
Mock.mock("http://www.bai.com/delet", "delete", function(options) {
  console.log(options.body.params);
  const datas = parseQueryStr(options.body);
  var id = datas.id;
  var name = datas.name;
  var index;
  for (var i in arr) {
    if (arr[i].id == id || arr[i].name === name) {
      //在数组arr里找到这个id
      console.log(i);
      index = i;
      arr.splice(index, 1); //把这个id对应的对象从数组里删除
    }
  }
  const data = {
    data: arr,
    status: 1,
    message: "删除成功！"
  };
  return data; //返回这个数组,也就是返回处理后的假数据
});

/*模拟添加数据的方式*/
Mock.mock("http://www.bai.com/add", 'post', function (options) {
    console.log(options.body)
    const datas = parseQueryStr(options.body);
    console.log(datas)
    var id = datas.id;
    var ishave = true;
    for (var i in arr) {
        if (arr[i].id == id) {//在数组arr里找到这个id
            ishave = !ishave;
        }
    }
    arr.push(datas);
    data = {
        data: ishave ? arr : null,
        status: 1,
        message: ishave ? "添加成功！" : "数据已存在"
    }
    return data
})
/*模拟查找数据的方式*/
Mock.mock("http://www.bai.com/finds", 'post', function (options) {
    console.log(options.body)
    const datas = parseQueryStr(options.body);
    console.log(datas)
    var id = datas.id;
    var item = {};
    for (var i in arr) {
        if (arr[i].id == id) {//在数组arr里找到这个id
            item = arr[i];
        }
    }
    data = {
        data: item,
        status: 1,
        message: "搜索成功！"
    }
    return data
})
/*模拟修改数据方式*/
Mock.mock("http://www.bai.com/change", 'post', function (options) {
    console.log(options.body)
    const datas = parseQueryStr(options.body);
    console.log(datas)
    var id = datas.id;

    for (var i in arr) {
        if (arr[i].id == id) {//在数组arr里找到这个id
            arr[i] = datas;
        }
    }
    data = {
        data: arr,
        status: 1,
        message: "修改成功！"
    }
    return data
})