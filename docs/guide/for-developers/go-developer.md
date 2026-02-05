# Go 开发者学习 PHP 指南

如果你是一名 Go 开发者，本指南将帮助你理解 PHP 的类型系统和 Web 开发特性。

## 快速对比表

| 概念 | Go | PHP | 说明 |
|------|----|-----|------|
| 类型系统 | 静态类型 | 动态类型（PHP 8.0+ 支持类型声明） | PHP 更灵活 |
| 编译 | 编译为二进制 | 解释执行 | PHP 无需编译 |
| 包管理 | `go mod` | `Composer` | 不同的包管理器 |
| 并发 | Goroutine, Channel | 同步（PHP 8.1+ Fiber） | Go 并发更强 |
| 错误处理 | `error` 返回值 | `try-catch` 异常 | 不同的错误处理方式 |
| 接口 | `interface{}` | `interface` | 概念相似但实现不同 |
| 指针 | `*Type` | 引用 `&$var` | PHP 引用不是真正的指针 |
| 数组/切片 | `[]int` | `array` | PHP 数组更灵活 |
| 结构体 | `struct` | `class` | PHP 使用类 |

## 共同点

### 1. 包/模块系统

两者都有包/模块系统：

**Go：**
```go
package main

import (
    "fmt"
    "net/http"
)
```

**PHP：**
```php
<?php
namespace App;

use think\facade\Route;
?>
```

### 2. 接口概念

两者都支持接口：

**Go：**
```go
type Writer interface {
    Write([]byte) (int, error)
}

type FileWriter struct{}

func (f FileWriter) Write(data []byte) (int, error) {
    // 实现
    return len(data), nil
}
```

**PHP：**
```php
<?php
interface Writer
{
    public function write($data);
}

class FileWriter implements Writer
{
    public function write($data)
    {
        // 实现
        return strlen($data);
    }
}
?>
```

### 3. Web 开发

两者都适合 Web 开发：

**Go：**
```go
http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
})
```

**PHP：**
```php
<?php
Route::get('users', function() {
    return json($users);
});
?>
```

## 主要差异

### 1. 类型系统

**Go（静态类型）：**
```go
var name string = "John"
var age int = 25

// 类型推断
name := "John"
age := 25
```

**PHP（动态类型，但支持类型声明）：**
```php
<?php
// 动态类型
$name = "John";
$age = 25;

// PHP 7.0+ 类型声明
function greet(string $name): string {
    return "Hello, $name";
}
?>
```

### 2. 错误处理

**Go（返回错误）：**
```go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

result, err := divide(10, 2)
if err != nil {
    log.Fatal(err)
}
```

**PHP（异常）：**
```php
<?php
function divide($a, $b) {
    if ($b == 0) {
        throw new Exception("division by zero");
    }
    return $a / $b;
}

try {
    $result = divide(10, 2);
} catch (Exception $e) {
    echo $e->getMessage();
}
?>
```

### 3. 并发模型

**Go（Goroutine）：**
```go
go func() {
    // 并发执行
}()

ch := make(chan string)
go func() {
    ch <- "result"
}()
result := <-ch
```

**PHP（同步，PHP 8.1+ Fiber）：**
```php
<?php
// 传统同步
function process() {
    // 顺序执行
}

// PHP 8.1+ Fiber
use Fiber;

$fiber = new Fiber(function() {
    return process();
});
$result = $fiber->start();
?>
```

### 4. 数组/切片

**Go：**
```go
// 数组（固定长度）
var arr [5]int

// 切片（动态）
slice := []int{1, 2, 3}
slice = append(slice, 4)
```

**PHP：**
```php
<?php
// PHP 数组既是列表也是字典
$arr = [1, 2, 3];
$arr[] = 4;  // 添加元素
?>
```

### 5. 结构体 vs 类

**Go：**
```go
type User struct {
    Name  string
    Email string
    Age   int
}

user := User{
    Name:  "John",
    Email: "john@example.com",
    Age:   25,
}
```

**PHP：**
```php
<?php
class User
{
    public $name;
    public $email;
    public $age;
    
    public function __construct($name, $email, $age)
    {
        $this->name = $name;
        $this->email = $email;
        $this->age = $age;
    }
}

$user = new User("John", "john@example.com", 25);
?>
```

### 6. 指针 vs 引用

**Go：**
```go
x := 10
p := &x  // 指针
*p = 20  // 通过指针修改
```

**PHP：**
```php
<?php
$x = 10;
$p = &$x;  // 引用
$p = 20;   // 修改引用
// 注意：PHP 引用不是真正的指针
?>
```

## 快速上手路径

### 第一步：理解动态类型

1. **PHP 基础语法** → [语法基础](/guide/syntax)
2. **变量和类型** → [变量与数据类型](/guide/variables)
3. **理解 PHP 的类型灵活性**

### 第二步：错误处理

1. **异常处理** → [错误处理](/guide/error-handling)
2. **理解 PHP 的异常模型**（与 Go 的错误返回值不同）

### 第三步：Web 开发

1. **HTTP 基础** → [HTTP 基础](/web/http-basics)
2. **框架学习** → [ThinkPHP 介绍](/thinkphp/introduction)

### 第四步：数据库和 ORM

1. **数据库操作** → [数据库操作](/thinkphp/database)
2. **ORM** → [ORM](/thinkphp/orm)

## 常见陷阱

### 1. 错误处理方式

**Go：**
```go
result, err := operation()
if err != nil {
    return err
}
```

**PHP：**
```php
<?php
try {
    $result = operation();
} catch (Exception $e) {
    // 处理错误
}
?>
```

### 2. 并发处理

**Go：**
```go
// 并发执行多个任务
var wg sync.WaitGroup
for i := 0; i < 10; i++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        process(id)
    }(i)
}
wg.Wait()
```

**PHP：**
```php
<?php
// PHP 传统上是同步的
for ($i = 0; $i < 10; $i++) {
    process($i);
}

// PHP 8.1+ 可以使用 Fiber，但不如 Go 的 Goroutine 强大
?>
```

### 3. 类型检查

**Go：**
```go
var x interface{} = "hello"
if str, ok := x.(string); ok {
    fmt.Println(str)
}
```

**PHP：**
```php
<?php
$x = "hello";
if (is_string($x)) {
    echo $x;
}
?>
```

### 4. 数组操作

**Go：**
```go
slice := []int{1, 2, 3}
slice = append(slice, 4)
fmt.Println(len(slice))
```

**PHP：**
```php
<?php
$arr = [1, 2, 3];
$arr[] = 4;
echo count($arr);
?>
```

## 实战对比

### 示例 1：HTTP 服务器

**Go：**
```go
package main

import (
    "encoding/json"
    "net/http"
)

func main() {
    http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
        users := []map[string]interface{}{
            {"id": 1, "name": "John"},
        }
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(users)
    })
    
    http.ListenAndServe(":8080", nil)
}
```

**PHP (ThinkPHP)：**
```php
<?php
use think\facade\Route;

Route::get('users', function() {
    $users = [
        ["id" => 1, "name" => "John"]
    ];
    return json($users);
});
?>
```

### 示例 2：错误处理

**Go：**
```go
func getUser(id int) (*User, error) {
    if id <= 0 {
        return nil, fmt.Errorf("invalid id")
    }
    // 查询用户
    return user, nil
}

user, err := getUser(1)
if err != nil {
    log.Fatal(err)
}
```

**PHP：**
```php
<?php
function getUser($id) {
    if ($id <= 0) {
        throw new InvalidArgumentException("invalid id");
    }
    // 查询用户
    return $user;
}

try {
    $user = getUser(1);
} catch (InvalidArgumentException $e) {
    echo $e->getMessage();
}
?>
```

### 示例 3：结构体/类

**Go：**
```go
type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

func (u *User) Greet() string {
    return fmt.Sprintf("Hello, %s!", u.Name)
}
```

**PHP：**
```php
<?php
class User
{
    public $id;
    public $name;
    public $email;
    
    public function greet()
    {
        return "Hello, {$this->name}!";
    }
}
?>
```

### 示例 4：接口实现

**Go：**
```go
type Writer interface {
    Write(data []byte) error
}

type FileWriter struct{}

func (f FileWriter) Write(data []byte) error {
    // 实现
    return nil
}
```

**PHP：**
```php
<?php
interface Writer
{
    public function write($data);
}

class FileWriter implements Writer
{
    public function write($data)
    {
        // 实现
        return true;
    }
}
?>
```

## 学习建议

1. **接受动态类型**：PHP 的类型系统更灵活，但 PHP 8.0+ 支持类型声明
2. **理解异常模型**：PHP 使用异常而不是错误返回值
3. **接受同步执行**：PHP 传统上是同步的，没有 Goroutine
4. **学习 Web 开发**：PHP 主要用于 Web，类似 Go 的 Web 框架
5. **掌握框架**：ThinkPHP 提供了类似 Go Web 框架的功能

## 性能考虑

- **Go**：编译型，性能优秀，适合高并发
- **PHP**：解释型，但 OPcache 可以显著提升性能
- **PHP-FPM**：进程管理，适合传统 Web 应用
- **并发**：Go 的 Goroutine 比 PHP 的 Fiber 更强大

## 下一步

- 开始学习 → [PHP 基础入门](/guide/getting-started)
- 学习类型系统 → [变量与数据类型](/guide/variables)
- 学习框架 → [ThinkPHP 介绍](/thinkphp/introduction)
