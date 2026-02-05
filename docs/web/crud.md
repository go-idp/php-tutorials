# CRUD 操作

CRUD 代表 Create（创建）、Read（读取）、Update（更新）、Delete（删除）四种基本数据库操作。

## 使用 MySQLi

### 创建（Create）

```php
<?php
$conn = new mysqli("localhost", "username", "password", "database");

$sql = "INSERT INTO users (name, email) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $name, $email);

$name = "John";
$email = "john@example.com";
$stmt->execute();

$stmt->close();
$conn->close();
?>
```

### 读取（Read）

```php
<?php
$conn = new mysqli("localhost", "username", "password", "database");

$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

$id = 1;
$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    echo $row['name'] . " - " . $row['email'];
}

$stmt->close();
$conn->close();
?>
```

### 更新（Update）

```php
<?php
$conn = new mysqli("localhost", "username", "password", "database");

$sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $name, $email, $id);

$name = "Jane";
$email = "jane@example.com";
$id = 1;
$stmt->execute();

$stmt->close();
$conn->close();
?>
```

### 删除（Delete）

```php
<?php
$conn = new mysqli("localhost", "username", "password", "database");

$sql = "DELETE FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

$id = 1;
$stmt->execute();

$stmt->close();
$conn->close();
?>
```

## 使用 PDO

### 创建（Create）

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=database", "username", "password");

$sql = "INSERT INTO users (name, email) VALUES (:name, :email)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':name' => 'John',
    ':email' => 'john@example.com'
]);
?>
```

### 读取（Read）

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=database", "username", "password");

$sql = "SELECT * FROM users WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute([':id' => 1]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);
echo $user['name'] . " - " . $user['email'];
?>
```

### 更新（Update）

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=database", "username", "password");

$sql = "UPDATE users SET name = :name, email = :email WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':name' => 'Jane',
    ':email' => 'jane@example.com',
    ':id' => 1
]);
?>
```

### 删除（Delete）

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=database", "username", "password");

$sql = "DELETE FROM users WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute([':id' => 1]);
?>
```

## 下一步

学习预处理语句 → [预处理语句](/web/prepared-statements)
