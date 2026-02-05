# 设计模式

设计模式是解决常见问题的可重用解决方案。

## 什么是设计模式？

设计模式是在软件设计中反复出现的问题的解决方案。它们提供了经过验证的、可重用的设计思路。

## 常用设计模式

### 单例模式

确保一个类只有一个实例。

```php
<?php
class Database
{
    private static $instance = null;
    
    private function __construct() {}
    
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
}

$db = Database::getInstance();
?>
```

### 工厂模式

通过工厂类创建对象，而不是直接实例化。

```php
<?php
interface Logger
{
    public function log($message);
}

class FileLogger implements Logger
{
    public function log($message) { /* ... */ }
}

class DatabaseLogger implements Logger
{
    public function log($message) { /* ... */ }
}

class LoggerFactory
{
    public static function create($type)
    {
        switch ($type) {
            case 'file':
                return new FileLogger();
            case 'database':
                return new DatabaseLogger();
            default:
                throw new Exception("Unknown logger type");
        }
    }
}

$logger = LoggerFactory::create('file');
?>
```

### 观察者模式

定义对象间一对多的依赖关系。

```php
<?php
interface Observer
{
    public function update($data);
}

class Subject
{
    private $observers = [];
    
    public function attach(Observer $observer)
    {
        $this->observers[] = $observer;
    }
    
    public function notify($data)
    {
        foreach ($this->observers as $observer) {
            $observer->update($data);
        }
    }
}
?>
```

## 下一步

深入学习单例模式 → [单例模式](/advanced/singleton)
