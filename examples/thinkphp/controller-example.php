<?php
/**
 * ThinkPHP 控制器示例
 */

namespace app\controller;

use app\model\User;
use think\Request;

class UserController
{
    public function index()
    {
        $users = User::select();
        return json(['code' => 200, 'data' => $users]);
    }
    
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return json(['code' => 404, 'message' => 'Not Found'], 404);
        }
        return json(['code' => 200, 'data' => $user]);
    }
    
    public function create(Request $request)
    {
        $data = $request->post();
        $user = User::create($data);
        return json(['code' => 201, 'data' => $user], 201);
    }
}
