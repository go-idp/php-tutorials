# 数据库优化

数据库优化是提高应用性能的关键。

## 索引优化

### 添加索引

```sql
-- 单列索引
CREATE INDEX idx_name ON users(name);

-- 复合索引
CREATE INDEX idx_name_email ON users(name, email);
```

### 使用 EXPLAIN

```sql
EXPLAIN SELECT * FROM users WHERE name = 'John';
```

## 查询优化

### 避免 SELECT *

```sql
-- 不好
SELECT * FROM users;

-- 好
SELECT id, name, email FROM users;
```

### 使用 LIMIT

```sql
SELECT * FROM users LIMIT 10;
```

### 避免 N+1 查询

```php
<?php
// 不好
foreach ($users as $user) {
    $posts = Post::where('user_id', $user->id)->get();
}

// 好
$users = User::with('posts')->get();
?>
```

## 连接池

使用连接池管理数据库连接，减少连接开销。

## 下一步

学习缓存策略 → [缓存策略](/advanced/caching-strategy)
