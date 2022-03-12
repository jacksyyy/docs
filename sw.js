(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.4.2"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.4.2"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.4.2"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.4.2"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,s),i.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||n(a.precache),r=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(977);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),i=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:i.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let u;async function f(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),i={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=s?s(i):i,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,r)}function d(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;s(873);function y(e){return"string"==typeof e?new Request(e):e}class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=y(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const a=y(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const i=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,a){const n=d(t.url,s);if(t.url===n)return e.match(t,a);const i=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(n===d(t.url,s))return e.match(t,a)}(l,i.clone(),["__WB_REVISION__"],h):null;try{await l.put(i,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=y(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class _ extends class{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new w(this,{event:t,request:s,params:a}),i=this._getResponse(n,s,t);return[i,this._awaitComplete(i,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(n=await i({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,i;try{n=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:i}),t.destroy(),i)throw i}}{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(_.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,i=e.integrity,r=!i||i===t;if(a=await s.fetch(new Request(e,{integrity:i||t})),t&&r){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==_.copyRedirectedCacheableResponsesPlugin&&(a===_.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(_.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}_.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},_.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await f(e):e};class v{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new _({cacheName:i(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),i="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}s(80);(async()=>{const e=function(){const e=JSON.parse(new URLSearchParams(self.location.search).get("params"));return e.debug&&console.log("[Docusaurus-PWA][SW]: Service Worker params:",e),e}(),t=[{"revision":"0077820ee122b3c363aecdcd548efeba","url":"404.html"},{"revision":"e848e54dacc1d1b1185d680b3b4f04e3","url":"assets/css/styles.cf931598.css"},{"revision":"a12283e7dc47c2386e3f3eb6c335bf65","url":"assets/js/08c91acd.499e227b.js"},{"revision":"8584359dfbb913bbd3acb5be7ba51591","url":"assets/js/17896441.27852f58.js"},{"revision":"f5f9d9017da56edd5c261257bca9c1b7","url":"assets/js/19c9239f.d4914180.js"},{"revision":"b35ecec1a7c6574634b2b51bb4d28f94","url":"assets/js/1a4e3797.a784ea65.js"},{"revision":"321f1871173bdd7030088070dfb1a871","url":"assets/js/1be78505.0702337a.js"},{"revision":"5885b62d23335f5767a5a3b5cd971498","url":"assets/js/1df93b7f.856e49c2.js"},{"revision":"c8df6bb74845a7bb5948c513effa50cd","url":"assets/js/230.025153b6.js"},{"revision":"e5022ddf02bd044b87ed754220f32c0b","url":"assets/js/23374ca6.e280cf8c.js"},{"revision":"39c7290898087e09006fa55b6c8a7f8c","url":"assets/js/278d831b.9bc6c79b.js"},{"revision":"3cf9fa50a964d5cf0e50040a732c251a","url":"assets/js/27da239e.0fee2932.js"},{"revision":"b8edd1c4fc441ddb40250d4d53de7aaa","url":"assets/js/2c700dca.c4e5f313.js"},{"revision":"3814548537af9ed4ff289cf3d55bbaf4","url":"assets/js/2c714a47.e664ef1f.js"},{"revision":"3db9ca148d2c198c3c354243bfcf0605","url":"assets/js/3bd92c1c.f8a8712a.js"},{"revision":"ccc04d8c605b037f139705d869ff5c47","url":"assets/js/3ca010ae.3dc3f506.js"},{"revision":"1591729e81419e433c67ca3b8d8c6fc7","url":"assets/js/417802b6.dd5dda21.js"},{"revision":"9c0d2768f21a7c74dfdb31569d3458f7","url":"assets/js/444147dc.92e96f6b.js"},{"revision":"6599068a112f0cee9ad4138a5107e353","url":"assets/js/4542f1aa.ef68acc8.js"},{"revision":"dfd134438991290e406feaf501a20bc3","url":"assets/js/45c35fe9.cbbaec91.js"},{"revision":"6150536220c3fc6a840930f351d4bc31","url":"assets/js/4608.7f3155ed.js"},{"revision":"ae8e349226ba06633ea5229a16206591","url":"assets/js/4735cba8.d1ea4b5f.js"},{"revision":"5f6fc5d18da7e30d3c70024c239174fd","url":"assets/js/5131.023cfe0f.js"},{"revision":"b634454a0456d9950c4e61cedee94a10","url":"assets/js/5283.2c52b05b.js"},{"revision":"fccdbf66f8de644c7185c92b922c1e02","url":"assets/js/59b20312.958a3ab6.js"},{"revision":"ce7f72eee5e0653199ab25bcdc86e81c","url":"assets/js/6815.8f5a7408.js"},{"revision":"7a1d48b4372382c2f638497f6a7e22cd","url":"assets/js/6856bc5e.22672e92.js"},{"revision":"5a0aafccc443095b70527b12cb815750","url":"assets/js/6945.7e7c6451.js"},{"revision":"b2ec06fee0367395a53068746d20cc7f","url":"assets/js/7109fcb9.df78c241.js"},{"revision":"45e186b3810961494083b5821618aec1","url":"assets/js/7556a661.70001fba.js"},{"revision":"6e418399e14fd570c5af493bc905088e","url":"assets/js/8894.8579f5eb.js"},{"revision":"56fb1ec74e8c257161137df235ded90c","url":"assets/js/93426447.c2a73e91.js"},{"revision":"355eebb24371b2ab0b272bd9392bdd4e","url":"assets/js/935f2afb.d39b78b8.js"},{"revision":"25c6d215cd683c8e29202abfb7779d75","url":"assets/js/9720aa09.953ecbb8.js"},{"revision":"1aeeb50c9eab3356de220d12aca893d8","url":"assets/js/b0dd63e9.469b9e57.js"},{"revision":"bd4d2f1f3ba4168d13db326ede2e4ca4","url":"assets/js/b326c38e.2fc7b644.js"},{"revision":"297055023f49ab2dcfe01501ad092820","url":"assets/js/b8c60b87.30308aea.js"},{"revision":"9a0b4be4999650507187c7d1db0eeae7","url":"assets/js/bd0ab364.a6dba2bc.js"},{"revision":"8ef78e8aadac0d9cf852fb87310661cc","url":"assets/js/c18f6375.5674e5bb.js"},{"revision":"33f494e8fdee7fca659c9509433ae6e9","url":"assets/js/c19b4e8e.e74cd046.js"},{"revision":"88fa12afe2aa2a4e3d0829913a4c7af4","url":"assets/js/cf08fff7.b2436b8c.js"},{"revision":"65fbfea2d85aec3facff52a89888639e","url":"assets/js/d50d5676.94d458f9.js"},{"revision":"c3902cde13a24f5585b67b14f56405c1","url":"assets/js/d70a5677.b66aa021.js"},{"revision":"79a71bb458822b6eb140b57fb1818841","url":"assets/js/d8af3d6e.e3640716.js"},{"revision":"9a241f884e9b7934c981de30515aa277","url":"assets/js/de48decc.a65d58f5.js"},{"revision":"16b5bc65bbb42913df16d919fb08d340","url":"assets/js/decc4105.4f43ebda.js"},{"revision":"2faadf1d547fde10ad787017aa21809e","url":"assets/js/df759228.591fcbc0.js"},{"revision":"ac84abe558c4a2886db70c0c8ddbdf25","url":"assets/js/e36987ae.8457f601.js"},{"revision":"2f1bf3d8b9e8e57326eeaf047a8c382b","url":"assets/js/f92d365d.a357ce64.js"},{"revision":"5bfb43f4a7af8b740ff4fbc114eb290c","url":"assets/js/fdb945e9.563ef8f2.js"},{"revision":"14bb1df8740f9791a832a0f1570079c1","url":"assets/js/ff7bed0d.4b50095e.js"},{"revision":"e14e34bfc6d8b2e2397416e2a32facfc","url":"assets/js/main.482201a8.js"},{"revision":"8b8ef4012503a44f0480dc71819cb1cc","url":"assets/js/runtime~main.02f2ce14.js"},{"revision":"9afd094c094e3a1dfc197c2fc003c9f9","url":"index.html"},{"revision":"8603f1bbfddb5fa7ca98d55ed8099cfd","url":"intro.html"},{"revision":"84f58f8937943a317c1b503ff3124185","url":"java-install-update.html"},{"revision":"9de0c1c99854cb76025abff99c9590c3","url":"manifest.json"},{"revision":"b56f9064081cd846be42371df3955fad","url":"paper.html"},{"revision":"a2edfa4eddd589dbec1d0dc9fd9af6c8","url":"paper/aikars-flags.html"},{"revision":"d8b111bb597404c05732cdfd68fcac67","url":"paper/getting-started.html"},{"revision":"12ba2b129e7fca58e8214dd40487fbd4","url":"paper/per-world-configuration.html"},{"revision":"52f34bf24bb28ff7b6d6483a488032e5","url":"paper/reference/paper-global-configuration.html"},{"revision":"fb1a6e5628acba56f188f969239cf00d","url":"paper/reference/paper-per-world-configuration.html"},{"revision":"4517499ed15b870f5f99f1be8bf67435","url":"paper/updating.html"},{"revision":"53979b0baca3a020c33379279b4b2686","url":"papermc/assets.html"},{"revision":"9cee65304ca98b4ee43a063f1ba43f3f","url":"papermc/contact.html"},{"revision":"adbe06f14200a8727d18e63f0c656007","url":"papermc/downloads-api.html"},{"revision":"35aa41d634497699b8ece962288b1d1c","url":"search.html"},{"revision":"ad44b1ee0df6e882d3a337a0b0d7c7b8","url":"velocity.html"},{"revision":"eac9b6bd37459384b8d634c8fb099128","url":"velocity/built-in-commands.html"},{"revision":"4aa72c0ad3537c286e8690379f578c95","url":"velocity/comparisons-to-other-proxies.html"},{"revision":"dadaa6e560615c429940c031a238a5c2","url":"velocity/configuration.html"},{"revision":"929188a40505b1faf96c81886eedfaa9","url":"velocity/credits.html"},{"revision":"5baac7c9afeb83dcef805b04809ac4b9","url":"velocity/developers.html"},{"revision":"317ec861868f11ec645cde36e0241d43","url":"velocity/developers/api-basics.html"},{"revision":"ac4a26ded74569c0e9f9b56d9a9dcd0b","url":"velocity/developers/command-api.html"},{"revision":"70665f43b3ec4a1c725a587ab980f577","url":"velocity/developers/creating-your-first-plugin.html"},{"revision":"d9c407b2c017ca855310223ef5781149","url":"velocity/developers/dependency-management.html"},{"revision":"da13bc43029e81b3aefe4df4e9bc043c","url":"velocity/developers/event-api.html"},{"revision":"413cf9273440c9d858acd06fd6d7944d","url":"velocity/developers/pitfalls.html"},{"revision":"784830986ae8b16fec1ff601039e8f7b","url":"velocity/developers/porting-plugins-from-velocity-1.html"},{"revision":"31a86a5389ce2badb5df2ff552ef6326","url":"velocity/developers/scheduler-api.html"},{"revision":"9a8f0cae5098a82e606469d93f665792","url":"velocity/faq.html"},{"revision":"aaeb14ac3ad0ad928cd99ca24d1526f1","url":"velocity/getting-started.html"},{"revision":"7de0476083d238df0f53ccaaa02dcaba","url":"velocity/migration.html"},{"revision":"ccb1d0111a062fa9e008383a283a7f87","url":"velocity/player-information-forwarding.html"},{"revision":"09029570c395ec50e815df1584af652d","url":"velocity/security.html"},{"revision":"4c773b4d8c5605777a14d00702642831","url":"velocity/server-compatibility.html"},{"revision":"5452901ded67cf69ed126b2ca6cb2e4e","url":"velocity/tuning.html"},{"revision":"1fd4ffe608571aaee08089c72a505ea8","url":"velocity/why-velocity.html"},{"revision":"5c5c8921e6f68dee6cde61afc61392e6","url":"waterfall.html"},{"revision":"e13d3bad29744661dbca9fe6f7679c6d","url":"waterfall/configuration.html"},{"revision":"a6363d95f7a95f95a0022681a000bae6","url":"waterfall/getting-started.html"},{"revision":"728cb4af05ea79eca18631a0a7f5950e","url":"assets/images/papermc_logomark_500-b69f67cabd469b3d0485c20a912e84fc.png"},{"revision":"2cc84f324fa1386d14831b64d1c303fb","url":"assets/images/pterodactyl-manual-59004882b8766e775ceefd62de2cbc50.png"},{"revision":"f923cb235d9275c8e766c27f6e8646a6","url":"assets/images/pterodactyl-prompt-08eaa04490182b153a7e203d414da64b.png"},{"revision":"27a331ad0d4f9b1b056d7aa7c497380c","url":"img/favicon.ico"},{"revision":"cf40f7154e8833e87c5a15b3c19cec64","url":"img/icons/icon-128x128.png"},{"revision":"d8c14f548f07f8b9f34900842e514de3","url":"img/icons/icon-144x144.png"},{"revision":"2352005bdb6116062586418be2feb0ee","url":"img/icons/icon-152x152.png"},{"revision":"69e1e4818e8c72f0b3faf7a71abeda26","url":"img/icons/icon-192x192.png"},{"revision":"e603d44fde637d0428169e42314c3039","url":"img/icons/icon-384x384.png"},{"revision":"ebde541848f562b741056bde05472bba","url":"img/icons/icon-512x512.png"},{"revision":"1fbf5b497e5d12fd86393175f9eaf139","url":"img/icons/icon-72x72.png"},{"revision":"50adede2c2bda637f507879fbb543480","url":"img/icons/icon-96x96.png"},{"revision":"69b156c91d208aff640e1016c38fb004","url":"img/logo.svg"},{"revision":"23c02a74c76235daf1a513381ba42449","url":"img/og-image.png"},{"revision":"249f3a6448ee743c8f87f15dd0c0b48c","url":"img/paper.png"}],s=new v({fallbackToNetwork:!0});e.offlineMode&&(s.addToCacheList(t),e.debug&&console.log("[Docusaurus-PWA][SW]: addToCacheList",{precacheManifest:t})),await async function(e){}(),self.addEventListener("install",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: install event",{event:t}),t.waitUntil(s.install(t))})),self.addEventListener("activate",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: activate event",{event:t}),t.waitUntil(s.activate(t))})),self.addEventListener("fetch",(async t=>{if(e.offlineMode){const a=t.request.url,n=function(e){const t=[],s=new URL(e,self.location.href);return s.origin!==self.location.origin||(s.search="",s.hash="",t.push(s.href),s.pathname.endsWith("/")?t.push(`${s.href}index.html`):t.push(`${s.href}/index.html`)),t}(a);for(let i=0;i<n.length;i+=1){const r=n[i],c=s.getCacheKeyForURL(r);if(c){const s=caches.match(c);e.debug&&console.log("[Docusaurus-PWA][SW]: serving cached asset",{requestURL:a,possibleURL:r,possibleURLs:n,cacheKey:c,cachedResponse:s}),t.respondWith(s);break}}}})),self.addEventListener("message",(async t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: message event",{event:t});"SKIP_WAITING"===(t.data&&t.data.type)&&self.skipWaiting()}))})()})()})();