(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-16b8843a"],{"13d5":function(t,e,r){"use strict";var i=r("23e7"),n=r("d58f").left,a=r("a640"),s=r("ae40"),o=r("2d00"),c=r("605d"),l=a("reduce"),u=s("reduce",{1:0}),d=!c&&o>79&&o<83;i({target:"Array",proto:!0,forced:!l||!u||d},{reduce:function(t){return n(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"1bdc":function(t,e,r){},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));r("d3b7");function i(t,e,r,i,n,a,s){try{var o=t[a](s),c=o.value}catch(l){return void r(l)}o.done?e(c):Promise.resolve(c).then(i,n)}function n(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var s=t.apply(e,r);function o(t){i(s,n,a,o,c,"next",t)}function c(t){i(s,n,a,o,c,"throw",t)}o(void 0)}))}}},"2f7f":function(t,e,r){"use strict";r("1bdc")},"2ff0":function(t,e,r){"use strict";r("a8ff")},3498:function(t,e,r){t.exports=r.p+"img/expand-triangle.4586bd90.svg"},"632f":function(t,e,r){"use strict";r("e984")},"714b":function(t,e,r){"use strict";var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("b-modal",{ref:"modal-1",attrs:{id:t.id,title:t.title,"ok-only":t.okOnly},on:{ok:function(e){return t.$emit("modal-clicked")}},scopedSlots:t._u([{key:"modal-footer",fn:function(e){var i=e.ok;return[r("button",{staticClass:"btn btn-primary",on:{click:function(t){return i()}}},[t._v(" OK ")])]}}])},[t._t("default")],2)],1)},n=[],a={props:{id:{type:String},title:{type:String,default:"Item added to cart"},okOnly:{type:Boolean,default:!0}}},s=a,o=r("2877"),c=Object(o["a"])(s,i,n,!1,null,null,null);e["a"]=c.exports},8968:function(t,e,r){},"96cf":function(t,e,r){var i=function(t){"use strict";var e,r=Object.prototype,i=r.hasOwnProperty,n="function"===typeof Symbol?Symbol:{},a=n.iterator||"@@iterator",s=n.asyncIterator||"@@asyncIterator",o=n.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(P){c=function(t,e,r){return t[e]=r}}function l(t,e,r,i){var n=e&&e.prototype instanceof m?e:m,a=Object.create(n.prototype),s=new E(i||[]);return a._invoke=z(t,r,s),a}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(P){return{type:"throw",arg:P}}}t.wrap=l;var d="suspendedStart",f="suspendedYield",v="executing",h="completed",p={};function m(){}function g(){}function y(){}var w={};w[a]=function(){return this};var b=Object.getPrototypeOf,_=b&&b(b(j([])));_&&_!==r&&i.call(_,a)&&(w=_);var x=y.prototype=m.prototype=Object.create(w);function C(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function r(n,a,s,o){var c=u(t[n],t,a);if("throw"!==c.type){var l=c.arg,d=l.value;return d&&"object"===typeof d&&i.call(d,"__await")?e.resolve(d.__await).then((function(t){r("next",t,s,o)}),(function(t){r("throw",t,s,o)})):e.resolve(d).then((function(t){l.value=t,s(l)}),(function(t){return r("throw",t,s,o)}))}o(c.arg)}var n;function a(t,i){function a(){return new e((function(e,n){r(t,i,e,n)}))}return n=n?n.then(a,a):a()}this._invoke=a}function z(t,e,r){var i=d;return function(n,a){if(i===v)throw new Error("Generator is already running");if(i===h){if("throw"===n)throw a;return q()}r.method=n,r.arg=a;while(1){var s=r.delegate;if(s){var o=k(s,r);if(o){if(o===p)continue;return o}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(i===d)throw i=h,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);i=v;var c=u(t,e,r);if("normal"===c.type){if(i=r.done?h:f,c.arg===p)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(i=h,r.method="throw",r.arg=c.arg)}}}function k(t,r){var i=t.iterator[r.method];if(i===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method))return p;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var n=u(i,t.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,p;var a=n.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,p):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function R(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function j(t){if(t){var r=t[a];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,s=function r(){while(++n<t.length)if(i.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=e,r.done=!0,r};return s.next=s}}return{next:q}}function q(){return{value:e,done:!0}}return g.prototype=x.constructor=y,y.constructor=g,g.displayName=c(y,o,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,c(t,o,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},C(S.prototype),S.prototype[s]=function(){return this},t.AsyncIterator=S,t.async=function(e,r,i,n,a){void 0===a&&(a=Promise);var s=new S(l(e,r,i,n),a);return t.isGeneratorFunction(r)?s:s.next().then((function(t){return t.done?t.value:s.next()}))},C(x),c(x,o,"Generator"),x[a]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var i=e.pop();if(i in t)return r.value=i,r.done=!1,r}return r.done=!0,r}},t.values=j,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(R),!t)for(var r in this)"t"===r.charAt(0)&&i.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(i,n){return o.type="throw",o.arg=t,r.next=i,n&&(r.method="next",r.arg=e),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var s=this.tryEntries[a],o=s.completion;if("root"===s.tryLoc)return n("end");if(s.tryLoc<=this.prev){var c=i.call(s,"catchLoc"),l=i.call(s,"finallyLoc");if(c&&l){if(this.prev<s.catchLoc)return n(s.catchLoc,!0);if(this.prev<s.finallyLoc)return n(s.finallyLoc)}else if(c){if(this.prev<s.catchLoc)return n(s.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return n(s.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var s=a?a.completion:{};return s.type=t,s.arg=e,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(s)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),R(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var i=r.completion;if("throw"===i.type){var n=i.arg;R(r)}return n}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,i){return this.delegate={iterator:j(t),resultName:r,nextLoc:i},"next"===this.method&&(this.arg=e),p}},t}(t.exports);try{regeneratorRuntime=i}catch(n){Function("r","regeneratorRuntime = r")(i)}},a8ff:function(t,e,r){},d58f:function(t,e,r){var i=r("1c0b"),n=r("7b0b"),a=r("44ad"),s=r("50c4"),o=function(t){return function(e,r,o,c){i(r);var l=n(e),u=a(l),d=s(l.length),f=t?d-1:0,v=t?-1:1;if(o<2)while(1){if(f in u){c=u[f],f+=v;break}if(f+=v,t?f<0:d<=f)throw TypeError("Reduce of empty array with no initial value")}for(;t?f>=0:d>f;f+=v)f in u&&(c=r(c,u[f],f,l));return c}};t.exports={left:o(!1),right:o(!0)}},e984:function(t,e,r){},eaec:function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"product-show"},[i("b-container",{staticClass:"mt-5"},[i("b-row",[i("b-col",{staticClass:"px-md-5",attrs:{xs:"12",sm:"5"}},[i("div",{staticClass:"mr-lg-5 mr-0"},[i("img",{staticClass:"w-100 h-auto product-img ",attrs:{src:"./../../img/"+t.selectedImg,alt:""}})])]),i("b-col",{staticClass:"text-left pt-5 pt-sm-0",attrs:{xs:"12",sm:"5"}},[i("h2",{staticClass:"mb-0 text-left"},[t._v(" "+t._s(t.product.title)+" ")]),i("p",[t._v("$"+t._s(t.price(t.product.price)))]),i("product-form",{attrs:{product:t.product}}),i("div",{staticClass:"my-4",class:t.descriptionShowing?"closed":"open"},[i("button",{staticClass:"description d-flex align-items-center justify-content-start btn",on:{click:t.toggleDescription}},[i("h4",{staticClass:"mb-0 mr-2"},[t._v("Description")]),i("img",{staticStyle:{height:"0.7em"},attrs:{src:r("3498"),alt:""}})]),t.descriptionShowing?i("p",[t._v(t._s(t.product.description))]):t._e()]),i("div",{staticClass:"my-4",class:t.materialsShowing?"closed":"open"},[i("button",{staticClass:"materials d-flex align-items-center justify-content-start btn",on:{click:t.toggleMaterials}},[i("h4",{staticClass:"mb-0 mr-2"},[t._v("Materials and care")]),i("img",{staticStyle:{height:"0.7em"},attrs:{src:r("3498"),alt:""}})]),t.materialsShowing?i("p",[t._v(t._s(t.product.materials))]):t._e()])],1)],1),i("b-row",[i("b-col",{staticClass:"my-5 px-md-5",attrs:{xs:"12"}},[i("div",{staticClass:"d-flex align-items-center mb-2"},[i("h3",{staticClass:"text-left mr-3 mb-0"},[t._v("Reviews")]),t._l(5,(function(e){return i("span",{key:e,staticClass:"pb-2",attrs:{title:"Average "+t.averageRating+" out of 5 stars"}},[e-.3<t.averageRating?i("img",{staticClass:"star-icon",attrs:{src:"/img/star-1.svg",alt:"full-star"}}):t._e(),e+.3<=t.averageRating&&e+.7>=t.averageRating?i("img",{staticClass:"star-icon",attrs:{src:"/img/star-0.5.svg",alt:"full-star"}}):t._e(),t.averageRating<e-.7?i("img",{staticClass:"star-icon",attrs:{src:"/img/star-0.svg",alt:"full-star"}}):t._e()])})),i("p",{staticClass:"mb-0 pl-3"},[t._v(t._s(t.getReviewCount)+" reviews")])],2),!t.reviewsExpanded&&t.getReviewCount>0?i("button",{staticClass:"btn btn-primary",on:{click:function(e){t.reviewsExpanded=!0}}},[t._v(" Show reviews ")]):t._e(),t.reviewsExpanded?i("div",[i("b-form-group",[i("b-form-select",{staticClass:"w-auto",attrs:{options:t.options},model:{value:t.selectedSort,callback:function(e){t.selectedSort=e},expression:"selectedSort"}})],1),i("hr"),t._l(t.getReviews(t.selectedSort).slice(0,t.numberReviews),(function(t){return i("div",{key:t._id,staticClass:"mt-3"},[i("review",{attrs:{review:t}}),i("hr")],1)})),!t.allReviewsShown&&t.getReviewCount>=t.numberReviews?i("button",{staticClass:"btn btn-primary",on:{click:t.showAllReviews}},[t._v(" Show all reviews ")]):t._e()],2):t._e()])],1)],1)],1)},n=[],a=(r("7db0"),r("13d5"),r("5530")),s=r("859f"),o=r("2f62"),c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("form",{on:{submit:function(e){return e.preventDefault(),t.addToCart(t.product)}}},[r("modal",{ref:"modal-2",attrs:{id:"modal-2"}},[t.lastAddedProduct&&Object.keys(t.lastAddedProduct).length>0?r("product-card",{staticClass:"mx-sm-5",attrs:{product:t.lastAddedProduct}},[r("b-row",[r("b-col",{attrs:{xs:"6"}},[r("p",{staticClass:"mt-4 ml-4 mb-0 text-left"},[r("strong",[t._v(t._s(t.lastAddedProduct.title))]),t._v(", "),r("span",[t._v("size "+t._s(t.lastAddedProduct.selectedSize?t.lastAddedProduct.selectedSize:t.lastAddedProduct.size))])]),r("p",{staticClass:"mb-4 ml-4 text-left"},[t._v(" $"+t._s(t.price(t.lastAddedProduct.price))+" ")])]),r("b-col",{attrs:{xs:"6"}},[r("p",{staticClass:"mt-4 ml-4 mb-0 text-left"},[t._v(" Quantity: "+t._s(t.lastAddedProduct.quantity)+" ")])])],1)],1):t._e()],1),r("h4",{staticClass:"text-left",attrs:{id:"color-title"}},[t._v("Color")]),r("div",{staticClass:"d-flex flex-row flex-wrap mb-3",attrs:{role:"radiogroup","aria-labelledby":"color-title"}},t._l(t.product.colors,(function(e){return r("div",{key:t.product.colors.indexOf(e)},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.product.selectedHex,expression:"product.selectedHex"}],staticClass:"color-swatch",attrs:{type:"radio",id:e,name:"color","aria-checked":t.product.selectedHex===e?"true":"false"},domProps:{value:e,checked:t._q(t.product.selectedHex,e)},on:{click:function(r){return t.changeSelectedItem(e)},change:function(r){return t.$set(t.product,"selectedHex",e)}}}),r("label",{staticClass:"mb-0 mr-1",attrs:{for:e}},[r("div",{class:["color-swatch",t.product.selectedHex===e?"active":""],style:"background-color: "+e}),r("span",{staticClass:"sr-only"},[t._v(" "+t._s(e)+" ")])])])})),0),r("h4",{staticClass:"text-left",attrs:{id:"size-title"}},[t._v(" Size ")]),r("p",{staticClass:"red-text mb-0",attrs:{id:"size-error"}},[t._v(" "+t._s(t.errors.size?t.errors.size:"")+" ")]),r("div",{staticClass:"d-flex flex-row flex-wrap mb-3",attrs:{role:"radiogroup","aria-labelledby":"size-title","aria-describedby":"size-error"}},t._l(t.product.sizes,(function(e){return r("div",{key:e},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.product.selectedSize,expression:"product.selectedSize"}],attrs:{type:"radio",disabled:!t.selectedColorSizes[e],id:e,name:"size","aria-required":"true"},domProps:{value:e,checked:t._q(t.product.selectedSize,e)},on:{change:function(r){return t.$set(t.product,"selectedSize",e)}}}),r("label",{class:t.sizeClasses(e),attrs:{for:e}},[t._v(" "+t._s(e)+" ")])])})),0),t._m(0),r("select",{directives:[{name:"model",rawName:"v-model.number",value:t.product.quantity,expression:"product.quantity",modifiers:{number:!0}}],staticClass:"form-control mb-3",staticStyle:{width:"auto"},attrs:{id:"quantity","aria-describedby":"quantity-error"},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(e){var r="_value"in e?e._value:e.value;return t._n(r)}));t.$set(t.product,"quantity",e.target.multiple?r:r[0])}}},t._l(t.maxQuantity,(function(e){return r("option",{key:e},[t._v(" "+t._s(e))])})),0),r("p",{staticClass:"red-text mb-0",attrs:{id:"size-error"}},[t._v(" "+t._s(t.errors.quantity?t.errors.quantity:"")+" ")]),r("button",{staticClass:"mt-3 btn btn-primary",attrs:{type:"submit"}},[t._v(" Add to cart ")])],1)},l=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("h4",[r("label",{staticClass:"mb-0",attrs:{for:"quantity"}},[t._v("Quantity")])])}],u=r("b85c"),d=r("714b"),f=r("e915"),v={data:function(){return{errors:{},lastAddedProduct:{}}},components:{Modal:d["a"],ProductCard:f["a"]},props:{product:{type:Object,required:!0}},methods:{price:function(t){return Object(s["b"])(t,2)},addToCart:function(t){this.errors=[];var e=!1;this.product.selectedItem.sizes[t.selectedSize]<t.quantity&&(this.errors.quantity="Please select an available quantity.",e=!0);var r,i=Object(u["a"])(this.$store.state.cart.items);try{for(i.s();!(r=i.n()).done;){var n=r.value;if(n.productId===t.id&&n.hex===t.selectedHex&&n.size===t.selectedSize){var a=n.quantity+t.quantity;a>n.sizes[t.selectedSize]&&(this.errors.quantity="That quantity is not available. Please select a lower quantity.",e=!0)}}}catch(b){i.e(b)}finally{i.f()}if(this.product.selectedSize)if(this.selectedColorSizes[this.product.selectedSize]){if(!e){var s,o,c=!1,l={},d=Object(u["a"])(this.$store.state.cart.items);try{for(d.s();!(o=d.n()).done;){var f=o.value;f.hex===t.selectedHex&&f.size===t.selectedSize&&(c=!0,s=f._id)}}catch(b){d.e(b)}finally{d.f()}if(c){var v=t.quantity;console.log("itemId",s),this.$store.dispatch("addToItemQuantity",{_id:s,quantity:v})}else{var h=t.selectedItem,p=t.title,m=t.selectedSize,g=t.price,y=t.quantity,w=t._id;l={color:h.color,hex:h.hex,img:h.img,size:m,title:p,itemId:h._id,productId:w,price:g,quantity:y},this.$store.dispatch("addToCart",{product:t,selectedProduct:l})}this.lastAddedProduct=this.product,this.$bvModal.show("modal-2")}}else this.errors.size="Please select available size.";else this.errors.size="Size required"},sizeClasses:function(t){var e=["size-listing","mr-2"];return this.selectedColorSizes[t]?this.product.selectedSize===t&&e.push("active"):e.push("disabled"),e},changeSelectedItem:function(t){var e=this.product.items.find((function(e){return e.hex===t}));this.$store.commit("SET_PRODUCT_ITEM",e)}},computed:{selectedColorSizes:function(){var t,e={},r=Object(u["a"])(this.product.selectedItem.sizes);try{for(r.s();!(t=r.n()).done;){var i=t.value;e[i.size]||(e[i.size]=i.quantity)}}catch(n){r.e(n)}finally{r.f()}return e},maxQuantity:function(){var t=this;if(this.product.selectedSize){var e=this.product.selectedItem.sizes.find((function(e){return e.size===t.product.selectedSize})),r=e.quantity;return console.log("numberAvailable ",r>10),r>10?10:r}return 10}}},h=v,p=(r("fbb8"),r("2877")),m=Object(p["a"])(h,c,l,!1,null,null,null),g=m.exports,y=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.editMode?t._e():r("div",[t._l(5,(function(e){return r("span",{key:e},[e<=t.review.rating?r("img",{staticClass:"small-star-icon",attrs:{src:"/img/star-1.svg",alt:"full-star",title:"Your cart"}}):t._e(),e>t.review.rating?r("img",{staticClass:"small-star-icon",attrs:{src:"/img/star-0.svg",alt:"full-star",title:"Your cart"}}):t._e()])})),r("p",[t._v(t._s(t.thisReviewDate(t.review.date)))]),r("p",{staticClass:"mb-0"},[t._v(t._s(t.review.text))]),r("p",{staticClass:"mb-0"},[t._v(" - "+t._s(t.review.username?t.review.username:"Anonymous")+" ")]),t.review.useremail===t.$store.state.user.email?r("button",{staticClass:"btn btn-primary",on:{click:function(e){t.editMode=!t.editMode}}},[t._v(" Edit ")]):t._e()],2),t.editMode?r("edit-review",{attrs:{review:t.review,productId:"this.$router.params.id"},on:{changeEditMode:function(e){t.editMode=!1}}}):t._e()],1)},w=[],b=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mt-3"},[r("b-form",{on:{submit:function(e){return e.preventDefault(),t.editReview(e)}}},[r("b-form-group",[r("h4",{staticClass:"text-left",staticStyle:{"font-weight":"normal"},attrs:{id:"rating"}},[t._v(" Rating ")]),r("div",{staticClass:"d-flex flex-row flex-wrap",attrs:{role:"radiogroup","aria-labelledby":"rating"}},t._l(5,(function(e){return r("div",{key:e},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.review.rating,expression:"review.rating"}],staticClass:"rating",attrs:{type:"radio",id:e,name:"n","aria-checked":t.review.rating===e?"true":"false"},domProps:{value:e,checked:t._q(t.review.rating,e)},on:{change:function(r){return t.$set(t.review,"rating",e)}}}),r("label",{staticClass:"mb-0 mr-1",attrs:{for:e}},[r("div",{class:["rating",t.review.rating>=e?"active":""]}),r("span",{staticClass:"sr-only"},[t._v(" "+t._s(e)+" ")])])])})),0),r("label",{attrs:{for:"nickname"}},[t._v(" Choose a nickname. For privacy, do not use your full name. ")]),r("b-form-input",{attrs:{type:"text",name:"nickname",value:""},model:{value:t.review.username,callback:function(e){t.$set(t.review,"username",e)},expression:"review.username"}})],1),r("b-form-group",[r("label",{attrs:{for:"review-text"}},[t._v(" Review text ")]),r("b-form-textarea",{attrs:{state:t.review.text.length<10?null:t.review.text.length<299,type:"text",name:"review-text",value:"",rows:"3"},model:{value:t.review.text,callback:function(e){t.$set(t.review,"text",e)},expression:"review.text"}}),t.review.text.length>300?r("div",[r("p",{staticClass:"mt-3 red-text"},[t._v(" 300 character limit ("+t._s(t.review.text.length-300)+" above limit) ")])]):t._e()],1),r("button",{staticClass:"btn btn-primary",attrs:{type:"submit",name:"button"}},[t._v(" Save ")])],1)],1)},_=[],x=(r("96cf"),r("1da1")),C={props:{review:{type:Object,required:!0},productId:{type:String,required:!0}},computed:Object(a["a"])({},Object(o["c"])(["user","product","reviewError"])),methods:{editReview:function(){var t=this;return Object(x["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$store.dispatch("editReview",Object(a["a"])(Object(a["a"])({},t.review),{},{product_id:t.$store.state.product._id})).catch((function(t){return console.log(t)})),t.$emit("changeEditMode");case 2:case"end":return e.stop()}}),e)})))()}}},S=C,z=(r("632f"),Object(p["a"])(S,b,_,!1,null,"be8e4566",null)),k=z.exports,O={components:{EditReview:k},props:{review:Object},data:function(){return{editMode:!1}},methods:{thisReviewDate:function(t){return Object(s["a"])(t)}}},R=O,E=(r("2ff0"),Object(p["a"])(R,y,w,!1,null,"5c96d17b",null)),j=E.exports,q={components:{ProductForm:g,Review:j},data:function(){return{descriptionShowing:!0,materialsShowing:!1,reviewsExpanded:!1,allReviewsShown:!1,numberReviews:5,options:[{value:"date",text:"Most recent"},{value:"highestRated",text:"Highest Rated"},{value:"lowestRated",text:"Lowest Rated"}],selectedSort:"date"}},created:function(){this.$store.dispatch("fetchProduct",this.$route.params.id)},methods:{price:function(t){return Object(s["b"])(t,2)},toggleDescription:function(){this.descriptionShowing=!this.descriptionShowing},toggleMaterials:function(){this.materialsShowing=!this.materialsShowing},showAllReviews:function(){this.allReviewsShown=!0,this.numberReviews=this.getReviewCount}},computed:Object(a["a"])(Object(a["a"])(Object(a["a"])({selectedImg:function(){var t=this;if(this.product.items){var e=this.product.items.find((function(e){return e.hex===t.product.selectedHex}));return e.img}return this.product.img}},Object(o["c"])({product:function(t){return t.product}})),Object(o["b"])(["getReviews","getReviewCount"])),{},{averageRating:function(){if(this.product.reviews){var t=function(t,e){return t+e.rating},e=this.product.reviews.reduce(t,0),r=e/this.product.reviews.length;return Math.round(10*r)/10}return 0}})},P=q,L=(r("2f7f"),Object(p["a"])(P,i,n,!1,null,"72dd67a2",null));e["default"]=L.exports},fbb8:function(t,e,r){"use strict";r("8968")}}]);
//# sourceMappingURL=chunk-16b8843a.558785bc.js.map