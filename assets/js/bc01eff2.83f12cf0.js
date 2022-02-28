"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7219],{3905:function(e,n,t){t.d(n,{Zo:function(){return c},kt:function(){return h}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),u=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},c=function(e){var n=u(e.components);return r.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},p=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=u(t),h=a,m=p["".concat(s,".").concat(h)]||p[h]||d[h]||i;return t?r.createElement(m,l(l({ref:n},c),{},{components:t})):r.createElement(m,l({ref:n},c))}));function h(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,l=new Array(i);l[0]=p;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var u=2;u<i;u++)l[u]=t[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}p.displayName="MDXCreateElement"},7936:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return u},assets:function(){return c},toc:function(){return d},default:function(){return h}});var r=t(7462),a=t(3366),i=(t(7294),t(3905)),l=["components"],o={},s="Using the Scheduler",u={unversionedId:"velocity/developers/task-scheduling",id:"velocity/developers/task-scheduling",title:"Using the Scheduler",description:"The Velocity Scheduler lets you decide when and how your plugin tasks run, allowing fine control",source:"@site/docs/velocity/developers/task-scheduling.md",sourceDirName:"velocity/developers",slug:"/velocity/developers/task-scheduling",permalink:"/velocity/developers/task-scheduling",editUrl:"https://github.com/PaperMC/docs/blob/main/docs/velocity/developers/task-scheduling.md",tags:[],version:"current",lastUpdatedBy:"renovate[bot]",frontMatter:{},sidebar:"docs",previous:{title:"The Command API",permalink:"/velocity/developers/command-api"},next:{title:"Dependency Management",permalink:"/velocity/developers/dependencies"}},c={},d=[{value:"Running a delayed task",id:"running-a-delayed-task",level:2},{value:"Running a repeating task",id:"running-a-repeating-task",level:2},{value:"Running a task now",id:"running-a-task-now",level:2},{value:"Cancellation",id:"cancellation",level:2}],p={toc:d};function h(e){var n=e.components,t=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"using-the-scheduler"},"Using the Scheduler"),(0,i.kt)("p",null,"The Velocity Scheduler lets you decide when and how your plugin tasks run, allowing fine control\nover execution. On Velocity, there is no main thread. All tasks run using the Velocity Scheduler are\nthus run asynchronously."),(0,i.kt)("h2",{id:"running-a-delayed-task"},"Running a delayed task"),(0,i.kt)("p",null,"All scheduling works by using a ",(0,i.kt)("inlineCode",{parentName:"p"},"TaskBuilder")," returned from the ",(0,i.kt)("inlineCode",{parentName:"p"},"Scheduler"),". This fluent builder may\nbe chained to configure the details of the scheduling."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"server.getScheduler()\n  .buildTask(plugin, () -> {\n    // do stuff here\n  })\n  .delay(2L, TimeUnit.SECONDS)\n  .schedule();\n")),(0,i.kt)("p",null,"Here, we are scheduling a task to run 2 seconds later. Velocity requires the instance of your\nplugin, ",(0,i.kt)("inlineCode",{parentName:"p"},"plugin")," above. If you are scheduling a task from your main plugin class you may simply use\n",(0,i.kt)("inlineCode",{parentName:"p"},"this"),"."),(0,i.kt)("p",null,"Time arguments are specified as a ",(0,i.kt)("inlineCode",{parentName:"p"},"long")," with a ",(0,i.kt)("inlineCode",{parentName:"p"},"java.util.concurrent.TimeUnit"),". Using time units\nmakes scheduling delayed tasks more readable and allows for greater precision.\n",(0,i.kt)("inlineCode",{parentName:"p"},"2L, TimeUnit.SECONDS")," is far easier to understand than the ambiguous ",(0,i.kt)("inlineCode",{parentName:"p"},"2000L"),"."),(0,i.kt)("h2",{id:"running-a-repeating-task"},"Running a repeating task"),(0,i.kt)("p",null,"Creating a repeating task is similar to a delayed task, but you must also specify\n",(0,i.kt)("inlineCode",{parentName:"p"},"repeat(long, TimeUnit)"),". This example will repeat every 5 minutes."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"server.getScheduler()\n  .buildTask(plugin, () -> {\n    // do stuff here\n  })\n  .repeat(5L, TimeUnit.MINUTES)\n  .schedule();\n")),(0,i.kt)("h2",{id:"running-a-task-now"},"Running a task now"),(0,i.kt)("p",null,"Tasks use the scheduler's cached thread pool for all execution, which reuses threads. To take\nadvantage of this thread pool for running async tasks which run now, simply omit calling the ",(0,i.kt)("em",{parentName:"p"},"delay"),"\nand ",(0,i.kt)("em",{parentName:"p"},"repeat")," methods of the TaskBuilder."),(0,i.kt)("h2",{id:"cancellation"},"Cancellation"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"schedule()")," method returns a ",(0,i.kt)("inlineCode",{parentName:"p"},"ScheduledTask"),", which may then be used to cancel the task\ninvolved via the ",(0,i.kt)("inlineCode",{parentName:"p"},"cancel()")," method. Tasks cannot be uncancelled."),(0,i.kt)("p",null,"Additionally, ",(0,i.kt)("inlineCode",{parentName:"p"},"task.status()")," returns the current status of the task."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},"ScheduledTask task = server.getScheduler()\n  .buildTask(plugin, () -> {\n    // do stuff here\n  })\n  .repeat(5L, TimeUnit.MINUTES)\n  .schedule();\n// ...\ntask.cancel();\n// ...\nSystem.out.println(task.status());\n")))}h.isMDXComponent=!0}}]);