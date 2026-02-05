# 日期时间处理

PHP 提供了强大的日期和时间处理功能。

## DateTime 类

### 创建日期对象

```php
<?php
// 当前时间
$now = new DateTime();

// 指定日期
$date = new DateTime("2024-01-15");

// 指定日期和时间
$datetime = new DateTime("2024-01-15 14:30:00");
?>
```

### 格式化日期

```php
<?php
$date = new DateTime();
echo $date->format("Y-m-d H:i:s");  // 2024-01-15 14:30:00
echo $date->format("Y年m月d日");     // 2024年01月15日
?>
```

### 常用格式

- `Y` - 4位年份
- `m` - 月份（01-12）
- `d` - 日期（01-31）
- `H` - 小时（00-23）
- `i` - 分钟（00-59）
- `s` - 秒（00-59）

## 日期函数

### date()

```php
<?php
echo date("Y-m-d");           // 2024-01-15
echo date("Y-m-d H:i:s");     // 2024-01-15 14:30:00
echo date("l");             // 星期几
?>
```

### time()

```php
<?php
$timestamp = time();  // 当前时间戳
echo date("Y-m-d H:i:s", $timestamp);
?>
```

### strtotime()

```php
<?php
$timestamp = strtotime("2024-01-15");
$timestamp = strtotime("+1 day");
$timestamp = strtotime("next Monday");
?>
```

## 日期计算

```php
<?php
$date = new DateTime("2024-01-15");

// 添加时间
$date->add(new DateInterval("P1D"));      // 加1天
$date->add(new DateInterval("P1M"));      // 加1月
$date->add(new DateInterval("PT1H"));      // 加1小时

// 减去时间
$date->sub(new DateInterval("P1D"));      // 减1天

// 修改日期
$date->modify("+1 day");
$date->modify("next Monday");
?>
```

## 日期比较

```php
<?php
$date1 = new DateTime("2024-01-15");
$date2 = new DateTime("2024-01-20");

if ($date1 < $date2) {
    echo "date1 早于 date2";
}

// 计算差值
$diff = $date1->diff($date2);
echo $diff->days;  // 天数差
?>
```

## 时区设置

```php
<?php
// 设置时区
date_default_timezone_set("Asia/Shanghai");

// 使用 DateTimeZone
$timezone = new DateTimeZone("Asia/Shanghai");
$date = new DateTime("now", $timezone);
?>
```

## 下一步

学习字符串处理 → [字符串处理](/guide/strings)
