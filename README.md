# gallerybyReact
galleryByReact项目<br />
## 项目概览
预览链接：https://lihuichao520.github.io/gallerybyReact/ <br />

画廊页面基本需求：
- 所有图片在每次刷新网页时，随机排布于页面，其中一张图片位于中心位置，其余图片在一定角度范围内随机旋转排布
- 位于中心位置的图片，点击该图片可以实现图片翻转
- 点击非中心图片，非中心图片切换到中心图片位置
- 导航栏：
  - 圆点导航栏与中心图片相对应，并呈现放大状态，其余正常态
  - 点击中心图片，中心图片和对应圆点导航实现翻转
  - 点击中心图片对应的圆点导航，中心图片和圆点导航翻转
  - 点击其余圆点导航，与圆点导航对应的图片居中
## 项目介绍
- 使用Yeoman搭建项目，生成项目文件、代码结构
- 使用webpack前端自动化工具，并进行打包
- 使用react+ES6框架实现页面制作
- 使用Git进行项目托管，并把项目发布到gh-pages分支
- 使用React调试工具React Developer Tool帮助调试，完成开发
- 使用json存储所需数据
- 使用HTML5新增标签，如`<section>、<figure>、<figcaption>、<nav>`等
- 使用CSS3的transfrom属性实现缩放，平移、旋转等效果，使用transition属性实现transform，背景色的逐渐过渡效果
- 使用iconfont字体文件代替图片文件，拉伸不变形，颜色可自行更换，支持CSS3对字体的修饰效果

## 使用Yeoman搭建React项目的环境要求
```bash
# 配置好Node环境并安装npm（新版自带）

# 安装Git

# 安装Yeoman，Brower,Grunt.
  例如：安装脚手架工具Yeoman
  npm install -g yo
  yo --version(查看版本)
# 安装generator
  
  npm install -g generator-react-webpack 
  npm ls -g --depth=1 2>/dev/null | grep generator-(查看generator版本的命令)
# 给程序找个托身之地Github。用Github创建仓库，并且用git clone命令拷贝到本地（也可以在本地建立一个工程文件夹）

# 运行generator
  yo react-webpack 
  Please choose your application name (galleryProject)
  直接回车即可
  Which style language do you want to use? 
  sass 这个地方会有几个选项，选sass
  Enable postcss? (y/N) 这个要选y（yes）

# 接下来就可以开始进行项目开发
  npm start 或者是 npm run serve
```



##  进行开发前的注意事项
- post-css选为yes,是因为autoprefixer-loader（根据兼容性自动给CSS加私有前缀） is deprecated
- .eslintrc文件里面可以加一些代码检查<br>
   加强制分号结尾<br>
   "semi":[2,"always"],
   
 ## 新老版本之间的差异（主要是体现新版本）
 - 目录结构：新版本没有了gruntfile.js和webpack.dist.config.js。新版react-webpack将webpack开发的基本配置信息都放到了cfg目录下.<br>
   dist.js自然就是对应老版的webpack.dist.config.js
 - 新版本获取json数据：<br>
   在cfg文件下的default.js中添加json-loader：<br>
                      {<br>
                          test:/\.json/,<br>
                          loader:'json-loader'<br>
                      }<br>
   在读取json数据时避免读不到数据，加前缀json！ <br>
                require('json!../data/**.json')
                
- 最新版本中在组件内部查找DOM节点的方式：<br>
    	   	import ReatDOM from 'react-dom';<br>
    	   	ReactDOM.findDOMNode(...)
- 在ES6中，class中的方法不再自动绑定到实例上。可以有两种解决方法：<br>
    	直接在constructor中进行绑定。例如：this.handleClick = this.handleClick.bind(this);
    	   	        <br>
    	 也可以通过在属性里一次绑定 `<ImgFigrue onClick={this.handleClick.bind(this)}>`;
   
- 新版对数组可以利用map函数进行遍历
- 新版中，react.Component中函数与函数之间间隔是不需要逗号作为分割，函数与函数之间啥符号也没有。
  	<br>
  react.createClass中的函数与函数之间间隔是需要用到逗号
  
## 剩余项目流程
- uild the dist version and copy static files，即dist文件的编译，执行<br>
                         npm run dist
- 在git下可以随时用ctrl+c终止操作

## 将代码托管到Github上
 - git init
 - git remote add origin git@github.com:****/***.git<br>
 	/前后分别代表注册的用户名和你为这个项目建立的仓库名
 - git pull git@github.com:****/***.git<br>
 	同上
 - 把项目上传到Github上<br>
 	git add ***<br>
 	***表示项目名<br>
  可以用git add -A
 - git commit -m "本次提交做了哪些更新，提交内容的大致信息"
 - git push git@github.com:****/***.git<br>
  同上<br/>
 	完成上传
  
## 将项目发布到github-pages上
#####  git步骤命令
    - git add dist
    - git commit -m "提交信息"
    - git subtree push --prefix=dist origin gh-pages
##### 成功发布到gh-pages,打开gh-pages的预览地址，发现app.js文件找不到404.因为在本地编译时，由于运行时是在根目录，可以写绝对路径 
    但在生成的网页中，项目处于二级目录下，需要将编译后的绝对地址改为相对地址
    - 解决方法：
      将defalut.js中的publicPath：'/assets/..'改为publicPath:'assets/...'或是'项目名/assets/..'
      一开始自己解决是直接将src下的index.html中的<script type="text/javascript" src="../assets/app.js">改为了src="assets/app.js"
#####  图片没有编译到dist目录
    app.js找到之后，却又发现图片都找不到404。打开package.json文件中的scripts：
                     "serve": "node server.js --env=dev",
                     "serve:dist": "node server.js --env=dist",
                     "dist": "npm run copy &amp; webpack --env=dist",
                     "lint": "eslint ./src",
                     "copy": "copyfiles -f ./src/index.html ./src/favicon.ico ./dist",
                     git界面上输入npm run serve:dist
                     将项目发布到github-pages上的内容就是dist文件夹下的内容。
                     而执行了npm run dist命令后，其中的npm run copy &amp;webpack ，其中copy脚本命令里的内容只有上述显示的，并没有需要展示的图片。所以问题就在于运行npm run dist
                     时没有把images目录复制到dist目录下。
                    
                     解决方法：
                       
                    将copy命令改为："copy": "copyfiles -f ./src/index.html ./src/favicon.ico ./src/images ./dist",
#####  终端重新编译dist然后提交

## 项目开发中的心得

- 闭包函数的this问题，this在闭包中会有全局性，因此可以通过bind来设定this
- 使用Iconfont，字体文件代替图片文件展示图标
- Iconfont的体积更小,是矢量图，拉伸不变形，颜色可自行更换，支持CSS3对字体的修饰效果<br>使用的同时要在cfg文件中加入对eot，ttf，svg的支持
- 屏幕渲染机制有两种：<br>

                    1.灰阶渲染：控制边缘亮度，所耗内存相对较低，应用于手机
                    2.亚像素渲染：效果更好，所耗内存相对更高，应用于Mac等
      
       
