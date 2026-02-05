# 日志系统

ThinkPHP 提供了完善的日志记录功能。

## 配置日志

编辑 `config/log.php`：

```php
<?php
return [
    'default' => 'file',
    'channels' => [
        'file' => [
            'type' => 'File',
            'path' => '../runtime/log/',
            'level' => ['error', 'warning', 'info'],
        ],
    ],
];
?>
```

## 记录日志

```php
<?php
use think\facade\Log;

// 记录不同级别
Log::error('错误信息');
Log::warning('警告信息');
Log::info('信息');
Log::debug('调试信息');

// 记录数组
Log::info('用户数据', ['user_id' => 1, 'name' => 'John']);
?>
```

## 日志级别

- `emergency` - 紧急
- `alert` - 警报
- `critical` - 严重
- `error` - 错误
- `warning` - 警告
- `notice` - 通知
- `info` - 信息
- `debug` - 调试

## 下一步

学习多应用模式 → [多应用模式](/thinkphp/multi-app)
