# 前端开发者学习 PHP 指南

如果你是一名前端开发者（熟悉 JavaScript/TypeScript、HTML、CSS），本指南将帮助你快速上手 PHP。

## 快速对比表

| 概念 | JavaScript | PHP | 说明 |
|------|-----------|-----|------|
| 变量声明 | `let x = 1` | `$x = 1` | PHP 变量必须以 `$` 开头 |
| 字符串 | `'text'` 或 `"text"` | `'text'` 或 `"text"` | 双引号支持变量插值 |
| 数组 | `[1, 2, 3]` | `[1, 2, 3]` | 语法相似 |
| 对象 | `{key: 'value'}` | `['key' => 'value']` | PHP 使用关联数组 |
| 函数 | `function name() {}` | `function name() {}` | 语法相似 |
| 类 | `class Name {}` | `class Name {}` | 语法相似 |
| 异步 | `async/await` | 同步（PHP 8.1+ 支持 Fiber） | PHP 传统上是同步的 |
| 包管理 | `npm` | `Composer` | 不同的包管理器 |

## 共同点

### 1. Web 开发经验

作为前端开发者，你已经熟悉：
- **HTTP 协议**：GET、POST 请求
- **HTML/CSS**：页面结构和样式
- **前后端交互**：AJAX、表单提交
- **浏览器调试**：开发者工具

这些知识在 PHP 开发中同样适用！

### 2. 相似的语法

```javascript
// JavaScript
function greet(name) {
    return `Hello, ${name}!`;
}
```

```php
<?php
// PHP
function greet($name) {
    return "Hello, $name!";
}
?>
```

### 3. 数组和对象操作

```javascript
// JavaScript
const users = [{name: 'John', age: 25}];
users.forEach(user => console.log(user.name));
```

```php
<?php
// PHP
$users = [['name' => 'John', 'age' => 25]];
foreach ($users as $user) {
    echo $user['name'];
}
?>
```

## 主要差异

### 1. 执行环境

**JavaScript（前端）：**
- 在浏览器中执行
- 处理用户交互
- 操作 DOM

**PHP：**
- 在服务器上执行
- 处理请求
- 生成 HTML

```javascript
// JavaScript - 客户端
document.getElementById('btn').addEventListener('click', () => {
    fetch('/api/users')
        .then(res => res.json())
        .then(data => console.log(data));
});
```

```php
<?php
// PHP - 服务器端
// 处理 /api/users 请求
$users = [
    ['id' => 1, 'name' => 'John'],
    ['id' => 2, 'name' => 'Jane']
];
header('Content-Type: application/json');
echo json_encode($users);
?>
```

### 2. 变量和作用域

**JavaScript：**
```javascript
let x = 1;  // 块作用域
var y = 2;  // 函数作用域
const z = 3; // 常量
```

**PHP：**
```php
<?php
$x = 1;  // 全局或函数作用域
$y = 2;  // 需要 global 关键字访问全局变量
define('Z', 3); // 常量
?>
```

### 3. 类型系统

**JavaScript：**
- 动态类型
- `typeof` 检查类型
- `===` 严格相等

**PHP：**
- 动态类型（PHP 8.0+ 支持类型声明）
- `gettype()` 检查类型
- `===` 全等（值和类型）

```php
<?php
// PHP 类型声明（PHP 7.0+）
function add(int $a, int $b): int {
    return $a + $b;
}
?>
```

### 4. 异步编程

**JavaScript：**
```javascript
// Promise/async-await
async function fetchData() {
    const response = await fetch('/api/data');
    return await response.json();
}
```

**PHP：**
```php
<?php
// PHP 传统上是同步的
function fetchData() {
    $response = file_get_contents('/api/data');
    return json_decode($response, true);
}

// PHP 8.1+ 支持 Fiber（协程）
use Fiber;
$fiber = new Fiber(function() {
    return fetchData();
});
?>
```

## 快速上手路径

### 第一步：理解服务器端编程

1. **学习 PHP 基础语法** → [语法基础](/guide/syntax)
2. **理解变量和数据类型** → [变量与数据类型](/guide/variables)
3. **掌握控制结构** → [控制结构](/guide/control-structures)

### 第二步：Web 开发核心

1. **HTTP 基础** → [HTTP 基础](/web/http-basics)
2. **请求与响应** → [请求与响应](/web/request-response)
3. **表单处理** → 重点关注 POST 请求处理
4. **JSON API** → [JSON 处理](/web/json)

### 第三步：数据库操作

1. **数据库连接** → [数据库连接](/web/database-connection)
2. **CRUD 操作** → [CRUD 操作](/web/crud)
3. **预处理语句** → [预处理语句](/web/prepared-statements)

### 第四步：框架学习

1. **ThinkPHP 入门** → [ThinkPHP 介绍](/thinkphp/introduction)
2. **路由系统** → [路由系统](/thinkphp/routing)
3. **控制器和模型** → [控制器](/thinkphp/controllers)、[模型](/thinkphp/models)

## 常见陷阱

### 1. 变量作用域

```php
<?php
// ❌ 错误
function test() {
    echo $x;  // 未定义
}

// ✅ 正确
function test() {
    global $x;  // 或使用参数传递
    echo $x;
}
?>
```

### 2. 字符串连接

```php
<?php
// JavaScript: 'Hello' + name
// PHP: 'Hello' . $name 或 "Hello $name"
?>
```

### 3. 数组 vs 对象

```php
<?php
// PHP 中数组和对象是不同的
$arr = ['name' => 'John'];  // 关联数组
$obj = (object)['name' => 'John'];  // 对象

echo $arr['name'];  // 数组访问
echo $obj->name;    // 对象访问
?>
```

### 4. 相等比较

```php
<?php
// == 只比较值
'5' == 5;  // true

// === 比较值和类型
'5' === 5;  // false
?>
```

## 实战对比

### 示例 1：表单处理

**JavaScript（前端验证）：**
```javascript
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    if (name.length < 3) {
        alert('姓名至少3个字符');
        return;
    }
    // 提交到服务器
});
```

**PHP（服务器端处理）：**
```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    
    if (strlen($name) < 3) {
        echo json_encode(['error' => '姓名至少3个字符']);
        exit;
    }
    
    // 保存数据
    // ...
}
?>
```

### 示例 2：API 开发

**JavaScript（Express.js）：**
```javascript
app.get('/api/users', async (req, res) => {
    const users = await db.query('SELECT * FROM users');
    res.json(users);
});
```

**PHP：**
```php
<?php
// ThinkPHP 路由
Route::get('api/users', function() {
    $users = Db::table('users')->select();
    return json($users);
});
?>
```

### 示例 3：模板渲染

**JavaScript（React）：**
```jsx
function UserList({ users }) {
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
```

**PHP（ThinkPHP 视图）：**
```php
<!-- view/user/index.html -->
<ul>
{volist name="users" id="user"}
    <li>{$user.name}</li>
{/volist}
</ul>
```

## 学习建议

1. **从 Web 开发开始**：利用你已有的 HTTP、HTML 知识
2. **理解服务器端思维**：PHP 在服务器执行，生成 HTML 发送给浏览器
3. **实践表单处理**：这是前后端交互的核心
4. **学习 API 开发**：现代 Web 开发的重要技能
5. **掌握框架**：ThinkPHP 类似 Express.js，提供路由、中间件等

## 下一步

- 开始学习 → [PHP 基础入门](/guide/getting-started)
- 重点关注 → [Web 开发基础](/web/http-basics)
- 深入学习 → [ThinkPHP 框架](/thinkphp/introduction)
