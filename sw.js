(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.4.2"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.4.2"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.4.2"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.4.2"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,s),i.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||n(a.precache),r=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(977);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),i=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:i.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let u;async function f(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),i={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=s?s(i):i,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,r)}function d(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;s(873);function y(e){return"string"==typeof e?new Request(e):e}class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=y(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const a=y(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const i=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,a){const n=d(t.url,s);if(t.url===n)return e.match(t,a);const i=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(n===d(t.url,s))return e.match(t,a)}(l,i.clone(),["__WB_REVISION__"],h):null;try{await l.put(i,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=y(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class _ extends class{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new w(this,{event:t,request:s,params:a}),i=this._getResponse(n,s,t);return[i,this._awaitComplete(i,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(n=await i({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,i;try{n=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:i}),t.destroy(),i)throw i}}{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(_.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,i=e.integrity,r=!i||i===t;if(a=await s.fetch(new Request(e,{integrity:i||t})),t&&r){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==_.copyRedirectedCacheableResponsesPlugin&&(a===_.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(_.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}_.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},_.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await f(e):e};class v{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new _({cacheName:i(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),i="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}s(80);(async()=>{const e=function(){const e=JSON.parse(new URLSearchParams(self.location.search).get("params"));return e.debug&&console.log("[Docusaurus-PWA][SW]: Service Worker params:",e),e}(),t=[{"revision":"b1067adbf1af4b9b4ec97e7ea59f8370","url":"__docusaurus/debug.html"},{"revision":"674a734f1b2f1f7e2b76a17113543ada","url":"__docusaurus/debug/config.html"},{"revision":"81cfb4d0805d9345ab126a5c773c3fe9","url":"__docusaurus/debug/content.html"},{"revision":"a067fd11ce51edcef5ada5fc6fcb8415","url":"__docusaurus/debug/globalData.html"},{"revision":"5d0f04464891a8dee3b6d07bab9f02d1","url":"__docusaurus/debug/metadata.html"},{"revision":"4e6d432d96a683f311078f7907b34cd7","url":"__docusaurus/debug/registry.html"},{"revision":"7851284104c02351f1a3c946b206efdc","url":"__docusaurus/debug/routes.html"},{"revision":"19e1c40813669bc6aefe22dbc88d38db","url":"404.html"},{"revision":"2c6a100cfd568c6205134a0bbaa3514e","url":"assets/css/styles.f8f8e815.css"},{"revision":"b0ce5cab9ca06e02061e0756279ba9aa","url":"assets/js/08b731e1.1d45e9d5.js"},{"revision":"415a9e4a92079b9f87e998b5d64719e2","url":"assets/js/14eb3368.83f46efb.js"},{"revision":"3c1dbf5ff14af616119097f09b6c351d","url":"assets/js/17896441.612b6440.js"},{"revision":"191a0e9930ef8d03cc2489cc2b2924ff","url":"assets/js/1a4e3797.37a146cc.js"},{"revision":"f6fe66f65845d866f8d76346e7e44955","url":"assets/js/1be78505.05ba6939.js"},{"revision":"cf54cf0626dcb665453084289a6815b4","url":"assets/js/1df93b7f.4c4c6bdf.js"},{"revision":"c8df6bb74845a7bb5948c513effa50cd","url":"assets/js/230.025153b6.js"},{"revision":"8c74549a044959bc2ab992c93b8203d9","url":"assets/js/23374ca6.32f02389.js"},{"revision":"74b44460fcf9363f82b2cf51478a2e2a","url":"assets/js/23abe487.4b661567.js"},{"revision":"6cd48f9fe512801ac495960b048899ee","url":"assets/js/246f2c6f.4f98044c.js"},{"revision":"be1ad1e8210bbf9c2d0841f3c791fae9","url":"assets/js/26c06db6.43353eea.js"},{"revision":"e50a442b2f606cf3bb853985756b2af3","url":"assets/js/2826cd9d.f7d0a719.js"},{"revision":"75f1549bd721ac4bb9bf1755861c65ad","url":"assets/js/2bae847e.65159c15.js"},{"revision":"726accc257564fa2cf5e463312a21e3e","url":"assets/js/31c00fd6.3c888dd7.js"},{"revision":"72b331080e154486a514f7ad3d9ce629","url":"assets/js/3450.bf953156.js"},{"revision":"c69b727e40168c2984689b65c03cbb5e","url":"assets/js/3553af34.e87514a0.js"},{"revision":"dc3b7dc169f0ddb16b0aabdf6cbff4e2","url":"assets/js/4579b8d2.9bc2d28c.js"},{"revision":"c1bddaa055743a6987422d0f90a9113e","url":"assets/js/45c35fe9.4426f6da.js"},{"revision":"9cda6742d65b6313fd4da56ef11d6f96","url":"assets/js/45c787c3.96b3892f.js"},{"revision":"35d1c1e18adb9ba3c6386ad1b34acb15","url":"assets/js/4608.caea357b.js"},{"revision":"50c6415f8758862f995fc834a7b9ca94","url":"assets/js/504d0c31.164e3ec1.js"},{"revision":"5f6fc5d18da7e30d3c70024c239174fd","url":"assets/js/5131.023cfe0f.js"},{"revision":"bac0227e1e472bfc913013be425a9b9d","url":"assets/js/518dede0.b2843404.js"},{"revision":"b634454a0456d9950c4e61cedee94a10","url":"assets/js/5283.2c52b05b.js"},{"revision":"8f25cf6647837870233202237584322f","url":"assets/js/5ac37622.88273a93.js"},{"revision":"f7d120a93838a417be7d4e7018b96306","url":"assets/js/645c917e.04a0ed48.js"},{"revision":"70128e281113b14b26a8eb737b99be30","url":"assets/js/6794d4cd.a6ea18c2.js"},{"revision":"ce7f72eee5e0653199ab25bcdc86e81c","url":"assets/js/6815.8f5a7408.js"},{"revision":"0003b2ce93b87bde84448aebdc8e0d2f","url":"assets/js/68e633d4.3f0b5cfc.js"},{"revision":"5a0aafccc443095b70527b12cb815750","url":"assets/js/6945.7e7c6451.js"},{"revision":"d9e011e5fb53bae85c1f3f1682db106b","url":"assets/js/714943b7.47851134.js"},{"revision":"58eece78ebdf12ed7c09fd6f32dcfbdc","url":"assets/js/7f5bcd1a.2bcef3bb.js"},{"revision":"ffa134cdbe5d3a4c035638b640b34660","url":"assets/js/83cac198.7e497a12.js"},{"revision":"6e418399e14fd570c5af493bc905088e","url":"assets/js/8894.8579f5eb.js"},{"revision":"4ba9c8a628cf459c69f49edb5a192a1c","url":"assets/js/8c1791c0.e3d23d9d.js"},{"revision":"a5652952ec653f5de265f477299bd9c0","url":"assets/js/935f2afb.79117328.js"},{"revision":"8eba8366db244ea635c029505c65ed60","url":"assets/js/946bd85a.e9164d30.js"},{"revision":"66774a14c0eb0e2a20be12fefb2a8dc5","url":"assets/js/9c4a842f.a9a5dbf0.js"},{"revision":"7f95810eb92051fb862c22cde1c985f9","url":"assets/js/a1d8fe0b.09ae3796.js"},{"revision":"fab6db17ebadd07401fb4930ebce639a","url":"assets/js/aa64850e.fde731c1.js"},{"revision":"82dce4222bcb3bfe34333e6242796e93","url":"assets/js/ad6fe338.bd5a1296.js"},{"revision":"ed320829c437e6bc2c6f52c9214388f7","url":"assets/js/b56a856c.8f334dd9.js"},{"revision":"7b1eb85188c581b61b22253399cb07bc","url":"assets/js/ba8b3534.95116f15.js"},{"revision":"f56815511f4021c047a0eb8c05b21055","url":"assets/js/bc01eff2.83f12cf0.js"},{"revision":"261176bdbd66e984379a2ad029235346","url":"assets/js/bd0ab364.f4a5a86b.js"},{"revision":"8f1929ab96e8beba711abb1342ee1cee","url":"assets/js/bded232b.8c58b5c6.js"},{"revision":"5d5431fc8ce78baf00e48f1d0fff19c8","url":"assets/js/c290827d.b2f680ff.js"},{"revision":"a51ff55463a2559388bdf8c00159df6c","url":"assets/js/c8f93db0.90815871.js"},{"revision":"069232a77202d12a58983bb66b83d919","url":"assets/js/cf08fff7.b6681cfb.js"},{"revision":"7f4a93e23b735353e0680a04db735f6f","url":"assets/js/d934ac46.c3a8b6fd.js"},{"revision":"c3734f2e1da789c7ed771ddf4eaa0a25","url":"assets/js/de48decc.2f5d4f6f.js"},{"revision":"d75266a835cd0266ff386e7ea1e06c60","url":"assets/js/e36987ae.6eee0d01.js"},{"revision":"386bdf63637d04373db784f3d2db6d98","url":"assets/js/ede3a018.0f897d12.js"},{"revision":"e70947337f65be610fcd958f2bf03dab","url":"assets/js/ede75923.5556895e.js"},{"revision":"20cd46ed34e3446a1353f7af291a0882","url":"assets/js/f71ce8f0.b03bde12.js"},{"revision":"f8ec521a8c5dc3e9b9a4804314bb07c7","url":"assets/js/fe4828cc.bda3e8f2.js"},{"revision":"94983a68766db0aebf27e9d3c355487e","url":"assets/js/fe6bda18.cc8db2d2.js"},{"revision":"cc7674d41d6d27c0965f15b56813d37a","url":"assets/js/ff7bed0d.63159f49.js"},{"revision":"971675a663044714bbe573129469fe11","url":"assets/js/main.70644198.js"},{"revision":"34be7229c2e89ac6df3c72ad4589f359","url":"assets/js/runtime~main.c5d4a7b0.js"},{"revision":"45a5247a187eaab9698f23cc27705a6e","url":"category/how-to-guides.html"},{"revision":"2fe44dbcce1671ae85d8c793049c8cc5","url":"category/reference.html"},{"revision":"817778f0730e2d936f86010f16020ba4","url":"category/tutorials.html"},{"revision":"fd5a7f0c307a9a94f8e56ffaf6c1eabc","url":"common/java-install.html"},{"revision":"d1b5d54e26f7fddd0cabc67e8d2c5fd8","url":"index.html"},{"revision":"f13fae00ba0e225ad411cf4054fdbea4","url":"intro.html"},{"revision":"93612675b03ca9aca39bd2a1373fee01","url":"manifest.json"},{"revision":"aa4da1811abfcc04f88b728364561a0e","url":"paper.html"},{"revision":"ee1b6d81fb247f5b16aaf5db260df9cd","url":"paper/how-to/getting-started.html"},{"revision":"65bcac06d3fd6cbc4a2ed44b3204fd5a","url":"paper/how-to/per-world-config.html"},{"revision":"867b8becfe65f0db308e8cd04dc9f815","url":"paper/reference/paper-yml.html"},{"revision":"07f09a0633606018adabfc7049ec7918","url":"paper/tutorial/aikars-flags.html"},{"revision":"b0912c84da13d67d88a7bae80ab2f8c6","url":"paper/tutorial/update.html"},{"revision":"481f7ac792fc8d3d73659a73d1c8ff6c","url":"search.html"},{"revision":"5c19e08cc247192b508115451e1b366e","url":"velocity.html"},{"revision":"91b23876ab7b15133b8d1439f5383203","url":"velocity/deployment.html"},{"revision":"001024fd410999a755a000abf57631dc","url":"velocity/deployment/security.html"},{"revision":"f2085c0919bec2603a2effabd3129d2e","url":"velocity/deployment/tuning.html"},{"revision":"ba6b524c4ddd0d707feb6bd9f60e42f3","url":"velocity/developers.html"},{"revision":"28632b25b5924ec98216bf5d8a2e2dc5","url":"velocity/developers/api-basics.html"},{"revision":"b685683039af3c10595141da0b8bd8db","url":"velocity/developers/command-api.html"},{"revision":"941c0b2aca4e18d08f4f8140d5b4bfbc","url":"velocity/developers/creating-your-first-plugin.html"},{"revision":"daa3dd6dd36a99274523f591fbe05ba6","url":"velocity/developers/dependencies.html"},{"revision":"cd98b3bb5de7667128777d741ed70eac","url":"velocity/developers/event-api.html"},{"revision":"077723678eb0319d252adf452e9534d6","url":"velocity/developers/pitfalls.html"},{"revision":"7ec22ad1e0d1c81ecd727d0d4645fc8a","url":"velocity/developers/porting-from-velocity-1.html"},{"revision":"a24606b327dfc8ca0db923a57f7bf311","url":"velocity/developers/task-scheduling.html"},{"revision":"d8e5774ffbb85af5714da73a9a4d4e8c","url":"velocity/misc/credits.html"},{"revision":"6c413f48e1d2c2898e23d9ede61fce93","url":"velocity/users.html"},{"revision":"a11e7bcf4a73d0d14501bc567014a057","url":"velocity/users/commands.html"},{"revision":"4e44e0852096d9b8bc91e322766ea0f4","url":"velocity/users/comparison.html"},{"revision":"b76cf39bd26f013818b5fa6d36bffa34","url":"velocity/users/configuration.html"},{"revision":"88eac7c936fae84dbecb8a837ff2d310","url":"velocity/users/faq.html"},{"revision":"ad2e6eee9d85070623c460ff5fb1314d","url":"velocity/users/forwarding.html"},{"revision":"ef662017e030beace90651102f15d9b9","url":"velocity/users/getting-started.html"},{"revision":"28b4b1300ade523edd2180c3a658513a","url":"velocity/users/migration.html"},{"revision":"3ec6271941ece5bc27f2c56a0cd44580","url":"velocity/users/server-compatibility.html"},{"revision":"267c77bc7ef31d1e0a2d6a8c42f908bf","url":"velocity/users/what-does-velocity-do-for-me.html"},{"revision":"3b2f4c6ad9eef9a37923c3bea295f39e","url":"waterfall.html"},{"revision":"6e42423c1adf3e238f4c3e337e9e609c","url":"waterfall/configuration.html"},{"revision":"ccd940f618e7ce0dd5c819ff2630f0d0","url":"img/docs/guides/java/aternos.png"},{"revision":"27a331ad0d4f9b1b056d7aa7c497380c","url":"img/favicon.ico"},{"revision":"cf40f7154e8833e87c5a15b3c19cec64","url":"img/icons/icon-128x128.png"},{"revision":"d8c14f548f07f8b9f34900842e514de3","url":"img/icons/icon-144x144.png"},{"revision":"2352005bdb6116062586418be2feb0ee","url":"img/icons/icon-152x152.png"},{"revision":"69e1e4818e8c72f0b3faf7a71abeda26","url":"img/icons/icon-192x192.png"},{"revision":"e603d44fde637d0428169e42314c3039","url":"img/icons/icon-384x384.png"},{"revision":"ebde541848f562b741056bde05472bba","url":"img/icons/icon-512x512.png"},{"revision":"1fbf5b497e5d12fd86393175f9eaf139","url":"img/icons/icon-72x72.png"},{"revision":"50adede2c2bda637f507879fbb543480","url":"img/icons/icon-96x96.png"},{"revision":"69b156c91d208aff640e1016c38fb004","url":"img/logo.svg"},{"revision":"a9da426ad5475220ef18653219fd74de","url":"img/og-image.png"},{"revision":"249f3a6448ee743c8f87f15dd0c0b48c","url":"img/paper.png"}],s=new v({fallbackToNetwork:!0});e.offlineMode&&(s.addToCacheList(t),e.debug&&console.log("[Docusaurus-PWA][SW]: addToCacheList",{precacheManifest:t})),await async function(e){}(),self.addEventListener("install",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: install event",{event:t}),t.waitUntil(s.install(t))})),self.addEventListener("activate",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: activate event",{event:t}),t.waitUntil(s.activate(t))})),self.addEventListener("fetch",(async t=>{if(e.offlineMode){const a=t.request.url,n=function(e){const t=[],s=new URL(e,self.location.href);return s.origin!==self.location.origin||(s.search="",s.hash="",t.push(s.href),s.pathname.endsWith("/")?t.push(`${s.href}index.html`):t.push(`${s.href}/index.html`)),t}(a);for(let i=0;i<n.length;i+=1){const r=n[i],c=s.getCacheKeyForURL(r);if(c){const s=caches.match(c);e.debug&&console.log("[Docusaurus-PWA][SW]: serving cached asset",{requestURL:a,possibleURL:r,possibleURLs:n,cacheKey:c,cachedResponse:s}),t.respondWith(s);break}}}})),self.addEventListener("message",(async t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: message event",{event:t});"SKIP_WAITING"===(t.data&&t.data.type)&&self.skipWaiting()}))})()})()})();