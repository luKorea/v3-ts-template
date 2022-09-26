
# vue3 + ts + element-plus 通用后台模板
# 公用页面划分
  1. 侧边国家划分
  2. 富文本编辑器
  3. 表格
  4. 表单
  5. 视频播放器
  6. 图片上传
# 功能需求
  1. 表格排序 sortable
  2. 富文本编辑器 wangeditor
# 插件
  1. tailwindcss插件

     ```shell
     1. npm install -D tailwindcss@latest postcss@latest autoprefixer@latest (安装 Tailwind 以及其它依赖项)
     2. npx tailwindcss init -p (生成 tailwind.config.js 和 postcss.config.js 文件)
     ```

  2. animate.css 动画库

  3. vxe-table 可编辑表格

  4. VueDragger 可拖拽

  2. Sortable 排序
# 该系统大致按钮权限划分
  1. 新增
  2. 编辑
  3. 查询
  4. 删除
  5. 分配（权限角色分配）
  6. 个性化按钮 (根据HyTable编写，不走page-content)
  7. 操作日志
  8. 导出
  9. 批量操作
  10. 表格拖拽
# 数据请求规范
  1. 所有数据存储到store中，划分不同模块
  2. 每个模块具体大致格式如下
          1. state: {存储当前页所需数据}
        2. getter: {通过getter获取数据}
      1. action: {
            封装公用action, 根据用户传入不同的pageName，请求不用的api地址，所有API地址放到service/apiList.ts中，
          action: add/remove/update/query 操作}
          4. mutations: {将获取到的数据设置到state中}

# 页面划分
  1. assets 静态资源文件
  2. base-ui 多项目公用组件
  3. components 当前项目组件
  4. global 全局注册
  5. hooks 公用hooks
  6. router 路由
  7. service 接口请求
  8. types 公用类型
  9. utils 工具函数
  10. views 视图
        11. store vuex
              1. system/ system.ts type.ts

# 项目上线打包优化
  1. npm install uglifyjs-webpack-plugin --save-dev （去除打印以及注释）
