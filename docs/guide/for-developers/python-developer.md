# Python 开发者学习 PHP 指南

如果你是一名 Python 开发者，本指南将帮助你快速理解 PHP 的语法和特性。

## 快速对比表

| 概念 | Python | PHP | 说明 |
|------|--------|-----|------|
| 变量 | `x = 1` | `$x = 1` | PHP 变量以 `$` 开头 |
| 字符串 | `'text'` 或 `"text"` | `'text'` 或 `"text"` | 语法相似 |
| 列表 | `[1, 2, 3]` | `[1, 2, 3]` | 语法相似 |
| 字典 | `{'key': 'value'}` | `['key' => 'value']` | PHP 使用关联数组 |
| 函数 | `def name():` | `function name():` | 语法不同 |
| 类 | `class Name:` | `class Name {}` | PHP 使用花括号 |
| 缩进 | 使用缩进 | 使用花括号 `{}` | 重要差异 |
| 包管理 | `pip` | `Composer` | 不同的包管理器 |
| 类型提示 | `def func(x: int) -> int:` | `function func(int $x): int` | PHP 7.0+ 支持 |

## 共同点

### 1. 动态类型

两者都是动态类型语言：

**Python：**
```python
x = 5
x = "hello"  # 可以改变类型
```

**PHP：**
```php
<?php
$x = 5;
$x = "hello";  // 可以改变类型
?>
```

### 2. 简洁的语法

两者语法都相对简洁：

**Python：**
```python
def greet(name):
    return f"Hello, {name}!"

users = [{"name": "John", "age": 25}]
for user in users:
    print(user["name"])
```

**PHP：**
```php
<?php
function greet($name) {
    return "Hello, $name!";
}

$users = [["name" => "John", "age" => 25]];
foreach ($users as $user) {
    echo $user["name"];
}
?>
```

### 3. 丰富的内置函数

两者都有丰富的标准库/内置函数。

### 4. 面向对象和函数式

两者都支持面向对象和函数式编程。

## 主要差异

### 1. 语法风格

**Python（缩进）：**
```python
if x > 0:
    print("positive")
    if x > 10:
        print("large")
else:
    print("non-positive")
```

**PHP（花括号）：**
```php
<?php
if ($x > 0) {
    echo "positive";
    if ($x > 10) {
        echo "large";
    }
} else {
    echo "non-positive";
}
?>
```

### 2. 变量前缀

**Python：**
```python
name = "John"
age = 25
```

**PHP：**
```php
<?php
$name = "John";
$age = 25;
?>
```

### 3. 数组和字典

**Python：**
```python
# 列表
list = [1, 2, 3]

# 字典
dict = {"key": "value"}

# 访问
list[0]
dict["key"]
```

**PHP：**
```php
<?php
// PHP 数组既是列表也是字典
$arr = [1, 2, 3];
$arr = ["key" => "value"];

// 访问
$arr[0]
$arr["key"]
?>
```

### 4. 字符串格式化

**Python：**
```python
name = "John"
# f-string (Python 3.6+)
message = f"Hello, {name}!"

# format
message = "Hello, {}!".format(name)
```

**PHP：**
```php
<?php
$name = "John";
// 双引号插值
$message = "Hello, $name!";

// sprintf
$message = sprintf("Hello, %s!", $name);
?>
```

### 5. 函数定义

**Python：**
```python
def add(a, b):
    return a + b

# 类型提示 (Python 3.5+)
def add(a: int, b: int) -> int:
    return a + b
```

**PHP：**
```php
<?php
function add($a, $b) {
    return $a + $b;
}

// 类型声明 (PHP 7.0+)
function add(int $a, int $b): int {
    return $a + $b;
}
?>
```

### 6. 列表推导式 vs 数组函数

**Python：**
```python
# 列表推导式
squares = [x**2 for x in range(10) if x % 2 == 0]

# map/filter
squares = list(map(lambda x: x**2, range(10)))
```

**PHP：**
```php
<?php
// array_map/array_filter
$squares = array_map(function($x) {
    return $x * $x;
}, array_filter(range(0, 9), function($x) {
    return $x % 2 == 0;
}));
?>
```

### 7. 包/模块系统

**Python：**
```python
# 导入
import os
from datetime import datetime

# 模块
# file: utils.py
def helper():
    pass
```

**PHP：**
```php
<?php
// 使用命名空间
namespace App\Utils;

function helper() {
    // ...
}

// 使用
use App\Utils\helper;
?>
```

## 快速上手路径

### 第一步：适应语法差异

1. **PHP 基础语法** → [语法基础](/guide/syntax)
2. **理解花括号 vs 缩进**
3. **掌握变量前缀 `$`**

### 第二步：数组操作

1. **数组基础** → [数组](/guide/arrays)
2. **理解 PHP 数组的灵活性**（既是列表也是字典）

### 第三步：函数和类

1. **函数** → [函数](/guide/functions)
2. **面向对象** → [面向对象编程](/guide/oop)

### 第四步：Web 开发

1. **HTTP 基础** → [HTTP 基础](/web/http-basics)
2. **框架学习** → [ThinkPHP 介绍](/thinkphp/introduction)

## 常见陷阱

### 1. 缩进 vs 花括号

**Python：**
```python
if condition:
    do_something()
    if nested:
        do_nested()
```

**PHP：**
```php
<?php
if ($condition) {
    doSomething();
    if ($nested) {
        doNested();
    }
}
?>
```

### 2. 变量作用域

**Python：**
```python
x = 1
def test():
    global x
    x = 2
```

**PHP：**
```php
<?php
$x = 1;
function test() {
    global $x;
    $x = 2;
}
?>
```

### 3. 数组操作

**Python：**
```python
arr = [1, 2, 3]
arr.append(4)
arr[0] = 10
```

**PHP：**
```php
<?php
$arr = [1, 2, 3];
$arr[] = 4;  // 或 array_push($arr, 4)
$arr[0] = 10;
?>
```

### 4. 字典访问

**Python：**
```python
dict = {"key": "value"}
dict["key"]  # 访问
dict.get("key", "default")  # 带默认值
```

**PHP：**
```php
<?php
$dict = ["key" => "value"];
$dict["key"];  // 访问
$dict["key"] ?? "default";  // null 合并运算符
?>
```

## 实战对比

### 示例 1：函数定义

**Python：**
```python
def calculate_total(items):
    total = 0
    for item in items:
        total += item['price'] * item['quantity']
    return total

# 使用
items = [
    {'price': 10, 'quantity': 2},
    {'price': 20, 'quantity': 1}
]
total = calculate_total(items)
```

**PHP：**
```php
<?php
function calculateTotal($items) {
    $total = 0;
    foreach ($items as $item) {
        $total += $item['price'] * $item['quantity'];
    }
    return $total;
}

// 使用
$items = [
    ['price' => 10, 'quantity' => 2],
    ['price' => 20, 'quantity' => 1]
];
$total = calculateTotal($items);
?>
```

### 示例 2：类定义

**Python：**
```python
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
    
    def greet(self):
        return f"Hello, {self.name}!"

user = User("John", "john@example.com")
print(user.greet())
```

**PHP：**
```php
<?php
class User
{
    private $name;
    private $email;
    
    public function __construct($name, $email)
    {
        $this->name = $name;
        $this->email = $email;
    }
    
    public function greet()
    {
        return "Hello, {$this->name}!";
    }
}

$user = new User("John", "john@example.com");
echo $user->greet();
?>
```

### 示例 3：Web 框架对比

**Python (Flask)：**
```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/users', methods=['GET'])
def get_users():
    users = [{"id": 1, "name": "John"}]
    return jsonify(users)

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    # 创建用户
    return jsonify(data), 201
```

**PHP (ThinkPHP)：**
```php
<?php
use think\facade\Route;

Route::get('users', function() {
    $users = [["id" => 1, "name" => "John"]];
    return json($users);
});

Route::post('users', function() {
    $data = input('post.');
    // 创建用户
    return json($data, 201);
});
?>
```

### 示例 4：数据处理

**Python：**
```python
# 列表推导式
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers if x % 2 == 0]

# map/filter
squares = list(map(lambda x: x**2, 
                   filter(lambda x: x % 2 == 0, numbers)))
```

**PHP：**
```php
<?php
$numbers = [1, 2, 3, 4, 5];

// array_map/array_filter
$squares = array_map(function($x) {
    return $x * $x;
}, array_filter($numbers, function($x) {
    return $x % 2 == 0;
}));
?>
```

## 学习建议

1. **适应花括号**：PHP 使用花括号而不是缩进
2. **记住变量前缀**：所有变量都以 `$` 开头
3. **理解数组灵活性**：PHP 数组既是列表也是字典
4. **学习 Web 开发**：PHP 主要用于 Web，类似 Flask/Django
5. **掌握框架**：ThinkPHP 提供了类似 Python Web 框架的功能

## 性能考虑

- **Python**：解释型，适合快速开发
- **PHP**：解释型，但 OPcache 可以显著提升性能
- **PHP-FPM**：进程管理，适合 Web 应用

## 下一步

- 开始学习 → [PHP 基础入门](/guide/getting-started)
- 学习语法 → [语法基础](/guide/syntax)
- 学习框架 → [ThinkPHP 介绍](/thinkphp/introduction)
