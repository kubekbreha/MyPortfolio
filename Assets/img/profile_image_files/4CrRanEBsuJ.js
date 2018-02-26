if (self.CavalryLogger) { CavalryLogger.start_js(["qMKMi"]); }

__d("StarsRatableComposerCloseResetBehaviorEnum",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({NONE:"none",RESET_TO_EMPTY:"reset_to_empty",RESET_TO_PREVIOUS:"reset_to_previous"})}),null);
__d("StarsRatableBase",["Event","Arbiter","CSS","DOM","Parent","Run","StarsRatableComposerCloseResetBehaviorEnum"],(function a(b,c,d,e,f,g){__p&&__p();function h(i,j,k,l){__p&&__p();this.root=i;this.freezeOnClick=j;this.stars=c("DOM").scry(i,"a");this.listeners=[c("Event").listen(this.root,"click",this._onClick.bind(this)),c("Event").listen(this.root,"mousemove",this._onMouseMove.bind(this)),c("Event").listen(this.root,"mouseout",this._onMouseOut.bind(this))];this.holdMouseMove=false;this.setRating(k);this.defaultRating=k;this.composerHideResetBehavior=l;this.composerArbiters=[];c("Run").onLeave(this.destroyListeners.bind(this))}h.init=function(i,j,k,l){return new h(i,j,k,l)};Object.assign(h.prototype,{_onClick:function i(event){__p&&__p();this.layerHides=0;var j=this._getStarIndexFromEvent(event);if(!j)return;this.setRating(j);if(this.freezeOnClick)this.freeze();else this.holdMouseMove=true;if(this.composerHideResetBehavior!==c("StarsRatableComposerCloseResetBehaviorEnum").NONE)this.composerArbiters=[c("Arbiter").subscribe("saving_rating_from_composer",function(k,l){this.defaultRating=l;this.setRating(this.composerHideResetBehavior===c("StarsRatableComposerCloseResetBehaviorEnum").RESET_TO_EMPTY?0:l);this._unsubscribeComposerArbiters()}.bind(this)),c("Arbiter").subscribe("canceling_from_composer",function(){this.setRating(this.composerHideResetBehavior===c("StarsRatableComposerCloseResetBehaviorEnum").RESET_TO_EMPTY?0:this.defaultRating);this._unsubscribeComposerArbiters()}.bind(this))];event.prevent()},_unsubscribeComposerArbiters:function i(){for(var j=0;j<this.composerArbiters.length;++j)c("Arbiter").unsubscribe(this.composerArbiters[j]);this.composerArbiters=[]},_onMouseMove:function i(event){if(this.holdMouseMove)return;var j=this._getStarIndexFromEvent(event);if(!j)return;this.setStars(j,true)},_onMouseOut:function i(event){this.holdMouseMove=false;this.updateStars()},_getStarIndexFromEvent:function i(event){var j=c("Parent").byTag(event.getTarget(),"a");if(j)return this.stars.indexOf(j)+1;return 0},setRating:function i(j){this._rating=j;this.updateStars()},updateStars:function i(){this.setStars(this._rating)},setStars:function i(j,k){var l=k?"hoverStar":"fullStar",m=k?"fullStar":"hoverStar";for(var n=0;n<this.stars.length;++n){c("CSS").removeClass(this.stars[n],m);var o=n>=j;c("CSS").conditionClass(this.stars[n],l,!o);c("CSS").conditionClass(this.stars[n],"emptyStar",o)}},freeze:function i(){c("CSS").addClass(this.root,"uiStarsRated");this.destroyListeners()},destroyListeners:function i(){this.listeners.forEach(function(j){j&&j.remove()});this.listeners=[]}});b.StarsRatableBase=f.exports=h}),null);
__d("XGroupsMemberConnectionsIntentLoggingController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/groups/member_connections/log_intent/",{member_id:{type:"Int"},group_id:{type:"Int"},intent_type:{type:"Enum",enumType:1}})}),null);
__d("GroupsMemberConnectionsLogger",["AsyncRequest","Event","XGroupsMemberConnectionsIntentLoggingController"],(function a(b,c,d,e,f,g){"use strict";var h={logIntentOnJavaScriptEvent:function i(j,k,l,m,n){c("Event").listen(j,k,function(){h.logIntent(l,m,n)})},logIntent:function i(j,k,l){var m=c("XGroupsMemberConnectionsIntentLoggingController").getURIBuilder().setInt("member_id",k).setInt("group_id",j).setEnum("intent_type",l).getURI();new(c("AsyncRequest"))(m).send()}};f.exports=h}),null);
__d("PagesGrowthGeneralAnalyticalTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();function h(){this.clear()}h.prototype.log=function(){c("GeneratedLoggerUtils").log("logger:PagesGrowthGeneralAnalyticalLoggerConfig",this.$PagesGrowthGeneralAnalyticalTypedLogger1,c("Banzai").BASIC)};h.prototype.logVital=function(){c("GeneratedLoggerUtils").log("logger:PagesGrowthGeneralAnalyticalLoggerConfig",this.$PagesGrowthGeneralAnalyticalTypedLogger1,c("Banzai").VITAL)};h.prototype.clear=function(){this.$PagesGrowthGeneralAnalyticalTypedLogger1={};return this};h.prototype.updateData=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1=babelHelpers["extends"]({},this.$PagesGrowthGeneralAnalyticalTypedLogger1,j);return this};h.prototype.setEvent=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.event=j;return this};h.prototype.setEventLocation=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.event_location=j;return this};h.prototype.setEventRef=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.event_ref=j;return this};h.prototype.setEventResult=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.event_result=j;return this};h.prototype.setEventTarget=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.event_target=j;return this};h.prototype.setExperimentGroupName=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.experiment_group_name=j;return this};h.prototype.setExperimentName=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.experiment_name=j;return this};h.prototype.setFanCount=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.fan_count=j;return this};h.prototype.setFeatureName=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.feature_name=j;return this};h.prototype.setIsAdmin=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.is_admin=j;return this};h.prototype.setIsPagePublished=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.is_page_published=j;return this};h.prototype.setNotifID=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.notif_id=j;return this};h.prototype.setPageID=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.page_id=j;return this};h.prototype.setSessionid=function(j){this.$PagesGrowthGeneralAnalyticalTypedLogger1.sessionid=j;return this};h.prototype.updateExtraData=function(j){j=c("nullthrows")(c("GeneratedLoggerUtils").serializeMap(j));c("GeneratedLoggerUtils").checkExtraDataFieldNames(j,i);this.$PagesGrowthGeneralAnalyticalTypedLogger1=babelHelpers["extends"]({},this.$PagesGrowthGeneralAnalyticalTypedLogger1,j);return this};h.prototype.addToExtraData=function(j,k){var l={};l[j]=k;return this.updateExtraData(l)};var i={event:true,event_location:true,event_ref:true,event_result:true,event_target:true,experiment_group_name:true,experiment_name:true,fan_count:true,feature_name:true,is_admin:true,is_page_published:true,notif_id:true,page_id:true,sessionid:true};f.exports=h}),null);
__d("PagesAboutSectionLogger",["Event","PagesEventObserver","Run"],(function a(b,c,d,e,f,g){"use strict";var h={registerLogEvent:function i(j,k,l){var m=c("Event").listen(j,"click",function(){return c("PagesEventObserver").notify(k,l)});c("Run").onLeave(function(){m.remove()})}};f.exports=h}),null);
__d("ContextRowEventLogger",["Event","BanzaiLogger"],(function a(b,c,d,e,f,g){var h={registerContextRowClickAction:function i(j,k){c("Event").listen(j,"click",function(){c("BanzaiLogger").log("PageContextRowEventsLoggerConfig",k)})}};f.exports=h}),null);
__d("PagesBanzaiEventListener",["Event","PagesEventObserver","Run"],(function a(b,c,d,e,f,g){var h={registerLogEvent:function i(j,k,l){var m=c("Event").listen(j,"click",function(event){c("PagesEventObserver").logData_DEPRECATED(k,l)});c("Run").onLeave(function(){m.remove()})}};f.exports=h}),null);
__d("PageFriendInviterEntryPointHelper",["Event","PagesGrowthGeneralAnalyticalTypedLogger","tidyEvent"],(function a(b,c,d,e,f,g){"use strict";var h={listenToClick:function i(j,k){c("tidyEvent")(c("Event").listen(j,"click",function(){new(c("PagesGrowthGeneralAnalyticalTypedLogger"))().setEvent("click").setEventTarget(k).setEventLocation("page_timeline").setFeatureName("modal_page_invite_redesign").log()}))}};f.exports=h}),null);
__d("XPageStoryComposerController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/page_story/composer/",{page_id:{type:"FBID"}})}),null);
__d("PageStoryComposer",["ActorURI","AsyncRequest","XPageStoryComposerController"],(function a(b,c,d,e,f,g){"use strict";var h={composePageStory:function i(j,k){j.addEventListener("click",function(){var l=c("XPageStoryComposerController").getURIBuilder().getURI();l=c("ActorURI").create(l,k);new(c("AsyncRequest"))(l).setMethod("POST").setData({page_id:k}).send()})}};f.exports=h}),null);
__d("XReviewsTabUpdateHistogramController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/ajax/pages/review/update_histogram/",{page_id:{type:"Int"}})}),null);
__d("ReviewsController",["csx","fbt","ix","Arbiter","AsyncRequest","DOM","Dialog","Event","Image.react","React","ReactDOM","Run","XReviewsTabUpdateHistogramController","ge"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k={},l={},m={},n={},o={},p={registerRevealProfanity:function q(r,s,t){c("Event").listen(s,"click",function(){r.style.display="none";t.style.display="inline"})},registerButton:function q(r,s){k[s]=k[s]||[];k[s].push(r)},registerViewerReview:function q(r,s){l[s]=l[s]||[];l[s].push(r)},registerComposer:function q(r,s){m[s]=m[s]||[];m[s].push(r)},registerToggle:function q(r,s,t,u){n[r]=n[r]||[];n[r].push([s,t,u])},registerStoryDeleteListener:function q(r){c("Arbiter").subscribe("Story/delete",function(s,t){this._updateToggles(r,false);new(c("AsyncRequest"))(c("XReviewsTabUpdateHistogramController").getURIBuilder().setInt("page_id",r).getURI()).setMethod("GET").setReadOnly(true).send()}.bind(this))},addUserReview:function q(r,s,t,u,v,w,x,y,z,A,B){this._updateState(true,r,s,t,u,v,w,x,y,z,A,B)},deleteUserReview:function q(r,s,t,u,v,w){this._updateState(false,r,null,null,null,s,t,u,w,null,null);if(v){var x=document.getElementById(v),y=x.parentNode.parentNode;y.parentNode.removeChild(y)}},_updateState:function q(r,s,t,u,v,w,x,y,z,A,B,C){__p&&__p();var D;if(A){var E=c("ge")("own_review_container");if(E)c("DOM").setContent(E,A)}else if(z){var F=c("ge")("viewer_own_review_tab");if(F)c("DOM").replace(F,z)}else if(r){var G=c("ge")("page_reviews_tab_list");if(G)c("DOM").prependContent(G,u);var H="div._yj3",I=c("DOM").scry(document,H)[0];if(I)I.parentNode.removeChild(I)}var J=l[s]||[];for(D=0;D<J.length;D++)c("DOM").remove(J[D]);this._updateToggles(s,r);var K=m[s]||[];for(D=0;D<K.length;D++){var L=K[D];if(r)L.hide();else{L.clear();L.show()}}var M=k[s]||[];for(D=0;D<M.length;D++){var N=M[D],O=c("DOM").find(N,".uiButtonText"),P=c("DOM").find(N,"i"),Q,R;if(r){Q=j("76766");R=i._("Reviewed")}else{Q=j("76771");R=i._("Hodnoti\u0165")}var S=c("DOM").create("span");c("ReactDOM").render(c("React").createElement("div",null,R),O);c("ReactDOM").render(c("React").createElement(c("Image.react"),{src:Q,style:{paddingRight:"5px"}}),S);c("DOM").replace(P,S)}if(r){var T=c("DOM").scry(document,"#page_recommendations_browse_list")[0];if(T)c("DOM").prependContent(T,t)}if(w){var U=c("ge")("page_reviews_pill_and_histogram");if(U)c("DOM").replace(U,w)}if(x){var V=c("ge")("pages_inline_rating_summary");if(V)c("DOM").replace(V,x)}if(y){var W=c("ge")("pages_review_needy_place_card");if(W)c("DOM").replace(W,y)}if(B){var X=c("ge")("spotlight_reviews_card_list");if(X)c("DOM").prependContent(X,B)}if(C){var Y=c("ge")("review_composer_container");c("DOM").insertAfter(Y,C)}},registerPhotoUpload:function q(r,s){__p&&__p();c("Arbiter").subscribe("multi-upload/images-upload-completed/"+s,function(){o[s]=false});c("Arbiter").subscribe("multi-upload/images-upload-start/"+s,function(){o[s]=true});c("Event").listen(r,"submit",function(){if(o[s]){new(c("Dialog"))().setTitle(i._("Photos Are Uploading")).setSemiModal(true).setButtons(c("Dialog").OK).setBody(i._("Please wait until photo is uploaded before posting.")).show();return false}return true}.bind(this))},_updateToggles:function q(r,s){var t=n[r]||[];for(var u=0;u<t.length;u++){var v=t[u],w=v[s?1:2];c("DOM").setContent(v[0],w)}}};c("Run").onLeave(function(){k={};l={};m={};n={};o={}});f.exports=p}),null);
__d("PageTimelineViewportTracking",["csx","Banzai","DataAttributeUtils","DOM","TimelineViewportTrackingLogType","ViewportTracking","viewportTrackingBuilder","$"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i,j;function k(n){return{getAllStories:function o(){return c("DOM").scry(c("$")("globalContainer"),"._5pat")},getStoryID:function o(p){var q=JSON.parse(c("DataAttributeUtils").getDataFt(p));return q&&q.top_level_post_id},getDataToLog:function o(p){return JSON.parse(c("DataAttributeUtils").getDataFt(p))||{}},getStream:function o(){return c("$")("globalContainer")},getDataFromConfig:function o(n,p){p.isTimetrackingEnabled=true}}}i=babelHelpers.inherits(l,c("ViewportTracking"));j=i&&i.prototype;l.prototype.getTimetrackingDataToLog=function(n){var o=j.getTimetrackingDataToLog.call(this,n);o.log_type=c("TimelineViewportTrackingLogType").DURATION;return o};l.prototype.getAllStoriesFromCache=function(){return this.behavior.getAllStories()};l.prototype.sendDataToLog=function(n,o,p,q){if(!o.ft)return;var r={};if(q)r.retry=q;if(p)r.delay=2e3;c("Banzai").post("page_timeline_vpv_tracking",o,r)};l.prototype.cleanup=function(){m.clearSingleton();j.cleanup.call(this)};function l(){i.apply(this,arguments)}var m=c("viewportTrackingBuilder")(function(n){var o=new l(k(n));o.init(n);return o});m.init=m.singleton.bind(m);f.exports=m}),null);
__d("PagesPostsSearch",["cx","Arbiter","CSS","DOM","LoadingIndicator.react","React","ReactDOM","Run","SubscriptionsHandler","UIPagelet"],(function a(b,c,d,e,f,g,h){__p&&__p();var i=100,j={searchPosts:function k(l,m,n){this._pageID=l;this._postsContainer=m;this._searchResultsContainer=n;var o=new(c("SubscriptionsHandler"))();o.addSubscriptions(c("Arbiter").subscribe("PagesTimelineSearch/search",this._handleSearchBarAction.bind(this)));c("Run").onLeave(function(){return o.release()})},_handleSearchBarAction:function k(l,m){this._query=m.query;if(this._query!=="")this._handleSearch();else this._handleClearField();setTimeout(function(){c("Arbiter").inform("PagesTimelineSearch/searchDone",{query:this._query})}.bind(this),i)},_handleSearch:function k(){c("CSS").hide(this._postsContainer);c("ReactDOM").render(c("React").createElement("div",{className:"_3x9t"},c("React").createElement(c("LoadingIndicator.react"),{color:"white",size:"large"})),this._searchResultsContainer);c("UIPagelet").loadFromEndpoint("PagePostsSearchResultsPagelet",this._searchResultsContainer,{page_id:this._pageID,search_query:this._query})},_handleClearField:function k(){c("DOM").setContent(this._searchResultsContainer,null);c("CSS").show(this._postsContainer)}};f.exports=j}),null);
__d("TimelineSecondaryColumnUnitList",["csx","cx","CSS","DOM","Event","Run","mixInEventEmitter"],(function a(b,c,d,e,f,g,h,i){__p&&__p();var j=30;function k(l,m){"use strict";var n=c("Event").listen(m,"click",function(){this.$TimelineSecondaryColumnUnitList1=c("DOM").scry(l,"._16f_");this.$TimelineSecondaryColumnUnitList2();c("DOM").remove(m);this.emit("expanded")}.bind(this));c("Run").onLeave(n.remove.bind(n))}k.prototype.$TimelineSecondaryColumnUnitList2=function(){"use strict";if(!this.$TimelineSecondaryColumnUnitList1.length)return;c("CSS").removeClass(this.$TimelineSecondaryColumnUnitList1.shift(),"_16f_");setTimeout(this.$TimelineSecondaryColumnUnitList2.bind(this),j)};c("mixInEventEmitter")(k,{expanded:true});f.exports=k}),null);
__d("ReactionLogging",["DataStore","Event","MarauderLogger"],(function a(b,c,d,e,f,g){__p&&__p();var h="reaction_logging";function i(k,l,m){c("DataStore").set(k,h,l);if(m)c("Event").listen(k,"click",function(){j(k)})}function j(k){var l=c("DataStore").get(k,h);if(!l||!l.logging_data)return;l=l.logging_data;c("MarauderLogger").log("reaction_unit_interaction","guide_cards_null_state",l)}f.exports={startLogTracking:i}}),null);
__d("FBReactionComponentInfoRow",["CSS","Event","Run"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();f.exports={registerHoverTriggeredAction:function h(i,j){var k=c("Event").listen(i,"mouseenter",function(){if(j)c("CSS").show(j)}),l=c("Event").listen(i,"mouseleave",function(){if(j)c("CSS").hide(j)});c("Run").onLeave(function(){k.remove();l.remove()})}}}),null);
__d("MorePagerFetchOnScroll",["AsyncRequest","DOMQuery","Event","Style","Vector","throttle"],(function a(b,c,d,e,f,g){__p&&__p();var h={};function i(j,k,l){"use strict";this._pager=j;this._offset=k||0;this._hasEventHandlers=false;if(l)this.setup();h[j.id]=this}i.prototype.setup=function(){"use strict";__p&&__p();this._scrollParent=c("Style").getScrollParent(this._pager);this.setPagerInViewHandler(this._defaultPagerInViewHandler.bind(this));if(!this.check()){this._scrollListener=c("Event").listen(this._scrollParent,"scroll",c("throttle")(function(){this.check()}.bind(this),50));this._clickListener=c("Event").listen(this._scrollParent,"click",c("throttle")(function(){this.check()}.bind(this),50));this._hasEventHandlers=true}};i.prototype.check=function(){"use strict";__p&&__p();if(!c("DOMQuery").contains(document.body,this._pager)){this.removeEventListeners();return true}var j=c("Vector").getElementPosition(this._pager).y,k=this._scrollParent===window?c("Vector").getViewportDimensions().y:c("Vector").getElementDimensions(this._scrollParent).y,l=this._scrollParent===window?c("Vector").getScrollPosition().y+k:c("Vector").getElementPosition(this._scrollParent).y+k;if(j-this._offset<l){this._inViewHandler();this.removeEventListeners();return true}return false};i.prototype.removeEventListeners=function(){"use strict";if(this._hasEventHandlers){this._scrollListener&&this._scrollListener.remove();this._clickListener&&this._clickListener.remove();this._hasEventHandlers=false}};i.prototype.setPagerInViewHandler=function(j){"use strict";this._inViewHandler=j;return this};i.prototype._defaultPagerInViewHandler=function(){"use strict";var j=c("DOMQuery").scry(this._pager,"a")[0];if(j)c("AsyncRequest").bootstrap(j.getAttribute("ajaxify")||j.href,j)};i.getInstance=function(j){"use strict";return h[j]};f.exports=i}),null);
__d("LocalContentClickLogger",["BanzaiLogger","EventListener"],(function a(b,c,d,e,f,g){__p&&__p();h.prototype.initClickThroughLogging=function(i,j,k){"use strict";c("EventListener").listen(i,"click",function(){return this.sendLoggingRequest(j,k)}.bind(this))};h.prototype.initMenuClickLogging=function(i,j,k,l){"use strict";i.subscribe("itemclick",function(m,n){if(n.item.getValue()==j)this.sendLoggingRequest(k,l)}.bind(this))};h.prototype.initPrivacyMenuClickLogging=function(i,j,k){"use strict";c("EventListener").listen(i,"click",function(event){j.button_text=event.target.textContent;this.sendLoggingRequest(j,k)}.bind(this))};h.prototype.sendLoggingRequest=function(i,j){"use strict";if(j=="reviews")c("BanzaiLogger").log("ReviewConsumptionLoggerConfig",i);else if(j=="review_production")c("BanzaiLogger").log("ReviewProductionLoggerConfig",i);else if(j=="menus")c("BanzaiLogger").log("MenuConsumptionLoggerConfig",i)};function h(){"use strict"}f.exports=new h()}),null);