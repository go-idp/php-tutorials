# 缓存系统

ThinkPHP 提供了灵活的缓存系统。

## 配置缓存

编辑 `config/cache.php`：

```php
<?php
return [
    'default' => 'file',
    'stores' => [
        'file' => [
            'type' => 'File',
            'path' => '../runtime/cache/',
        ],
        'redis' => [
            'type' => 'redis',
            'host' => '127.0.0.1',
            'port' => 6379,
        ],
    ],
];
?>
```

## 使用缓存

```php
<?php
use think\facade\Cache;

// 设置缓存
Cache::set('name', 'value', 3600);

// 获取缓存
$value = Cache::get('name');

// 删除缓存
Cache::delete('name');

// 清空缓存
Cache::clear();
?>
```

## 缓存标签

```php
<?php
// 设置带标签的缓存
Cache::tag('user')->set('user1', $data);

// 清除标签下的所有缓存
Cache::tag('user')->clear();
?>
```

## 下一步

学习日志系统 → [日志系统](/thinkphp/logging)
