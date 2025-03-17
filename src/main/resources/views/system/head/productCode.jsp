<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<base href="<%=basePath%>">
		
		<meta charset="utf-8" />
		<title></title>
		
		<meta name="description" content="overview & stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
		<link href="/assets/css/bootstrap-responsive.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="/assets/css/font-awesome.min.css" />
		<!--[if IE 7]><link rel="stylesheet" href="/assets/css/font-awesome-ie7.min.css" /><![endif]-->
		<!--[if lt IE 9]><link rel="stylesheet" href="/assets/css/ace-ie.min.css" /><![endif]-->
		
		
		<link rel="stylesheet" href="/assets/css/ace.min.css" />
		<link rel="stylesheet" href="/assets/css/ace-responsive.min.css" />
		<link rel="stylesheet" href="/assets/css/ace-skins.min.css" />
		
		<script type="text/javascript" src="/assets/js/jquery-1.9.1.min.js"></script>
		<!--提示框-->
		<script type="text/javascript" src="/assets/js/jquery.tips.js"></script>
		
		<style type="text/css">
		#dialog-add,#dialog-message,#dialog-comment{width:100%; height:100%; position:fixed; top:0px; z-index:10000; display:none;}
		.commitopacity{position:absolute; width:100%; height:500px; background:#7f7f7f; filter:alpha(opacity=50); -moz-opacity:0.5; -khtml-opacity: 0.5; opacity: 0.5; top:0px; z-index:99999;}
		.commitbox{width:79%; padding-left:81px; padding-top:69px; position:absolute; top:0px; z-index:99999;}
		.commitbox_inner{width:96%; height:235px;  margin:6px auto; background:#efefef; border-radius:5px;}
		.commitbox_top{width:100%; height:230px; margin-bottom:10px; padding-top:10px; background:#FFF; border-radius:5px; box-shadow:1px 1px 3px #e8e8e8;}
		.commitbox_top textarea{width:95%; height:165px; display:block; margin:0px auto; border:0px;}
		.commitbox_cen{width:95%; height:40px; padding-top:10px;}
		.commitbox_cen div.left{float:left;background-size:15px; background-position:0px 3px; padding-left:18px; color:#f77500; font-size:16px; line-height:27px;}
		.commitbox_cen div.left img{width:30px;}
		.commitbox_cen div.right{float:right; margin-top:7px;}
		.commitbox_cen div.right span{cursor:pointer;}
		.commitbox_cen div.right span.save{border:solid 1px #c7c7c7; background:#6FB3E0; border-radius:3px; color:#FFF; padding:5px 10px;}
		.commitbox_cen div.right span.quxiao{border:solid 1px #f77400; background:#f77400; border-radius:3px; color:#FFF; padding:4px 9px;}
		</style>
		
<script type="text/javascript">
	$(window.parent.hangge());
	
	//生成
	function save(){
		
		if($("#packageName").val()==""){
			$("#packageName").tips({
				side:3,
	            msg:'输入包名',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#packageName").focus();
			return false;
		}else{
			var pat = new RegExp("^[A-Za-z]+$");
			if(!pat.test($("#packageName").val())){
				$("#packageName").tips({
					side:3,
		            msg:'只能输入字母',
		            bg:'#AE81FF',
		            time:2
		        });
				$("#packageName").focus();
				return false;
			}
		}
		
		if($("#objectName").val()==""){
			$("#objectName").tips({
				side:3,
	            msg:'输入类名',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#objectName").focus();
			return false;
		}else{
			var headstr = $("#objectName").val().substring(0,1);
			var pat = new RegExp("^[a-z0-9]+$");
			if(pat.test(headstr)){
				$("#objectName").tips({
					side:3,
		            msg:'类名首字母必须为大写字母或下划线',
		            bg:'#AE81FF',
		            time:2
		        });
				$("#objectName").focus();
				return false;
			}
		}
		
		if($("#fields").html() == ''){
			$("#table_report").tips({
				side:3,
	            msg:'请添加属性',
	            bg:'#AE81FF',
	            time:2
	        });
			return false;
		}
		
		if(!confirm("确定要生成吗?")){
			return false;
		}
		
		$("#Form").submit();

		$("#objectName").val('');
		$("#productc").tips({
			side:3,
            msg:'提交成功,等待下载',
            bg:'#AE81FF',
            time:9
        });
		window.parent.jzts();
		setTimeout("top.Dialog.close()",10000);
		
	}
	
	
	//保存编辑属性
	function saveD(){
		
		var dname = $("#dname").val(); 	 		 //属性名
		var dtype = $("#dtype").val(); 	 		 //类型
		var dbz	  = $("#dbz").val();   	 		 //备注
		var isQian = $("#isQian").val(); 		 //是否前台录入
		var ddefault = $("#ddefault").val(); 	 //默认值
		var msgIndex = $("#msgIndex").val(); 	 //msgIndex不为空时是修改
		
		if(dname==""){
			$("#dname").tips({
				side:3,
	            msg:'输入属性名',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#dname").focus();
			return false;
		}else{
			dname = dname.toUpperCase();		//转化为大写
			if(isSame(dname)){
				var headstr = dname.substring(0,1);
				var pat = new RegExp("^[0-9]+$");
				if(pat.test(headstr)){
					$("#dname").tips({
						side:3,
			            msg:'属性名首字母必须为字母或下划线',
			            bg:'#AE81FF',
			            time:2
			        });
					$("#dname").focus();
					return false;
				}
			}else{
				
				if(msgIndex != ''){
					var hcdname = $("#hcdname").val();
					if(hcdname != dname){
						if(!isSame(dname)){
							$("#dname").tips({
								side:3,
					            msg:'属性名重复',
					            bg:'#AE81FF',
					            time:2
					        });
							$("#dname").focus();
							return false;
						}
					}
				}else{
					
					$("#dname").tips({
						side:3,
			            msg:'属性名重复',
			            bg:'#AE81FF',
			            time:2
			        });
					$("#dname").focus();
					return false;
					
				}
			}
		}
		
		if(dbz==""){
			$("#dbz").tips({
				side:3,
	            msg:'输入备注',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#dbz").focus();
			return false;
		}
		
		dbz = dbz == '' ? '无':dbz;
		ddefault = ddefault == '' ? '无':ddefault;
		var fields = dname + ',fh,' + dtype + ',fh,' + dbz + ',fh,' + isQian + ',fh,' + ddefault;
		
		if(msgIndex == ''){
			arrayField(fields);
		}else{
			editArrayField(fields,msgIndex);
		}
		$("#dialog-add").css("display","none");
	}
	//打开编辑属性(新增)
	function dialog_open(){
		$("#dname").val('');
		$("#dbz").val('');
		$("#ddefault").val('');
		$("#msgIndex").val('');
		$("#dtype").val('String');
		$("#isQian").val('是');
		$("#form-field-radio1").attr("checked",true);
		$("#form-field-radio4").attr("checked",true);
		$("#dialog-add").css("display","block");
	}
	//打开编辑属性(修改)
	function editField(value,msgIndex){
		var efieldarray = value.split(',fh,');
		$("#dname").val(efieldarray[0]);
		$("#hcdname").val(efieldarray[0]);
		$("#dbz").val(efieldarray[2]);
		$("#ddefault").val(efieldarray[4]);
		$("#msgIndex").val(msgIndex);
		if(efieldarray[1] == 'String'){
			$("#form-field-radio1").attr("checked",true);
		}else if(efieldarray[1] == 'Integer'){
			$("#form-field-radio2").attr("checked",true);
		}else{
			$("#form-field-radio3").attr("checked",true);
		}
		if(efieldarray[3] == '是'){
			$("#form-field-radio4").attr("checked",true);
		}else{
			$("#form-field-radio5").attr("checked",true);
		}
		$("#dialog-add").css("display","block");
	}
	//关闭编辑属性
	function cancel_pl(){
		$("#dialog-add").css("display","none");
	}
	//赋值类型
	function setType(value){
		$("#dtype").val(value);
	}
	
	//赋值是否前台录入
	function isQian(value){
		if(value == '是'){
			$("#isQian").val('是');
			$("#ddefault").val("无");
			$("#ddefault").attr("disabled",true);
		}else{
			$("#isQian").val('否');
			$("#ddefault").val('');
			$("#ddefault").attr("disabled",false);
		}
	}
</script>
	</head>
<body>
		
	<!-- 添加属性  -->
	<input type="hidden" name="hcdname" id="hcdname" value="" />
	<input type="hidden" name="msgIndex" id="msgIndex" value="" />
	<input type="hidden" name="dtype" id="dtype" value="String" />
	<input type="hidden" name="isQian" id="isQian" value="是" />
	<div id="dialog-add">
		<div class="commitopacity"></div>
	  	<div class="commitbox">
		  	<div class="commitbox_inner">
		        <div class="commitbox_top">
		        	<br/>
		        	<table>
		        		<tr>
		        			<td style="padding-left: 16px;text-align: right;">属性名：</td><td><input name="dname" id="dname" type="text" value="" placeholder="首字母必须为字母或下划线" title="属性名" /></td>
		        			<td style="padding-left: 16px;text-align: right;">属性类型：</td>
		        			<td style="padding-bottom: 6px;">
		        				<label style="float:left;padding-left: 20px;"><input name="form-field-radiot" id="form-field-radio1" onclick="setType('String');" type="radio" value="icon-edit" checked="checked"><span class="lbl">String</span></label>
								<label style="float:left;padding-left: 20px;"><input name="form-field-radiot" id="form-field-radio2" onclick="setType('Integer');" type="radio" value="icon-edit"><span class="lbl">Integer</span></label>
								<label style="float:left;padding-left: 20px;"><input name="form-field-radiot" id="form-field-radio3" onclick="setType('Date');" type="radio" value="icon-edit"><span class="lbl">Date</span></label>
							</td>
		        		</tr>
		        		<tr>
		        			<td style="padding-left: 16px;text-align: right;">其备注：</td><td><input name="dbz" id="dbz" type="text" value="" placeholder="例如 name的备注为 '姓名'" title="备注"/></td>
		        			<td style="padding-left: 16px;text-align: right;">前台录入：</td>
		        			<td style="padding-bottom: 6px;">
		        				<label style="float:left;padding-left: 20px;"><input name="form-field-radioq" id="form-field-radio4" onclick="isQian('是');" type="radio" value="icon-edit" checked="checked"><span class="lbl">是</span></label>
								<label style="float:left;padding-left: 20px;"><input name="form-field-radioq" id="form-field-radio5" onclick="isQian('否');" type="radio" value="icon-edit"><span class="lbl">否</span></label>
							</td>
		        		</tr>
		        		<tr>
		        			<td style="padding-left: 16px;text-align: right;">默认值：</td><td><input name="ddefault" id="ddefault" type="text" value="" disabled="disabled" placeholder="后台附加值时生效" title="默认值"/></td>
		        			<td style="padding-left: 16px;text-align: right;"></td>
		        			<td>
		        			<div class="commitbox_cen">
				                <div class="left" id="cityname"></div>
				                <div class="right"><span class="save" onClick="saveD()">保存</span>&nbsp;&nbsp;<span class="quxiao" onClick="cancel_pl()">取消</span></div>
				            </div>
		        			</td>
		        		</tr>
		        		<tr>
		        			<td style="padding-left: 16px;" colspan="100">
		        				<font color="red" style="font-weight: bold;">
		        					注意：<br/>
		        					  1. 请不要添加  XX_ID 的主键，系统自动生成一个32位无序不重复字符序列作为主键<br/>
		        					  2. 主键为  类名_ID 格式，所有字段的字母均用大写
		        				</font>
							</td>
		        		</tr>
		        	</table>
		        </div>
		  	</div>
	  	</div>
	</div>

	<form action="freemarker/proCode.do" name="Form" id="Form" method="post">
		<input type="hidden" name="zindex" id="zindex" value="0">
		<div id="zhongxin">
		<table style="margin-top: 10px;">
			<tr>
				<td style="width:15%;text-align: right;">上级包名：</td>
				<td><input type="text" name="packageName" id="packageName" value="" placeholder="这里输入包名  (请不要输入特殊字符,请用纯字母)" style="width:370px" title="包名称"/></td>
				<td>&nbsp;&nbsp;例如:com.fh.controller.<font color="red" style="font-weight: bold;">system</font>&nbsp;&nbsp;红色部分</td>
			</tr>
			<tr>
				<td style="width:15%;text-align: right;">处理类名：</td>
				<td><input type="text" name="objectName" id="objectName" value="" placeholder="这里输入处理类名称" style="width:370px" title="类名称"/></td>
				<td>&nbsp;&nbsp;<font color="red" style="font-weight: bold;">类名首字母必须为大写字母或下划线</font></td>
			</tr>
		</table>
		
		
		<table id="table_report" class="table table-striped table-bordered table-hover">
				
				<thead>
					<tr>
						<th class="center">属性名</th>
						<th class="center">类型</th>
						<th class="center">备注</th>
						<th class="center" style="width:59px;">前台录入</th>
						<th class="center">默认值</th>
						<th class="center" style="width:69px;">操作</th>
					</tr>
				</thead>
										
				<tbody id="fields"></tbody>
				
		</table>
		
		
		<table id="table_report" class="table table-striped table-bordered table-hover">
			<tr>
				<td style="text-align: center;" colspan="100">
					<a class="btn btn-app btn-success btn-mini" onclick="dialog_open();"><i class="icon-ok"></i>新增</a>
					<a class="btn btn-app btn-success btn-mini" onclick="save();" id="productc"><i class="icon-print"></i>生成</a>
					<a class="btn btn-app btn-danger btn-mini" onclick="top.Dialog.close();"><i class="icon-share-alt"></i>取消</a>
				</td>
			</tr>
		</table>
		</div>
		
		<div id="zhongxin2" class="center" style="display:none"><br/><br/><br/><br/><img src="images/jiazai.gif" /><br/><h4 class="lighter block green"></h4></div>
		
	</form>
	
	
		<!-- 引入 -->
		<script type="text/javascript">window.jQuery || document.write("<script src='js/jquery-1.9.1.min.js'>\x3C/script>");</script>
		<script src="/assets/js/bootstrap.min.js"></script>
		<script src="/assets/js/ace-elements.min.js"></script>
		<script src="/assets/js/ace.min.js"></script>
		
		<script type="text/javascript">
		
		var arField = new Array();
		var index = 0;
		//追加属性列表
		function appendC(value){
			
			var fieldarray = value.split(',fh,');
			
			$("#fields").append(
				'<tr>'+
				'<td class="center">'+fieldarray[0]+'<input type="hidden" name="field0'+index+'" value="'+fieldarray[0]+'"></td>'+
				'<td class="center">'+fieldarray[1]+'<input type="hidden" name="field1'+index+'" value="'+fieldarray[1]+'"></td>'+
				'<td class="center">'+fieldarray[2]+'<input type="hidden" name="field2'+index+'" value="'+fieldarray[2]+'"></td>'+
				'<td class="center">'+fieldarray[3]+'<input type="hidden" name="field3'+index+'" value="'+fieldarray[3]+'"></td>'+
				'<td class="center">'+fieldarray[4]+'<input type="hidden" name="field4'+index+'" value="'+fieldarray[4]+'"></td>'+
				'<td class="center">'+
					'<input type="hidden" name="field'+index+'" value="'+value+'">'+
					'<a class="btn btn-mini btn-info" title="编辑" onclick="editField(\''+value+'\',\''+index+'\')"><i class="icon-edit"></i></a>&nbsp;'+
					'<a class="btn btn-mini btn-danger" title="删除" onclick="removeField(\''+index+'\')"><i class="icon-trash"></i></a>'+
				'</td>'+
				'</tr>'
			);
			index++;
			$("#zindex").val(index);
		}
		
		//保存属性后往数组添加元素
		function arrayField(value){
			arField[index] = value;
			appendC(value);
		}
		
		//修改属性
		function editArrayField(value,msgIndex){
			arField[msgIndex] = value;
			index = 0;
			$("#fields").html('');
			for(var i=0;i<arField.length;i++){
				appendC(arField[i]);
			}
		}
		
		//删除数组添加元素并重组列表
		function removeField(value){
			index = 0;
			$("#fields").html('');
			arField.splice(value,1);
			for(var i=0;i<arField.length;i++){
				appendC(arField[i]);
			}
		}
		
		//判断属性名是否重复
		function isSame(value){
			for(var i=0;i<arField.length;i++){
				var array0 = arField[i].split(',fh,')[0];
				if(array0 == value){
					return false;
				}
			}
			return true;
		}
		
		</script>
	
</body>
</html>