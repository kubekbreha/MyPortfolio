if (self.CavalryLogger) { CavalryLogger.start_js(["m5nNM"]); }

__d("ExternalTrackingTag",["AsyncSignal","Event","TrackingPixel"],(function a(b,c,d,e,f,g){var h={listenForElementClick:function i(j,k,l,m,n){c("Event").listen(j,"click",function(){h.sendRequest(k,l,m,n)})},sendRequest:function i(j,k,l,m){if(!j)return;new(c("AsyncSignal"))("/ads/external_tracking_tag/",{href:j,tracking_tag_id:k,adgroup_id:l,ad_id:m}).send();c("TrackingPixel").loadWithNoReferrer(j)}};f.exports=h}),null);
__d("FBLynxWrapper",["URI","isFacebookURI","isLinkshimURI"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h={SUBDOMAIN:"l",SUBDOMAIN_M:"lm",PATH:"/",URL_PARAM:"u",ENC_PARAM:"e",isLynxLink:function i(j){if(j.getAttribute("data-lynx-async-dest"))return true;if(j.getAttribute("data-lynx-uri"))return true;if(c("isLinkshimURI")(new(c("URI"))(j.href)))return true;return false}};f.exports=h}),null);
__d("LitestandColumnManager",["Arbiter","BlueBar","Event","NavigationMessage","Run","SubscriptionsHandler","clamp","getScrollPosition"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h=0,i=null;function j(){__p&&__p();if(i)return;i=new(c("SubscriptionsHandler"))();i.addSubscriptions(c("Arbiter").subscribe(c("NavigationMessage").NAVIGATION_BEGIN,function(){m(0);k()}),c("Event").listen(window,"resize",function(){if(!c("BlueBar").hasFixedBlueBar()){m(0);k()}}),c("Event").listen(window,"scroll",function(){if(!l())k()}));c("Run").onLeave(function(){return i&&i.release()})}function k(){i&&i.release();i=null}function l(){if(h<=0)return false;m(c("clamp")(c("getScrollPosition")(window).y,0,h));return h>0}function m(o){h=o}var n={adjustVerticalWindowPosition:function o(p,q){j();m(q);window.scrollTo(p.x,p.y+h)}};f.exports=n}),null);
__d("LitestandStream",["csx","invariant","Arbiter","CSS","EventEmitter","LitestandColumnManager","Run","getScrollPosition","nullthrows"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=void 0,k=void 0,l=void 0,m=void 0,n=new(c("EventEmitter"))(),o={init:function p(q,r,s,t){__p&&__p();j=s;l=q;k=t;if(!m)m=c("Arbiter").subscribe("ufi/didUpdate",function(u,v){if(v.offsetY)c("LitestandColumnManager").adjustVerticalWindowPosition(c("getScrollPosition")(window),v.offsetY)});c("Run").onLeave(function(){m&&m.unsubscribe();m=null;n.removeAllListeners("ready");l=null});n.emit("ready")},getStoriesSelector:function p(){return"._5jmm"},getStreamRoot:function p(){return l},getSectionID:function p(){return j},getStoryID:function p(){return k},isStory:function p(q){return c("CSS").matchesSelector(q,"._5jmm")},getFeedStreamID:function p(){return parseInt(c("nullthrows")(l).id.split("feed_stream_")[1],16)%1e8},isReady:function p(){return!!l},addReadyListener:function p(q){o.isReady()||i(0);return n.once("ready",q)}};f.exports=o}),null);
__d("FeedAdsClickLogger",["Arbiter","AsyncRequest","BanzaiODS","DataAttributeUtils","DOM","ExternalTrackingTag","FBLynxWrapper","LitestandMessages","LitestandStream","Parent","SLConfig","TrackingNodes","URI","collectDataAttributes","ge","isFacebookURI","isLinkshimURI"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h={},i=false,j=[],k,l=false;function m(){}m.prototype.init=function(o){k=c("SLConfig").gk.sl_replace_s;c("Arbiter").subscribe("ClickRefAction/new",this.onNewUserAction.bind(this));l=o.see_more_logging_enabled;if(o.append_tracking_data_to_links){this.appendTrackingDataToLinks();c("Arbiter").subscribe(c("LitestandMessages").STORIES_INSERTED,this.appendTrackingDataToLinks.bind(this));c("Arbiter").subscribe("FeedAdsClickLogger/refreshTrackingData",this.appendTrackingDataToLinks.bind(this),c("Arbiter").SUBSCRIBE_NEW)}};m.prototype.getStories=function(){var o=c("LitestandStream").getStreamRoot();if(o)return c("DOM").scry(o,c("LitestandStream").getStoriesSelector());else{var p=c("ge")("home_stream");if(p)return c("DOM").scry(p,".uiStreamStory")}return[]};m.prototype.appendTrackingDataToLinks=function(){__p&&__p();var o=this.getStories();for(var p=0;p<o.length;p++){var q=o[p];if(q in j)continue;var r=c("DataAttributeUtils").getDataFt(q);if(!r||r.indexOf("ei")===-1&&r.indexOf("mei")===-1)continue;var s=c("DOM").scry(q,"a");for(var t=0;t<s.length;t++){var u=s[t];if(u.getAttribute("ajaxify")!=null)continue;if(u.getAttribute("rel")!=null)continue;var v=u.getAttribute("href");if(!v||v.charAt(0)==="#")continue;var w=new(c("URI"))(u);if(w.domain==="m.facebook.com")continue;if(c("isFacebookURI")(w)===false)continue;if(c("isLinkshimURI")(w)||c("FBLynxWrapper").isLynxLink(u))continue;if("hash"in w.getQueryData())continue;if(k&&(w.getPath()==="/ads/about"||w.getPath()==="/about/ads"))continue;u.setAttribute("href",n(u).toString());u.setAttribute("onmousedown","this.href = this.href.replace('__md__=0', '__md__=1');")}j.push(q)}};m.prototype.getHref=function(o){return o.getAttribute&&(o.getAttribute("ajaxify")||o.getAttribute("data-endpoint"))||o.action||o.href};m.prototype.sendLogRequest=function(o,p){__p&&__p();var q=o.ei||o.ai;if(!q&&o.mei)q=o.mf_story_key;if(o!==null&&typeof q==="string"){var r=false;if(o.tn){var s=c("TrackingNodes").parseTrackingNodeString(o.tn);for(var t=0;t<s.length;t++){var u=s[t][0];switch(u){case c("TrackingNodes").types.LIKE_LINK:case c("TrackingNodes").types.UNLIKE_LINK:case c("TrackingNodes").types.COMMENT:case c("TrackingNodes").types.COMMENT_LINK:case c("TrackingNodes").types.ADD_COMMENT_BOX:case c("TrackingNodes").types.MULTI_ATTACHMENT_VIDEO:return;case c("TrackingNodes").types.XBUTTON:case c("TrackingNodes").types.HIDE_LINK:case c("TrackingNodes").types.REPORT_SPAM_LINK:case c("TrackingNodes").types.HIDE_ALL_LINK:case c("TrackingNodes").types.DROPDOWN_BUTTON:case c("TrackingNodes").types.UNHIDE_LINK:return;case c("TrackingNodes").types.RELATED_SHARE_ARTICLE:case c("TrackingNodes").types.RELATED_SHARE_VIDEO:return;case c("TrackingNodes").types.TRANSLATION:return;case c("TrackingNodes").types.ATTACHMENT:case c("TrackingNodes").types.USER_MESSAGE:r=true;break}}}var v=Date.now(),w=500;o.duplicate_click=!!h[q]&&v-h[q]<w;h[q]=v;var x=new(c("AsyncRequest"))("/ajax/ssinfeed/end/").setData(o).setAllowCrossPageTransition(true).setMethod("POST");x.send();var y=o.href;if(c("isLinkshimURI")(new(c("URI"))(y))&&new(c("URI"))(y).getQueryData())y=new(c("URI"))(y).getQueryData().u;if(r&&!o.duplicate_click&&p!==null&&p.url&&y&&c("isFacebookURI")(new(c("URI"))(y))===false){c("ExternalTrackingTag").sendRequest(p.url,p.tag_id,p.adgroup_id);c("BanzaiODS").bumpEntityKey("external_tracking_tags","request_sent")}}};m.prototype.onNewUserAction=function(o,p){__p&&__p();if(!p.node)return;var q=this.getHref(p.node),r=c("Parent").byTag(p.node,"input")||c("Parent").byTag(p.node,"button");if(!q&&r&&r.type=="submit"&&r.getAttribute&&c("DataAttributeUtils").getDataFt(r))q="#";var s=false;if(p.node.getAttribute){var t=c("DataAttributeUtils").getDataFt(p.node);s=t&&t.indexOf("force_log_href")!=-1}if(!s&&p.event&&p.node.tagName==="A"&&p.event.defaultPrevented&&l)q="#";var u,v,w;if(p.event&&p.event.type==="click"&&!p.event.isRightClick()){u=c("collectDataAttributes")(p.node,["ft"]);u.ft.href=q;u.ft.mouse_type=p.event.type;v=c("collectDataAttributes")(p.node,["external-tracking-tags"]);w=c("collectDataAttributes")(p.node,["leadgen"]);if(w&&w.leadgen&&w.leadgen.submitted)u.ft.leadgen_submitted=1;this.sendLogRequest(u.ft,v["external-tracking-tags"])}};function n(o){var p=new(c("URI"))(o.href),q=c("collectDataAttributes")(o,["ft"]).ft,r=p.getQueryData();r.ft=q;r.__md__=0;p.setQueryData(r);return p}f.exports={init:function o(p){if(i===false){new m().init(p);i=true}},buildURL:n}}),null);
__d("SLPerfTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();function h(){this.clear()}h.prototype.log=function(){c("GeneratedLoggerUtils").log("logger:SLPerfLoggerConfig",this.$SLPerfTypedLogger1,c("Banzai").BASIC)};h.prototype.logVital=function(){c("GeneratedLoggerUtils").log("logger:SLPerfLoggerConfig",this.$SLPerfTypedLogger1,c("Banzai").VITAL)};h.prototype.clear=function(){this.$SLPerfTypedLogger1={};return this};h.prototype.updateData=function(j){this.$SLPerfTypedLogger1=babelHelpers["extends"]({},this.$SLPerfTypedLogger1,j);return this};h.prototype.setCount=function(j){this.$SLPerfTypedLogger1.count=j;return this};h.prototype.setDurationMs=function(j){this.$SLPerfTypedLogger1.duration_ms=j;return this};h.prototype.setEvent=function(j){this.$SLPerfTypedLogger1.event=j;return this};h.prototype.setVC=function(j){this.$SLPerfTypedLogger1.vc=j;return this};var i={count:true,duration_ms:true,event:true,vc:true};f.exports=h}),null);
__d("SLUtils",["csx","cx","Arbiter","DOM","Event","FeedAdsClickLogger","LitestandMessages","LitestandStream","Map","MutationObserver","Run","SLConfig","SLPerfTypedLogger","URI","clearTimeout","curry","cxodecode","goURI","joinClasses","setTimeoutAcrossTransitions"],(function a(b,c,d,aa,e,ba,ca,da){"use strict";__p&&__p();var f=false,g=[],h=!!(b.MutationObserver||b.WebKitMutationObserver);function i(Q,R){__p&&__p();var S;if(f)return;f=true;if(!c("SLConfig").gk.s_link_utils)return;if(J()){L().setEvent("init").log();N("init_timer")}j();if(c("SLConfig").gk.sl_replace_about_link)p(function(V,W){return q(V,W)});if(c("SLConfig").gk.sl_replace_s)(function(){__p&&__p();C(Q);var V=R.map(function(W){return{nonce:c("cxodecode")(W.nonce),className:c("cxodecode")(W.className)}});p(function(W,X){V.forEach(function(Y){var Z=c("DOM").scry(W,Y.nonce);Z.forEach(function($){while($.firstChild)$.removeChild($.firstChild);$.className=c("joinClasses")($.className,Y.className)})})})})();if(c("SLConfig").gk.sl_replace_subtitle&&h){var T=H(),U=new(c("MutationObserver"))(function(){return z()});U.observe(T,{childList:true,subtree:true});F();p(function(V,W){x(V,W);y(W)})}m();if(J())L().setEvent("init_duration").setDurationMs(O("init_timer")).log()}function j(){c("Arbiter").subscribe(c("LitestandMessages").STORIES_INSERTED,m);c("Arbiter").subscribe("FeedAdsClickLogger/refreshTrackingData",m,c("Arbiter").SUBSCRIBE_NEW)}function k(){if(J())N("cleanup_timer");g.forEach(function(Q){Q.unsubscribe()});f=false;g=[];if(J())L().setEvent("cleanup_duration").setDurationMs(O("cleanup_timer")).log()}var l=null;function m(){__p&&__p();if(J())N("hsa_timer");c("clearTimeout")(l);l=null;var Q=[],R=t(),S=I(),T=false;S.forEach(function(U){__p&&__p();if(!U.id)return;if(R.has(U.id))return;if(!w(U,U.id)){T=true;return}R.set(U.id,U);Q.push([U,U.id])});if(T){l=c("setTimeoutAcrossTransitions")(m,c("SLConfig").sv.sl_content_waiting_delay);if(J())L().setEvent("hsa_waiting_for_content").log()}if(J())L().setEvent("hsa_stories_added").setCount(Q.length).log();if(Q.length===0)return;Q.forEach(function(U){var V=U[0],W=U[1];return o().forEach(function(X){return X(V,W)})});if(J())L().setEvent("hsa_duration").setDurationMs(O("hsa_timer")).log()}var n=[];function o(){return n}function p(Q){n.push(Q)}function q(Q,R){__p&&__p();var S=w(Q,R);if(!S){if(J())L().setEvent("usl_real_subtitle_missing").log();return}var T=c("DOM").scry(S,"a"),U=T.filter(function(V){var W=new(c("URI"))(V.href).getPath();return W==="/ads/about"||W==="/about/ads"});if(J())L().setEvent("usl_links_updated").setCount(U.length).log();U.forEach(function(V){var W=c("FeedAdsClickLogger").buildURL(V);c("Event").listen(V,"click",c("curry")(r,W));V.href="#"})}function r(Q,R){c("goURI")(Q.toString().replace("__md__=0","__md__=1"));c("Event").stop(R)}var s=new(c("Map"))();function t(){return s}var u=new(c("Map"))(),v=new(c("Map"))();function w(Q,R){var S=null;if(u.has(R))S=u.get(R);else S=Q;var T=c("DOM").scry(S,"._5pcp");if(T.length===0)return null;else return T[0]}function x(Q,R){__p&&__p();if(u.has(R)||v.has(R))return;var S=E();if(!S){if(J())L().setEvent("es_subtitle_container_missing").log();return}var T=c("DOM").scry(Q,"._5pcp");if(J())L().setEvent("es_subtitle_count").setCount(T.length).log();if(T.length===0)return;var U=T[0],V=U.parentNode;if(!U||!V)return;var W=A();U.parentNode.replaceChild(W,U);var X=B(U);S.appendChild(X);u.set(R,X);v.set(R,W)}function y(Q){__p&&__p();if(K())N("usp_timer");var R=H();if(!R){if(J())L().setEvent("usp_feed_root_missing").log();return}var S=v.get(Q);if(!S){if(J())L().setEvent("usp_fake_missing").log();return}var T=u.get(Q);if(!T){if(J())L().setEvent("usp_real_missing").log();return}var U=R.getBoundingClientRect(),V=S.getBoundingClientRect(),W=V.top!==0&&V.left!==0;T.style.display=W?"initial":"none";T.style.top=V.top-U.top+"px";T.style.left=V.left-U.left+"px";if(K())L().setEvent("usp_duration").setDurationMs(O("usp_timer")).log()}function z(){if(K())N("eausp_duration");G();var Q=t();Q.forEach(function(R,S){x(R,S);y(S)});if(K())L().setEvent("eausp_duration").setDurationMs(O("eausp_duration")).setCount(Q.size).log()}function A(){return c("DOM").create("div",{"class":"_4kgx"})}function B(Q){return c("DOM").create("div",{style:"position: absolute; z-index: 1;"},Q)}function C(Q){var R=document.createElement("style");R.type="text/css";R.textContent=c("cxodecode")(Q);document.getElementsByTagName("head")[0].appendChild(R)}var D=null;function E(){return D}function F(){if(D)return;var Q=H();D=c("DOM").create("div",{style:"position: relative;"});Q.insertBefore(D,Q.firstChild)}function G(){if(!D)return;var Q=H();if(D.parentNode===Q)return;c("DOM").remove(D);Q.insertBefore(D,Q.firstChild)}function H(){return c("LitestandStream").getStreamRoot()||document.body}function I(){return c("DOM").scry(H(),"._5pat")}function J(){return!!c("SLConfig").gk.sl_perf_logging}function K(){return!!c("SLConfig").gk.sl_perf_logging_heavy}function L(){return new(c("SLPerfTypedLogger"))()}var M=new(c("Map"))();function N(Q){M.set(Q,Date.now())}function O(Q){var R=M.get(Q);return R==null?-1:Date.now()-R}c("Run").onBeforeUnload(k);var P={init:i};e.exports=P}),null);
__d("UFIFeedbackContext.react",["React","UFICentralUpdates","UFIFeedbackTargets"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h,i,j=c("React").PropTypes;h=babelHelpers.inherits(k,c("React").Component);i=h&&h.prototype;function k(){var l,m;for(var n=arguments.length,o=Array(n),p=0;p<n;p++)o[p]=arguments[p];return m=(l=i.constructor).call.apply(l,[this].concat(o)),this.$UFIFeedbackContext1=null,this.state={contextArgs:this.props.contextArgs,feedback:null},m}k.prototype.loadFeedbackTarget=function(l){if(!this.$UFIFeedbackContext1)this.$UFIFeedbackContext1=c("UFIFeedbackTargets").getFeedbackTarget(l,function(m){this.$UFIFeedbackContext1=null;this.setState({feedback:m})}.bind(this))};k.prototype.componentDidMount=function(){this.loadFeedbackTarget(this.state.contextArgs.ftentidentifier);this.ufiCentralUpdatesSubscriptions=[c("UFICentralUpdates").subscribe("feedback-updated",function(l,m){var n=this.state.contextArgs;if(n.ftentidentifier in m.updates)this.loadFeedbackTarget(n.ftentidentifier)}.bind(this))]};k.prototype.componentWillUnmount=function(){this.ufiCentralUpdatesSubscriptions.forEach(function(l){return l&&c("UFICentralUpdates").unsubscribe(l)});if(this.$UFIFeedbackContext1)c("UFIFeedbackTargets").unsubscribe(this.$UFIFeedbackContext1)};k.prototype.render=function(){if(this.state.feedback)return this.props.render(this.state.contextArgs,this.state.feedback);return null};k.propTypes={contextArgs:j.object.isRequired,render:j.func.isRequired};k.contextTypes={stores:j.object};f.exports=k}),null);
__d("UFIOrderingModeSelector.react",["cx","invariant","ix","Image.react","InlineBlock.react","Link.react","PopoverMenu.react","React","ReactXUIMenu","fbglyph"],(function a(b,c,d,e,f,g,h,i,j){"use strict";__p&&__p();var k,l,m=c("ReactXUIMenu").SelectableMenu,n=c("ReactXUIMenu").SelectableItem;k=babelHelpers.inherits(o,c("React").Component);l=k&&k.prototype;function o(){var p,q;for(var r=arguments.length,s=Array(r),t=0;t<r;t++)s[t]=arguments[t];return q=(p=l.constructor).call.apply(p,[this].concat(s)),this.onMenuItemClick=function(u,v){this.props.onOrderChanged(v.item.getValue())}.bind(this),q}o.prototype.render=function(){if(this.props.orderingModes.length===0)return null;var p=this.props.orderingModes.filter(function(r){return r.value==this.props.selectedMode}.bind(this)).map(function(r){return r.name}).pop();p||i(0);var q=c("React").createElement(m,{className:"_4tju",onItemClick:this.onMenuItemClick},this.props.orderingModes.map(function(r){return c("React").createElement(n,{key:r.value,value:r.value,label:r.name,selected:r.value===this.props.selectedMode},c("React").createElement("div",{className:"_3scm"},c("React").createElement("div",{className:"_3scn"},r.name),c("React").createElement("div",{className:"_3sco"},r.description)))}.bind(this)));return c("React").createElement("div",{className:"_3scp"},c("React").createElement(c("InlineBlock.react"),null,c("React").createElement(c("PopoverMenu.react"),{className:"_3scs",menu:q,alignh:this.props.alignh||"right"},c("React").createElement(c("Link.react"),null,p,c("React").createElement("div",{className:"_3sct"})))))};f.exports=o}),null);
__d("CommentsOrderingModeSelectorUsageTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();function h(){this.clear()}h.prototype.log=function(){c("GeneratedLoggerUtils").log("logger:CommentsOrderingModeSelectorUsageLoggerConfig",this.$CommentsOrderingModeSelectorUsageTypedLogger1,c("Banzai").BASIC)};h.prototype.logVital=function(){c("GeneratedLoggerUtils").log("logger:CommentsOrderingModeSelectorUsageLoggerConfig",this.$CommentsOrderingModeSelectorUsageTypedLogger1,c("Banzai").VITAL)};h.prototype.clear=function(){this.$CommentsOrderingModeSelectorUsageTypedLogger1={};return this};h.prototype.updateData=function(j){this.$CommentsOrderingModeSelectorUsageTypedLogger1=babelHelpers["extends"]({},this.$CommentsOrderingModeSelectorUsageTypedLogger1,j);return this};h.prototype.setAvailableOrders=function(j){this.$CommentsOrderingModeSelectorUsageTypedLogger1.available_orders=c("GeneratedLoggerUtils").serializeVector(j);return this};h.prototype.setEndOrder=function(j){this.$CommentsOrderingModeSelectorUsageTypedLogger1.end_order=j;return this};h.prototype.setPostFbid=function(j){this.$CommentsOrderingModeSelectorUsageTypedLogger1.post_fbid=j;return this};h.prototype.setPostOwnerFbid=function(j){this.$CommentsOrderingModeSelectorUsageTypedLogger1.post_owner_fbid=j;return this};h.prototype.setStartOrder=function(j){this.$CommentsOrderingModeSelectorUsageTypedLogger1.start_order=j;return this};h.prototype.setVC=function(j){this.$CommentsOrderingModeSelectorUsageTypedLogger1.vc=j;return this};var i={available_orders:true,end_order:true,post_fbid:true,post_owner_fbid:true,start_order:true,vc:true};f.exports=h}),null);
__d("UFIOrderingModeSelectorContainer.react",["CommentsOrderingModeSelectorUsageTypedLogger","Random","React","SubscriptionsHandler","UFIConfig","UFIInstanceAction","UFIOrderingModeSelector.react","UFIOrderingModeStore","UFISharedDispatcher"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h,i,j=c("React").PropTypes;h=babelHelpers.inherits(k,c("React").Component);i=h&&h.prototype;function k(){__p&&__p();var l,m;for(var n=arguments.length,o=Array(n),p=0;p<n;p++)o[p]=arguments[p];return m=(l=i.constructor).call.apply(l,[this].concat(o)),this.state={selectedMode:c("UFIOrderingModeStore").getState().get(this.props.contextArgs.instanceid)},this.$UFIOrderingModeSelectorContainer1=null,this.onOrderChanged=function(q){var r=this.props.feedback;if(r.orderingmodes&&c("UFIConfig").logChangeOrderingModeUsageSampleRate>c("Random").random()){var s=r.orderingmodes.map(function(t){return t.value});new(c("CommentsOrderingModeSelectorUsageTypedLogger"))().setStartOrder(this.state.selectedMode).setEndOrder(q).setPostFbid(r.commentstargetfbid).setPostOwnerFbid(r.ownerid).setAvailableOrders(s).log()}c("UFISharedDispatcher").dispatch(c("UFIInstanceAction").changeOrderingMode(this.props.contextArgs,q))}.bind(this),m}k.prototype.componentDidMount=function(){this.$UFIOrderingModeSelectorContainer1=new(c("SubscriptionsHandler"))();this.$UFIOrderingModeSelectorContainer1.addSubscriptions(c("UFIOrderingModeStore").addListener(function(){if(!this.$UFIOrderingModeSelectorContainer1)return;this.setState({selectedMode:c("UFIOrderingModeStore").getState().get(this.props.contextArgs.instanceid)})}.bind(this)))};k.prototype.componentWillUnmount=function(){if(this.$UFIOrderingModeSelectorContainer1){this.$UFIOrderingModeSelectorContainer1.release();this.$UFIOrderingModeSelectorContainer1=null}};k.prototype.shouldComponentUpdate=function(l,m){return this.state.selectedMode!==m.selectedMode};k.prototype.render=function(){return c("React").createElement(c("UFIOrderingModeSelector.react"),{alignh:this.props.alignh||"right",onOrderChanged:this.onOrderChanged,orderingModes:this.props.feedback.orderingmodes,selectedMode:this.state.selectedMode})};k.propTypes={feedback:j.shape({defaultcommentorderingmode:j.string.isRequired,orderingmodes:j.arrayOf(j.shape({name:j.string.isRequired,description:j.string.isRequired,selected:j.bool.isRequired,value:j.string.isRequired})).isRequired,commentstargetfbid:j.string.isRequired,ownerid:j.string.isRequired}).isRequired,contextArgs:j.object.isRequired,alignh:j.string};f.exports=k}),null);
__d("EntstreamFeedObjectTracking",["csx","CSS","DOM","EntstreamFeedObject","Focus","ge"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i=new Map();f.exports={register:function j(k){var l=this.getRoot(k.nodeID);if(!l)return;var m=c("DOM").scry(l,"._5v9_"),n=m&&m.length?m:[l];k.actorIDs.forEach(function(o){var p=[].concat(i.get(o)||[]);p.push.apply(p,n);i.set(o,p)})},hideAllFromActor:function j(k){var l=this.getRoot(k.nodeID);(i.get(k.actorID)||[]).forEach(function(m){if(m===l)return;c("CSS").hide(m)})},unhideAllFromActor:function j(k){var l=this.getRoot(k.nodeID);(i.get(k.actorID)||[]).forEach(function(m){c("CSS").show(m)});if(l)c("Focus").setWithoutOutline(l)},getRoot:function j(k){var l=c("ge")(k);return l?c("EntstreamFeedObject").getRoot(l):null}}}),null);
__d("AttachmentRelatedShareConstants",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({ARTICLE_CLICK:"article_click",VIDEO_CLICK:"video_click",FBVIDEO_CLICK:"fbvideo_click",FBVIDEO_VIEW:"fbvideo_view",GAME_CLICK:"game_click",PHOTO_CLICK:"photo_click",EVENT_JOIN:"event_join",PRODUCT_CLICK:"product_click",MAP_CLICK:"map_click",ACTION_BUTTON_CLICK:"action_button_click",SHOW_FOLLOW_CLICK:"show_follow_click"})}),null);
__d("XPubcontentInlinePhotoPivotsEventsController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/pubcontent/inline_photo_pivots_chaining/events/",{})}),null);
__d("EntstreamAttachmentRelatedShare",["csx","cx","Arbiter","AsyncRequest","AttachmentRelatedShareConstants","CSS","DOM","Event","SubscribeButton","XPubcontentInlinePhotoPivotsEventsController","ge","getOrCreateDOMID","tidyEvent"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=2,k=3,l={loadSuggestedShowsPivotAttachment:function m(n,o,p){var q=c("ge")(n);if(!q)return;var r=c("Arbiter").subscribe(c("SubscribeButton").SUBSCRIBED,function(s,t){r.unsubscribe();if(t.profile_id!==o.toString())return;c("Arbiter").inform(c("AttachmentRelatedShareConstants").SHOW_FOLLOW_CLICK,{attachment:q,pageID:o,storyID:p})})},loadRelatedAttachment:function m(n,o,p){__p&&__p();var q=null;if(typeof n==="string")q=c("ge")(n);else q=n;if(!q)return;var r=c("Event").listen(q,"click",function(){r.remove();c("Arbiter").inform(c("AttachmentRelatedShareConstants").ARTICLE_CLICK,{attachment:q,global_share_id:o,is_right_click:false,share_id:p})}),s=c("Event").listen(q,"mousedown",function(event){if(event.which===k||event.button===j){s.remove();c("Arbiter").inform(c("AttachmentRelatedShareConstants").ARTICLE_CLICK,{attachment:q,global_share_id:o,is_right_click:true})}})},loadInlineStoryPivotAttachment:function m(n,o){var p=c("ge")(n);if(!p)return;var q=c("Event").listen(p,"click",function(){q.remove();c("Arbiter").inform(c("AttachmentRelatedShareConstants").PHOTO_CLICK,{attachment:p,storyid:o})})},loadRelatedGameAttachment:function m(n,o){__p&&__p();var p=null;if(typeof n==="string")p=c("ge")(n);else p=n;if(!p)return;c("tidyEvent")(c("Event").listen(p,"click",function(){c("Arbiter").inform(c("AttachmentRelatedShareConstants").GAME_CLICK,{attachment:p,global_share_id:o})}));c("tidyEvent")(c("Event").listen(p,"mousedown",function(event){if(event.which===k||event.button===j)c("Arbiter").inform(c("AttachmentRelatedShareConstants").GAME_CLICK,{attachment:p,global_share_id:o})}))},loadRelatedLSCVideoAttachment:function m(n,o){var p=null;if(typeof n==="string")p=c("ge")(n);else p=n;if(!p)return;var q=c("Event").listen(p,"click",function(){q.remove();c("Arbiter").inform(c("AttachmentRelatedShareConstants").VIDEO_CLICK,{attachment:p,global_share_id:o})})},loadRelatedLSCInlineVideoAttachment:function m(n,o){__p&&__p();var p=null;if(typeof n==="string")p=c("ge")(n);else p=n;if(!p)return;c("Event").listen(p,"click",function(){__p&&__p();var q="^div._4-u2",r="_1d8v",s=c("DOM").scry(p,q),t=s.length===1?s[0]:null,u=t.parentNode,v=u.previousSibling;while(!v){u=u.parentNode;v=u.previousSibling}if(!c("CSS").hasClass(v,r))var w=c("DOM").create("div",{className:r}),x=c("DOM").insertBefore(t.parentNode,w),y=x.length>=1?x[0]:null;else y=v;var z=c("getOrCreateDOMID")(y);new(c("AsyncRequest"))().setURI("/ajax/flash/expand_inline.php").setData({share_id:o,target_div:z,max_width:470,max_height:264,replace_target_div:true}).setMethod("GET").setReadOnly(true).setRelativeTo(p.parentNode).send()})},loadRelatedEventsPivotAttachment:function m(n,o){var p=null;if(typeof n==="string")p=c("ge")(n);else p=n;if(!p)return;c("tidyEvent")(c("Event").listen(p,"click",function(){c("Arbiter").inform(c("AttachmentRelatedShareConstants").EVENT_JOIN,{attachment:p,event_id:o})}))},loadRelatedProductAttachment:function m(n,o){var p=null;if(typeof n==="string")p=c("ge")(n);else p=n;if(!p)return;c("tidyEvent")(c("Event").listen(p,"click",function(){c("Arbiter").inform(c("AttachmentRelatedShareConstants").PRODUCT_CLICK,{attachment:p,product_id:o})}))},loadMapAttachment:function m(n,o,p){var q=typeof n==="string"?c("ge")(n):n;if(!q)return;var r=typeof o==="string"?c("ge")(o):o;if(!r)return;c("tidyEvent")(c("Event").listen(q,"click",function(){c("Arbiter").inform(c("AttachmentRelatedShareConstants").MAP_CLICK,{attachment:r,story_id:p})}))},loadMapAttachmentActionButton:function m(n,o){var p=typeof n==="string"?c("ge")(n):n;if(!p)return;c("tidyEvent")(c("Event").listen(p,"click",function(){c("Arbiter").inform(c("AttachmentRelatedShareConstants").ACTION_BUTTON_CLICK,{button:p,story_id:o})}))},closeButton:function m(n,o){c("Event").listen(n,"click",function(){c("DOM").remove(o)})},closeButtonPhotoPivots:function m(n,o,p,q){c("Event").listen(n,"click",function(){var r=c("XPubcontentInlinePhotoPivotsEventsController").getURIBuilder(),s={story_id:p,search_query_type:q,event:"hide"};new(c("AsyncRequest"))().setMethod("POST").setURI(r.getURI()).setData(s).send();c("DOM").remove(o)})},seeAllLinkPhotoPivots:function m(n,o,p){c("Event").listen(n,"click",function(){var q=c("XPubcontentInlinePhotoPivotsEventsController").getURIBuilder(),r={story_id:o,search_query_type:p,event:"see_all"};new(c("AsyncRequest"))().setMethod("POST").setURI(q.getURI()).setData(r).send()})},removeOldSuggestions:function m(n){var o=c("ge")(n);if(!o)return;var p=c("DOM").scry(o.parentNode,"._5d73");for(var q=1;q<p.length;q++)c("DOM").remove(p[q]);setTimeout(function(){c("CSS").show(p[0])},1e3)},showHiddenSuggestions:function m(n){__p&&__p();var o=c("Event").listen(n,"click",function(){__p&&__p();o.remove();var p="^._1ui8",q=c("DOM").scry(n,p);if(!q)return;c("CSS").hide(q[0]);var r=q[0].previousSibling;while(r){c("CSS").show(r);r=r.previousSibling}})}};f.exports=l}),null);
__d("FeedTrackingAsync",["Arbiter","Run","collectDataAttributes"],(function a(b,c,d,e,f,g){__p&&__p();var h;f.exports.init=function(){__p&&__p();if(h)return;h=c("Arbiter").subscribe("AsyncRequest/send",function(i,j){var k=j.request,l=k.getRelativeTo();if(l){var m=k.getData(),n=c("collectDataAttributes")(l,["ft"]);if(n.ft&&Object.keys(n.ft).length)Object.assign(m,n)}});c("Run").onLeave(function(){if(h){h.unsubscribe();h=null}})}}),null);
__d("PageLikeButtonLazy",["Arbiter","Bootloader","Event","PageLikeConstants","SubscriptionsHandler","ifRequired","setImmediate"],(function a(b,c,d,e,f,g){__p&&__p();var h=new(c("SubscriptionsHandler"))(),i=[],j=false,k=false,l=c("PageLikeConstants").LIKED,m=c("PageLikeConstants").UNLIKED,n=c("PageLikeConstants").SPM_CALLOUT,o=c("PageLikeConstants").LAZY_CLICK,p={init:function q(r,s,t,u,v,w,x,y,z,A,B,C){p._initWithArgs(r,s,t,u,v,w,x,y,z,A,B,C)},_initWithArgs:function q(){for(var r=arguments.length,s=Array(r),t=0;t<r;t++)s[t]=arguments[t];c("ifRequired")("PageLikeButton",function(u){return u.init.apply(u,s)},function(){s[11]=babelHelpers["extends"]({},s[11],{isLazy:true});this._startListening(s[1]);i.push(s)}.bind(this))},_startListening:function q(r){__p&&__p();if(!j){j=true;h.addSubscriptions(c("Arbiter").subscribe([l,m,n],function(event,s){c("Arbiter").inform(event+".lazy",s,c("Arbiter").BEHAVIOR_PERSISTENT);this._bootload()}.bind(this)))}h.addSubscriptions(c("Event").listen(r,"click",function(event){c("Arbiter").inform(o,{event:event,node:r},c("Arbiter").BEHAVIOR_PERSISTENT);c("setImmediate")(function(){return this._bootload()}.bind(this))}.bind(this)))},_bootload:function q(){if(k)return;k=true;c("Bootloader").loadModules(["PageLikeButton"],function(r){h.release();i.forEach(function(s){return r.init.apply(r,s)})},"PageLikeButtonLazy")}};f.exports=p}),null);
__d("FbFeedAccessible",["csx","fbt","invariant","AccessibilityConfig","Arbiter","ARIA","CSS","DataAttributeUtils","DOMQuery","LitestandMessages","SubscriptionsHandler","ge","getOrCreateDOMID"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k="Accessibility/StoriesRequested",l="Accessibility/StoriesLoaded",m="Accessibility/StoryContentInserted",n="Accessibility/SubstreamInserted",o=void 0,p=void 0,q={init:function r(s){o=s;if(c("AccessibilityConfig").a11yNewsfeedStoryEnumeration){var t=new(c("SubscriptionsHandler"))();t.addSubscriptions(c("Arbiter").subscribe(c("LitestandMessages").STORIES_REQUESTED,this._onStoriesRequested.bind(this)),c("Arbiter").subscribe(c("LitestandMessages").STORIES_INSERTED,this._onInsertedSubstream.bind(this)),c("Arbiter").subscribe(c("LitestandMessages").NEWER_STORIES_INSERTED,this._onInsertedSubstream.bind(this)),c("Arbiter").subscribe(l,this._processStoriesLoaded.bind(this)),c("Arbiter").subscribe(k,this._processStoriesRequested.bind(this)),c("Arbiter").subscribe(m,this._processStoryContentInserted.bind(this)),c("Arbiter").subscribe(n,this._processInsertedSubstream.bind(this)));this._enumerateStories()}},informStoryContentInserted:function r(s){c("Arbiter").inform(m,s);var t=c("ge")(s);if(t&&this._isStory(t)){this.setARIARole(t);this.setAriaLabelledBy(t);this.setAriaDescribedBy(t)}},setARIARole:function r(s){s.setAttribute("role","article")},setAriaLabelledBy:function r(s){if(s.getAttribute("aria-labelledby"))return;var t=this._filterForElement(s,["._5pbw"]);if(t.length>0)s.setAttribute("aria-labelledby",t.map(function(u){return c("getOrCreateDOMID")(u)}).join(" "))},setAriaDescribedBy:function r(s){if(s.getAttribute("aria-describedby"))return;var t=this._filterForElement(s,[".timestampContent","._5pbx"]);if(t.length>0)s.setAttribute("aria-describedby",t.map(function(u){return c("getOrCreateDOMID")(u)}).join(" "))},_getStories:function r(s){return c("DOMQuery").scry(s||o,"._5jmm")},_onInsertedSubstream:function r(s,t){if(t&&t.substream_id)c("Arbiter").inform(n,t.substream_id)},_onStoriesRequested:function r(){c("Arbiter").inform(k)},_enumerateStories:function r(){var s=this._getStories(o);p=s.length;s.forEach(function(t,u){this._enumerateStory(t,u+=1)}.bind(this))},_enumerateSubstream:function r(s){var t=this._getStories();p=t.length;var u=this._getStories(c("ge")(s)),v=u.length||0;for(var w=0;w<v;w++)this._registerStoryEnumerationPosition(u[w],p-v+(w+1),w+1)},_enumerateStory:function r(s,t){this._isStory(s)||j(0);if(t>0){s.setAttribute("aria-posinset",""+t);s.setAttribute("aria-setsize",p)}},_processStoriesLoaded:function r(){c("ARIA").notify(i._("Na\u010d\u00edtalo sa viac udalost\u00ed."))},_processStoriesRequested:function r(){c("ARIA").notify(i._("Bolo vy\u017eiadan\u00fdch viac udalost\u00ed."))},_processInsertedSubstream:function r(s,t){this._enumerateSubstream(t);this._enumerateStories()},_processStoryContentInserted:function r(s,t){__p&&__p();var u=void 0,v=c("ge")(t);if(v)u=JSON.parse(c("DataAttributeUtils").getDataFt(v));if(u&&u.ordinal_position){var w=u.ordinal_position.split(":"),x=w[0],y=w[1];x=parseInt(x,10);y=parseInt(y,10);this._enumerateStory(v,x);if(y===1)c("Arbiter").inform(l)}},_registerStoryEnumerationPosition:function r(s,t,u){var v=JSON.parse(c("DataAttributeUtils").getDataFt(s));if(v){v.ordinal_position=t+":"+u;c("DataAttributeUtils").setDataFt(s,JSON.stringify(v))}},_isStory:function r(s){return c("CSS").matchesSelector(s,"._5jmm")},_filterForElement:function r(s,t){return t.map(function(u){return c("DOMQuery").scry(s||document,u)[0]}).filter(function(u){return!!u})}};f.exports=q}),null);
__d("HoverButton",["csx","cx","AsyncRequest","CSS","DOM","URI"],(function a(b,c,d,e,f,g,h,i){__p&&__p();function j(k,l,m,n){"use strict";this._button=k;this._flyout=l;this._flyoutAjaxify=n;this._flyoutContent=m;l.subscribe("show",this._onShow.bind(this));l.subscribe("hide",this._onHide.bind(this))}j.prototype.showFlyoutBriefly=function(){"use strict";this.showFlyout();this._flyout.hideFlyoutDelayed(5e3)};j.prototype.showFlyout=function(){"use strict";this._flyout.showFlyout(this._button,true);this._flyout.inform("show",this._button)};j.prototype.hideFlyout=function(){"use strict";this._flyout.hideFlyout(true);this._flyout.inform("hide",this._button)};j.prototype.enableButton=function(){"use strict";this._flyout.initNode(this._button)};j.prototype.disableButton=function(){"use strict";this.hideFlyout();this._flyout.deactivateNode(this._button)};j.prototype._onShow=function(k,l){"use strict";__p&&__p();c("CSS").addClass(l,"_52nd");if(c("CSS").hasClass(l,"uiButton")||c("CSS").matchesSelector(l,"._42fu"))c("CSS").addClass(l,"selected");if(this._flyoutAjaxify){c("CSS").addClass(this._flyoutContent,"async_saving");new(c("AsyncRequest"))().setURI(new(c("URI"))(this._flyoutAjaxify)).setHandler(function(m){c("CSS").removeClass(this._flyoutContent,"async_saving");c("DOM").setContent(this._flyoutContent,m.payload)}.bind(this)).send();this._flyoutAjaxify=null}};j.prototype._onHide=function(k,l){"use strict";c("CSS").removeClass(l,"_52nd");if(c("CSS").hasClass(l,"uiButton")||c("CSS").matchesSelector(l,"._42fu"))c("CSS").removeClass(l,"selected")};j.prototype.destroy=function(){"use strict";this.hideFlyout();this._flyout.destroy()};j.prototype.suppressNextMouseEnter=function(){"use strict";this._flyout.setActiveNode(this._button)};Object.assign(j.prototype,{_button:null,_flyout:null,_flyoutAjaxify:null,_flyoutContent:null});f.exports=j}),null);
__d("SwapButton",["DOM","Event","Focus"],(function a(b,c,d,e,f,g){__p&&__p();function h(j,k,l){c("DOM").insertAfter(k,j);c("DOM").remove(k);l&&c("Focus").setWithoutOutline(j)}function i(j,k,l){"use strict";this._swapperButton=j;this._swappeeButton=k;c("Event").listen(j,"click",h.bind(null,k,j,true));if(l)c("Event").listen(k,"click",h.bind(null,j,k,true))}i.prototype.swap=function(j){"use strict";if(this._swapperButton.parentNode)h(this._swappeeButton,this._swapperButton,j)};i.prototype.unswap=function(j){"use strict";if(!this._swapperButton.parentNode)h(this._swapperButton,this._swappeeButton,j)};i.prototype.toggle=function(j){"use strict";if(this._swapperButton.parentNode)this.swap(j);else this.unswap(j)};i.prototype.getCurrentButton=function(){"use strict";return this._swapperButton.parentNode?this._swapperButton:this._swappeeButton};Object.assign(i.prototype,{_swapperButton:null,_swappeeButton:null});f.exports=i}),null);
__d("HoverFlyout",["Arbiter","ArbiterMixin","DataStore","Event","Keys","mixin","removeFromArray","shield"],(function a(b,c,d,e,f,g){__p&&__p();var h,i;h=babelHelpers.inherits(j,c("mixin")(c("ArbiterMixin")));i=h&&h.prototype;function j(k,l,m,n){"use strict";__p&&__p();i.constructor.call(this);if(k){this._showDelay=m;this._hideDelay=n;this.init(k);if(l)this.initNode(l)}c("Arbiter").subscribe("SwapButtonDEPRECATED/focusOnJoinButton",c("shield")(this.hideFlyout,this),c("Arbiter").SUBSCRIBE_ALL)}j.prototype.init=function(k){"use strict";__p&&__p();this._flyout=k;this._showDelay=this._showDelay||0;this._hideDelay=this._hideDelay||100;this._showTimeout=null;this._hideTimeout=null;this._flyoutSubscriptions=[this._flyout.subscribe("mouseenter",this._onFlyoutMouseEnter.bind(this)),this._flyout.subscribe("mouseleave",c("shield")(this.hideFlyout,this))];this._nodes=[];this._dataStoreUnique="HoverFlyout_"+Date.now()+"_listeners";return this};j.prototype.initNode=function(k){"use strict";if(this._nodes.includes(k))return this;this._nodes.push(k);c("DataStore").set(k,this._dataStoreUnique,[c("Event").listen(k,"mouseenter",this._onNodeMouseEnter.bind(this,k)),c("Event").listen(k,"mouseleave",c("shield")(this.hideFlyout,this)),c("Event").listen(k,"click",this._onNodeMouseEnter.bind(this,k)),c("Event").listen(k,"keydown",this._onNodeKeyEscape.bind(this))]);return this};j.prototype.deactivateNode=function(k){"use strict";var l=c("DataStore").get(k,this._dataStoreUnique);if(l)while(l.length)l.pop().remove();c("removeFromArray")(this._nodes,k)};j.prototype.setShowDelay=function(k){"use strict";this._showDelay=k;return this};j.prototype.setHideDelay=function(k){"use strict";this._hideDelay=k;return this};j.prototype.showFlyout=function(k,l){"use strict";this.setActiveNode(k);if(l){this._flyout.setContext(k).show();this.inform("show",k)}else this._showTimeout=setTimeout(this.showFlyout.bind(this,k,true),this._showDelay);return this};j.prototype.hideFlyout=function(k){"use strict";clearTimeout(this._showTimeout);if(k){this._flyout.hide();this._activeNode&&this.inform("hide",this._activeNode);this._activeNode=null}else this._hideTimeout=setTimeout(this.hideFlyout.bind(this,true),this._hideDelay)};j.prototype.hideFlyoutDelayed=function(k){"use strict";clearTimeout(this._showTimeout);clearTimeout(this._hideTimeout);this._hideTimeout=setTimeout(this.hideFlyout.bind(this,true),k)};j.prototype.getActiveNode=function(){"use strict";return this._activeNode};j.prototype.setActiveNode=function(k){"use strict";clearTimeout(this._hideTimeout);if(this._activeNode&&this._activeNode!==k)this.hideFlyout(true);this._activeNode=k;return this};j.prototype.clearNodes=function(){"use strict";for(var k=this._nodes.length;k>0;k--)this.deactivateNode(this._nodes[k-1])};j.prototype.destroy=function(){"use strict";while(this._flyoutSubscriptions.length)this._flyout.unsubscribe(this._flyoutSubscriptions.pop());this.clearNodes()};j.prototype._onNodeMouseEnter=function(k){"use strict";if(this._activeNode===k)clearTimeout(this._hideTimeout);else this.showFlyout(k)};j.prototype._onFlyoutMouseEnter=function(){"use strict";clearTimeout(this._hideTimeout)};j.prototype._onNodeKeyEscape=function(event){"use strict";if(c("Event").getKeyCode(event)===c("Keys").ESC){this._activeNode&&this.inform("hide",this._activeNode);this._activeNode=null}};f.exports=b.HoverFlyout||j}),null);
__d("XFeedEgoImpressionLoggingController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/ego/feed/logging/impression/",{ego_id:{type:"Int",required:true},qid:{type:"Int",required:true},mf_story_key:{type:"Int",required:true},uid:{type:"Int"}})}),null);