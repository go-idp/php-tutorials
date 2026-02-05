# 预处理语句

预处理语句是防止 SQL 注入攻击的重要安全措施。

## 为什么使用预处理语句

1. **安全性**：防止 SQL 注入
2. **性能**：可以重复执行，提高效率
3. **类型安全**：自动处理数据类型

## MySQLi 预处理

```php
<?php
$conn = new mysqli("localhost", "username", "password", "database");

// 准备语句
$stmt = $conn->prepare("INSERT INTO users (name, email, age) VALUES (?, ?, ?)");

// 绑定参数
$stmt->bind_param("ssi", $name, $email, $age);

// 执行
$name = "John";
$email = "john@example.com";
$age = 25;
$stmt->execute();

// 再次执行（使用不同值）
$name = "Jane";
$email = "jane@example.com";
$age = 30;
$stmt->execute();

$stmt->close();
$conn->close();
?>
```

### 参数类型

- `i` - integer（整数）
- `d` - double（浮点数）
- `s` - string（字符串）
- `b` - blob（二进制数据）

## PDO 预处理

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=database", "username", "password");

// 命名占位符
$stmt = $pdo->prepare("INSERT INTO users (name, email, age) VALUES (:name, :email, :age)");
$stmt->execute([
    ':name' => 'John',
    ':email' => 'john@example.com',
    ':age' => 25
]);

// 问号占位符
$stmt = $pdo->prepare("INSERT INTO users (name, email, age) VALUES (?, ?, ?)");
$stmt->execute(['John', 'john@example.com', 25]);
?>
```

## 获取结果

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=database", "username", "password");

$stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
$stmt->execute([':id' => 1]);

// 获取单行
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// 获取所有行
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
```

## 下一步

学习事务处理 → [事务处理](/web/transactions)
