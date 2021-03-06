$(function() {
	$('.choose_account').bind("click",function(){
		$(".choose_account").removeClass("poped");
		$(this).addClass("poped");
		$.jBox("iframe:/manager/user/dialog/list.htm", {
		    title: "选择用户",
			id:"chooseAccountDialog",
		    width: 800,
		    height: 450,
		    buttons: {  }
		});
	});
	
	
	$("#add-detail").bind(
			"click",
			function() {
				$(".panel-footer").before($(".detail-wrap-temp").html());
				$('form').find('.detail-wrap').show();
			});
	// 点击隐藏标签
	$(".btn-close-detail").live("click", function() {
		if ($(this).parents('#addForm').find('.purchase-detail').length <= 2) {
			showInfo("warning", "请至少保留一个开始节点和一个结束节点")
		} else {
			$(this).parents('.detail-wrap').remove();
		}
	});
	
	
	/**
	 * Menu表单校验
	 */
	$('#addForm').validate({
		rules : {
			name : {
				required : true
			},
			objectType : {
				required : true
			}
			
		},
		messages : {
			name : {
				required : "模板名"
			},
			objectType : {
				required : "适用类型不能为空"
			}
		},
		showErrors : function(errorMap, errorList) {
			var element = this.currentElements;
			if (element.next().hasClass('popover')) {
				element.popover('destroy');
			}
			this.defaultShowErrors();
		},
		submitHandler : function(form) { // 表单提交句柄,为一回调函数，带一个参数：form
			$(form).ajaxSubmit({
				type : "post",
				url : "modify.json",
				success : function(data) {
					if (data.result == "success") {
						window.location.href = "list.htm";
					} else {
						alert(data.msg);
					}
				}
			});
		},
	});
});
