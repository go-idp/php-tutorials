# 控制结构

控制结构用于控制程序的执行流程，包括条件语句和循环语句。

## 条件语句

### if 语句

```php
<?php
$age = 20;

if ($age >= 18) {
    echo "成年人";
}
?>
```

### if...else 语句

```php
<?php
$age = 15;

if ($age >= 18) {
    echo "成年人";
} else {
    echo "未成年人";
}
?>
```

### if...elseif...else 语句

```php
<?php
$score = 85;

if ($score >= 90) {
    echo "优秀";
} elseif ($score >= 80) {
    echo "良好";
} elseif ($score >= 60) {
    echo "及格";
} else {
    echo "不及格";
}
?>
```

### switch 语句

```php
<?php
$day = "Monday";

switch ($day) {
    case "Monday":
        echo "星期一";
        break;
    case "Tuesday":
        echo "星期二";
        break;
    default:
        echo "其他";
}
?>
```

## 循环语句

### for 循环

```php
<?php
for ($i = 0; $i < 10; $i++) {
    echo $i . " ";
}
// 输出: 0 1 2 3 4 5 6 7 8 9
?>
```

### while 循环

```php
<?php
$i = 0;
while ($i < 10) {
    echo $i . " ";
    $i++;
}
?>
```

### do...while 循环

```php
<?php
$i = 0;
do {
    echo $i . " ";
    $i++;
} while ($i < 10);
?>
```

### foreach 循环

用于遍历数组：

```php
<?php
$fruits = ["Apple", "Banana", "Orange"];

// 遍历值
foreach ($fruits as $fruit) {
    echo $fruit . " ";
}

// 遍历键和值
$person = ["name" => "John", "age" => 25];
foreach ($person as $key => $value) {
    echo "$key: $value\n";
}
?>
```

## 循环控制

### break

跳出循环：

```php
<?php
for ($i = 0; $i < 10; $i++) {
    if ($i == 5) {
        break;  // 跳出循环
    }
    echo $i . " ";
}
// 输出: 0 1 2 3 4
?>
```

### continue

跳过当前迭代：

```php
<?php
for ($i = 0; $i < 10; $i++) {
    if ($i == 5) {
        continue;  // 跳过 5
    }
    echo $i . " ";
}
// 输出: 0 1 2 3 4 6 7 8 9
?>
```

## 替代语法

PHP 提供了替代语法，使用冒号代替花括号：

```php
<?php
$age = 20;
?>

<?php if ($age >= 18): ?>
    <p>成年人</p>
<?php else: ?>
    <p>未成年人</p>
<?php endif; ?>

<?php
$fruits = ["Apple", "Banana", "Orange"];
?>

<ul>
<?php foreach ($fruits as $fruit): ?>
    <li><?php echo $fruit; ?></li>
<?php endforeach; ?>
</ul>
```

## 下一步

学习函数 → [函数](/guide/functions)
