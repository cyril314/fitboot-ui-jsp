<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path;
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <base href="<%=basePath%>">
    <!-- jsp文件头和头部 -->
    <%@ include file="top.jsp" %>
</head>
<body>
<!-- 页面顶部¨ -->
<%@ include file="head.jsp" %>
<div class="container-fluid" id="main-container">
    <a href="#" id="menu-toggler"><span></span></a>
    <!-- menu toggler -->
    <!-- 左侧菜单 -->
    <%@ include file="left.jsp" %>
    <div id="main-content" class="clearfix">
        <div>
            <iframe id="mainFrame" name="mainFrame" src="/admin/default" style="margin:0 auto;height:100%;" frameborder="0"
                    width="100%"></iframe>
        </div>
        <!-- 换肤 -->
        <div id="ace-settings-container">
            <div class="btn btn-app btn-mini btn-warning" id="ace-settings-btn">
                <i class="icon-cog"></i>
            </div>
            <div id="ace-settings-box">
                <div class="pull-left">
                    <select id="skin-colorpicker" class="hidden">
                        <option data-class="default" value="#438EB9" <c:if test="${user.skin =='default' }">selected</c:if>>#438EB9</option>
                        <option data-class="skin-1" value="#222A2D" <c:if test="${user.skin =='skin-1' }">selected</c:if>>#222A2D</option>
                        <option data-class="skin-2" value="#C6487E" <c:if test="${user.skin =='skin-2' }">selected</c:if>>#C6487E</option>
                        <option data-class="skin-3" value="#D0D0D0" <c:if test="${user.skin =='skin-3' }">selected</c:if>>#D0D0D0</option>
                    </select>
                </div>
                <span>&nbsp; 选择皮肤</span>
                <div>
                    <label>
                        <input type='checkbox' name='menusf' id="menusf" onclick="menusf();"/>
                        <span class="lbl" style="padding-top: 5px;">菜单缩放</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- basic scripts -->
<script type="text/javascript">
    window.jQuery || document.write("<script src='/assets/js/jquery-1.9.1.min.js'>\x3C/script>");
</script>
<script type="text/javascript" src="/assets/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/assets/js/ace-elements.min.js"></script>
<script type="text/javascript" src="/assets/js/ace.min.js"></script>
<script type="text/javascript" src="/assets/js/jquery.cookie.js"></script>
<script type="text/javascript">
    $(function () {
        if (typeof ($.cookie('menusf')) == "undefined") {
            $("#menusf").attr("checked", true);
            $("#sidebar").attr("class", "menu-min");
        } else {
            $("#sidebar").attr("class", "");
        }
    });

    function menusf() {
        if (document.getElementsByName('menusf')[0].checked) {
            $.cookie('menusf', '', {expires: -1});
            $("#sidebar").attr("class", "menu-min");
        } else {
            $.cookie('menusf', 'ok');
            $("#sidebar").attr("class", "");
        }
    }

    function cmainFrame() {
        var bheight = document.documentElement.clientHeight;
        $("#mainFrame").attr("style", "height:" + (bheight - 51) + 'px');
        $("#bkbgjz").attr("style", "height:" + (bheight - 41) + 'px');
    }

    cmainFrame();
    window.onresize = function () {
        cmainFrame();
    }
    jzts();
</script>
</body>
</html>