# 缓存策略

合理的缓存策略可以显著提高应用性能。

## 缓存类型

### 页面缓存

缓存整个页面输出：

```php
<?php
ob_start();
// 页面内容
$content = ob_get_clean();
file_put_contents('cache/page.html', $content);
?>
```

### 数据缓存

缓存数据库查询结果：

```php
<?php
$key = 'user_' . $id;
$user = cache($key);
if (!$user) {
    $user = User::find($id);
    cache($key, $user, 3600);
}
?>
```

### 对象缓存

使用 Redis 或 Memcached：

```php
<?php
$redis = new Redis();
$redis->connect('127.0.0.1', 6379);
$redis->set('key', 'value', 3600);
?>
```

## 缓存更新策略

- 定时更新
- 手动更新
- 失效更新

## 下一步

学习安全实践 → [安全实践](/advanced/security)
