# 文件操作

PHP 提供了丰富的文件操作函数，用于读写文件、处理目录等。

## 读取文件

### file_get_contents()

```php
<?php
$content = file_get_contents("file.txt");
echo $content;
?>
```

### fopen() 和 fread()

```php
<?php
$file = fopen("file.txt", "r");
$content = fread($file, filesize("file.txt"));
fclose($file);
echo $content;
?>
```

### 逐行读取

```php
<?php
$file = fopen("file.txt", "r");

while (!feof($file)) {
    $line = fgets($file);
    echo $line;
}

fclose($file);
?>
```

## 写入文件

### file_put_contents()

```php
<?php
$content = "Hello, PHP!";
file_put_contents("file.txt", $content);
?>
```

### fopen() 和 fwrite()

```php
<?php
$file = fopen("file.txt", "w");
fwrite($file, "Hello, PHP!");
fclose($file);
?>
```

## 文件模式

- `r` - 只读
- `w` - 写入（覆盖）
- `a` - 追加
- `x` - 创建并写入（文件存在则失败）
- `r+` - 读写
- `w+` - 读写（覆盖）

## 文件信息

```php
<?php
$filename = "file.txt";

file_exists($filename);     // 检查文件是否存在
is_file($filename);          // 检查是否为文件
is_dir($filename);           // 检查是否为目录
filesize($filename);         // 获取文件大小
filemtime($filename);        // 获取修改时间
filetype($filename);         // 获取文件类型
?>
```

## 目录操作

### 创建目录

```php
<?php
mkdir("new_directory");
mkdir("path/to/directory", 0777, true);  // 递归创建
?>
```

### 读取目录

```php
<?php
$dir = opendir(".");
while (($file = readdir($dir)) !== false) {
    echo $file . "\n";
}
closedir($dir);
?>
```

### 使用 scandir()

```php
<?php
$files = scandir(".");
foreach ($files as $file) {
    if ($file != "." && $file != "..") {
        echo $file . "\n";
    }
}
?>
```

## 文件操作函数

```php
<?php
// 复制文件
copy("source.txt", "dest.txt");

// 重命名/移动文件
rename("old.txt", "new.txt");

// 删除文件
unlink("file.txt");

// 删除目录
rmdir("directory");
?>
```

## 文件上传

```php
<?php
if ($_FILES["file"]["error"] == UPLOAD_ERR_OK) {
    $tmpName = $_FILES["file"]["tmp_name"];
    $name = $_FILES["file"]["name"];
    move_uploaded_file($tmpName, "uploads/" . $name);
}
?>
```

## 下一步

学习错误处理 → [错误处理](/guide/error-handling)
