// 这里用户配置单个模块下, 单个页面获取详情数据的地方

export enum systemEnumUrl {
  systemRouterItem = '/url'
}

export enum getItemUrl {
  baseConfig = '/cms/config/get', // 基础配置
  resourceKeyword = '/cms/keyword/getKeyword', // 关键词
  resourceClassify = '/cms/classify/getClassify', // 分类管理
  payItem = '/cms/userPay/getPay', // 订单管理
  purseItem = '/cms/userPurse/getPurse', // 用户钱包
  userItem = '/cms/userInfo/show', // 用户操作记录
  seriesItem = '/cms/series/getSeries', // 系列管理
  functionItem = '/cms/function/explain/getExplain', // 功能说明
  functionTypeItem = '/cms/function/type/getFunctionType', // 功能说明分类
  companionItem = '/cms/companion/getCompanion', // 使用指南
  questionItem = '/cms/question/getQuestion', // 问题管理
  questionTypeItem = '/cms/question/type/getQuestionType', // 问题类型管理
  topicItem = '/cms/topic/getTopic', // 专题管理
  bannerItem = '/cms/ad/banner/getBanner', //栏目广告
  resourceCenterItem = '/cms/mold/get', // 资源管理中心类型属性
  u3dItem = '/cms/mold/getSource', // 资源管理中心u3d文件
  relevanceItem = '/cms/mold/getPrep', // 资源管理中心相关关联
  homeSeriesItem = '/cms/index/getLanguage', // 首页分类管理
  homeIndexItem = '/cms/index/getIndex', // 首页管理
  versionItem = '/cms/version/getVersion', //版本管理
  goodItem = '/cms/goods/getGoods', // 资源商品
  goodsManagementItem = '/cms/newGoods/getGoods', // 商品管理
  descriptionItem = '/cms/description/getDescription',
  contentCenterItem = '/cms/feels/getFeels',
  painterLibraryItem = '/cms/painter/author/getAuthor',
  painterTopicItem = '/cms/painter/index/getIndex',
  entityItem = '/cms/course/entity/getEntity', // 实体详情
  organizationItem = '/cms/user/org/getOrg', // 机构组织
  courseCategoryItem = '/cms/course/category/getCategory', // 课程分类详情
  // 课程管理模块
  courseManagementItem = '/cms/course/management/getManagement',
  courseManagementRealItem = '/cms/course/management/getRel',
  courseLessonItem = '/cms/course/lesson/getLesson',
  courseTimeItem = '/cms/course/lesson/getLesson',
  courseSeriesItem = '/cms/index/getLanguage', // 系列管理
  courseHomeItem = '/cms/index/getIndex',
  courseHomeContentItem = '/cms/index/getCourseOne', // 课程首页内容设置
  courseBannerItem = '/cms/ad/banner/getBanner',
  // 活动中心
  redeemCodeItem = '/cms/act/box/getBox', //兑换码使用详细
  giftItem = '/cms/coupon/getCoupon', // 好礼券详情
  giftCertificateFragmentItem = '/cms/chip/getRecords' // 好礼碎片
}
