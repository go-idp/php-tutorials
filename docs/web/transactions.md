# 事务处理

事务确保数据库操作的原子性，要么全部成功，要么全部失败。

## 使用 MySQLi

```php
<?php
$conn = new mysqli("localhost", "username", "password", "database");

// 关闭自动提交
$conn->autocommit(false);

try {
    // 开始事务
    $conn->begin_transaction();
    
    // 执行多个操作
    $conn->query("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
    $conn->query("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
    
    // 提交事务
    $conn->commit();
    echo "事务成功";
} catch (Exception $e) {
    // 回滚事务
    $conn->rollback();
    echo "事务失败: " . $e->getMessage();
}

$conn->close();
?>
```

## 使用 PDO

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=database", "username", "password");

try {
    // 开始事务
    $pdo->beginTransaction();
    
    // 执行多个操作
    $pdo->exec("UPDATE accounts SET balance = balance - 100 WHERE id = 1");
    $pdo->exec("UPDATE accounts SET balance = balance + 100 WHERE id = 2");
    
    // 提交事务
    $pdo->commit();
    echo "事务成功";
} catch (Exception $e) {
    // 回滚事务
    $pdo->rollBack();
    echo "事务失败: " . $e->getMessage();
}
?>
```

## 事务特性（ACID）

- **原子性（Atomicity）**：事务中的所有操作要么全部成功，要么全部失败
- **一致性（Consistency）**：事务前后数据库状态保持一致
- **隔离性（Isolation）**：并发事务之间相互隔离
- **持久性（Durability）**：事务提交后，数据永久保存

## 下一步

学习 cURL 扩展 → [cURL 扩展](/web/curl)
