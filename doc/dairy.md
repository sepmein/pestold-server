### 14-11-18
想把pestold做成一个病媒生物全功能平台。
开发方面，ide选用webstorm，基本完成环境搭建，目前开始着手架构的完善。

梳理已有的、可整合的功能：
上海市的pco服务厂商，一个实验室配药系统

需添加的功能：
数据上报分析系统

### 14-11-20
病媒生物从业生态链

系统管理员

疾控系统
市级病媒科科长，科员
区级病媒科科长，科员
社区条线人员
爱卫系统
市级爱卫办处长，副处长，科员
区级爱卫办科长，科员
协会
协会秘书长，副秘书长，科员

pco
pco负责人，员工

普通民众

权限梳理
pco：发布,修改关于本pco的信息
协会：确认，修改pco的信息

### 14-12-17
使用bluebird.promifyAll(mongoose)来使得mongoose支持promise。
遇到一个问题，就是返回的promise在使用yield时，错误处理的问题，如果不加以处理，例如用户的输入错误无法返回至用户，而是输出至std.err。

目前的解决方案：

```
    app.use(function*(){
        context = this
        result = yield User.saveAsync({user: 'test'}).catch(mongoose.Error, function(e){
            context.throw(e)
            })
    })
```

mongoose 3.9版本号称支持save返回promise，但是目前处于不稳定的状态，也可以采用