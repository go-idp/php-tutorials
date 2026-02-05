# 代码优化

优化代码可以提高应用性能和可维护性。

## 优化技巧

### 避免不必要的计算

```php
<?php
// 不好
for ($i = 0; $i < count($array); $i++) { }

// 好
$count = count($array);
for ($i = 0; $i < $count; $i++) { }
?>
```

### 使用合适的数据结构

```php
<?php
// 使用 isset() 而不是 array_key_exists()
if (isset($array[$key])) { }

// 使用单引号（性能略好）
$str = 'Hello';
?>
```

### 减少函数调用

```php
<?php
// 缓存函数结果
$result = expensiveFunction();
useResult($result);
useResultAgain($result);
?>
```

### 使用生成器处理大数据

```php
<?php
function generateData()
{
    for ($i = 0; $i < 1000000; $i++) {
        yield $i;
    }
}
?>
```

## 下一步

学习数据库优化 → [数据库优化](/advanced/database-optimization)
