# 数据库连接

PHP 支持多种方式连接数据库，最常用的是 MySQLi 和 PDO。

## MySQLi 连接

### 面向过程

```php
<?php
// 连接数据库
$conn = mysqli_connect("localhost", "username", "password", "database");

// 检查连接
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}

// 设置字符集
mysqli_set_charset($conn, "utf8");

// 关闭连接
mysqli_close($conn);
?>
```

### 面向对象

```php
<?php
$conn = new mysqli("localhost", "username", "password", "database");

if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

$conn->set_charset("utf8");
$conn->close();
?>
```

## PDO 连接

```php
<?php
try {
    $dsn = "mysql:host=localhost;dbname=database;charset=utf8";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];
    
    $pdo = new PDO($dsn, "username", "password", $options);
} catch (PDOException $e) {
    die("连接失败: " . $e->getMessage());
}
?>
```

## 连接配置

```php
<?php
// 配置文件 config.php
return [
    'host' => 'localhost',
    'dbname' => 'database',
    'username' => 'username',
    'password' => 'password',
    'charset' => 'utf8mb4'
];
?>
```

## 下一步

学习 CRUD 操作 → [CRUD 操作](/web/crud)
