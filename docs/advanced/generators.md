# 生成器

生成器提供了一种简单的方法来实现迭代器，无需实现完整的 Iterator 接口。

## 基本用法

```php
<?php
function generateNumbers()
{
    for ($i = 0; $i < 10; $i++) {
        yield $i;
    }
}

foreach (generateNumbers() as $number) {
    echo $number . "\n";
}
?>
```

## 优势

- 内存效率高
- 延迟执行
- 适合处理大数据集

## 生成键值对

```php
<?php
function generatePairs()
{
    yield 'key1' => 'value1';
    yield 'key2' => 'value2';
}
?>
```

## 委托生成器

```php
<?php
function generator1()
{
    yield 1;
    yield 2;
}

function generator2()
{
    yield from generator1();
    yield 3;
}
?>
```

## 使用场景

- 读取大文件
- 处理大量数据
- 实现迭代器

## 完成

恭喜！你已经完成了 PHP 从入门到精通的学习。继续实践和探索，不断提升你的 PHP 技能！
