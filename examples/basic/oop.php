<?php
/**
 * 面向对象编程示例
 */

class Person
{
    public $name;
    public $age;
    
    public function __construct($name, $age)
    {
        $this->name = $name;
        $this->age = $age;
    }
    
    public function greet()
    {
        return "Hello, I'm {$this->name}, {$this->age} years old.";
    }
}

// 创建对象
$person = new Person("John", 25);
echo $person->greet() . "\n";
?>
