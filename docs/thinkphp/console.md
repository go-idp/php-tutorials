# 命令行工具

ThinkPHP 提供了强大的命令行工具。

## 常用命令

### 创建控制器

```bash
php think make:controller Index
```

### 创建模型

```bash
php think make:model User
```

### 创建中间件

```bash
php think make:middleware Auth
```

### 创建验证器

```bash
php think make:validate User
```

## 自定义命令

### 创建命令

```bash
php think make:command Hello
```

### 定义命令

```php
<?php
namespace app\command;

use think\console\Command;
use think\console\Input;
use think\console\Output;

class Hello extends Command
{
    protected function configure()
    {
        $this->setName('hello')
            ->setDescription('Say hello');
    }
    
    protected function execute(Input $input, Output $output)
    {
        $output->writeln('Hello ThinkPHP!');
    }
}
?>
```

### 执行命令

```bash
php think hello
```

## 下一步

学习事件系统 → [事件系统](/thinkphp/events)
