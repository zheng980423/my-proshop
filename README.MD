# 全栈电子商城网站 - proshop

![proshop 的 设计图预览](./frontend/public/images/previews.jpg)

# Propshop

一个全栈电子商城项目

## 介绍

你好！ 👋

欢迎线上查看我的个人项目 [proshop](https://zwf-proshop.herokuapp.com/). 😀

欢迎探索我的项目! 😉

## 主要技术栈

**前端:** React, Redux, Material-ui

**后端:** Node, Express, MongoDB

## 综述

#### 项目所使用的技术

1. 前端构架

- 使用的框架为 React，主要用到了(`useState,useEffect,useRef`)等 Hooks,使用 React 完成项目的组件式开发
- 使用 React-Router-Dom 处理路由，使用(`Link,useHistory`)等 Hooks 处理自动跳转，匹配路由参数等
- 使用 Redux 管理项目状态，主要应用于管理前后交互的数据状态的管理，如商品详情获取，用户数据获取等等，使用的 Hooks 有(`useDispatch,useSelector`),数据处理的主要状态有三个(`loading,success,error`),Redux 使用的主要流程为(src 文件夹下：`constants=>reducers=>actions=>store.js`)
- Material-ui 是一个基于 React 的前端组件库，极大提高了组件开发的效率，主要使用的组价有(`Button、Container、Card、Message`等等)
- 使用 Formik 以及 Yup 处理表单提交，项目提供了完整的表单错误处理方案
- 项目具有良好的可访问性，使用了骨架屏(`skeletion`)组件来显示获取数据的过程
- 使用 json-web-server 进行后端接口的模拟以及联调
- 使用 axios 与后端进行接口联调，并处理前后端数据交互
- 使用 WebSocket 完成聊天室的模块建设
- 前端主要负责 MVC 框架中的 V(`View`)部分

2. 后端构架

- 后端使用的框架为 Node 以及 Express
- 使用 Node、Express 模块引擎，完成 RESTful API 的构建
- 使用 MongoDB Atlas 存储数据，MongoDB Atlas 是一个 nosql 数据库，库集合包括(product,user,review,order)等等
- 使用 JWT 完成用户注册，登录，权限管理的部分
- 使用 PayPal 完成线上支付
- 使用 node-mailer 库发送找回密码邮件
- 使用 Postman 完成接口调试工作
- 使用 concurrently 库 使前后端项目的同时运行
- 后端主要负责 MVC 框架中的 MC(`Model Controller`)部分

## 项目详情

1. 用户登录模块

- 用户注册或用户登录->用户登录成功
- 用户忘记密码->发送找回密码文件->从邮箱中点击找回密码邮件->修改密码->用户登录成功
- **用户未登录将无法购物**
  ![用户登录页面](./frontend/public/images/process/login.jpg)

2. 用户详情模块

- 用户登录成后可以去个人资料中心更改自己的个人信息，如姓名，性别，个性签名，密码等等
- 用户登录成功之后可以查看自己的个人订单信息，订单有未支付以及未发货两种状态
  ![用户订单页面](./frontend/public/images/process/myorder.png)

3. 商品详情模块

- 用户可以在主页中查看商品列表，可以搜索关键字或设置类别对商品进行筛选
- 点击商品，进入详情页面会显示商品的详情，价格，推荐指数，库存，数量，评论，以及推荐商品信息
- 用户可以在商品详情页进行评论
  ![商品详情界面](./frontend/public/images/process/productdetails.jpg)

4. 购物车模块

- 用户登录成功后，可以将商品加入购物车中
  ![购物车页面](./frontend/public/images/process/cart.jpg)
- 点击继续->填写邮寄信息->选择支付方式(默认为 PayPal)->确认订单详情->用户支付->支付成功->等待卖家发货
  ![商品下单页面](./frontend/public/images/process/placeorder.jpg)

5. 权限管理模块

- 管理员(`admin`)可以对商品进行修改，增加，删除工作，可以自行上传商品照片，默认为(`sample.jpg`)，也可以将已支付的订单设置成已发货
- 管理员(`admin`)可以对用户进行修改，增加，删除工作，可以自行上传用户的照片，默认为(`avatar.jpg`)，也可以修改用户信息

6. 商家入驻模块 🏗 建设中...

- 商家申请入驻->管理员同意->入驻商家可以上传商品->管理员确认商品质量后方可放入首页中显示

7. 聊天室模块 🏗 建设中...

- 用户点击其他用户头像，即可开启聊天室模块，使用 WebSocket 使得页面不需要刷新就可以实时获取到用户发送的最新信息。

8. 其他

- 首页会根据用户的喜好展示产品的轮播图
- 用户浏览网页时，可以使用右下角的返回顶部按钮
- 首页增加了定价、友情链接等组件。

![管理商品界面](./frontend/public/images/process/adminProducts.jpg)

## API 参考

#### 获取所有商品

```http
  GET /api/products
```

| 参数 | 类型 | 描述         |
| :--- | :--- | :----------- |
| `无` | `无` | 无需添加参数 |

#### 根据 id 获取单个商品

```http
  GET /api/products/${id}
```

| 参数 | 类型     | 描述                         |
| :--- | :------- | :--------------------------- |
| `id` | `string` | **必须**. 获取商品的 id 号码 |

#### 更多 API 详情,请访问 https://github.com/zheng980423

## 环境变量

为了运行此项目，您需要在主文件夹中添加.env 文件，并配置以下参数

`NODE_ENV=development`
`PORT = 5000`
`MONGO_URI = mongodb+srv://zwf1234:zwf1234@zwfproshop.dcdc6.mongodb.net/proshop-2?retryWrites=true&w=majority`
`JWT_SECRET=1231243532`
`PAYPAL_CLIENT_ID =请自行申请 PAYPAL_CLIENT_ID`
`SMTP_HOST=smtp.qq.com`
`SMTP_PORT = 465`
`SMTP_SERVICE=QQ`
`SMTP_EMAIL=你的QQ邮箱@qq.com`
`SMTP_PASSWORD=请前往QQ邮箱申请`
`FROM_EMAIL=你的QQ邮箱@qq.com`

## 运行项目

请使用以下指令运行项目

```bash
  npm install
  cd frontend
  npm install
  npm run dev
```

## 我从这个项目中学到的东西

深刻理解了前端工程化，组件化，深入认识了前后端分离模式，MVC 框架，增强了与 UI 设计师 和后端工程师的合作能力

丰富了前端工程化实践，以及后端开发经验,例如 ,在前端中使用了 Redux,处理数据交互的时候调试的时候更简单了，丰富了后端配置路由的实践，以及数据库设计优化。

同样意识到高效的写代码的重要性，以及写可以复用的代码的重要性, 尤其是当项目发展壮大的时候,简洁高效的代码能让项目变得轻松容易. 🙂

当项目功能越写越多的时候，写代码的时候有时候会很乱... 所以，代码有时并不那么简洁高效. 😥 我希望能提高自己，如果我的代码写的有问题的话欢迎向我反馈，谢谢! 👍

## 我希望能早点做的东西

- 拿到设计图的时候，应该充分进行规划，与 UI 工程师进行充分沟通，我应该认真规划再写代码，不急于马上上手，这样，在修改 CSS 代码的的时候就不会那么麻烦了
- 或许应该再细化一下大组件，把它们分割成更小的组件
- 如果项目早点使用 Redux 就好了，这样避免父传子，子传父的 props 过多，使用 Redux 能让调试的时候更轻松一点.

## 最后

都看到这里了，再次谢谢你，欢迎 STAR! 😊

祝：生活愉快!工作顺利! 😀
