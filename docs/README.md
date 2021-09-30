# @idealjs/discuss 目标是什么

@idealjs/discuss 的目标是使用[现有的轮子](#技术栈)制作一个开源的、可快速搭建的、可配置的、小型的、论坛系统。

## 为什么要再造一个论坛（轮子）

- 现有论坛的部署方式复杂，不够简单。

  > 比如通常配置一个邮箱系统，需要专业人员进行部署。如果迁移还需要维护。不用邮箱，又没有办法通过后台新增用户。

- 探索一种新的权限、管理系统。

  > 标签化，给标签赋能，通过配置，减少运维复杂度。

## 技术功能

从开发人员角度出发，这套系统将包含

- 标签化
  - 用户标签化
  - 权限标签化
  - 标签的标签
- 配置化
  - 实名
  - 邮件
- 订阅
  - 标签级订阅
- 多端适配
  - 手机
  - 平板
  - 电脑
- 搜索引擎优化
- 站内数据搜索
- 接口化
  - restful
- 容器化
  - docker
  - k8s
- 微服务化
- 国际化

## 功能

从用户角度出发，这套系统将包含

- 文章
  - 编辑
  - 标签
  - 评论、回复
- 系统管理
  - 用户
  - 文章
  - 标签
- 订阅（标签级订阅）
  - 订阅用户
  - 订阅分类
- 搜索（标签级搜索）
  - 用户
  - 关键字
- 个人
  - 个人管理
    - 订阅者
  - 文章

## API 设计

- 发布订阅

  - 发布文章
  - 发布评论
  - 发布回复
  - 订阅

  ```typescript
  const post = buildPost(postOptions);
  publish(post);
  const comment = buildComment(commentOptions);
  publish(comment);
  const reply = buildReply(replyOptions);
  publish(reply);
  function publish(): IResult;
  function subscribe(...tags: ITag[]): IResult;
  function unsubscribe(...tags: ITag[]): IResult;
  ```

- 权鉴

  - 可权限
  - 非权限
  - 鉴权

  ```typescript
  const presetTag = "publish-post";
  const has = hasPermission(presetTag, [...Tags]);
  ```


## 技术栈

所使用的技术栈

- 搜索引擎 meilisearch
- nosql 数据库 mongodb
- 关系型数据库 pg
- 框架 next.js
  - 登录权鉴 next auth
  - 样式工具 tailwindcss
  - 接口 restful 风格
  - ORM prisma

## 标签权限系统

> 权限系统的目的是为了保护资源。或对资源读写隔离。

在标签权限系统中，权限与用户无直接关联。用户只有权限标签。为标签设置子标签，子标签获得该标签相同权限。为标签设置父标签，该标签获得父标签相同权限。

更复杂的场景，比如排除某些权限。作家 A 的作家`A标签`当前可以发布文章，并且编辑发布后的文章。为 `A标签` 设置父标签 `发布后不可编辑`。

其中核心逻辑为，在计算作家编辑权限时，通过标签间的关系，有限计算拥有 `否` 属性的权限，然后计算 `可` 属性权限。

## 快速入手开发

> 安装 nodejs yarn docker docker-compose

> [加速依赖安装](#加速依赖安装)

安装依赖，生成 prisma js 文件。

```shell
yarn
```

启动依赖服务。

```shell
yarn dev:deps
```

推送 prisma 结构到数据库。

```shell
prisma db push
```

打开 prisma 预览数据结构。

```shell
yarn prisma studio
```

启动开发服务。

```shell
yarn dev
```

访问 api 格式如 `http://localhost:3000/api/tags`

## 可选功能
- 邮件登录

## 加速依赖安装
- 删除 yarn.lock

- 添加 .npmrc

  **.npmrc**
  ```
  registry=https://registry.npm.taobao.org
  disturl=https://npm.taobao.org/dist
  sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
  phantomjs_cdnurl=https://npm.taobao.org/mirrors/phantomjs/
  electron_mirror=https://npm.taobao.org/mirrors/electron/
  chromedriver_cdnurl=https://npm.taobao.org/mirrors/chromedriver
  operadriver_cdnurl=https://npm.taobao.org/mirrors/operadriver
  selenium_cdnurl=https://npm.taobao.org/mirrors/selenium
  node_inspector_cdnurl=https://npm.taobao.org/mirrors/node-inspector
  fsevents_binary_host_mirror=http://npm.taobao.org/mirrors/fsevents/
  ```
