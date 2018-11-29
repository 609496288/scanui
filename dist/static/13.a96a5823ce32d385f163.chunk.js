webpackJsonp([13],{121:function(t,a,e){var s=e(3)(e(644),e(645),null,null);t.exports=s.exports},644:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(6),n=function(t){return t&&t.__esModule?t:{default:t}}(s);a.default={name:"task-table",data:function(){var t=this;return{modalinfo:!1,scaninfo:!1,projectname:localStorage.projectname,projectid:localStorage.projectid,current:1,total:100,searchdata:"",taskinfoview:{buglist:[]},tasklist:[],tasktype:[],tasknode:[],taskinfo:{task_host:"",task_note:"",task_level:"3",task_name:"",task_args:"",task_node:[]},taskdata:[],taskcol:[{type:"selection",width:60,align:"center"},{title:"任务状态",align:"center",width:120,key:"task_code",sortable:!0,render:function(t,a){var e=a.row.task_code,s="waiting"===e?"等待运行":"PENDING"===e?"队列中":"working"===e?"运行中":"finish"===e?"已完成":e;return t("Tag",{props:{checkable:!0,color:"waiting"===e?"default":"PENDING"===e?"green":"working"===e?"yellow":"finish"===e?"blue":"red"}},s)}},{title:"任务目标",key:"task_host"},{title:"任务类型",key:"task_name",render:function(t,a){return t("div",{},a.row.task_name+" "+a.row.task_args)}},{title:"创建时间",align:"center",key:"createdate",sortable:!0,width:180,render:function(t,a){return t("span",[t("Icon",{props:{type:"android-time"}}),t("span",n.default.formatdate(a.row.createdate))])}},{title:"操作",align:"center",width:100,key:"action",render:function(a,e){return a("div",[a("Button",{props:{type:"info"},on:{click:function(){t.scantaskinfoview(e.row.task_id)}}},"详情")])}}],showCurrentTableData:!0}},methods:{scantaskinfoview:function(t){var a=this;n.default.ajax({method:"POST",action:"scanntaskinfo",json:{taskid:t}}).then(function(t){a.taskinfoview=t,a.scaninfo=!0}).catch(function(t){a.$Message.error(t)})},tasktypeget:function(t){var a=this;n.default.ajax({method:"POST",action:"tasktypeget",json:{page:t}}).then(function(t){a.tasktype=t}).catch(function(t){a.$Message.error(t)})},tasknodeget:function(t){var a=this;n.default.ajax({method:"POST",action:"tasknodeget",json:{keyword:t}}).then(function(t){a.tasknode=t}).catch(function(t){a.$Message.error(t)})},scantasksearch:function(t){var a=this;n.default.ajax({method:"POST",action:"scantasksearch",json:{page:t,keyword:this.searchdata}}).then(function(t){a.taskdata=t.ret,a.total=t.total}).catch(function(t){a.$Message.error(t)})},scantaskfinish:function(){var t=this,a=this.$refs.selection.getSelection();this.tasklist=[];for(var e in a){this.tasklist.push(a[e].task_id);for(var s in this.taskdata)a[e].task_id==this.taskdata[s].task_id&&this.taskdata.splice(s,1)}n.default.ajax({method:"POST",action:"scantaskfinish",json:{selectlist:this.tasklist}}).then(function(a){t.$Message.info("删除成功！"),t.scantasksearch(1)}).catch(function(a){t.$Message.error(a)})},scantaskadd:function(){var t=this;n.default.ajax({method:"POST",action:"scantaskadd",json:{task_host:this.taskinfo.task_host,task_name:[this.taskinfo.task_name],task_level:this.taskinfo.task_level,task_args:this.taskinfo.task_args,task_note:this.taskinfo.task_note,task_node:this.taskinfo.task_node}}).then(function(a){t.$Message.info("添加成功！"),t.scantasksearch(1)}).catch(function(a){t.$Message.error(a)})},selecttask:function(t){var a=this;localStorage.taskid=t,n.default.ajax({method:"POST",action:"scantaskselect",json:{taskid:t}}).then(function(t){localStorage.taskid=t.taskid,a.$Message.info("确定选择该任务")}).catch(function(t){a.$Message.error(t)})},uploadsuccess:function(t,a){this.taskinfo.task_host+=t.fid+"\n",this.taskinfo.task_note=t.fname,this.taskinfo.task_name=["hashbrute"]},rands:function(){var t=["red","blue","yellow","green"];return t[Math.floor(Math.random()*t.length)]},gotaskdiff:function(t){this.$router.push({name:"task_diff",query:{tidb:t}})}},created:function(){if(this.tasktypeget(),"null"!=localStorage.projectid&&void 0!=localStorage.projectid?this.scantasksearch(1):(this.$Message.error("请先选择当前系统"),this.$router.push({name:"project_index"})),this.$route.params.isadd)return this.taskinfo=this.$route.params.taskinfo,this.modalinfo=!0}}},645:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("Card",[e("Dropdown",{staticStyle:{"margin-left":"20px"}},[e("Button",{attrs:{type:"primary",size:"large"},on:{click:function(a){t.modalinfo=!0}}},[e("Icon",{attrs:{type:"ios-download-outline"}}),t._v("\n                    新建任务\n                ")],1)],1),t._v(" "),e("Poptip",{attrs:{confirm:"",placement:"bottom",title:"确认删除？"},on:{"on-ok":t.scantaskfinish}},[e("Button",{attrs:{type:"error",size:"large"}},[e("Icon",{attrs:{type:"ios-download-outline"}}),t._v("\n                    删除任务\n                ")],1)],1),t._v(" "),e("Input",{staticStyle:{width:"300px"},attrs:{slot:"extra",icon:"search",placeholder:"请输入任务目标进行搜索..."},on:{"on-click":function(a){t.scantasksearch(1)}},nativeOn:{keydown:function(a){if(!("button"in a)&&t._k(a.keyCode,"enter",13,a.key))return null;t.scantasksearch(1)}},slot:"extra",model:{value:t.searchdata,callback:function(a){t.searchdata=a},expression:"searchdata"}})],1),t._v(" "),e("Table",{ref:"selection",attrs:{stripe:"",border:"",columns:t.taskcol,data:t.taskdata}}),t._v(" "),e("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[e("div",{staticStyle:{float:"left"}},[t._v("共 "+t._s(t.total)+" 条")]),t._v(" "),e("div",{staticStyle:{float:"right"}},[e("Page",{attrs:{"show-elevator":"",current:t.current,total:t.total,"page-size":50},on:{"on-change":t.scantasksearch}})],1)]),t._v(" "),e("Modal",{attrs:{title:t.projectname,styles:{top:"30px"},okText:"保存"},on:{"on-ok":t.scantaskadd},model:{value:t.modalinfo,callback:function(a){t.modalinfo=a},expression:"modalinfo"}},[e("Form",{attrs:{model:t.taskinfo,"label-width":80}},[e("Tabs",[e("TabPane",{attrs:{label:"参数"}},[e("FormItem",{attrs:{label:"扫描目标"}},[e("Input",{attrs:{rows:4,type:"textarea",placeholder:"一行一个目标网址,IP支持.1/24形式的C段简写"},model:{value:t.taskinfo.task_host,callback:function(a){t.$set(t.taskinfo,"task_host",a)},expression:"taskinfo.task_host"}})],1),t._v(" "),e("FormItem",{attrs:{label:"扫描类型"}},[e("RadioGroup",{model:{value:t.taskinfo.task_name,callback:function(a){t.$set(t.taskinfo,"task_name",a)},expression:"taskinfo.task_name"}},t._l(t.tasktype,function(a){return e("Tag",{attrs:{type:"border",color:"yellow"}},[e("Radio",{attrs:{label:a.task_name}},[t._v(t._s(a.task_desc))])],1)}))],1)],1),t._v(" "),e("TabPane",{attrs:{label:"选项"}},[e("FormItem",{attrs:{label:"任务节点"}},[e("Select",{attrs:{multiple:"",clearable:"",filterable:"",remote:"","remote-method":t.tasknodeget},model:{value:t.taskinfo.task_node,callback:function(a){t.$set(t.taskinfo,"task_node",a)},expression:"taskinfo.task_node"}},t._l(t.tasknode,function(a){return e("Option",{key:a.nodeid,attrs:{value:a.nodeid}},[t._v(t._s(a.nodeid))])}))],1),e("FormItem",{attrs:{label:"任务等级"}},[e("Select",{model:{value:t.taskinfo.task_level,callback:function(a){t.$set(t.taskinfo,"task_level",a)},expression:"taskinfo.task_level"}},[e("Option",{attrs:{value:"0"}},[t._v("立刻")]),t._v(" "),e("Option",{attrs:{value:"1"}},[t._v("紧急")]),t._v(" "),e("Option",{attrs:{value:"2"}},[t._v("优先")]),t._v(" "),e("Option",{attrs:{value:"3"}},[t._v("一般")])],1)],1),e("FormItem",{attrs:{label:"任务参数"}},[e("Input",{attrs:{type:"text",placeholder:"-key1=value -key2=value"},model:{value:t.taskinfo.task_args,callback:function(a){t.$set(t.taskinfo,"task_args",a)},expression:"taskinfo.task_args"}})],1),t._v(" "),e("FormItem",{attrs:{label:"任务备注"}},[e("Input",{attrs:{type:"text"},model:{value:t.taskinfo.task_note,callback:function(a){t.$set(t.taskinfo,"task_note",a)},expression:"taskinfo.task_note"}})],1)],1)],1)],1)],1),t._v(" "),e("Modal",{attrs:{title:"任务详情",styles:{top:"30px"}},model:{value:t.scaninfo,callback:function(a){t.scaninfo=a},expression:"scaninfo"}},[e("div",["finish"==t.taskinfoview.taskcode?e("Button",{attrs:{type:"primary",click:""}},[t._v("重载")]):"working"==t.taskinfoview.taskcode?e("Button",{attrs:{type:"error",click:""}},[t._v("结束")]):t._e(),t._v(" "),e("Button",{attrs:{type:"warning"},on:{click:function(a){t.gotaskdiff(t.taskinfoview.taskid)}}},[t._v("任务对比")])],1),t._v(" "),e("Row",[e("Col",[e("div",[e("ul",[t._v("创建时间 : "+t._s(t.taskinfoview.createdate))]),t._v(" "),e("ul",[t._v("任务类型 : "+t._s(t.taskinfoview.tasktype))]),t._v(" "),e("ul",[t._v("任务节点 : "+t._s(t.taskinfoview.tasknode))]),t._v(" "),e("ul",[t._v("任务名称 : "+t._s(t.taskinfoview.taskname))]),t._v(" "),e("ul",[t._v("任务主机 : "+t._s(t.taskinfoview.taskhost))]),t._v(" "),e("div",[t._v("任务参数 : "+t._s(t.taskinfoview.taskargs))]),t._v(" "),e("div",[t._v("任务状态 : "+t._s(t.taskinfoview.taskcode))]),t._v(" "),e("ul",[t._v("任务进程 : "+t._s(t.taskinfoview.taskpid))]),t._v(" "),e("ul",[t._v("任务等级 : "+t._s(t.taskinfoview.tasklevel))]),t._v(" "),e("ul",[t._v("任务备注 : "+t._s(t.taskinfoview.tasknote))]),t._v(" "),e("ul",[t._v("结束时间 : "+t._s(t.taskinfoview.finishdate))]),t._v(" "),e("ul",[t._v("任务标识 : "+t._s(t.taskinfoview.taskid))])])])],1),t._v(" "),t.taskinfoview.buglist.length>0?e("Card",{attrs:{"dis-hover":""}},[e("p",{attrs:{slot:"title"},slot:"title"},[e("Icon",{attrs:{type:"ios-list"}}),t._v("\n                    扫描结果\n                ")],1),t._v(" "),e("div",{staticStyle:{height:"250px","overflow-y":"hidden","overflow-x":"hidden"}},[e("ul",{staticClass:"iview-admin-draggable-list",attrs:{id:"todoList"}},t._l(t.taskinfoview.buglist,function(a){return e("a",{attrs:{href:"/#/buginfo?id="+a.bugid}},[e("li",{staticClass:"notwrap todolist-item"},[t._v("【"+t._s(a.bugrank)+"】"+t._s(a.bugname))])])}))])]):t._e()],1)],1)},staticRenderFns:[]}}});