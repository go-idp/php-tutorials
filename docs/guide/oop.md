# 面向对象编程

面向对象编程（OOP）是一种编程范式，使用类和对象来组织代码。

## 类与对象

### 定义类

```php
<?php
class Person {
    // 属性
    public $name;
    public $age;
    
    // 方法
    public function greet() {
        return "Hello, I'm {$this->name}";
    }
}
?>
```

### 创建对象

```php
<?php
$person = new Person();
$person->name = "John";
$person->age = 25;

echo $person->greet();  // Hello, I'm John
?>
```

## 构造函数

```php
<?php
class Person {
    public $name;
    public $age;
    
    // 构造函数
    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }
}

$person = new Person("John", 25);
?>
```

## 析构函数

```php
<?php
class Person {
    public function __destruct() {
        echo "对象被销毁";
    }
}
?>
```

## 访问修饰符

- `public` - 公共的，任何地方都可以访问
- `protected` - 受保护的，只能在类内部和子类中访问
- `private` - 私有的，只能在类内部访问

```php
<?php
class Person {
    public $name;           // 公共属性
    protected $age;        // 受保护属性
    private $email;         // 私有属性
    
    public function getAge() {
        return $this->age;  // 可以访问
    }
}
?>
```

## 继承

```php
<?php
class Animal {
    public $name;
    
    public function eat() {
        return "{$this->name} is eating";
    }
}

class Dog extends Animal {
    public function bark() {
        return "Woof!";
    }
}

$dog = new Dog();
$dog->name = "Buddy";
echo $dog->eat();   // Buddy is eating
echo $dog->bark();  // Woof!
?>
```

## 方法重写

```php
<?php
class Animal {
    public function makeSound() {
        return "Some sound";
    }
}

class Dog extends Animal {
    public function makeSound() {
        return "Woof!";
    }
}

$dog = new Dog();
echo $dog->makeSound();  // Woof!
?>
```

## 静态属性和方法

```php
<?php
class Counter {
    public static $count = 0;
    
    public static function increment() {
        self::$count++;
    }
    
    public static function getCount() {
        return self::$count;
    }
}

Counter::increment();
Counter::increment();
echo Counter::getCount();  // 2
?>
```

## 常量

```php
<?php
class Math {
    const PI = 3.14159;
    
    public static function getPi() {
        return self::PI;
    }
}

echo Math::PI;           // 3.14159
echo Math::getPi();      // 3.14159
?>
```

## 抽象类

```php
<?php
abstract class Animal {
    abstract public function makeSound();
    
    public function eat() {
        return "Eating";
    }
}

class Dog extends Animal {
    public function makeSound() {
        return "Woof!";
    }
}
?>
```

## 接口

```php
<?php
interface Flyable {
    public function fly();
}

class Bird implements Flyable {
    public function fly() {
        return "Flying";
    }
}
?>
```

## 命名空间

```php
<?php
namespace App\Models;

class User {
    // ...
}
?>
```

## 下一步

深入学习命名空间 → [命名空间](/guide/namespaces)
