# 文件上传

PHP 提供了处理文件上传的功能。

## HTML 表单

```html
<form action="upload.php" method="post" enctype="multipart/form-data">
    <input type="file" name="file">
    <button type="submit">上传</button>
</form>
```

## 处理上传

```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];
    
    // 检查错误
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo "上传失败";
        exit;
    }
    
    // 获取文件信息
    $tmpName = $file['tmp_name'];
    $name = $file['name'];
    $size = $file['size'];
    $type = $file['type'];
    
    // 验证文件类型
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($type, $allowedTypes)) {
        echo "不支持的文件类型";
        exit;
    }
    
    // 验证文件大小（2MB）
    if ($size > 2 * 1024 * 1024) {
        echo "文件太大";
        exit;
    }
    
    // 生成唯一文件名
    $extension = pathinfo($name, PATHINFO_EXTENSION);
    $newName = uniqid() . '.' . $extension;
    
    // 移动文件
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    if (move_uploaded_file($tmpName, $uploadDir . $newName)) {
        echo "上传成功";
    } else {
        echo "上传失败";
    }
}
?>
```

## 上传错误码

```php
<?php
switch ($_FILES['file']['error']) {
    case UPLOAD_ERR_OK:
        // 上传成功
        break;
    case UPLOAD_ERR_INI_SIZE:
        echo "文件超过 php.ini 中的 upload_max_filesize";
        break;
    case UPLOAD_ERR_FORM_SIZE:
        echo "文件超过表单中的 MAX_FILE_SIZE";
        break;
    case UPLOAD_ERR_PARTIAL:
        echo "文件只有部分被上传";
        break;
    case UPLOAD_ERR_NO_FILE:
        echo "没有文件被上传";
        break;
}
?>
```

## 多文件上传

```php
<?php
if (isset($_FILES['files'])) {
    foreach ($_FILES['files']['name'] as $key => $name) {
        if ($_FILES['files']['error'][$key] === UPLOAD_ERR_OK) {
            $tmpName = $_FILES['files']['tmp_name'][$key];
            move_uploaded_file($tmpName, "uploads/$name");
        }
    }
}
?>
```

## 下一步

学习数据库连接 → [数据库连接](/web/database-connection)
