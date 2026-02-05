# 观察者模式

观察者模式定义对象间一对多的依赖关系，当一个对象状态改变时，所有依赖它的对象都会得到通知。

## 实现

```php
<?php
interface Observer
{
    public function update($data);
}

interface Subject
{
    public function attach(Observer $observer);
    public function detach(Observer $observer);
    public function notify();
}

class NewsSubject implements Subject
{
    private $observers = [];
    private $news;
    
    public function attach(Observer $observer)
    {
        $this->observers[] = $observer;
    }
    
    public function detach(Observer $observer)
    {
        $key = array_search($observer, $this->observers);
        if ($key !== false) {
            unset($this->observers[$key]);
        }
    }
    
    public function notify()
    {
        foreach ($this->observers as $observer) {
            $observer->update($this->news);
        }
    }
    
    public function setNews($news)
    {
        $this->news = $news;
        $this->notify();
    }
}

class EmailObserver implements Observer
{
    public function update($data)
    {
        echo "发送邮件: $data\n";
    }
}
?>
```

## 使用

```php
<?php
$news = new NewsSubject();
$news->attach(new EmailObserver());
$news->setNews("重要新闻");
?>
```

## 下一步

学习 MVC 模式深入 → [MVC 模式深入](/advanced/mvc)
