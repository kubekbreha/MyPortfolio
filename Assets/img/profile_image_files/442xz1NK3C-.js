if (self.CavalryLogger) { CavalryLogger.start_js(["kPPjv"]); }

__d("MessengerGroupCreateDialog.react",["BootloadOnRender.react","JSResource","LazyComponent.react","React"],(function a(b,c,d,e,f,g){"use strict";var h,i;h=babelHelpers.inherits(j,c("React").Component);i=h&&h.prototype;j.prototype.render=function(){return c("React").createElement(c("BootloadOnRender.react"),{component:c("React").createElement(c("LazyComponent.react"),{entryPoint:this.props.entryPoint,isShown:this.props.isShown,onClose:this.props.onClose}),loader:c("JSResource")("MessengerGroupCreateDialogImpl.react").__setRef("MessengerGroupCreateDialog.react"),placeholder:c("React").createElement("div",null)})};function j(){h.apply(this,arguments)}f.exports=j}),null);
__d("MessengerGroupCreationEntryPoint",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({CHAT_TAB:"chat_tab_add_people",JEWEL:"jewel_new_message",CHAT_SIDEBAR:"chat_sidebar_new_message",GCF_JEWEL:"jewel_new_group",GCF_CHAT_SIDEBAR:"chat_sidebar_new_group",GCF_SHARE_FLOW:"chat_share_message_to_messenger"})}),null);