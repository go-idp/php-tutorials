# OPcache

OPcache 是 PHP 的字节码缓存扩展，可以显著提高 PHP 性能。

## 启用 OPcache

编辑 `php.ini`：

```ini
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=10000
opcache.revalidate_freq=2
```

## 配置说明

- `opcache.enable` - 启用 OPcache
- `opcache.memory_consumption` - 内存限制（MB）
- `opcache.max_accelerated_files` - 最大缓存文件数
- `opcache.revalidate_freq` - 检查文件更新频率

## 检查状态

```php
<?php
if (function_exists('opcache_get_status')) {
    $status = opcache_get_status();
    print_r($status);
}
?>
```

## 下一步

学习代码优化 → [代码优化](/advanced/code-optimization)
