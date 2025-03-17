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
		
<script type="text/javascript">
	$(window.parent.hangge());
	//保存
	function save(){
		if($("#roleName").val()==""){
			$("#roleName").focus();
			return false;
		}
			$("#form1").submit();
			$("#zhongxin").hide();
			$("#zhongxin2").show();
	}
	
	
</script>
	</head>
<body>
		<form action="role/add.do" name="form1" id="form1"  method="post">
		<input name="PARENT_ID" id="parent_id" value="${pd.parent_id }" type="hidden">
			<div id="zhongxin">
			<table>
				<tr>
					<td><input type="text" name="ROLE_NAME" id="roleName" placeholder="这里输入名称" title="名称"/></td>
				</tr>
				<tr>
					<td style="text-align: center;">
						<a class="btn btn-mini btn-primary" onclick="save();">保存</a>
						<a class="btn btn-mini btn-danger" onclick="top.Dialog.close();">取消</a>
					</td>
				</tr>
			</table>
			</div>
		</form>
	
	<div id="zhongxin2" class="center" style="display:none"><img src="images/jzx.gif" style="width: 50px;" /><br/><h4 class="lighter block green"></h4></div>
		<!-- 引入 -->
		<script src="/assets/js/jquery-1.9.1.min.js"></script>
		<script type="text/javascript">window.jQuery || document.write("<script src='js/jquery-1.9.1.min.js'>\x3C/script>");</script>
		<script src="/assets/js/bootstrap.min.js"></script>
		<script src="/assets/js/ace-elements.min.js"></script>
		<script src="/assets/js/ace.min.js"></script>
</body>
</html>
