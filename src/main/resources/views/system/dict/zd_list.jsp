<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <base href="<%=basePath%>">
    <meta charset="utf-8"/>
    <title></title>
    <meta name="description" content="overview & stats"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link href="/assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="/assets/css/bootstrap-responsive.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="/assets/css/font-awesome.min.css"/>
    <!--[if IE 7]>
    <link rel="stylesheet" href="/assets/css/font-awesome-ie7.min.css"/><![endif]-->
    <!--[if lt IE 9]>
    <link rel="stylesheet" href="/assets/css/ace-ie.min.css"/><![endif]-->
    <link rel="stylesheet" href="/assets/css/ace.min.css"/>
    <link rel="stylesheet" href="/assets/css/ace-responsive.min.css"/>
    <link rel="stylesheet" href="/assets/css/ace-skins.min.css"/>
    <script type="text/javascript" src="/assets/js/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/assets/js/bootbox.min.js"></script><!-- 确认窗口 -->
    <!--引入弹窗组件start-->
    <script type="text/javascript" src="/assets/plugins/zDialog/zDrag.js"></script>
    <script type="text/javascript" src="/assets/plugins/zDialog/zDialog.js"></script>
    <!--引入弹窗组件end-->
    <script type="text/javascript">
        $(window.parent.hangge());

        //新增
        function add(PARENT_ID) {
            window.parent.jzts();
            var diag = new top.Dialog();
            diag.Drag = true;
            diag.Title = "新增";
            diag.URL = '<%=basePath%>/zidian/toAdd.do?PARENT_ID=' + PARENT_ID;
            diag.Width = 223;
            diag.Height = 175;
            diag.CancelEvent = function () { //关闭事件
                if (diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none') {
                    var num = '${page.currentPage}';
                    if (num == '0') {
                        window.parent.jzts();
                        location.href = location.href;
                    } else {
                        nextPage(${page.currentPage});
                    }
                }
                diag.close();
            };
            diag.show();
        }

        //修改
        function edit(ZD_ID) {
            window.parent.jzts();
            var diag = new top.Dialog();
            diag.Drag = true;
            diag.Title = "编辑";
            diag.URL = '<%=basePath%>/zidian/toEdit.do?ZD_ID=' + ZD_ID;
            diag.Width = 223;
            diag.Height = 175;
            diag.CancelEvent = function () { //关闭事件
                if (diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none') {
                    nextPage(${page.currentPage});
                }
                diag.close();
            };
            diag.show();
        }

        //删除
        function del(ZD_ID) {
            var flag = false;
            if (confirm("确定要删除该数据吗?")) {
                flag = true;
            }
            if (flag) {
                var url = "<%=basePath%>/zidian/del.do?ZD_ID=" + ZD_ID + "&guid=" + new Date().getTime();
                $.get(url, function (data) {
                    if (data == "success") {
                        nextPage(${page.currentPage});
                    } else {
                        alert("删除失败，请先删除其下级数据!");
                    }
                });
            }
        }
    </script>
</head>
<body>
<div id="page-content" class="clearfix">
    <div class="row-fluid">
        <!-- 检索  -->
        <form action="<%=basePath%>/zidian.do" method="post" name="userForm" id="userForm">
            <input name="PARENT_ID" id="PARENT_ID" type="hidden" value="${pd.PARENT_ID }"/>
            <table>
                <tr>
                    <td><font color="#808080">检索：</font></td>
                    <td><input type="text" name="NAME" value="${pd.name }" placeholder="这里输入名称" style="width:130px;"/></td>
                    <td style="vertical-align:top;">
                        <button class="btn btn-mini btn-light" onclick="search();"><i id="nav-search-icon" class="icon-search"></i></button>
                    </td>
                    <c:if test="${pd.pId != '0'}">
                        <c:choose>
                            <c:when test="${not empty varsList}">
                                <td style="vertical-align:top;">
                                    <a href="<%=basePath%>/admin/dict?PARENT_ID=0" class="btn btn-mini btn-purple" title="查看">顶级<i
                                            class="icon-arrow-right icon-on-right"></i></a>
                                </td>
                                <c:forEach items="${varsList}" var="var" varStatus="vsd">
                                    <td style="vertical-align:top;">
                                        <a href="<%=basePath%>/admin/dict?PARENT_ID=${var.id }" class="btn btn-mini btn-purple"
                                           title="查看">${var.name }<i class="icon-arrow-right  icon-on-right"></i></a>
                                    </td>
                                </c:forEach>
                            </c:when>
                            <c:otherwise>
                            </c:otherwise>
                        </c:choose>
                    </c:if>
                </tr>
            </table>
            <!-- 检索  -->
            <table id="table_report" class="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th class="center" style="width: 50px;">序号</th>
                    <th class='center'>名称</th>
                    <th class='center'>编码</th>
                    <th class='center'>级别</th>
                    <th class='center'>操作</th>
                </tr>
                </thead>
                <c:choose>
                    <c:when test="${not empty varList}">
                        <c:forEach items="${varList}" var="d" varStatus="vs">
                            <tr>
                                <td class="center">${d.sort }</td>
                                <td class='center'>
                                    <a href="<%=basePath%>/admin/dict?PARENT_ID=${d.zdId}" title="查看下级"><i
                                            class="icon-arrow-right  icon-on-right"></i>&nbsp;${d.name }</a>
                                </td>
                                <td class='center'>${d.zdId }</td>
                                <td class='center' style="width:35px;"><b class="green">${d.jb }</b>c
                                <td style="width: 68px;">
                                    <a class='btn btn-mini btn-info' title="编辑" onclick="edit('${d.zdId}')"><i class='icon-edit'></i></a>
                                    <a class='btn btn-mini btn-danger' title="删除" onclick="del('${d.zdId}')"><i class='icon-trash'></i></a>
                                </td>
                            </tr>
                        </c:forEach>
                    </c:when>
                    <c:otherwise>
                        <tr>
                            <td colspan="100" class="center">没有相关数据</td>
                        </tr>
                    </c:otherwise>
                </c:choose>
            </table>

            <div class="page-header position-relative">
                <table style="width:100%;">
                    <tr>
                        <td style="vertical-align:top;width:50px;">
                            <a class="btn btn-small btn-success" onclick="add('${pd.pId}');">新增</a>
                        </td>
                        <c:if test="${pd.pId != '0'}">
                            <td style="vertical-align:top;" class="left">
                                <a onclick="location.href='/admin/dict?PARENT_ID=${pdp.pId }';" class="btn btn-small btn-info">返回</a>
                            </td>
                        </c:if>
                        <td style="vertical-align:top;">
                            <div class="pagination" style="float: right;padding-top: 0px;margin-top: 0px;">${page.pageStr}</div>
                        </td>
                    </tr>
                </table>
            </div>
        </form>
    </div>
</div>
</body>
</html>