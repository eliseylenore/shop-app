(function(e){function t(t){for(var r,a,i=t[0],c=t[1],u=t[2],d=0,l=[];d<i.length;d++)a=i[d],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&l.push(s[a][0]),s[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);f&&f(t);while(l.length)l.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==s[i]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},s={app:0},o=[];function i(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"ba392d10"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={about:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({about:"about"}[e]||e)+"."+{about:"d0b16c63"}[e]+".css",s=c.p+r,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var u=o[i],d=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(d===r||d===s))return t()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){u=l[i],d=u.getAttribute("data-href");if(d===r||d===s)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||s,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete a[e],f.parentNode.removeChild(f),n(o)},f.href=s;var m=document.getElementsByTagName("head")[0];m.appendChild(f)})).then((function(){a[e]=0})));var r=s[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=s[e]=[t,n]}));t.push(r[2]=o);var u,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=i(e);var l=new Error;u=function(t){d.onerror=d.onload=null,clearTimeout(f);var n=s[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}s[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:d})}),12e4);d.onerror=d.onload=u,document.head.appendChild(d)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var f=d;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"04d6":function(e,t,n){"use strict";n("2953")},"1fc7":function(e,t,n){},2953:function(e,t,n){},4360:function(e,t,n){"use strict";n("4de4"),n("7db0"),n("4160"),n("d81d"),n("fb6a"),n("b0c0"),n("b64b"),n("d3b7"),n("159b");var r=n("5530"),a=n("b85c"),s=n("2b0e"),o=n("2f62"),i=n("bc3a"),c=n.n(i),u=c.a.create({baseURL:"/api/products",withCredentials:!1,headers:{Accept:"application/json","Content-Type":"application/json"}}),d={getProducts:function(){return u.get("/")},getFilteredProducts:function(e){return u.get("/category/"+e)},getProduct:function(e){return u.get("/"+e)},createReview:function(e){return u.post("/"+e.product_id+"/reviews",e)},editReview:function(e){return u.put("/"+e.review.product_id+"/reviews",e)}},l={baseURL:"/api/users",withCredentials:!1,headers:{Accept:"application/json","Content-Type":"application/json"}},f={registerUser:function(e){return c.a.post("/registration/",e,l)},loginUser:function(e){return c.a.post("/login/",e,l)},getUser:function(e){return c.a.get("/"+e,l)},editUser:function(e,t){return c.a.put("/"+e,t,l)},addToCart:function(e,t){return c.a.post("/"+e+"/cart/",t,l)},addAddressToCart:function(e,t,n){return c.a.post("/"+e+"/cart/address/"+t+"/",n,l)},addToAddressBook:function(e,t){return c.a.post("/"+e+"/addToAddressBook/",t,l)},deleteAddress:function(e,t){return c.a.delete("/"+e+"/address/"+t,Object(r["a"])({},l))},addToItemQuantity:function(e,t){return c.a.put("/"+e+"/cart/itemQuantity",t,l)},removeItemFromCart:function(e,t){return c.a.delete("/"+e+"/cart/item",Object(r["a"])({data:t},l))},cancelOrder:function(e,t){return c.a.delete("/"+e+"/orders/item",Object(r["a"])({data:t},l))},checkoutCart:function(e,t){return c.a.delete("/"+e+"/cart/",Object(r["a"])({data:{email:e,cart:t}},l))},getOpenOrders:function(e){return c.a.get("/"+e+"/openOrders",l)},getFulfilledOrders:function(e){return c.a.get("/"+e+"/fulfilledOrders/",l)},markOrderFilled:function(e,t){return c.a.put("/"+e+"/orders/",t,l)}},m=n("859f");s["default"].use(o["a"]);var p=n("bb80");t["a"]=new o["a"].Store({state:{cart:JSON.parse(localStorage.getItem("cart"))||{items:[],shippingAddress:{addressline1:"",addressline2:"",city:"",state:"",country:"",zipcode:""},billingAddress:{addressline1:"",addressline2:"",city:"",state:"",country:"",zipcode:""},email:""},products:[],product:{},user:{email:"",pendingOrders:[],fulfilledOrders:[],addressBook:[]},loginError:null,registerError:null,editError:null,addressError:null,networkError:null,reviewError:null,productError:null},mutations:{SET_USER_DATA:function(e,t){e.user=t,void 0!==t&&void 0!==t.cart&&null!==t.cart&&t.cart.items.length>0?e.cart=t.cart:e.cart={items:[],shippingAddress:{addressline1:"",addressline2:"",city:"",state:"",country:"",zipcode:""},billingAddress:{addressline1:"",addressline2:"",city:"",state:"",country:"",zipcode:""},email:""},localStorage.setItem("user",JSON.stringify(t)),localStorage.setItem("cart",JSON.stringify(e.cart)),c.a.defaults.headers.common["Authorization"]="".concat(t.token),e.loginError=null,e.registerError=null},UPDATE_USER_EMAIL:function(e,t){e.cart.email=t},EDIT_USER_DATA:function(e,t){var n=t.name,r=t.email;e.user.name=n,e.user.email=r,e.editError=null},SET_EXTRA_USER_DATA:function(e,t){e.user=t,void 0!==t.cart&&(e.cart=t.cart)},SET_LOGIN_ERR:function(e,t){e.loginError=t},SET_REGISTER_ERR:function(e,t){e.registerError=t},SET_EDIT_ERR:function(e,t){e.editError=t},SET_ADDRESS_ERR:function(e,t){e.addressError=t},SET_REVIEW_ERR:function(e,t){e.reviewError=t},SET_NETWORK_ERR:function(e){e.networkError=!0},SET_PRODUCT_ERR:function(e){e.productError=!0},LOGOUT:function(){localStorage.removeItem("user"),localStorage.removeItem("cart"),location.reload()},SET_PRODUCTS:function(e,t){e.products=t},SET_OPEN_ORDERS:function(e,t){e.user.pendingOrders=t},SET_FULFILLED_ORDERS:function(e,t){e.user.fulfilledOrders=t},SET_PRODUCT:function(e,t){var n=[],s={};t.items.forEach((function(e){n.push(e.hex)}));for(var o=function(){var e=c[i];u=t.items.find((function(t){return t.hex===e}));var n,r=Object(a["a"])(u.sizes);try{for(r.s();!(n=r.n()).done;){var o=n.value;s[o.size]=1}}catch(d){r.e(d)}finally{r.f()}},i=0,c=n;i<c.length;i++){var u;o()}var d=t.items.find((function(e){return e.hex===n[0]}));e.product=Object(r["a"])(Object(r["a"])({},t),{},{colors:n,sizes:Object.keys(s),selectedHex:n[0],selectedSize:"",quantity:1,selectedItem:d})},CREATE_REVIEW:function(e,t){e.product.reviews.push(t)},EDIT_REVIEW:function(e,t){var n=t.rating,r=t.text,a=t.username,s=e.product.reviews.find((function(e){return e._id===t._id}));s.rating=n,s.text=r,s.username=a},ADD_TO_CART:function(e,t){var n=t.product,a=t.selectedProduct;e.cart.items.push(a),localStorage.setItem("cart",JSON.stringify(e.cart)),e.product=Object(r["a"])(Object(r["a"])({},n),{},{quantity:1})},ADD_TO_CART_ITEM_QUANTITY:function(e,t){var n=t._id,r=t.quantity,a=e.cart.items.find((function(e){return e._id===n}));a?a.quantity+=r:console.log("No found item.")},SET_PRODUCT_ITEM:function(e,t){e.product.selectedItem=t},ADD_SHIPPING_ADDRESS:function(e,t){e.cart.shippingAddress=t},ADD_BILLING_ADDRESS:function(e,t){e.cart.billingAddress=t},ADD_TO_ADDRESS_BOOK:function(e,t){e.user.addressBook.push(t),localStorage.setItem("user",JSON.stringify(e.user))},DELETE_ADDRESS:function(e,t){e.user.addressBook=e.user.addressBook.filter((function(e){return e._id!==t})),localStorage.setItem("user",JSON.stringify(e.user))},REMOVE_FROM_CART:function(e,t){e.cart.items=e.cart.items.filter((function(e){return e._id!==t._id||e.size!==t.size||e.hex!==t.hex})),localStorage.setItem("cart",JSON.stringify(e.cart))},MARK_ORDER_FILLED:function(e,t){e.user.pendingOrders=e.user.pendingOrders.filter((function(e){return e._id!==t._id})),e.user.fulfilledOrders.push(t)},CANCEL_ORDER:function(e,t){var n=e.user.pendingOrders.find((function(e){return t.orderId===e._id}));1===n.items.length&&(e.user.pendingOrders=e.user.pendingOrders.filter((function(e){return e._id!==t.orderId}))),n.items=n.items.filter((function(e){return e._id!==t._id}))},EMPTY_CART:function(e){var t,n=Object(a["a"])(e.cart.items);try{for(n.s();!(t=n.n()).done;){var r=t.value;e.user.pendingOrders.push(r)}}catch(s){n.e(s)}finally{n.f()}e.cart.items=[],localStorage.removeItem("cart")}},actions:{registerUser:function(e,t){var n=e.commit;return new Promise((function(e,r){f.registerUser(t).then((function(t){var r=t.data;n("SET_USER_DATA",r),e(console.log("Done!"))})).catch((function(e){n("SET_REGISTER_ERR",e.response.data),r(e)}))}))},loginUser:function(e,t){var n=e.commit;return f.loginUser(t).then((function(e){var t=e.data;n("SET_USER_DATA",Object(r["a"])(Object(r["a"])({},t.user),{},{success:t.success,token:t.token}))})).catch((function(e){n("SET_LOGIN_ERR",e.response.data)}))},editUser:function(e,t){var n=e.commit;return f.editUser(this.state.user.email,t).then((function(e){var t=e.data;n("EDIT_USER_DATA",t)})).catch((function(e){n("SET_EDIT_ERR",e.response.data)}))},fetchUserInfo:function(e){var t=e.commit;f.getUser(this.state.user.email).then((function(e){var n=e.data;t("SET_EXTRA_USER_DATA",n)})).catch((function(e){console.log(e)}))},logout:function(e){var t=e.commit;t("LOGOUT")},fetchProducts:function(e){var t=e.commit;d.getProducts().then((function(e){var n=e.data.map((function(e){return e.selectedHex=e.items[0].hex,e}));t("SET_PRODUCTS",n)})).catch((function(e){e.status?console.log("There was an error: ",e):t("SET_NETWORK_ERR")}))},fetchOpenOrders:function(e){var t=e.commit,n=e.state;f.getOpenOrders(n.user.email).then((function(e){t("SET_OPEN_ORDERS",e.data)})).catch((function(e){console.log("There was an error:",e.response)}))},fetchFulfilledOrders:function(e){var t=e.commit,n=e.state;f.getFulfilledOrders(n.user.email).then((function(e){t("SET_FULFILLED_ORDERS",e.data)})).catch((function(e){console.log("There was an error:",e.response)}))},fetchFilteredProducts:function(e,t){var n=e.commit;d.getFilteredProducts(t).then((function(e){var t=e.data.map((function(e){return e.selectedHex=e.items[0].hex,e}));n("SET_PRODUCTS",t)})).catch((function(e){console.log("There was an error:",e.response)}))},fetchProduct:function(e,t){var n=e.commit,r=this.getters.getProductById(t);r?n("SET_PRODUCT",r):d.getProduct(t).then((function(e){n("SET_PRODUCT",e.data)})).catch((function(e){console.log(e),n("SET_PRODUCT_ERR")}))},addToCart:function(e,t){var n=e.commit,r=e.state,a=t.selectedProduct;void 0!==r.user.name?f.addToCart(r.user.email,a).then((function(e){var r=e.data,a=t;a.selectedProduct._id=r.cart.items[r.cart.items.length-1]._id,n("ADD_TO_CART",a)})).catch((function(e){return console.log(e)})):n("ADD_TO_CART",t)},addToItemQuantity:function(e,t){var n=e.commit,r=e.state;void 0!==r.user.name?f.addToItemQuantity(r.user.email,t).then((function(){n("ADD_TO_CART_ITEM_QUANTITY",t)})).catch((function(e){return console.log(e)})):n("ADD_TO_CART_ITEM_QUANTITY",t)},changeProductSelectedItem:function(e,t){var n=e.commit;n("SET_PRODUCT_ITEM",t)},removeFromCart:function(e,t){var n=e.commit,r=e.state;void 0===r.user.name?n("REMOVE_FROM_CART",t):f.removeItemFromCart(r.user.email,{_id:t._id}).then((function(){return n("REMOVE_FROM_CART",t)})).catch((function(e){return console.log(e)}))},submitReview:function(e,t){var n=e.commit,r=e.state;return new Promise((function(e,a){r.user.email&&(t.useremail=r.user.email),d.createReview(t).then((function(){n("CREATE_REVIEW",t),e()})).catch((function(e){n("SET_REVIEW_ERR",e.response.data),a(e)}))}))},editReview:function(e,t){var n=e.commit,r=e.state;return new Promise((function(e,a){d.editReview({review:t,email:r.user.email}).then((function(){n("EDIT_REVIEW",t),e()})).catch((function(e){n("SET_REVIEW_ERR",e.response.data),a(e)}))}))},addShippingAddress:function(e,t){var n=e.commit,r=e.state;return n("SET_ADDRESS_ERR",null),void 0!==r.user.name?new Promise((function(e,a){f.addAddressToCart(r.user.email,"shipping",t).then((function(){n("ADD_SHIPPING_ADDRESS",t),e()})).catch((function(e){n("SET_ADDRESS_ERR",e.response.data),a(e)}))})):new Promise((function(e,r){var a=p(t),s=a.errors,o=a.isValid;o?(n("ADD_SHIPPING_ADDRESS",t),e()):(n("SET_ADDRESS_ERR",s),r(s))}))},addBillingAddress:function(e,t){var n=e.commit,r=e.state;return new Promise((function(e,a){void 0!==r.user.name?f.addAddressToCart(r.user.email,"billing",t).then((function(){n("ADD_BILLING_ADDRESS",t),e()})).catch((function(e){n("SET_ADDRESS_ERR",e.response.data),a(e)})):(n("ADD_BILLING_ADDRESS",t),e())}))},addToAddressBook:function(e,t){var n=e.commit,r=e.state;return new Promise((function(e,a){void 0!==r.user.name?f.addToAddressBook(r.user.email,t).then((function(r){var a=r.data.addressBook.find((function(e){return e.addressline1===t.addressline1&&e.addressline2===t.addressline2&&e.city===t.city}));t._id=a._id,n("ADD_TO_ADDRESS_BOOK",t),e()})).catch((function(e){n("SET_ADDRESS_ERR",e),a(e)})):(n("ADD_TO_ADDRESS_BOOK",t),e())}))},deleteAddress:function(e,t){var n=e.commit,r=e.state;return new Promise((function(e,a){void 0!==r.user.name?f.deleteAddress(r.user.email,t).then((function(){n("DELETE_ADDRESS",t),e()})).catch((function(e){n("SET_ADDRESS_ERR",e.response.data),a(e)})):(n("DELETE_ADDRESS",t),e())}))},checkoutCart:function(e){var t=e.state;return new Promise((function(e,n){t.cart&&t.cart.items&&0!==t.cart.items.length||n({"Cart length":"No items in cart"});var r=t.user.email?t.user.email:t.cart.email;r?f.checkoutCart(r,t.cart).then((function(t){e(t)})).catch((function(e){console.log(e),n(e)})):console.log("No email!")}))},emptyCart:function(e){var t=e.commit,n=e.state;t("EMPTY_CART",n)},cancelOrder:function(e,t){var n=e.commit,r=e.state;f.cancelOrder(r.user.email,t).then((function(){n("CANCEL_ORDER",t)})).catch((function(e){return console.log(e)}))},markOrderFilled:function(e,t){var n=e.commit,r=e.state;f.markOrderFilled(r.user.email,{_id:t._id}).then((function(){n("MARK_ORDER_FILLED",t)})).catch((function(e){return console.log(e)}))}},getters:{loggedIn:function(e){return void 0!==e.user.name},getProductById:function(e){return function(t){return e.products.find((function(e){return e._id===t}))}},getReviewCount:function(e){return e.product.reviews.length},getReviews:function(e){return function(t){if(!e.product||!e.product.reviews)return[];var n=e.product.reviews.slice();return n.sort((function(e,t){return e.date>t.date?-1:1})),"date"===t?n:"lowestRated"===t?n.sort((function(e,t){return e.rating<t.rating?-1:1})):"highestRated"===t?n.sort((function(e,t){return e.rating>t.rating?-1:1})):void 0}},getCartTotal:function(e){var t,n=0,r=Object(a["a"])(e.cart.items);try{for(r.s();!(t=r.n()).done;){var s=t.value;n+=parseFloat(s.price)*s.quantity}}catch(o){r.e(o)}finally{r.f()}return Object(m["b"])(n)},getShippingAddress:function(e){return e.cart.shippingAddress},getBillingAddress:function(e){return e.cart.billingAddress},getUserEmail:function(e){return e.cart.email},getAddressBookOptions:function(e){var t=e.user.addressBook.map((function(e){return{value:e,text:e.addressline1+" "+e.addressline2+", "+e.city+", "+e.state+" "+e.zipcode+" "+e.country}}));return t}}})},4678:function(e,t,n){var r={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function a(e){var t=s(e);return n(t)}function s(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}a.keys=function(){return Object.keys(r)},a.resolve=s,e.exports=a,a.id="4678"},"56d7":function(e,t,n){"use strict";n.r(t);n("d3b7");var r=n("5530"),a=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("2b0e")),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"d-flex flex-column h-100",attrs:{id:"app"}},[n("page-nav"),n("secondary-nav"),n("main",{staticClass:"flex-grow-1 mb-4"},[n("router-view")],1),n("page-footer")],1)},o=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container-fluid px-0 main-nav d-flex justify-content-between align-items-end",attrs:{role:"navigation","aria-label":"Main navigation"}},[n("b-nav",{attrs:{align:"left"}},[n("b-nav-item",{class:["nav-item pl-4","Products"===e.$route.name?"active":"inactive"],attrs:{to:{name:"Products"}}},[n("img",{staticClass:"cart-icon",attrs:{src:"/img/logo-short-with-text.svg",alt:"",title:"shop-app home page"}}),n("span",{staticClass:"sr-only"},[e._v(" shop-app home ")])])],1),n("b-nav",{attrs:{align:"right"}},[e.$store.getters.loggedIn?e._e():n("b-nav-item",{class:["nav-item mr-2 mr-sm-3","Login"===e.$route.name?"active":"inactive"],attrs:{to:{name:"Login"}}},[e._v("Login")]),e.$store.getters.loggedIn?n("b-nav-item",{class:["nav-item mr-2 mr-sm-3","Dashboard"===e.$route.name?"active":"inactive"],attrs:{to:{name:"Dashboard",params:{page:"profile"}}}},[n("img",{staticClass:"cart-icon",attrs:{src:"/img/profile.svg",alt:"",title:"Your account"}}),n("span",{staticClass:"sr-only"},[e._v("Your account")])]):e._e(),e.$store.getters.loggedIn?n("b-nav-item",{staticClass:"mr-2 mr-sm-3",on:{click:e.logout}},[e._v("Logout")]):e._e(),n("cart-button",{staticClass:"pr-5"})],1)],1)},c=[],u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-nav-item",{class:["cart-item nav-item","Cart"===e.$route.name?"active":"inactive"],staticStyle:{position:"relative"},attrs:{to:{name:"Cart"}}},[e.cartLength>0?n("div",{staticClass:"cart-quantity"},[n("p",{staticClass:"text-center mb-0 pb-0"},[n("span",{staticClass:"sr-only"},[e._v("Number of items in cart:")]),e._v(e._s(e.cartLength)+" ")])]):e._e(),n("img",{staticClass:"cart-icon",attrs:{src:"/img/cart.svg",alt:"shopping cart",title:"Your cart"}})])},d=[],l=n("2f62"),f={computed:Object(r["a"])({},Object(l["c"])({cartLength:function(e){return e.cart.items.length}}))},m=f,p=(n("04d6"),n("2877")),b=Object(p["a"])(m,u,d,!1,null,null,null),g=b.exports,h={components:{CartButton:g},computed:Object(r["a"])({},Object(l["b"])(["loggedIn"])),methods:{logout:function(){this.$store.dispatch("logout")}}},v=h,E=Object(p["a"])(v,i,c,!1,null,null,null),_=E.exports,j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"w-100 py-4"},[n("b-container",[n("b-row",[n("b-col",{staticClass:"d-md-flex align-items-center justify-content-center d-none offset-md-2",attrs:{xs:"",md:"2"}},[n("img",{staticStyle:{height:"1.5em"},attrs:{src:"/img/waves-logo.svg",alt:""}})]),n("b-col",{attrs:{xs:"12",md:"2"}},[n("p",{staticClass:"mb-0"},[n("strong",[e._v("Account")])]),n("ul",{staticClass:"mb-0"},[n("li",[n("router-link",{attrs:{to:{name:"Dashboard",params:{page:"profile"}}}},[e._v("Manage your account")])],1),n("li",[n("a",{attrs:{href:"#"}},[e._v("Saved items")])])])]),n("b-col",{staticClass:"mt-3 mt-md-0",attrs:{xs:"12",md:"2"}},[n("p",{staticClass:"mb-0"},[n("strong",[e._v("Need help?")])]),n("ul",{staticClass:"mb-0"},[n("li",[n("a",{attrs:{href:"#"}},[e._v("Contact and FAQ")])])])]),n("b-col",{staticClass:"mt-3 mt-md-0",attrs:{xs:"12",md:"2"}},[n("p",{staticClass:"mb-0"},[n("strong",[e._v("Company")])]),n("ul",{staticClass:"mb-0"},[n("li",[n("router-link",{staticClass:"nav-item",attrs:{to:{name:"About"}}},[e._v("About")])],1),n("li",[n("a",{attrs:{href:"https://www.instagram.com/",target:"_blank"}},[e._v("Instagram")])])])])],1)],1)],1)},S=[],R=(n("bca0"),{}),T=Object(p["a"])(R,j,S,!1,null,"13f50be0",null),O=T.exports,y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container",attrs:{role:"navigation"}},[n("b-nav",{attrs:{"aria-label":"Secondary navigation",align:"around"}},[n("b-nav-item",{class:["nav-item","outerwear"===e.$route.params.category?"active":"inactive"],attrs:{to:{name:"Category",params:{category:"outerwear"}}}},[e._v("Outerwear")]),n("b-nav-item",{class:["nav-item","swimwear"===e.$route.params.category?"active":"inactive"],attrs:{to:{name:"Category",params:{category:"swimwear"}}}},[e._v("Swimwear")]),n("b-nav-item",{class:["nav-item","accessories"===e.$route.params.category?"active":"inactive"],attrs:{to:{name:"Category",params:{category:"accessories"}}}},[e._v("Accessories")])],1)],1)},A=[],D={},C=D,w=(n("d382"),Object(p["a"])(C,y,A,!1,null,"342b3d96",null)),I=w.exports,P={components:{PageFooter:O,PageNav:_,SecondaryNav:I}},k=P,N=(n("5c0b"),Object(p["a"])(k,s,o,!1,null,null,null)),U=N.exports,L=n("a18c"),x=n("bc3a"),z=n.n(x),M=n("4360"),F=(n("4989"),n("5f5b"));n("a0f1");a["default"].use(F["a"]),a["default"].config.productionTip=!1,new a["default"]({router:L["a"],store:M["a"],created:function(){var e=this,t=localStorage.getItem("user"),n=localStorage.getItem("cart");if(t){var a=JSON.parse(t),s=JSON.parse(n);this.$store.commit("SET_USER_DATA",Object(r["a"])(Object(r["a"])({},a),{},{cart:s}))}z.a.interceptors.response.use((function(e){return e}),(function(t){return 401===t.response.status&&(console.log("HEY"),e.$store.dispatch("logout")),Promise.reject(t)}))},render:function(e){return e(U)}}).$mount("#app")},"5b4c":function(e,t,n){},"5c0b":function(e,t,n){"use strict";n("9c0c")},"859f":function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));n("b680"),n("ac1f"),n("5319");var r=n("c1df"),a=n.n(r),s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return parseFloat(e).toFixed(t).replace(/\.0+$/,"")},o=function(e){return a()(e).utc().format("l")},i=["AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]},"9c0c":function(e,t,n){},a0f1:function(e,t,n){},a18c:function(e,t,n){"use strict";n("45fc"),n("d3b7");var r=n("2b0e"),a=n("8c4f"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-container",[n("h1",[e._v("404 File not found")])])],1)},o=[],i=n("2877"),c={},u=Object(i["a"])(c,s,o,!1,null,null,null),d=u.exports;r["default"].use(a["a"]);var l=[{path:"/",redirect:{name:"Products"}},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}},{path:"/register",name:"Register",component:function(){return n.e("about").then(n.bind(null,"1e7f"))}},{path:"/login",name:"Login",component:function(){return n.e("about").then(n.bind(null,"2fef"))}},{path:"/dashboard/:page",name:"Dashboard",meta:{requiresAuth:!0},component:function(){return n.e("about").then(n.bind(null,"7277"))}},{path:"/editprofile",name:"EditProfile",meta:{requiresAuth:!0},component:function(){return n.e("about").then(n.bind(null,"fb5e"))}},{path:"/products",name:"Products",alias:["/outerwear","/swimwear","/accessories"],component:function(){return n.e("about").then(n.bind(null,"e6dc"))}},{path:"/products/category/:category",name:"Category",component:function(){return n.e("about").then(n.bind(null,"e6dc"))}},{path:"/product/:id",name:"ProductShow",component:function(){return n.e("about").then(n.bind(null,"eaec"))}},{path:"/cart",name:"Cart",component:function(){return n.e("about").then(n.bind(null,"b789"))}},{path:"/shipping",name:"Shipping",component:function(){return n.e("about").then(n.bind(null,"426d"))}},{path:"/billing",name:"Billing",component:function(){return n.e("about").then(n.bind(null,"2942"))}},{path:"/checkout",name:"Checkout",component:function(){return n.e("about").then(n.bind(null,"7cb4"))}},{path:"/ordersubmitted",name:"OrderSubmitted",component:function(){return n.e("about").then(n.bind(null,"0009"))}},{path:"/product/:id/review",name:"ProductReview",component:function(){return n.e("about").then(n.bind(null,"4446"))}},{path:"*",component:d}],f=new a["a"]({mode:"history",base:"/",routes:l});f.beforeEach((function(e,t,n){var r=localStorage.getItem("user");e.matched.some((function(e){return e.meta.requiresAuth}))&&!r&&n({name:"Login"}),n()}));t["a"]=f},bb80:function(e,t,n){var r=n("f90c"),a=n("0b85");e.exports=function(e){var t={};return e.email=a(e.email)?"":e.email,e.addressline1=a(e.addressline1)?"":e.addressline1,e.addressline2=a(e.addressline2)?"":e.addressline2,e.city=a(e.city)?"":e.city,e.state=a(e.state)?"":e.state,e.zipcode=a(e.zipcode)?"":e.zipcode,e.country=a(e.country)?"":e.country,r.isEmpty(e.email)||r.isEmail(e.email)||(console.log("Email invalid",e.email),t.email="Email is invalid"),r.isEmpty(e.addressline1)&&(t.addressline1="Address Line 1 field is required"),r.isEmpty(e.city)&&(t.city="City field is required"),r.isEmpty(e.state)&&(t.state="State field is required"),r.isEmpty(e.country)?t.country="Country field is required":r.equals(e.country,"United States")||(t.country="Country must be United States"),r.isEmpty(e.zipcode)?t.zipcode="Zipcode field is required":r.isPostalCode(e.zipcode,"US")||(t.zipcode="Zipcode is invalid"),{errors:t,isValid:a(t)}}},bca0:function(e,t,n){"use strict";n("5b4c")},d382:function(e,t,n){"use strict";n("1fc7")}});
//# sourceMappingURL=app.9bb276af.js.map