"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[61],{99044:function(t,e,o){o.d(e,{Z:function(){return d}});var n=o(85893),c=o(67294),i=o(2734),a=o(5616),r=o(90948),s=o(41796);const l=(0,r.ZP)(a.Z)((t=>{let{theme:e,ownerState:o}=t;const n="light"===e.palette.mode,c="filled"===o.variant,i="outlined"===o.variant,a="soft"===o.variant,r={..."default"===o.color&&{...i&&{backgroundColor:"transparent",color:e.palette.text.primary,border:"1px solid ".concat((0,s.Fq)(e.palette.grey[500],.32))},...a&&{color:n?e.palette.text.primary:e.palette.common.white,backgroundColor:(0,s.Fq)(e.palette.grey[500],.16)}}},l={..."default"!==o.color&&{...c&&{color:e.palette[o.color].contrastText,backgroundColor:e.palette[o.color].main},...i&&{backgroundColor:"transparent",color:e.palette[o.color].main,border:"1px solid ".concat(e.palette[o.color].main)},...a&&{color:e.palette[o.color][n?"dark":"light"],backgroundColor:(0,s.Fq)(e.palette[o.color].main,.16)}}};return{height:24,minWidth:22,lineHeight:0,borderRadius:6,cursor:"default",alignItems:"center",whiteSpace:"nowrap",display:"inline-flex",justifyContent:"center",textTransform:"capitalize",padding:e.spacing(0,1),color:e.palette.grey[800],fontSize:e.typography.pxToRem(12),fontFamily:e.typography.fontFamily,backgroundColor:e.palette.grey[300],fontWeight:e.typography.fontWeightBold,...l,...r}}));var d=(0,c.forwardRef)(((t,e)=>{let{children:o,color:c="default",variant:r="soft",startIcon:s,endIcon:d,sx:p,...u}=t;const g=(0,i.Z)(),m={width:16,height:16,"& svg, img":{width:1,height:1,objectFit:"cover"}};return(0,n.jsxs)(l,{ref:e,component:"span",ownerState:{color:c,variant:r},sx:{...s&&{pl:.75},...d&&{pr:.75},...p},theme:g,...u,children:[s&&(0,n.jsxs)(a.Z,{sx:{mr:.75,...m},children:[" ",s," "]}),o,d&&(0,n.jsxs)(a.Z,{sx:{ml:.75,...m},children:[" ",d," "]})]})}))},70721:function(t,e,o){o.d(e,{$t:function(){return i},Wm:function(){return l},w$:function(){return s},wd:function(){return a},yf:function(){return r}});var n=o(65770),c=o(34155);c.env.HOST_API_KEY,c.env.FIREBASE_API_KEY,c.env.FIREBASE_AUTH_DOMAIN,c.env.FIREBASE_PROJECT_ID,c.env.FIREBASE_STORAGE_BUCKET,c.env.FIREBASE_MESSAGING_SENDER_ID,c.env.FIREBASE_APPID,c.env.FIREBASE_MEASUREMENT_ID,c.env.AWS_COGNITO_USER_POOL_ID,c.env.AWS_COGNITO_CLIENT_ID,c.env.AUTH0_CLIENT_ID,c.env.AUTH0_DOMAIN;const i=c.env.MAPBOX_API,a=n.vB.general.app,r=(c.env.POSTGRES_USERNAME,c.env.POSTGRES_PASSWORD,c.env.POSTGRES_HOST,c.env.POSTGRES_PORT,c.env.POSTGRES_DATABASE,{H_MOBILE:55,H_CITROS:55,H_MAIN_DESKTOP:88,H_DASHBOARD_DESKTOP:92,H_DASHBOARD_DESKTOP_OFFSET:60}),s={W_BASE:260,W_DASHBOARD:380,W_DASHBOARD_MINI:88,H_DASHBOARD_ITEM:48,H_DASHBOARD_ITEM_SUB:36,H_DASHBOARD_ITEM_HORIZONTAL:32},l={NAV_ITEM:24,NAV_ITEM_HORIZONTAL:22,NAV_ITEM_MINI:22}},65770:function(t,e,o){function n(t,e){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n="".concat(t).concat(e),c=[];for(const[i,a]of Object.entries(o))c.push("".concat(i,"=").concat(a));return 0==c.length?n:"".concat(n,"?").concat(c.join("&"))}o.d(e,{Au:function(){return l},EE:function(){return a},ko:function(){return r},vB:function(){return s}});const c="/auth",i="/",a={root:c,login:n(c,"/login"),register:n(c,"/register"),loginUnprotected:n(c,"/login-unprotected"),registerUnprotected:n(c,"/register-unprotected"),verify:n(c,"/verify"),resetPassword:n(c,"/reset-password"),newPassword:n(c,"/new-password"),thanksForRegistering:n(c,"/thanks-for-registering"),checkYourEmail:n(c,"/check-your-email"),close:n(c,"/closing"),registerByInvitation:n(c,"/register-by-invitation")},r={root:"/",comingSoon:"/coming-soon",maintenance:"/maintenance",pricing:"/pricing",payment:"/payment",about:"/about",contact:"/contact-us",documentation:"/doc",faqs:"/faqs",page403:"/403",page404:"/404",page500:"/500",components:"/components",dashboard:"/dashboard",batch:"/batch",data:"/data",users:"/users",settings:"/settings",repo:"",notifications:"/notifications",test:"/test",termsOfService:"/terms-of-service",privacyPolicy:"/privacy-policy"},s=(r.users,n(r.users,""),r.batch,n(r.batch,"/new"),n(r.batch,""),r.data,r.repo,n(r.repo,"/repos"),n(r.settings,""),{root:i,integration:{root:n(i,"/integration"),list:n(i,"/integration/list"),view:(t,e)=>n(i,"/integration/".concat(t,"/").concat(e)),edit:(t,e)=>n(i,"/integration/".concat(t,"/").concat(e,"/edit")),package:{view:(t,e,o)=>n(i,"/integration/".concat(t,"/").concat(e,"/package/").concat(o))},node:{view:(t,e,o,c)=>n(i,"/integration/".concat(t,"/").concat(e,"/package/").concat(o,"/").concat(c)),edit:(t,e,o,c)=>n(i,"/integration/".concat(t,"/").concat(e,"/package/").concat(o,"/").concat(c,"/edit"))},launch:{view:(t,e,o)=>n(i,"/integration/".concat(t,"/").concat(e,"/launch/").concat(o))},parameterSetup:{new:(t,e)=>n(i,"/integration/".concat(t,"/").concat(e,"/parameterSetups/new")),view:(t,e,o)=>n(i,"/integration/".concat(t,"/").concat(e,"/parameterSetups/").concat(o))},simulation:{batch:(t,e,o,c)=>n(i,"/integration/".concat(t,"/").concat(e,"/simulation/").concat(o,"/").concat(c)),run:(t,e,o,c,a)=>n(i,"/integration/".concat(t,"/").concat(e,"/simulation/").concat(o,"/").concat(c,"/").concat(a)),new:(t,e)=>n(i,"/integration/".concat(t,"/").concat(e,"/simulation/new")),view:(t,e,o)=>n(i,"/integration/".concat(t,"/").concat(e,"/simulation/").concat(o))}},simulations:{root:n(i,"/simulations"),list:n(i,"/simulations/list"),new:n(i,"/simulations/new"),view:t=>n(i,"/simulation/".concat(t,"/"))},analytics:{root:n(i,"/analytics"),list:n(i,"/analytics/list")},test:{root:n(i,"/test"),list:n(i,"/test/list"),new:n(i,"/test/new"),view:t=>n(i,"/test/".concat(t,"/")),run:(t,e)=>n(i,"/test/".concat(t,"/").concat(e,"/")),simulation:(t,e,o)=>n(i,"/test/".concat(t,"/").concat(e,"/").concat(o))},notebook:{new:n(i,"/notebook/new"),list:n(i,"/notebook/list"),root:n(i,"/notebook"),view:function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",c={};return e&&(c.bid=e),o&&(c.sid=o),n(i,"/notebook/".concat(t),c)},duplicate:t=>n(i,"/notebook/".concat(t,"?duplicate=true"))},repo:{root:n(i,"/repo"),list:n(i,"/repo/list"),view:t=>n(i,"/repo/".concat(t)),file:{view:(t,e)=>n(i,"/repo/".concat(t,"/").concat(e))}},kanban:n(i,"/kanban"),calendar:n(i,"/calendar"),fileManager:n(i,"/files-manager"),permissionDenied:n(i,"/permission-denied"),blank:n(i,"/blank"),general:{app:n(i,"/app"),ecommerce:n(i,"/ecommerce"),analytics:n(i,"/analytics"),banking:n(i,"/banking"),booking:n(i,"/booking"),file:n(i,"/file")},mail:{root:n(i,"/mail"),all:n(i,"/mail/all")},chat:{root:n(i,"/chat"),new:n(i,"/chat/new"),view:t=>n(i,"/chat/".concat(t))},user:{root:n(i,"/user"),new:n(i,"/user/new"),list:n(i,"/user/list"),cards:n(i,"/user/cards"),profile:n(i,"/user/profile"),account:n(i,"/user/account"),edit:t=>n(i,"/user/".concat(t,"/edit")),demoEdit:n(i,"/user/reece-chung/edit")},eCommerce:{root:n(i,"/e-commerce"),shop:n(i,"/e-commerce/shop"),list:n(i,"/e-commerce/list"),checkout:n(i,"/e-commerce/checkout"),new:n(i,"/e-commerce/product/new"),view:t=>n(i,"/e-commerce/product/".concat(t)),edit:t=>n(i,"/e-commerce/product/".concat(t,"/edit")),demoEdit:n(i,"/e-commerce/product/nike-blazer-low-77-vintage/edit"),demoView:n(i,"/e-commerce/product/nike-air-force-1-ndestrukt")},invoice:{root:n(i,"/invoice"),list:n(i,"/invoice/list"),new:n(i,"/invoice/new"),view:t=>n(i,"/invoice/".concat(t)),edit:t=>n(i,"/invoice/".concat(t,"/edit")),demoEdit:n(i,"/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit"),demoView:n(i,"/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5")},blog:{root:n(i,"/blog"),posts:n(i,"/blog/posts"),new:n(i,"/blog/new"),view:t=>n(i,"/blog/post/".concat(t)),demoView:n(i,"/blog/post/apply-these-7-secret-techniques-to-improve-event")},adminUserList:{root:n(i,"/admin-user-settings"),list:n(i,"/admin-user-settings/list")}}),l={root:"https://citros.io/doc/",changelog:"https://citros.io/doc/changelog"}}}]);