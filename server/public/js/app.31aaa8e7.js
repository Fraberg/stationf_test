(function(e){function t(t){for(var a,o,i=t[0],u=t[1],s=t[2],d=0,p=[];d<i.length;d++)o=i[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&p.push(r[o][0]),r[o]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);l&&l(t);while(p.length)p.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],a=!0,i=1;i<n.length;i++){var u=n[i];0!==r[u]&&(a=!1)}a&&(c.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},r={app:0},c=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var l=u;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0901":function(e,t,n){},"0c79":function(e,t,n){"use strict";n("0901")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("7a23");function r(e,t,n,r,c,o){var i=Object(a["u"])("RoomsComponent");return Object(a["n"])(),Object(a["e"])("div",null,[Object(a["i"])(i)])}var c=Object(a["E"])("data-v-0ed09298");Object(a["p"])("data-v-0ed09298");var o={class:"container"},i={class:"form-container"},u={class:"mb-4"},s={class:"datepicker-subtemplate flex flex-col sm:flex-row justify-start items-center"},l={class:"date-picker-input-wrapper relative flex-grow"},d=Object(a["i"])("p",{class:"label-input"},"Début",-1),p=Object(a["i"])("span",{class:"flex-shrink-0 m-2"},null,-1),b={class:"date-picker-input-wrapper relative flex-grow"},v=Object(a["i"])("p",{class:"label-input"},"Fin",-1),f={class:"capacity"},m=Object(a["i"])("p",{class:"label-capacity"},"Capacité",-1),O={class:"equipments"},j=Object(a["i"])("p",{class:"label-equipments"},"Équipements",-1),g={class:"label-display-if-booked"},h=Object(a["i"])("p",{class:"display-if-booked"},"Afficher les salles réservées",-1),y={class:"filters-synthesis"},k=Object(a["i"])("hr",null,null,-1),w={class:"delete-reservations"},R=Object(a["h"])(" Supprimer les réservations ");Object(a["o"])();var x=c((function(e,t,n,r,x,D){var C=Object(a["u"])("v-date-picker"),S=Object(a["u"])("font-awesome-icon"),q=Object(a["u"])("RoomsListComponent");return Object(a["n"])(),Object(a["e"])("div",o,[Object(a["i"])("div",i,[Object(a["i"])("form",{class:"bg-white shadow-md rounded px-8 pt-6 pb-8",onSubmit:t[5]||(t[5]=Object(a["D"])((function(){}),["prevent"]))},[Object(a["i"])("div",u,[Object(a["i"])(C,{modelValue:r.range,"onUpdate:modelValue":t[1]||(t[1]=function(e){return r.range=e}),mode:"dateTime",masks:r.masks,"is-range":"","min-date":(new Date).setHours(0,0,0,0),"minute-increment":5},{default:c((function(e){var t=e.inputValue,n=e.inputEvents,r=e.isDragging;return[Object(a["i"])("div",s,[Object(a["i"])("div",l,[d,Object(a["i"])("input",Object(a["l"])({class:["flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full",r?"text-gray-600":"text-gray-900"],value:t.start},Object(a["w"])(n.start)),null,16,["value"])]),p,Object(a["i"])("div",b,[v,Object(a["i"])("input",Object(a["l"])({class:["flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full",r?"text-gray-600":"text-gray-900"],value:t.end},Object(a["w"])(n.end)),null,16,["value"])])])]})),_:1},8,["modelValue","masks","min-date"]),Object(a["i"])("div",f,[m,Object(a["C"])(Object(a["i"])("input",{"onUpdate:modelValue":t[2]||(t[2]=function(e){return r.selectedCapacity=e}),type:"number",step:"1",min:"1",required:"true"},null,512),[[a["y"],r.selectedCapacity]])]),Object(a["i"])("div",O,[j,Object(a["C"])(Object(a["i"])("input",{"onUpdate:modelValue":t[3]||(t[3]=function(e){return r.selectedEquipments=e}),placeholder:"TV, Retro ..."},null,512),[[a["y"],r.selectedEquipments]])]),Object(a["i"])("div",g,[h,Object(a["C"])(Object(a["i"])("input",{type:"checkbox","onUpdate:modelValue":t[4]||(t[4]=function(e){return r.displayBookedRooms=e})},null,512),[[a["x"],r.displayBookedRooms]])])])],32)]),Object(a["i"])("p",y,[Object(a["i"])(S,{icon:["fa","search"]}),Object(a["h"])(" "+Object(a["v"])(r.getSynthesis),1)]),k,Object(a["i"])(q,{rooms:r.filteredRooms,onCreateReservation:r.createReservation,getRangeSpan:r.getRangeSpan,isLoading:r.isLoading,error:r.error},null,8,["rooms","onCreateReservation","getRangeSpan","isLoading","error"]),Object(a["i"])("div",w,[Object(a["C"])(Object(a["i"])("button",{onClick:t[6]||(t[6]=function(){return r.deleteReservations&&r.deleteReservations.apply(r,arguments)})},[R,Object(a["i"])(S,{icon:["fa","trash-alt"]})],512),[[a["z"],r.reservations.length]])])])})),D=(n("99af"),n("4de4"),n("4160"),n("caad"),n("d81d"),n("b0c0"),n("ac1f"),n("2532"),n("1276"),n("498a"),n("159b"),n("b85c")),C=(n("96cf"),n("1da1")),S=(n("d3b7"),n("5530")),q=n("d4ec"),L=n("bee2"),_=n("bc3a"),E=n.n(_),M="api/rooms/",A=function(){function e(){Object(q["a"])(this,e)}return Object(L["a"])(e,null,[{key:"getRooms",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise((function(t,n){E.a.get(M,{params:{capacity:e}}).then((function(e){var n=e.data;t(n.map((function(e){return Object(S["a"])(Object(S["a"])({},e),{},{createdAt:new Date(e.createdAt),updatedAt:new Date(e.updatedAt)})})))})).catch((function(e){n(e)}))}))}},{key:"insertRoom",value:function(e){return E.a.post(M,{text:e})}},{key:"deleteRoom",value:function(e){return E.a.delete("".concat(M).concat(e))}}]),e}(),T=A,P="api/reservations/",V=function(){function e(){Object(q["a"])(this,e)}return Object(L["a"])(e,null,[{key:"getReservations",value:function(e){return new Promise((function(t,n){E.a.get(P,{params:{range:e}}).then((function(e){var n=e.data;t(n.map((function(e){return Object(S["a"])(Object(S["a"])({},e),{},{start:new Date(e.start),end:new Date(e.end),createdAt:new Date(e.createdAt),updatedAt:new Date(e.updatedAt)})})))})).catch((function(e){n(e)}))}))}},{key:"insertReservation",value:function(e,t,n){return E.a.post(P,{user_id:"",room_id:e._id,start:new Date(t.start.getTime()+0),end:new Date(t.end.getTime()+0),participants:n})}},{key:"deleteReservation",value:function(e){return E.a.delete("".concat(P).concat(e))}}]),e}(),I=V,J=(n("a4d3"),n("e01a"),Object(a["E"])("data-v-0f565002"));Object(a["p"])("data-v-0f565002");var Y={class:"rooms-container"},N=Object(a["g"])('<div class="list-headers" data-v-0f565002><p class="name" data-v-0f565002>Nom</p><p class="capacity" data-v-0f565002>Capacité</p><p class="description" data-v-0f565002>Description</p><p class="equipments" data-v-0f565002>Équipements</p><p class="reservation" data-v-0f565002>Réservation</p></div><hr data-v-0f565002>',2),U={key:0,class:"loading"},F=Object(a["i"])("h2",null,"Chargement ... :)",-1),B={key:1,class:"error"},H={class:"name"},z={class:"capacity"},G={class:"description"},K={class:"equipments"},Q={class:"reservation"},W=Object(a["h"])(" Réserver "),X={key:1},Z={key:2};Object(a["o"])();var $=J((function(e,t,n,r,c,o){var i=Object(a["u"])("font-awesome-icon");return Object(a["n"])(),Object(a["e"])("div",Y,[N,n.isLoading?(Object(a["n"])(),Object(a["e"])("div",U,[F])):n.error?(Object(a["n"])(),Object(a["e"])("div",B,[Object(a["i"])("p",null,Object(a["v"])(n.error),1)])):(Object(a["n"])(!0),Object(a["e"])(a["a"],{key:2},Object(a["s"])(n.rooms,(function(e,t){return Object(a["n"])(),Object(a["e"])("div",{class:"room",item:e,index:t,key:e._id},[Object(a["i"])("p",H,Object(a["v"])(e.name),1),Object(a["i"])("p",z,Object(a["v"])(e.capacity),1),Object(a["i"])("p",G,Object(a["v"])(e.description),1),Object(a["i"])("ul",K,[(Object(a["n"])(!0),Object(a["e"])(a["a"],null,Object(a["s"])(e.equipments,(function(e,t){return Object(a["n"])(),Object(a["e"])("li",{class:"name",item:e,index:t,key:t},Object(a["v"])(e.name),9,["item","index"])})),128))]),Object(a["i"])("div",Q,[e.booked?Object(a["f"])("",!0):(Object(a["n"])(),Object(a["e"])("button",{key:0,onClick:function(e){return r.createReservation(t)}},[Object(a["i"])(i,{icon:["fa","bookmark"]}),W],8,["onClick"])),e.booked?Object(a["f"])("",!0):(Object(a["n"])(),Object(a["e"])("p",X,"pour "+Object(a["v"])(n.getRangeSpan),1)),e.booked?(Object(a["n"])(),Object(a["e"])("p",Z,Object(a["v"])(e.bookedInfo),1)):Object(a["f"])("",!0)])],8,["item","index"])})),128))])})),ee={name:"RoomsListComponent",props:["rooms","getRangeSpan","isLoading","error"],emits:["create-reservation"],setup:function(e,t){function n(e){t.emit("create-reservation",e)}return{createReservation:n}}};n("b097");ee.render=$,ee.__scopeId="data-v-0f565002";var te=ee,ne=n("fa7d"),ae=n.n(ne),re=n("3d20"),ce={name:"RoomComponent",components:{RoomsListComponent:te},setup:function(){var e=Object(a["r"])([]),t=Object(a["r"])(2),n=Object(a["r"])(""),r=Object(a["r"])(!1),c=Object(a["r"])(""),o=Object(a["r"])(!0),i=Object(a["r"])([]),u=Object(a["r"])({start:ae.a.roundDate(new Date(Date.now()),5),end:ae.a.roundDate(new Date(Date.now()+18e5),5)}),s={input:"YYYY-MM-DD h:mm A"};Object(a["m"])(Object(C["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,T.getRooms();case 3:return e.value=t.sent,t.next=6,I.getReservations(u.value);case 6:i.value=t.sent,m(),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),c.value=t.t0.message;case 13:return t.prev=13,o.value=!1,t.finish(13);case 16:case"end":return t.stop()}}),t,null,[[0,10,13,16]])}))));var l=Object(a["c"])((function(){return n.value.trim().toLowerCase()})),d=Object(a["c"])((function(){if("unvalid"===p.value){var e="La durée de la réservation doit être >= à 5 minutes";return e}var a="< ".concat(ae.a.formatLiteralDate(u.value.start)," - ").concat(ae.a.formatLiteralDate(u.value.end)," (").concat(p.value,") | ").concat(t.value," place").concat(t.value>1?"s":"");return a+=""!==l.value?" | équipée de : ".concat(n.value," >"):" >",a})),p=Object(a["c"])((function(){return ae.a.getDuration(u.value.start,u.value.end)})),b=Object(a["c"])((function(){return e.value.filter((function(e){return e.capacity>=t.value&&(!e.booked||r.value)&&(!n.value.length||e.includesSelectedEquipments)})).sort((function(e,t){return e.distance-t.distance}))}));function v(e){l.value.length&&(e.includesSelectedEquipments=!1,l.value.split(" ").forEach((function(t){e.equipments.forEach((function(n){n.name.toLowerCase().includes(t)&&(e.includesSelectedEquipments=!0)}))})))}function f(e){i.value.forEach((function(t){if(t.room_id===e._id&&(t.start>=u.value.start&&t.start<u.value.end||t.end>u.value.start&&t.end<=u.value.end))return e.booked=!0,void(e.bookedInfo="Réservée du ".concat(ae.a.formatNumericDate(t.start)," au ").concat(ae.a.formatNumericDate(t.end)))}))}function m(){e.value=e.value.map((function(e){var t=Object.assign({},e);return t.booked=!1,t.includesSelectedEquipments=!0,t})),e.value.forEach((function(e){f(e),v(e)}))}function O(e){return j.apply(this,arguments)}function j(){return j=Object(C["a"])(regeneratorRuntime.mark((function n(a){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r=e.value[a],r){n.next=4;break}return re.fire("Oops...","Erreur lors de l'enregistrement de cette réservation","error"),n.abrupt("return");case 4:return n.prev=4,r.booked=!0,re.fire({title:"Réservation enregistrée",html:"Du <b>".concat(ae.a.formatLiteralDate(u.value.start),"</b><br>au <b>").concat(ae.a.formatLiteralDate(u.value.end),"</b><br>Durée de <b>").concat(p.value,"</b><br>Capacité : ").concat(r.capacity," places au total"),icon:"success"}),n.next=9,I.insertReservation(r,u.value,t.value);case 9:return n.next=11,I.getReservations(u.value);case 11:i.value=n.sent,m(),n.next=19;break;case 15:n.prev=15,n.t0=n["catch"](4),re.fire("Oops...","Erreur lors de l'enregistrement de cette réservation ".concat(n.t0),"error"),c.value=n.t0;case 19:case"end":return n.stop()}}),n,null,[[4,15]])}))),j.apply(this,arguments)}function g(){return h.apply(this,arguments)}function h(){return h=Object(C["a"])(regeneratorRuntime.mark((function e(){var t,n,a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:e.prev=0,t=i.value.map((function(e){return e._id})),re.fire("Réservations supprimées","Pour la période sélectionnée","success"),i.value=[],m(),n=Object(D["a"])(t),e.prev=6,n.s();case 8:if((a=n.n()).done){e.next=14;break}return r=a.value,e.next=12,I.deleteReservation(r);case 12:e.next=8;break;case 14:e.next=19;break;case 16:e.prev=16,e.t0=e["catch"](6),n.e(e.t0);case 19:return e.prev=19,n.f(),e.finish(19);case 22:e.next=28;break;case 24:e.prev=24,e.t1=e["catch"](0),re.fire("Oops...","Erreur lors de la suppression de cette réservation ".concat(e.t1),"error"),c.value=e.t1;case 28:case"end":return e.stop()}}),e,null,[[0,24],[6,16,19,22]])}))),h.apply(this,arguments)}return Object(a["A"])(u,Object(C["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if("unvalid"!==p.value){e.next=4;break}return c.value=d.value,re.fire("Oops...",d.value,"error"),e.abrupt("return");case 4:return c.value="",e.prev=5,e.next=8,I.getReservations(u.value);case 8:i.value=e.sent,e.next=15;break;case 11:e.prev=11,e.t0=e["catch"](5),re.fire("Oops...",e.t0,"error"),c.value=e.t0;case 15:m();case 16:case"end":return e.stop()}}),e,null,[[5,11]])}))),{immediate:!1}),Object(a["A"])(l,(function(){l.value.length&&m()}),{immediate:!1}),{rooms:e,selectedCapacity:t,selectedEquipments:n,displayBookedRooms:r,error:c,isLoading:o,reservations:i,range:u,masks:s,getSynthesis:d,getRangeSpan:p,filteredRooms:b,createReservation:O,deleteReservations:g}}};n("0c79");ce.render=x,ce.__scopeId="data-v-0ed09298";var oe=ce,ie={name:"App",components:{RoomsComponent:oe}};n("7154");ie.render=r;var ue=ie,se=n("7b37"),le=n("ecee"),de=n("c074"),pe=n("ad3d");le["c"].add(de["c"],de["a"],de["b"]),Object(a["d"])(ue).use(se["a"],{}).component("font-awesome-icon",pe["a"]).mount("#app")},7154:function(e,t,n){"use strict";n("8052")},8052:function(e,t,n){},b097:function(e,t,n){"use strict";n("ccac")},ccac:function(e,t,n){},fa7d:function(e,t,n){n("99af"),n("d3b7"),n("25f0"),n("6062"),n("3ca3"),n("ddb0");var a=n("448a");function r(e,t){e=e.toString();while(e.length<t)e="0"+e;return e}function c(e){return"".concat(r(e.getHours(),2),":").concat(r(e.getMinutes(),2))}function o(e){return"".concat(r(e.getDate(),2),"/").concat(e.getMonth(),"/").concat(e.getFullYear()," ").concat(c(e))}function i(e){var t=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],n=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];return"".concat(t[e.getDay()]," ").concat(r(e.getDate(),2)," ").concat(n[e.getMonth()]," ").concat(e.getFullYear()," ").concat(c(e))}function u(e,t){var n=6e4*t,a=new Date(Math.round(e.getTime()/n)*n);return a}function s(e,t){var n=u(e,t);return n.getTime()>e.getTime()?n:new Date(n.getTime()+6e4*t)}function l(e,t){var n=t-e,a=Math.floor(n/864e5),r=Math.floor(n%864e5/36e5),c=Math.round(n%864e5%36e5/6e4);if(0===a&&0===r&&0===c)return"unvalid";var o="";return a>0&&(o+="".concat(a," jour"),o+=a>=2?"s ":" "),r>0&&(o+="".concat(r," heure"),o+=r>=2?"s ":" "),c>0&&(o+="".concat(c," minute"),o+=c>=2?"s":""),o}function d(e){var t;return(t=String.prototype).concat.apply(t,a(new Set(e)))}function p(e,t,n){return e>=t&&e<=n}e.exports={formatTime:c,formatNumericDate:o,formatLiteralDate:i,roundDate:s,getDuration:l,getUniqueCharactersIn:d,dateIsInRange:p}}});
//# sourceMappingURL=app.31aaa8e7.js.map