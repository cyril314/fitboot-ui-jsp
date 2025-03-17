<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>${pd.SYSNAME}</title>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="<%=path %>/assets/plugins/login/bootstrap.min.css"/>
    <link rel="stylesheet" href="<%=path %>/assets/plugins/login/css/camera.css"/>
    <link rel="stylesheet" href="<%=path %>/assets/plugins/login/bootstrap-responsive.min.css"/>
    <link rel="stylesheet" href="<%=path %>/assets/plugins/login/matrix-login.css"/>
    <link rel="stylesheet" href="<%=path %>/assets/plugins/login/font-awesome.css"/>
    <script type="text/javascript" src="<%=path %>/assets/js/jquery-1.9.1.min.js"></script>
    <c:if test="${error != null && error != '' }">
        <script type="text/javascript">alert("${error}");</script>
    </c:if>
    <script type="text/javascript">
        if (window != top) {
            top.location.href = location.href;
        }

        function denglu() {
            if ($("#saveid").attr("checked")) {
                $.cookie('loginname', $("#loginname").val(), {expires: 7});
                $.cookie('password', $("#password").val(), {expires: 7});
            }
            $("#loginForm").submit();
        }

        function quxiao() {
            $("#loginname").val('');
            $("#password").val('');
        }
    </script>
</head>
<body>
<div style="width:100%;text-align: center;margin: 0 auto;position: absolute;">
    <div id="loginbox">
        <form action="login_login" method="post" name="loginForm" id="loginForm" onsubmit="return check();">
            <div class="control-group normal_text"><h3><img src="<%=path %>/assets/plugins/login/logo.png" alt="Logo"/></h3></div>
            <div class="control-group">
                <div class="controls">
                    <div class="main_input_box">
                        <span class="add-on bg_lg"><i><img height="37" src="<%=path %>/assets/plugins/login/user.png"/></i></span>
                        <input type="text" name="loginname" id="loginname" value="${loginname }" placeholder="请输入用户名"/>
                    </div>
                </div>
            </div>
            <div class="control-group">
                <div class="controls">
                    <div class="main_input_box">
                        <span class="add-on bg_ly"><i><img height="37" src="<%=path %>/assets/plugins/login/suo.png"/></i></span>
                        <input type="password" name="password" id="password" placeholder="请输入密码" value="${password }"/>
                    </div>
                </div>
            </div>
            <div style="float:right;padding-right:10%;">
                <div style="float: left;margin-top:3px;margin-right:2px;"><font color="white">记住密码</font></div>
                <div style="float: left;">
                    <input name="form-field-checkbox" id="saveid" type="checkbox" onclick="savePaw();" style="padding-top:0px;"/>
                </div>
            </div>
            <div class="form-actions">
                <div style="width:86%;padding-left:8%;">
                    <div style="float: left;"><i><img src="<%=path %>/assets/plugins/login/yan.png"/></i></div>
                    <div style="float: left;" class="codediv">
                        <input type="text" name="code" id="code" class="login_code" style="height:16px; padding-top:0px;"/>
                    </div>
                    <div style="float: left;"><i><img style="height:22px;" id="codeImg" alt="点击更换" title="点击更换" src=""/></i></div>
                    <span class="pull-right" style="padding-right:3%;">
                        <a href="javascript:quxiao();" class="btn btn-success">取消</a>
                    </span>
                    <span class="pull-right"><a onclick="denglu();" class="flip-link btn btn-info" id="to-recover">登录</a></span>
                </div>
            </div>
        </form>
        <div class="controls">
            <div class="main_input_box">
                <font color="white"><span id="nameerr">Copyright © FH 2100</span></font>
            </div>
        </div>
    </div>
</div>
<div id="templatemo_banner_slide" class="container_wapper">
    <div class="camera_wrap camera_emboss" id="camera_slide">
        <div data-src="/assets/plugins/login/images/banner_slide_01.jpg"></div>
        <div data-src="/assets/plugins/login/images/banner_slide_02.jpg"></div>
        <div data-src="/assets/plugins/login/images/banner_slide_03.jpg"></div>
    </div><!-- #camera_wrap_3 -->
</div>
<script type="text/javascript">
    var errInfo = "${errInfo}";
    $(document).ready(function () {
        changeCode();
        $("#codeImg").bind("click", changeCode);
        if (errInfo != "") {
            if (errInfo.indexOf("验证码") > -1) {

                $("#code").tips({
                    side: 1,
                    msg: errInfo,
                    bg: '#FF5080',
                    time: 5
                });

                $("#code").focus();
            } else {
                $("#loginname").tips({
                    side: 1,
                    msg: errInfo,
                    bg: '#FF5080',
                    time: 5
                });
            }
        }
        $("#loginname").focus();
    });

    $(document).keyup(function (event) {
        if (event.keyCode == 13) {
            $("#to-recover").trigger("click");
        }
    });

    function genTimestamp() {
        var time = new Date();
        return time.getTime();
    }

    function changeCode() {
        $("#codeImg").attr("src", "/captcha?t=" + genTimestamp());
    }

    function check() {
        if ($("#loginname").val() == "") {
            $("#loginname").tips({
                side: 2,
                msg: '用户名不得为空',
                bg: '#AE81FF',
                time: 3
            });
            $("#loginname").focus();
            return false;
        } else {
            $("#loginname").val(jQuery.trim($('#loginname').val()));
        }

        if ($("#password").val() == "") {
            $("#password").tips({
                side: 2,
                msg: '密码不得为空',
                bg: '#AE81FF',
                time: 3
            });
            $("#password").focus();
            return false;
        }
        if ($("#code").val() == "") {
            $("#code").tips({
                side: 1,
                msg: '验证码不得为空',
                bg: '#AE81FF',
                time: 3
            });
            $("#code").focus();
            return false;
        }

        $("#loginbox").tips({
            side: 1,
            msg: '正在登录 , 请稍后 ...',
            bg: '#68B500',
            time: 1000
        });
        return true;
    }

    function savePaw() {
        if (!$("#saveid").attr("checked")) {
            $.cookie('loginname', '', {expires: -1});
            $.cookie('password', '', {expires: -1});
            $("#loginname").val('');
            $("#password").val('');
        }
    }

    jQuery(function () {
        var loginname = $.cookie('loginname');
        var password = $.cookie('password');
        if (typeof (loginname) != "undefined" && typeof (password) != "undefined") {
            $("#loginname").val(loginname);
            $("#password").val(password);
            $("#saveid").attr("checked", true);
            $("#code").focus();
        }
    });
</script>
<script type="text/javascript" src="<%=path %>/assets/js/bootstrap.min.js"></script>
<script type="text/javascript" src="<%=path %>/assets/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="<%=path %>/assets/js/jquery.tips.js"></script>
<script type="text/javascript" src="<%=path %>/assets/js/jquery.cookie.js"></script>
<script type="text/javascript" src="<%=path %>/assets/plugins/login/js/camera.min.js"></script>
<script type="text/javascript" src="<%=path %>/assets/plugins/login/js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="<%=path %>/assets/plugins/login/js/jquery.mobile.customized.min.js"></script>
<script type="text/javascript" src="<%=path %>/assets/plugins/login/js/jquery.singlePageNav.min.js"></script>
<script type="text/javascript" src="<%=path %>/assets/plugins/login/js/templatemo_script.js"></script>
</body>
</html>