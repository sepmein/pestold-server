FORMAT: 1A
HOST: http://api.pestold.com

# Pestold API
**Pestold**，更好的病媒生物控制服务。

# Group Authentication
认证

## 身份认证 [/authentication]

### 发送认证请求 [POST]

+ Request 用户登陆 (application/json)
用户登陆，客户端向服务器发送用户名，密码。

    + Headers

            userName: name
            password: pass

+ Response 200 (application/json)
登陆成功，服务器返回登陆状态、用户及token

    + Body

            {
                status: 'ok',
                user: user,
                token: token
            }

+ Response 403 (application/json)
用户名或密码出现错误，登陆失败

    + Body

            {
                status: 'error',
                message: '用户名或密码错误'
            }

+ Response 500 (application/json)
服务器内部错误

    + Body

            {
                status: 'error',
                message: '服务器错误'
            }

## 注册 [/signup]

### 提交注册请求 [POST]

+ request

    + headers

            email: 'test@test.com'
            password: 'password'
            isPro: 1

+ response 201 (application/json)
成功提交请求

    + body

            {
                email: 'test@test.com',
                token: 'token',
                message: 'created'
            }

+ response 403 (application/json)
用户重复

    + body

            {
                message: 'user already existed'
            }

# Group Lab
为实验室人员在提供方便的服务。

## 配方 [/recipe/{id}]
储存了实验室的用药配方，方便下次调取

### 读取配方 [GET]

+ parameters
    + id (required, number, `123`) ... 配方id

+ response 200 (application/json)

    + body

            {
                method: '等差',
                originalMedicine: '溴氰菊酯',
                createdAt: '2014-10-10'
                createdBy: uid,
                lastModification: '2014-10-15'
            }

+ response 404 (application/json)

    + body

            {
                message: '该配方目前不存在'
            }

### 新建配方 [PUT]

+ request 新建配方 (application/json)

+ response 201 (application/json)

### 修改配方 [POST]

+ parameters
    + id (required, number, `123`) ... 配方id

+ request 本人创建的配方 (application/json)

    + body

            {
                token: token,
                recipe: recipe
            }

+ response 200 (application/json)

+ request unAuth (application/json)
未认证的用户

    + body

            {
                recipe: recipe
            }


+ response 401 (application/json)
无法修改非本人创建的配方

    + body

            {
                message: '配方不是由你创建的'
            }

### 删除配方 [DELETE]

+ parameters
    + id (required, number, `123`) ... 配方id

+ request (application/json)
删除配方时需要提交用户token，否则删除失败

    + header

            token: token

+ response 200 (application/json)

    + body

            {
                message: '配方删除成功'
            }

+ response 401 (application/json)
无法删除非本人创建的配方

    + body

            {
                message: '配方不是由你创建的'
            }

# Group PCO
查看有害生物防制机构的信息，虫害防制

# Group DR
DR：data & report system。DR，数据及报告系统，提供数据网络上报、分析及自动报告功能。

# Group User
用户相关的资源。

## 用户信息 [/user/{id}]

+ Parameters
    + id (required, number, `1234`) ... id of a user.

### 获得用户信息 [GET]

+ response 200 (application/json)

    + body

            {
                user: {
                    email: 'test@test.com'
                    isPro: true
                }
            }
