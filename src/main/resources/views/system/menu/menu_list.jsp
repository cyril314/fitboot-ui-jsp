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
<!--引入弹窗组件start-->
<script type="text/javascript" src="/assets/plugins/zDialog/zDrag.js"></script>
<script type="text/javascript" src="/assets/plugins/zDialog/zDialog.js"></script>
<!--引入弹窗组件end-->
<script type="text/javascript">
	$(window.parent.hangge());
	//新增
	function addmenu(){
		 window.parent.jzts();
		 var diag = new top.Dialog();
		 diag.Drag=true;
		 diag.Title ="新增菜单";
		 diag.URL = '<%=basePath%>/menu/toAdd.do';
		 diag.Width = 223;
		 diag.Height = 256;
		 diag.CancelEvent = function(){ //关闭事件
			if(diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none'){
				window.parent.jzts();
				setTimeout("location.reload()",100);
			}
			diag.close();
		 };
		 diag.show();
	}

	//修改
	function editmenu(menuId){
		 window.parent.jzts();
	   	 var diag = new top.Dialog();
		 diag.Drag=true;
		 diag.Title ="编辑菜单";
		 diag.URL = '<%=basePath%>/menu/toEdit.do?MENU_ID='+menuId;
		 diag.Width = 223;
		 diag.Height = 256;
		 diag.CancelEvent = function(){ //关闭事件
			if(diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none'){
				window.parent.jzts();
				setTimeout("location.reload()",100);
			}
			diag.close();
		 };
		 diag.show();
	}

	//编辑顶部菜单图标
	function editTb(menuId){
		 window.parent.jzts();
	   	 var diag = new top.Dialog();
		 diag.Drag=true;
		 diag.Title ="编辑图标";
		 diag.URL = '<%=basePath%>/menu/toEditicon.do?MENU_ID='+menuId;
		 diag.Width = 530;
		 diag.Height = 150;
		 diag.CancelEvent = function(){ //关闭事件
			if(diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none'){
				window.parent.jzts();
				setTimeout("location.reload()",100);
			}
			diag.close();
		 };
		 diag.show();
	}

	function delmenu(menuId,isParent){
		var flag = false;
		if(isParent){
			if(confirm("确定要删除该菜单吗？其下子菜单将一并删除！")){
				flag = true;
			}
		}else{
			if(confirm("确定要删除该菜单吗？")){
				flag = true;
			}
		}
		if(flag){
			var url = "<%=basePath%>/menu/del.do?MENU_ID="+menuId+"&guid="+new Date().getTime();
			$.get(url,function(data){
				window.parent.jzts();
				document.location.reload();
			});
		}
	}

	function openClose(menuId,curObj,trIndex){
		var txt = $(curObj).text();
		if(txt=="展开"){
			$(curObj).text("折叠");
			$("#tr"+menuId).after("<tr id='tempTr"+menuId+"'><td colspan='5'>数据载入中</td></tr>");
			if(trIndex%2==0){
				$("#tempTr"+menuId).addClass("main_table_even");
			}
			var url = "<%=basePath%>menu/sub.do?MENU_ID="+menuId+"&guid="+new Date().getTime();
			$.get(url,function(data){
				if(data.length>0){
					var html = "";
					$.each(data,function(i){
						html = "<tr style='height:24px;line-height:24px;' name='subTr"+menuId+"'>";
						html += "<td></td>";
						html += "<td><span style='width:80px;display:inline-block;'></span>";
						if(i==data.length-1)
							html += "<img src='/assets/img/join_bottom.gif' style='vertical-align: middle;'/>";
						else
							html += "<img src='/assets/img/join.gif' style='vertical-align: middle;'/>";
						html += "<span style='width:100px;text-align:left;display:inline-block;'>"+this.menuName+"</span>";
						html += "</td>";
						html += "<td>"+this.menuUrl+"</td>";
						html += "<td class='center'>"+this.menuOrder+"</td>";
						html += "<td>";
                        html += '<a class="btn btn-mini btn-info" title="编辑" onclick="editmenu('+this.menuId+')"><i class="icon-edit"></i></a>';
                        html += '<a class="btn btn-mini btn-danger" title="删除" onclick="delmenu('+this.menuId+',false)"><i class="icon-trash"></i></a>';
                        html += "</td>";
                        html += "</tr>";
						$("#tempTr"+menuId).before(html);
					});
					$("#tempTr"+menuId).remove();
					if(trIndex%2==0){
						$("tr[name='subTr"+menuId+"']").addClass("main_table_even");
					}
				}else{
					$("#tempTr"+menuId+" > td").html("没有相关数据");
				}
			},"json");
		}else{
			$("#tempTr"+menuId).remove();
			$("tr[name='subTr"+menuId+"']").remove();
			$(curObj).text("展开");
		}
	}
</script>
</head>
<body>
<table id="table_report" class="table table-striped table-bordered table-hover">
    <thead>
    <tr>
        <th class="center"  style="width: 50px;">序号</th>
        <th class='center'>名称</th>
        <th class='center'>资源路径</th>
        <th class='center'>排序</th>
        <th class='center'>操作</th>
    </tr>
    </thead>
    <c:choose>
        <c:when test="${not empty menuList}">
            <c:forEach items="${menuList}" var="menu" varStatus="vs">
            <tr id="tr${menu.menuId }">
                <td class="center">${vs.index+1}</td>
                <td class='center'><i class="${menu.menuIcon }">&nbsp;</i>${menu.menuName }&nbsp;
                    <c:if test="${menu.menuType == '1' }">
                    <span class="label label-success arrowed">系统</span>
                    </c:if>
                    <c:if test="${menu.menuType != '1' }">
                    <span class="label label-important arrowed-in">业务</span>
                    </c:if>
                </td>
                <td>${menu.menuUrl == '#'? '': menu.menuUrl}</td>
                <td class='center'>${menu.menuOrder }</td>
                <td style="width: 25%;">
                    <a class='btn btn-mini btn-warning' onclick="openClose('${menu.menuId }',this,${vs.index })" >展开</a>
                    <a class='btn btn-mini btn-purple' title="图标" onclick="editTb('${menu.menuId }')" ><i class='icon-picture'></i></a>
                    <a class='btn btn-mini btn-info' title="编辑" onclick="editmenu('${menu.menuId }')" ><i class='icon-edit'></i></a>
                    <a class='btn btn-mini btn-danger' title="删除" onclick="delmenu('${menu.menuId }',true)"><i class='icon-trash'></i></a>
                </td>
            </tr>
            </c:forEach>
        </c:when>
        <c:otherwise>
            <tr> <td colspan="100">没有相关数据</td> </tr>
        </c:otherwise>
    </c:choose>
</table>
<div class="page_and_btn">
    <div>
        &nbsp;&nbsp;<a class="btn btn-small btn-success" onclick="addmenu();">新增</a>
    </div>
</div>
</body>
</html>