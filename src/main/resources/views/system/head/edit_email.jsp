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
		<title>编辑邮箱</title>
		
		<meta name="description" content="overview & stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
		<link href="/assets/css/bootstrap-responsive.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="/assets/css/font-awesome.min.css" />
		<!--[if IE 7]><link rel="stylesheet" href="/assets/css/font-awesome-ie7.min.css" /><![endif]-->
		<!--[if lt IE 9]><link rel="stylesheet" href="/assets/css/ace-ie.min.css" /><![endif]-->
		
		<link rel="stylesheet" href="/assets/css/ace-responsive.min.css" />
		<link rel="stylesheet" href="/assets/css/ace-skins.min.css" />
		<script type="text/javascript" src="/assets/js/jquery-1.9.1.min.js"></script>
		
		<script type="text/javascript">
		$(window.parent.hangge());
		function save(){
			var EMAIL = $("#EMAIL").val();
		    window.returnValue=EMAIL;
		    window.close();
		}
		</script>
	</head>
<body>
<div>
		<table style="width:100%;" >
			<tr>
				<td style="margin-top:0px;">
					 <textarea name="EMAIL" id="EMAIL" rows="20" cols="50" style="width:97.5%;" placeholder="请选输入对方邮箱,多个请用(;)分号隔开" title="请选输入对方邮箱,多个请用(;)分号隔开">${pd.EMAIL}</textarea>
				</td>
			</tr>
			<tr>
				<td style="text-align: center;">
					<a class="btn btn-mini btn-primary" onclick="save();">保存</a>
					<a class="btn btn-mini btn-danger" onclick="window.close();">取消</a>
				</td>
			</tr>
		</table>
		
		<!-- 引入 -->
		<script type="text/javascript">window.jQuery || document.write("<script src='js/jquery-1.9.1.min.js'>\x3C/script>");</script>
		<script src="/assets/js/bootstrap.min.js"></script>
		<script src="/assets/js/ace-elements.min.js"></script>
		<script src="/assets/js/ace.min.js"></script>
</div>
</body>
</html>