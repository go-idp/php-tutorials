# 工厂模式

工厂模式提供创建对象的接口，而不指定具体的类。

## 简单工厂

```php
<?php
class ProductFactory
{
    public static function create($type)
    {
        switch ($type) {
            case 'A':
                return new ProductA();
            case 'B':
                return new ProductB();
            default:
                throw new Exception("Unknown product type");
        }
    }
}
?>
```

## 工厂方法

```php
<?php
interface Product
{
    public function getName();
}

class ProductA implements Product
{
    public function getName() { return 'Product A'; }
}

class ProductB implements Product
{
    public function getName() { return 'Product B'; }
}

interface Factory
{
    public function createProduct(): Product;
}

class FactoryA implements Factory
{
    public function createProduct(): Product
    {
        return new ProductA();
    }
}
?>
```

## 抽象工厂

```php
<?php
interface AbstractFactory
{
    public function createProductA(): ProductA;
    public function createProductB(): ProductB;
}

class ConcreteFactory implements AbstractFactory
{
    public function createProductA(): ProductA
    {
        return new ProductA();
    }
    
    public function createProductB(): ProductB
    {
        return new ProductB();
    }
}
?>
```

## 下一步

学习观察者模式 → [观察者模式](/advanced/observer)
