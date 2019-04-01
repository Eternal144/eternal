var mysql = require('mysql');
var config = require('../config/default.js')

var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE,
  port     : config.database.PORT
});

//第一个参数是执行参数
//第二个参数是需要post到数据库的值
let query = ( sql, values ) => {
//连接到数据库进行查询
  return new Promise(( resolve, reject ) => {
    pool.getConnection( (err, connection) => {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}


// let query = function( sql, values ) {
// pool.getConnection(function(err, connection) {
//   // 使用连接
//   connection.query( sql,values, function(err, rows) {
//     // 使用连接执行查询
//     console.log(rows)
//     connection.release();
//     //连接不再使用，返回到连接池
//   });
// });
// }

let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     pass VARCHAR(100) NOT NULL COMMENT '密码',
     PRIMARY KEY ( id )
    );`


let todos = 
      `create table if not exists todos(
        tid INT NOT NULL AUTO_INCREMENT,
        fromUid VARCHAR(100) NOT NULL COMMENT '发送者',
        toUid VARCHAR(100) NOT NULL COMMENT '接收者',
        moment VARCHAR(100) NOT NULL COMMENT '发送时间',
        PRIMARY KEY ( tid )
      );`

      
// let posts =
//     `create table if not exists posts(
//      id INT NOT NULL AUTO_INCREMENT,
//      name VARCHAR(100) NOT NULL COMMENT '文章作者',
//      title TEXT(0) NOT NULL COMMENT '评论题目',
//      content TEXT(0) NOT NULL COMMENT '评论内容',
//      md TEXT(0) NOT NULL COMMENT 'markdown',
//      uid VARCHAR(40) NOT NULL COMMENT '用户id',
//      moment VARCHAR(100) NOT NULL COMMENT '发表时间',
//      comments VARCHAR(200) NOT NULL DEFAULT '0' COMMENT '文章评论数',
//      pv VARCHAR(40) NOT NULL DEFAULT '0' COMMENT '浏览量',
//      avator VARCHAR(100) NOT NULL COMMENT '用户头像',
//      PRIMARY KEY(id)
//     );`


let createTable = ( sql ) => {
  return query( sql, [] )
}

// 建表
createTable(users)
createTable(todos)
// createTable(posts)


// 注册用户
exports.insertData = ( value ) => {
  let _sql = "insert into users set name=?,pass=?"
  return query( _sql, value )
}
// 通过名字查找用户
exports.findDataByName =  ( name ) => {
  let _sql = `select * from users where name="${name}";`
  return query( _sql)
}
// 通过名字查找用户数量判断是否已经存在
exports.findDataCountByName =  ( name ) => {
  let _sql = `select count(*) as count from users where name="${name}";`
  console.log(_sql)
  return query( _sql)
}
// 通过文章的名字查找用户
exports.findDataByUser =  ( name ) => {
  let _sql = `select * from posts where name="${name}";`
  return query( _sql)
}



