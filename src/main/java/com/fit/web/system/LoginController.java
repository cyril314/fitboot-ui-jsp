package com.fit.web.system;

import com.fit.base.BaseController;
import com.fit.entity.SysUser;
import com.fit.service.SysUserService;
import com.fit.util.Const;
import com.fit.base.PageData;
import com.fit.util.DateUtil;
import com.fit.util.MD5;
import com.fit.util.Tools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class LoginController extends BaseController {

    @Autowired
    private SysUserService userService;

    @RequestMapping(value = {"", "/", "/login"}, method = RequestMethod.GET)
    public String index(HttpServletRequest request) {
        request.setAttribute("SYSNAME", Tools.readTxtFile(Const.SYSNAME));
        return "system/login";
    }

    /**
     * 请求登录，验证用户
     */
    @RequestMapping(value = "/login_login")
    public ModelAndView login(HttpSession session) throws Exception {
        String sessionCode = (String) session.getAttribute(Const.SESSION_SECURITY_CODE);
        String errInfo = "";
        pd = this.getPageData();
        String code = pd.getString("code");
        if (null == code || "".equals(code)) {
            mv.setViewName("redirect:/");
        } else {
            String USERNAME = pd.get("loginname").toString();
            String PASSWORD = pd.get("password").toString();
            if (Tools.notEmpty(sessionCode) && sessionCode.equalsIgnoreCase(code)) {
                String passwd = MD5.md5(PASSWORD);
                SysUser sysUser = new SysUser();
                sysUser.setUsername(USERNAME);
                sysUser.setPassword(passwd);
                sysUser = userService.get(sysUser);
                if (sysUser != null) {
                    sysUser.setLastLogin(DateUtil.getTime());
                    session.setAttribute(Const.SESSION_USER, sysUser);
                    session.removeAttribute(Const.SESSION_SECURITY_CODE);
                } else {
                    errInfo = "用户名或密码有误!";
                }
            } else {
                errInfo = "验证码输入有误!";
            }
            if (Tools.isEmpty(errInfo)) {
                mv.setViewName("redirect:/admin/index");
            } else {
                mv.addObject("errInfo", errInfo);
                mv.addObject("loginname", USERNAME);
                mv.addObject("password", PASSWORD);
                mv.setViewName("system/login");
            }
            mv.addObject("pd", pd);
        }
        return mv;
    }

    /**
     * 用户注销
     */
    @RequestMapping(value = "/logout")
    public ModelAndView logout(HttpSession session) {
        session.removeAttribute(Const.SESSION_USER);
        session.removeAttribute(Const.SESSION_ROLE_RIGHTS);
        session.removeAttribute(Const.SESSION_allmenuList);
        session.removeAttribute(Const.SESSION_menuList);
        session.removeAttribute(Const.SESSION_QX);
        session.removeAttribute(Const.SESSION_USER_PDS);
        session.removeAttribute(Const.SESSION_USERNAME);
        session.removeAttribute(Const.SESSION_USERROL);
        session.removeAttribute("changeMenu");

        pd = this.getPageData();
        String msg = pd.getString("msg");
        pd.put("msg", msg);

        pd.put("SYSNAME", Tools.readTxtFile(Const.SYSNAME)); // 读取系统名称
        mv.setViewName("redirect:/login");
        mv.addObject("pd", pd);
        return mv;
    }
}