# 单例模式

单例模式确保一个类只有一个实例，并提供全局访问点。

## 实现方式

```php
<?php
class Singleton
{
    private static $instance = null;
    
    // 私有构造函数，防止外部实例化
    private function __construct() {}
    
    // 防止克隆
    private function __clone() {}
    
    // 防止反序列化
    public function __wakeup()
    {
        throw new Exception("Cannot unserialize singleton");
    }
    
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
}
?>
```

## 使用场景

- 数据库连接
- 配置管理
- 日志记录器
- 缓存管理器

## 注意事项

- 线程安全（PHP 中通常不是问题）
- 测试困难
- 可能隐藏依赖关系

## 下一步

学习工厂模式 → [工厂模式](/advanced/factory)
