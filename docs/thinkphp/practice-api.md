# 实战：API 开发

本章介绍如何使用 ThinkPHP 开发完整的 RESTful API，从环境搭建到测试访问。

## 项目需求

开发一个用户管理 API，包含：
- 用户列表查询
- 用户详情查询
- 用户创建
- 用户更新
- 用户删除
- API 认证

## 第一步：环境准备

### 1.1 创建项目

```bash
composer create-project topthink/think api-demo
cd api-demo
```

### 1.2 准备数据库

```sql
CREATE DATABASE api_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
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
            'database' => 'api_db',
            'username' => 'root',
            'password' => 'your_password',
            'charset' => 'utf8mb4',
        ],
    ],
];
?>
```

## 第二步：创建模型

创建 `app/model/User.php`：

```php
<?php
namespace app\model;

use think\Model;

class User extends Model
{
    protected $table = 'users';
    protected $pk = 'id';
    
    // 时间字段自动处理
    protected $autoWriteTimestamp = true;
    
    // 允许批量赋值的字段
    protected $field = ['name', 'email', 'age'];
}
?>
```

## 第三步：创建 API 控制器

创建 `app/controller/api/User.php`：

```php
<?php
namespace app\controller\api;

use app\model\User as UserModel;
use think\Request;
use think\facade\Validate;

class User
{
    // 统一响应 Trait
    use \app\controller\traits\ApiResponse;
    
    /**
     * 获取用户列表
     * GET /api/users
     */
    public function index(Request $request)
    {
        $page = $request->param('page', 1);
        $limit = $request->param('limit', 10);
        
        $users = UserModel::paginate([
            'list_rows' => $limit,
            'page' => $page,
        ]);
        
        return $this->success($users);
    }
    
    /**
     * 获取用户详情
     * GET /api/users/:id
     */
    public function read($id)
    {
        $user = UserModel::find($id);
        
        if (!$user) {
            return $this->error('用户不存在', 404);
        }
        
        return $this->success($user);
    }
    
    /**
     * 创建用户
     * POST /api/users
     */
    public function save(Request $request)
    {
        $data = $request->post();
        
        // 验证数据
        $validate = Validate::rule([
            'name' => 'require|max:100',
            'email' => 'require|email|unique:users',
            'age' => 'number|between:1,150',
        ]);
        
        if (!$validate->check($data)) {
            return $this->error($validate->getError(), 400);
        }
        
        $user = UserModel::create($data);
        
        return $this->success($user, '创建成功', 201);
    }
    
    /**
     * 更新用户
     * PUT /api/users/:id
     */
    public function update(Request $request, $id)
    {
        $user = UserModel::find($id);
        
        if (!$user) {
            return $this->error('用户不存在', 404);
        }
        
        $data = $request->post();
        
        // 验证数据
        $validate = Validate::rule([
            'name' => 'max:100',
            'email' => 'email|unique:users,email,' . $id,
            'age' => 'number|between:1,150',
        ]);
        
        if (!$validate->check($data)) {
            return $this->error($validate->getError(), 400);
        }
        
        $user->save($data);
        
        return $this->success($user, '更新成功');
    }
    
    /**
     * 删除用户
     * DELETE /api/users/:id
     */
    public function delete($id)
    {
        $user = UserModel::find($id);
        
        if (!$user) {
            return $this->error('用户不存在', 404);
        }
        
        $user->delete();
        
        return $this->success(null, '删除成功');
    }
}
?>
```

## 第四步：创建 API 响应 Trait

创建 `app/controller/traits/ApiResponse.php`：

```php
<?php
namespace app\controller\traits;

trait ApiResponse
{
    /**
     * 成功响应
     */
    protected function success($data = [], $message = 'success', $code = 200)
    {
        return json([
            'code' => $code,
            'message' => $message,
            'data' => $data,
            'timestamp' => time()
        ], $code);
    }
    
    /**
     * 错误响应
     */
    protected function error($message = 'error', $code = 400, $data = [])
    {
        return json([
            'code' => $code,
            'message' => $message,
            'data' => $data,
            'timestamp' => time()
        ], $code);
    }
}
?>
```

## 第五步：配置路由

编辑 `route/app.php`：

```php
<?php
use think\facade\Route;

// API 路由组
Route::group('api', function () {
    // RESTful 资源路由
    Route::resource('users', 'api/User');
    
    // 或者手动定义路由
    // Route::get('users', 'api.User/index');
    // Route::get('users/:id', 'api.User/read');
    // Route::post('users', 'api.User/save');
    // Route::put('users/:id', 'api.User/update');
    // Route::delete('users/:id', 'api.User/delete');
})->header('Access-Control-Allow-Origin', '*')
  ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  ->header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
?>
```

## 第六步：配置跨域（可选）

如果需要支持跨域，创建中间件 `app/middleware/Cors.php`：

```php
<?php
namespace app\middleware;

class Cors
{
    public function handle($request, \Closure $next)
    {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type,Authorization');
        
        if ($request->method(true) == 'OPTIONS') {
            return response('', 200);
        }
        
        return $next($request);
    }
}
?>
```

在 `app/middleware.php` 中注册：

```php
<?php
return [
    \app\middleware\Cors::class,
];
?>
```

## 第七步：启动服务

### 7.1 启动开发服务器

```bash
php think run
```

服务器将在 `http://localhost:8000` 启动。

### 7.2 或使用 PHP 内置服务器

```bash
php -S localhost:8000 -t public
```

## 第八步：测试 API

### 8.1 使用 cURL 测试

#### 获取用户列表

```bash
curl http://localhost:8000/api/users
```

#### 获取用户详情

```bash
curl http://localhost:8000/api/users/1
```

#### 创建用户

```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25
  }'
```

#### 更新用户

```bash
curl -X PUT http://localhost:8000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "age": 30
  }'
```

#### 删除用户

```bash
curl -X DELETE http://localhost:8000/api/users/1
```

### 8.2 使用 Postman 测试

1. 打开 Postman
2. 创建新的请求
3. 设置请求方法和 URL
4. 对于 POST/PUT 请求，在 Body 中选择 raw 和 JSON
5. 发送请求

### 8.3 使用浏览器测试

在浏览器中直接访问 GET 请求：

```
http://localhost:8000/api/users
```

## 第九步：API 认证（可选）

### 9.1 创建 Token 中间件

创建 `app/middleware/Auth.php`：

```php
<?php
namespace app\middleware;

class Auth
{
    public function handle($request, \Closure $next)
    {
        $token = $request->header('Authorization');
        
        if (!$token || !$this->validateToken($token)) {
            return json([
                'code' => 401,
                'message' => '未授权',
                'data' => []
            ], 401);
        }
        
        return $next($request);
    }
    
    private function validateToken($token)
    {
        // 简单的 Token 验证逻辑
        // 实际项目中应使用 JWT 或其他认证方式
        $validToken = 'your-secret-token';
        return $token === $validToken;
    }
}
?>
```

### 9.2 应用中间件到路由

```php
<?php
use think\facade\Route;

Route::group('api', function () {
    Route::resource('users', 'api/User');
})->middleware(\app\middleware\Auth::class);
?>
```

### 9.3 测试认证

```bash
curl http://localhost:8000/api/users \
  -H "Authorization: your-secret-token"
```

## 第十步：API 文档

### 10.1 响应格式

所有 API 响应遵循统一格式：

**成功响应：**
```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": 1234567890
}
```

**错误响应：**
```json
{
  "code": 400,
  "message": "错误信息",
  "data": {},
  "timestamp": 1234567890
}
```

### 10.2 API 端点列表

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/users | 获取用户列表 |
| GET | /api/users/:id | 获取用户详情 |
| POST | /api/users | 创建用户 |
| PUT | /api/users/:id | 更新用户 |
| DELETE | /api/users/:id | 删除用户 |

## 常见问题

### 问题 1：路由 404

**解决方案：**
- 检查路由配置是否正确
- 确保使用正确的 HTTP 方法
- 检查 URL 路径是否正确

### 问题 2：跨域问题

**解决方案：**
- 配置 CORS 中间件
- 或在路由中设置响应头

### 问题 3：JSON 解析错误

**解决方案：**
- 确保请求头包含 `Content-Type: application/json`
- 检查 JSON 格式是否正确

## 下一步

- 学习后台管理系统 → [实战：后台管理](/thinkphp/practice-admin)
- 深入学习 → [PHP 进阶](/advanced/design-patterns)
