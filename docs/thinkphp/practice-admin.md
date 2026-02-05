# 实战：后台管理系统

本章介绍如何构建一个完整的后台管理系统，包含用户管理、权限控制和数据管理功能。

## 项目需求

- 管理员登录
- 用户管理（增删改查）
- 权限控制
- 数据统计
- 系统设置

## 第一步：环境准备

### 1.1 创建项目

```bash
composer create-project topthink/think admin-system
cd admin-system
```

### 1.2 准备数据库

```sql
CREATE DATABASE admin_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 管理员表
CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    role VARCHAR(50) DEFAULT 'admin',
    status TINYINT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 用户表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    status TINYINT DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 插入默认管理员（密码：admin123）
INSERT INTO admins (username, password, email) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@example.com');
```

### 1.3 配置数据库

编辑 `config/database.php`：

```php
<?php
return [
    'default' => 'mysql',
    'connections' => [
        'mysql' => [
            'type' => 'mysql',
            'hostname' => '127.0.0.1',
            'database' => 'admin_db',
            'username' => 'root',
            'password' => 'your_password',
            'charset' => 'utf8mb4',
        ],
    ],
];
?>
```

## 第二步：创建模型

### 2.1 管理员模型

创建 `app/model/Admin.php`：

```php
<?php
namespace app\model;

use think\Model;

class Admin extends Model
{
    protected $table = 'admins';
    protected $pk = 'id';
    
    protected $hidden = ['password'];
    
    protected $autoWriteTimestamp = true;
    
    // 密码加密
    public function setPasswordAttr($value)
    {
        return password_hash($value, PASSWORD_DEFAULT);
    }
}
?>
```

### 2.2 用户模型

创建 `app/model/User.php`：

```php
<?php
namespace app\model;

use think\Model;

class User extends Model
{
    protected $table = 'users';
    protected $pk = 'id';
    
    protected $autoWriteTimestamp = true;
}
?>
```

## 第三步：创建中间件

### 3.1 认证中间件

创建 `app/middleware/AdminAuth.php`：

```php
<?php
namespace app\middleware;

use think\facade\Session;

class AdminAuth
{
    public function handle($request, \Closure $next)
    {
        if (!Session::get('admin_id')) {
            if ($request->isAjax()) {
                return json(['code' => 401, 'message' => '请先登录'], 401);
            }
            return redirect('/admin/login');
        }
        
        return $next($request);
    }
}
?>
```

## 第四步：创建控制器

### 4.1 登录控制器

创建 `app/controller/admin/Auth.php`：

```php
<?php
namespace app\controller\admin;

use app\model\Admin;
use think\Request;
use think\facade\Session;

class Auth
{
    // 登录页面
    public function login()
    {
        if (Session::get('admin_id')) {
            return redirect('/admin/index');
        }
        return view('admin/auth/login');
    }
    
    // 处理登录
    public function doLogin(Request $request)
    {
        $username = $request->post('username');
        $password = $request->post('password');
        
        $admin = Admin::where('username', $username)->find();
        
        if (!$admin || !password_verify($password, $admin->password)) {
            return json(['code' => 400, 'message' => '用户名或密码错误']);
        }
        
        if ($admin->status != 1) {
            return json(['code' => 400, 'message' => '账号已被禁用']);
        }
        
        Session::set('admin_id', $admin->id);
        Session::set('admin_username', $admin->username);
        Session::set('admin_role', $admin->role);
        
        return json(['code' => 200, 'message' => '登录成功']);
    }
    
    // 退出登录
    public function logout()
    {
        Session::clear();
        return redirect('/admin/login');
    }
}
?>
```

### 4.2 首页控制器

创建 `app/controller/admin/Index.php`：

```php
<?php
namespace app\controller\admin;

use app\model\User;
use app\model\Admin;

class Index
{
    public function index()
    {
        // 统计数据
        $userCount = User::count();
        $activeUserCount = User::where('status', 1)->count();
        $adminCount = Admin::count();
        
        return view('admin/index/index', [
            'userCount' => $userCount,
            'activeUserCount' => $activeUserCount,
            'adminCount' => $adminCount,
        ]);
    }
}
?>
```

### 4.3 用户管理控制器

创建 `app/controller/admin/User.php`：

```php
<?php
namespace app\controller\admin;

use app\model\User as UserModel;
use think\Request;
use think\facade\Validate;

class User
{
    // 用户列表
    public function index(Request $request)
    {
        $keyword = $request->param('keyword', '');
        $status = $request->param('status', '');
        
        $query = UserModel::order('created_at', 'desc');
        
        if ($keyword) {
            $query->where('name|email', 'like', "%{$keyword}%");
        }
        
        if ($status !== '') {
            $query->where('status', $status);
        }
        
        $users = $query->paginate([
            'list_rows' => 10,
            'query' => $request->param(),
        ]);
        
        return view('admin/user/index', ['users' => $users]);
    }
    
    // 创建用户页面
    public function create()
    {
        return view('admin/user/create');
    }
    
    // 处理创建用户
    public function store(Request $request)
    {
        $data = $request->post();
        
        $validate = Validate::rule([
            'name' => 'require|max:100',
            'email' => 'require|email|unique:users',
            'phone' => 'mobile',
        ]);
        
        if (!$validate->check($data)) {
            return json(['code' => 400, 'message' => $validate->getError()]);
        }
        
        $user = UserModel::create($data);
        
        return json(['code' => 200, 'message' => '创建成功', 'data' => $user]);
    }
    
    // 编辑用户页面
    public function edit($id)
    {
        $user = UserModel::find($id);
        if (!$user) {
            return '用户不存在';
        }
        return view('admin/user/edit', ['user' => $user]);
    }
    
    // 处理更新用户
    public function update(Request $request, $id)
    {
        $user = UserModel::find($id);
        if (!$user) {
            return json(['code' => 404, 'message' => '用户不存在']);
        }
        
        $data = $request->post();
        
        $validate = Validate::rule([
            'name' => 'require|max:100',
            'email' => 'require|email|unique:users,email,' . $id,
            'phone' => 'mobile',
        ]);
        
        if (!$validate->check($data)) {
            return json(['code' => 400, 'message' => $validate->getError()]);
        }
        
        $user->save($data);
        
        return json(['code' => 200, 'message' => '更新成功']);
    }
    
    // 删除用户
    public function delete($id)
    {
        $user = UserModel::find($id);
        if (!$user) {
            return json(['code' => 404, 'message' => '用户不存在']);
        }
        
        $user->delete();
        
        return json(['code' => 200, 'message' => '删除成功']);
    }
    
    // 批量删除
    public function batchDelete(Request $request)
    {
        $ids = $request->post('ids');
        
        if (empty($ids) || !is_array($ids)) {
            return json(['code' => 400, 'message' => '请选择要删除的用户']);
        }
        
        UserModel::whereIn('id', $ids)->delete();
        
        return json(['code' => 200, 'message' => '删除成功']);
    }
    
    // 更新状态
    public function updateStatus(Request $request, $id)
    {
        $user = UserModel::find($id);
        if (!$user) {
            return json(['code' => 404, 'message' => '用户不存在']);
        }
        
        $status = $request->post('status');
        $user->status = $status;
        $user->save();
        
        return json(['code' => 200, 'message' => '状态更新成功']);
    }
}
?>
```

## 第五步：创建视图

### 5.1 布局文件

创建 `app/view/admin/layout.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{block name="title"}后台管理{/block}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; }
        .sidebar { width: 200px; background: #2c3e50; color: #fff; height: 100vh; position: fixed; left: 0; top: 0; }
        .sidebar ul { list-style: none; }
        .sidebar li { padding: 15px; border-bottom: 1px solid #34495e; }
        .sidebar a { color: #fff; text-decoration: none; }
        .main-content { margin-left: 200px; padding: 20px; }
        .header { background: #fff; padding: 15px; border-bottom: 1px solid #ddd; }
        .header .user-info { float: right; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        table th, table td { padding: 10px; border: 1px solid #ddd; text-align: left; }
        table th { background: #f5f5f5; }
        .btn { padding: 8px 15px; background: #007bff; color: #fff; border: none; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn:hover { background: #0056b3; }
        .btn-danger { background: #dc3545; }
        .btn-success { background: #28a745; }
        form { margin: 20px 0; }
        input, select { width: 100%; padding: 8px; margin: 5px 0; }
    </style>
</head>
<body>
    <div class="sidebar">
        <h2 style="padding: 15px;">后台管理</h2>
        <ul>
            <li><a href="/admin/index">首页</a></li>
            <li><a href="/admin/user/index">用户管理</a></li>
            <li><a href="/admin/logout">退出登录</a></li>
        </ul>
    </div>
    <div class="main-content">
        <div class="header">
            <span>欢迎, {session('admin_username')}</span>
        </div>
        {block name="content"}{/block}
    </div>
</body>
</html>
```

### 5.2 登录页面

创建 `app/view/admin/auth/login.html`：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>管理员登录</title>
    <style>
        body { display: flex; justify-content: center; align-items: center; height: 100vh; }
        .login-box { width: 300px; padding: 20px; border: 1px solid #ddd; }
        input { width: 100%; padding: 10px; margin: 10px 0; }
        button { width: 100%; padding: 10px; background: #007bff; color: #fff; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <div class="login-box">
        <h2>管理员登录</h2>
        <form id="loginForm">
            <input type="text" name="username" placeholder="用户名" required>
            <input type="password" name="password" placeholder="密码" required>
            <button type="submit">登录</button>
        </form>
    </div>
    <script>
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const response = await fetch('/admin/doLogin', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.code === 200) {
                window.location.href = '/admin/index';
            } else {
                alert(result.message);
            }
        });
    </script>
</body>
</html>
```

### 5.3 首页

创建 `app/view/admin/index/index.html`：

```html
{extend name="admin/layout" /}

{block name="title"}首页{/block}

{block name="content"}
<h1>数据统计</h1>
<div style="display: flex; gap: 20px; margin: 20px 0;">
    <div style="flex: 1; padding: 20px; background: #f5f5f5; border-radius: 5px;">
        <h3>总用户数</h3>
        <p style="font-size: 24px;">{$userCount}</p>
    </div>
    <div style="flex: 1; padding: 20px; background: #f5f5f5; border-radius: 5px;">
        <h3>活跃用户</h3>
        <p style="font-size: 24px;">{$activeUserCount}</p>
    </div>
    <div style="flex: 1; padding: 20px; background: #f5f5f5; border-radius: 5px;">
        <h3>管理员数</h3>
        <p style="font-size: 24px;">{$adminCount}</p>
    </div>
</div>
{/block}
```

### 5.4 用户列表

创建 `app/view/admin/user/index.html`：

```html
{extend name="admin/layout" /}

{block name="title"}用户管理{/block}

{block name="content"}
<h1>用户管理</h1>

<div style="margin: 20px 0;">
    <a href="/admin/user/create" class="btn">添加用户</a>
    <button class="btn btn-danger" onclick="batchDelete()">批量删除</button>
</div>

<table>
    <thead>
        <tr>
            <th><input type="checkbox" id="selectAll"></th>
            <th>ID</th>
            <th>姓名</th>
            <th>邮箱</th>
            <th>手机</th>
            <th>状态</th>
            <th>创建时间</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
        {volist name="users" id="user"}
        <tr>
            <td><input type="checkbox" class="user-checkbox" value="{$user.id}"></td>
            <td>{$user.id}</td>
            <td>{$user.name}</td>
            <td>{$user.email}</td>
            <td>{$user.phone}</td>
            <td>
                <span class="status-{$user.id}">{$user.status == 1 ? '正常' : '禁用'}</span>
                <button onclick="toggleStatus({$user.id})">切换</button>
            </td>
            <td>{$user.created_at}</td>
            <td>
                <a href="/admin/user/edit/{$user.id}" class="btn">编辑</a>
                <button class="btn btn-danger" onclick="deleteUser({$user.id})">删除</button>
            </td>
        </tr>
        {/volist}
    </tbody>
</table>

<div>{$users->render()}</div>

<script>
function deleteUser(id) {
    if (confirm('确定要删除吗？')) {
        fetch('/admin/user/delete/' + id, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    location.reload();
                } else {
                    alert(data.message);
                }
            });
    }
}

function batchDelete() {
    const checked = document.querySelectorAll('.user-checkbox:checked');
    const ids = Array.from(checked).map(cb => cb.value);
    if (ids.length === 0) {
        alert('请选择要删除的用户');
        return;
    }
    if (confirm('确定要删除选中的用户吗？')) {
        fetch('/admin/user/batchDelete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids })
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                location.reload();
            } else {
                alert(data.message);
            }
        });
    }
}

function toggleStatus(id) {
    const statusEl = document.querySelector('.status-' + id);
    const currentStatus = statusEl.textContent === '正常' ? 1 : 0;
    const newStatus = currentStatus === 1 ? 0 : 1;
    
    fetch('/admin/user/updateStatus/' + id, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(data => {
        if (data.code === 200) {
            statusEl.textContent = newStatus === 1 ? '正常' : '禁用';
        } else {
            alert(data.message);
        }
    });
}
</script>
{/block}
```

## 第六步：配置路由

编辑 `route/app.php`：

```php
<?php
use think\facade\Route;

// 后台路由组
Route::group('admin', function () {
    // 登录
    Route::get('login', 'admin.Auth/login');
    Route::post('doLogin', 'admin.Auth/doLogin');
    Route::get('logout', 'admin.Auth/logout');
    
    // 首页
    Route::get('index', 'admin.Index/index');
    
    // 用户管理（需要认证）
    Route::group(function () {
        Route::get('user/index', 'admin.User/index');
        Route::get('user/create', 'admin.User/create');
        Route::post('user/store', 'admin.User/store');
        Route::get('user/edit/:id', 'admin.User/edit');
        Route::post('user/update/:id', 'admin.User/update');
        Route::post('user/delete/:id', 'admin.User/delete');
        Route::post('user/batchDelete', 'admin.User/batchDelete');
        Route::post('user/updateStatus/:id', 'admin.User/updateStatus');
    })->middleware(\app\middleware\AdminAuth::class);
})->prefix('admin/');
?>
```

## 第七步：启动服务

```bash
php think run
```

或

```bash
php -S localhost:8000 -t public
```

## 第八步：访问系统

### 8.1 访问登录页面

```
http://localhost:8000/admin/login
```

### 8.2 登录

使用默认管理员账号：
- 用户名：`admin`
- 密码：`admin123`

### 8.3 访问首页

登录成功后自动跳转到：

```
http://localhost:8000/admin/index
```

### 8.4 访问用户管理

```
http://localhost:8000/admin/user/index
```

## 常见问题

### 问题 1：Session 不工作

**解决方案：**
- 检查 `runtime` 目录权限
- 确保 Session 配置正确

### 问题 2：中间件不生效

**解决方案：**
- 检查中间件注册是否正确
- 确保路由配置正确

## 下一步

完成 ThinkPHP 学习后，开始学习 PHP 进阶内容 → [设计模式](/advanced/design-patterns)
