# SQL 注入防护

SQL 注入是最常见的 Web 安全漏洞之一。

## 什么是 SQL 注入？

SQL 注入是通过在输入中插入恶意 SQL 代码来攻击数据库。

## 危险示例

```php
<?php
// 危险！容易受到 SQL 注入攻击
$id = $_GET['id'];
$sql = "SELECT * FROM users WHERE id = $id";
$result = mysqli_query($conn, $sql);
?>
```

攻击者可以输入：`1 OR 1=1`，导致查询所有用户。

## 防护方法

### 使用预处理语句

```php
<?php
// 使用 MySQLi
$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();

// 使用 PDO
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
$stmt->execute([':id' => $id]);
?>
```

### 转义输入

```php
<?php
$id = mysqli_real_escape_string($conn, $_GET['id']);
?>
```

## 最佳实践

- 始终使用预处理语句
- 验证和过滤输入
- 使用最小权限原则
- 定期更新数据库

## 下一步

学习 XSS 防护 → [XSS 防护](/advanced/xss)
