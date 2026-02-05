# 视图

视图用于展示数据给用户。

## 视图目录

视图文件存放在 `app/view/` 目录下：

```
app/view/
├── index/
│   └── index.html
└── user/
    ├── index.html
    └── show.html
```

## 渲染视图

### 在控制器中

```php
<?php
namespace app\controller;

class Index
{
    public function index()
    {
        return view('index/index', [
            'name' => 'ThinkPHP',
            'users' => []
        ]);
    }
}
?>
```

## 模板语法

### 变量输出

```html
<!-- 基本输出 -->
{$name}

<!-- 数组输出 -->
{$user.name}
{$user['email']}

<!-- 对象输出 -->
{$user->name}
```

### 条件判断

```html
{if $age >= 18}
    成年人
{else}
    未成年人
{/if}
```

### 循环

```html
{volist name="users" id="user"}
    <p>{$user.name} - {$user.email}</p>
{/volist}
```

### 包含文件

```html
{include file="header" /}
```

## 模板函数

```html
<!-- 时间格式化 -->
{$create_time|date='Y-m-d H:i:s'}

<!-- 字符串截取 -->
{$content|mb_substr=0,100}

<!-- 默认值 -->
{$name|default='Guest'}
```

## 下一步

学习数据库操作 → [数据库操作](/thinkphp/database)
