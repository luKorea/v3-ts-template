export const listData = `
├── README.md
├── babel.config.js
├── commitlint.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── lib
│   │   ├── aliyun-upload-sdk-1.5.3.min.js
│   │   └── lib
│   │       ├── aliyun-oss-sdk-6.17.1.min.js
│   │       └── es6-promise.min.js
│   └── loading.gif
├── push.sh
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── css
│   │   │   ├── base.css
│   │   │   ├── base.less
│   │   │   ├── index.less
│   │   │   └── transition.less
│   │   └── img
│   │       ├── login-bg.jpeg
│   │       ├── login-bg.png
│   │       ├── login-bg.svg
│   │       └── logo.svg
│   ├── base-ui
│   │   ├── breadcrumb
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── breadcrumb.vue
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── card
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── card.vue
│   │   ├── count-up
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── countup.vue
│   │   ├── descriptions
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── descriptions.vue
│   │   │   └── types
│   │   │       └── types.ts
│   │   ├── echart
│   │   │   ├── data
│   │   │   │   └── china.json
│   │   │   ├── hooks
│   │   │   │   └── useEchart.ts
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── base-echart.vue
│   │   ├── editor
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── color.ts
│   │   │       ├── components
│   │   │       │   ├── bgColorMenu.ts
│   │   │       │   └── colorMenu.ts
│   │   │       ├── editor.vue
│   │   │       └── editorOSS.vue
│   │   ├── form
│   │   │   ├── index.ts
│   │   │   ├── src
│   │   │   │   └── form.vue
│   │   │   └── types
│   │   │       └── index.ts
│   │   ├── image
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── image.vue
│   │   ├── pagination
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── pagination.vue
│   │   ├── preview-video
│   │   │   ├── hook
│   │   │   │   └── use-video-show.ts
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── preview-video.vue
│   │   ├── table
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── table copy.vue
│   │   │       └── table.vue
│   │   ├── upload
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── draggerUpload.vue
│   │   │       ├── ossUpload.vue
│   │   │       ├── upload-video.vue
│   │   │       ├── upload.vue
│   │   │       ├── uploadFile.vue
│   │   │       └── uploadSetup.vue
│   │   └── video
│   │       ├── index.ts
│   │       └── src
│   │           └── video.vue
│   ├── components
│   │   ├── nav-header
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── config
│   │   │       │   └── content.config.ts
│   │   │       ├── nav-header.vue
│   │   │       └── user-info.vue
│   │   ├── nav-menu
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── nav-menu-item.vue
│   │   │       └── nav-menu.vue
│   │   ├── nav-tags
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── nav-tags.vue
│   │   ├── page-content
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-content.vue
│   │   ├── page-content-coulmn
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-content.vue
│   │   ├── page-country
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-country.vue
│   │   ├── page-dialog
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-dialog.vue
│   │   ├── page-form
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-form.vue
│   │   ├── page-language
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-language.vue
│   │   ├── page-link
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-link.vue
│   │   ├── page-modal
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       ├── page-modal copy.vue
│   │   │       └── page-modal.vue
│   │   ├── page-search
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── page-search.vue
│   │   └── page-select-country
│   │       ├── index.ts
│   │       └── src
│   │           └── page-select-country.vue
│   ├── global
│   │   ├── index.ts
│   │   ├── register-element.ts
│   │   ├── register-global-component.ts
│   │   ├── register-properties.ts
│   │   └── register-vxe-table.ts
│   ├── hooks
│   │   ├── index.ts
│   │   ├── use-expiration-time.ts
│   │   ├── use-oss-config.ts
│   │   ├── use-page-dialog.ts
│   │   ├── use-page-form.ts
│   │   ├── use-page-language.ts
│   │   ├── use-page-modal.ts
│   │   ├── use-page-search.ts
│   │   ├── use-page-side-country.ts
│   │   ├── use-page-table-edit.ts
│   │   └── use-permission.ts
│   ├── index.css
│   ├── main.ts
│   ├── router
│   │   ├── index.ts
│   │   ├── login
│   │   │   └── index.ts
│   │   └── main
│   │       ├── oa
│   │       │   ├── permission
│   │       │   │   └── permission.ts
│   │       │   ├── role
│   │       │   │   └── role.ts
│   │       │   ├── router
│   │       │   │   └── router.ts
│   │       │   └── user
│   │       │       └── user.ts
│   │       └── other
│   ├── service
│   │   ├── common
│   │   │   ├── index.ts
│   │   │   └── item-api.ts
│   │   ├── common-api.ts
│   │   ├── index.ts
│   │   ├── item-api.ts
│   │   ├── login
│   │   │   ├── login.ts
│   │   │   └── type.ts
│   │   ├── main
│   │   │   ├── log.ts
│   │   │   └── system
│   │   │       ├── role.ts
│   │   │       └── user.ts
│   │   ├── request
│   │   │   ├── config.ts
│   │   │   ├── index.ts
│   │   │   └── type.ts
│   │   ├── types.ts
│   │   └── upload
│   │       └── index.ts
│   ├── shims-vue.d.ts
│   ├── store
│   │   ├── index.ts
│   │   ├── login
│   │   │   ├── login.ts
│   │   │   └── types.ts
│   │   ├── main
│   │   │   ├── other
│   │   │   └── system
│   │   │       ├── permission
│   │   │       │   ├── permission.ts
│   │   │       │   └── types.ts
│   │   │       ├── role
│   │   │       │   ├── role.ts
│   │   │       │   └── types.ts
│   │   │       ├── router
│   │   │       │   ├── router.ts
│   │   │       │   └── types.ts
│   │   │       └── user
│   │   │           ├── types.ts
│   │   │           └── user.ts
│   │   └── types.ts
│   ├── test.json
│   ├── types
│   │   ├── permission.ts
│   │   └── table-config.ts
│   ├── utils
│   │   ├── cache.ts
│   │   ├── date-format.ts
│   │   ├── deepClone.ts
│   │   ├── exportExcel.ts
│   │   ├── index.ts
│   │   ├── log.ts
│   │   ├── map-menus.ts
│   │   ├── select-list
│   │   │   └── map-resource-list.ts
│   │   ├── tip-info.ts
│   │   └── transition.ts
│   └── views
│       ├── link
│       │   └── index.vue
│       ├── login
│       │   ├── config
│       │   │   └── account-config.ts
│       │   ├── cpns
│       │   │   ├── login-account.vue
│       │   │   ├── login-panel.vue
│       │   │   └── login-phone.vue
│       │   └── login.vue
│       ├── main
│       │   ├── main.vue
│       │   └── oa
│       │       ├── permission
│       │       │   ├── config
│       │       │   │   ├── content.config.ts
│       │       │   │   ├── modal.config.ts
│       │       │   │   └── search.config.ts
│       │       │   ├── hook
│       │       │   │   └── user-page-list.ts
│       │       │   └── permission.vue
│       │       ├── role
│       │       │   ├── config
│       │       │   │   ├── content.config.ts
│       │       │   │   ├── modal.config.ts
│       │       │   │   └── search.config.ts
│       │       │   ├── hook
│       │       │   │   └── user-page-list.ts
│       │       │   └── role.vue
│       │       ├── router
│       │       │   ├── config
│       │       │   │   ├── content.config.ts
│       │       │   │   ├── modal.config.ts
│       │       │   │   └── search.config.ts
│       │       │   ├── hook
│       │       │   │   └── user-page-list.ts
│       │       │   └── router.vue
│       │       └── user
│       │           ├── config
│       │           │   ├── content.config.ts
│       │           │   ├── modal.config.ts
│       │           │   └── search.config.ts
│       │           ├── hook
│       │           │   └── user-page-list.ts
│       │           └── user.vue
│       └── not-found
│           └── not-found.vue
├── tailwind.config.js
├── tsconfig.json
└── vue.config.js
`
