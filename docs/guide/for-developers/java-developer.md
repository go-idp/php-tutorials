# Java 开发者学习 PHP 指南

如果你是一名 Java 开发者，本指南将帮助你利用已有的 OOP 知识快速上手 PHP。

## 快速对比表

| 概念 | Java | PHP | 说明 |
|------|------|-----|------|
| 类型系统 | 强类型 | 弱类型（PHP 8.0+ 支持类型声明） | PHP 更灵活 |
| 编译 | 需要编译 | 解释执行 | PHP 无需编译 |
| 包管理 | Maven/Gradle | Composer | 不同的依赖管理 |
| 类文件 | 一个文件一个类 | 一个文件可多个类 | PHP 更灵活 |
| 命名空间 | `package com.example` | `namespace App\Models` | 概念相同 |
| 接口 | `interface` | `interface` | 语法相似 |
| 抽象类 | `abstract class` | `abstract class` | 语法相似 |
| 异常 | `try-catch` | `try-catch` | 语法相似 |
| 泛型 | `<T>` | 不支持（PHP 8.0+ 有部分支持） | PHP 无泛型 |

## 共同点

### 1. 面向对象编程

两者都是面向对象语言，概念高度相似：

**Java：**
```java
public class User {
    private String name;
    private int age;
    
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() {
        return name;
    }
}
```

**PHP：**
```php
<?php
class User
{
    private $name;
    private $age;
    
    public function __construct($name, $age)
    {
        $this->name = $name;
        $this->age = $age;
    }
    
    public function getName()
    {
        return $this->name;
    }
}
?>
```

### 2. 继承和多态

**Java：**
```java
public class Animal {
    public void makeSound() {
        System.out.println("Some sound");
    }
}

public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}
```

**PHP：**
```php
<?php
class Animal
{
    public function makeSound()
    {
        echo "Some sound";
    }
}

class Dog extends Animal
{
    public function makeSound()
    {
        echo "Woof!";
    }
}
?>
```

### 3. 接口实现

**Java：**
```java
interface Flyable {
    void fly();
}

class Bird implements Flyable {
    public void fly() {
        System.out.println("Flying");
    }
}
```

**PHP：**
```php
<?php
interface Flyable
{
    public function fly();
}

class Bird implements Flyable
{
    public function fly()
    {
        echo "Flying";
    }
}
?>
```

### 4. 异常处理

**Java：**
```java
try {
    riskyOperation();
} catch (Exception e) {
    System.out.println(e.getMessage());
}
```

**PHP：**
```php
<?php
try {
    riskyOperation();
} catch (Exception $e) {
    echo $e->getMessage();
}
?>
```

## 主要差异

### 1. 类型系统

**Java（强类型）：**
```java
String name = "John";  // 必须声明类型
int age = 25;
```

**PHP（弱类型，但支持类型声明）：**
```php
<?php
// 动态类型
$name = "John";
$age = 25;

// PHP 7.0+ 支持类型声明
function greet(string $name): string {
    return "Hello, $name";
}
?>
```

### 2. 编译 vs 解释

**Java：**
```bash
javac Main.java  # 编译
java Main        # 运行
```

**PHP：**
```bash
php script.php   # 直接运行，无需编译
```

### 3. 包/命名空间

**Java：**
```java
package com.example.models;

public class User {
    // ...
}

// 使用
import com.example.models.User;
```

**PHP：**
```php
<?php
namespace App\Models;

class User
{
    // ...
}

// 使用
use App\Models\User;
?>
```

### 4. 数组和集合

**Java：**
```java
List<String> list = new ArrayList<>();
list.add("item1");
Map<String, String> map = new HashMap<>();
map.put("key", "value");
```

**PHP：**
```php
<?php
// PHP 数组既是列表也是字典
$list = ["item1", "item2"];
$map = ["key" => "value"];

// 添加元素
$list[] = "item3";
$map["newKey"] = "newValue";
?>
```

### 5. 访问修饰符

**Java：**
- `public` - 公共
- `private` - 私有
- `protected` - 受保护
- `package-private` - 包私有（默认）

**PHP：**
- `public` - 公共
- `private` - 私有
- `protected` - 受保护
- 没有包私有概念

### 6. 静态成员

**Java：**
```java
public class Math {
    public static final double PI = 3.14159;
    
    public static int add(int a, int b) {
        return a + b;
    }
}
```

**PHP：**
```php
<?php
class Math
{
    const PI = 3.14159;  // 常量
    
    public static function add($a, $b)
    {
        return $a + $b;
    }
}
?>
```

## 快速上手路径

### 第一步：理解动态类型

1. **PHP 基础语法** → [语法基础](/guide/syntax)
2. **变量和类型** → [变量与数据类型](/guide/variables)
3. **理解 PHP 的类型灵活性**

### 第二步：面向对象

1. **OOP 基础** → [面向对象编程](/guide/oop)
2. **命名空间** → [命名空间](/guide/namespaces)
3. **理解 PHP 的 OOP 实现**

### 第三步：Web 开发

1. **HTTP 基础** → [HTTP 基础](/web/http-basics)
2. **框架学习** → [ThinkPHP 介绍](/thinkphp/introduction)

### 第四步：数据库和 ORM

1. **数据库操作** → [数据库操作](/thinkphp/database)
2. **ORM** → [ORM](/thinkphp/orm)

## 常见陷阱

### 1. 类型转换

**Java：**
```java
int x = 5;
String s = String.valueOf(x);  // 显式转换
```

**PHP：**
```php
<?php
$x = 5;
$s = (string)$x;  // 类型转换
$s = "$x";        // 自动转换
?>
```

### 2. 数组 vs 集合

**Java：**
```java
List<String> list = Arrays.asList("a", "b", "c");
list.get(0);  // 访问元素
```

**PHP：**
```php
<?php
$list = ["a", "b", "c"];
$list[0];  // 访问元素
?>
```

### 3. null 处理

**Java：**
```java
String name = null;
if (name != null) {
    System.out.println(name.length());
}
```

**PHP：**
```php
<?php
$name = null;
if ($name !== null) {
    echo strlen($name);
}

// PHP 7.0+ null 合并运算符
$name = $input ?? 'default';
?>
```

### 4. 字符串操作

**Java：**
```java
String str = "Hello";
str = str + " World";
str.length();
str.substring(0, 5);
```

**PHP：**
```php
<?php
$str = "Hello";
$str .= " World";  // 或 $str = $str . " World";
strlen($str);
substr($str, 0, 5);
?>
```

## 实战对比

### 示例 1：类定义

**Java：**
```java
package com.example.models;

public class User {
    private Long id;
    private String name;
    private String email;
    
    public User(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}
```

**PHP：**
```php
<?php
namespace App\Models;

class User
{
    private $id;
    private $name;
    private $email;
    
    public function __construct($id, $name, $email)
    {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
    }
    
    public function getId() { return $this->id; }
    public function getName() { return $this->name; }
    public function getEmail() { return $this->email; }
}
?>
```

### 示例 2：Spring Boot vs ThinkPHP

**Java (Spring Boot)：**
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }
}
```

**PHP (ThinkPHP)：**
```php
<?php
namespace app\controller;

use app\model\User;
use think\Request;

class UserController
{
    public function index()
    {
        $users = User::select();
        return json($users);
    }
    
    public function create(Request $request)
    {
        $user = User::create($request->post());
        return json($user, 201);
    }
}
?>
```

### 示例 3：数据库操作

**Java (JPA/Hibernate)：**
```java
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    
    // getters/setters
}

// Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);
}

// Service
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
```

**PHP (ThinkPHP ORM)：**
```php
<?php
namespace app\model;

use think\Model;

class User extends Model
{
    protected $table = 'users';
    protected $pk = 'id';
    
    // 查询作用域
    public function scopeByName($query, $name)
    {
        return $query->where('name', $name);
    }
}

// 使用
$users = User::select();
$user = User::where('name', 'John')->find();
?>
```

## 学习建议

1. **利用 OOP 知识**：PHP 的 OOP 与 Java 非常相似
2. **接受动态类型**：PHP 的类型系统更灵活，但 PHP 8.0+ 支持类型声明
3. **理解命名空间**：类似 Java 的包，但语法不同
4. **学习 Web 开发**：PHP 主要用于 Web，与 Java Spring 类似
5. **掌握框架**：ThinkPHP 提供了类似 Spring 的功能

## 性能考虑

- **Java**：编译型，性能优秀，适合大型应用
- **PHP**：解释型，但 OPcache 可以显著提升性能
- **PHP-FPM**：进程管理，类似 Java 应用服务器

## 下一步

- 开始学习 → [PHP 基础入门](/guide/getting-started)
- 学习 OOP → [面向对象编程](/guide/oop)
- 学习框架 → [ThinkPHP 介绍](/thinkphp/introduction)
