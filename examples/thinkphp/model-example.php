<?php
/**
 * ThinkPHP 模型示例
 */

namespace app\model;

use think\Model;

class User extends Model
{
    protected $table = 'users';
    protected $pk = 'id';
    
    // 关联关系
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    
    // 查询作用域
    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }
}
