package com.fit.web.system;

import com.fit.base.BaseController;
import com.fit.base.Page;
import com.fit.entity.SysMenu;
import com.fit.entity.SysRole;
import com.fit.entity.SysUser;
import com.fit.service.SysRoleService;
import com.fit.service.SysUserService;
import com.fit.util.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * @AUTO
 * @Author AIM
 * @DATE 2025/3/13
 */
@Controller
@RequestMapping(value = "/user")
public class UserController extends BaseController {

    @Autowired
    private SysUserService userService;
    @Autowired
    private SysRoleService roleService;

    /**
     * 显示用户列表(用户组)
     */
    @RequestMapping(value = "/list")
    public ModelAndView users(HttpSession session, Page page) throws Exception {
        pd = this.getPageData();
        String USERNAME = pd.getString("USERNAME");
        if (null != USERNAME && !"".equals(USERNAME)) {
            USERNAME = USERNAME.trim();
            pd.put("USERNAME", USERNAME);
        }
        String lastLoginStart = pd.getString("lastLoginStart");
        String lastLoginEnd = pd.getString("lastLoginEnd");
        if (lastLoginStart != null && !"".equals(lastLoginStart)) {
            lastLoginStart = lastLoginStart + " 00:00:00";
            pd.put("lastLoginStart", lastLoginStart);
        }
        if (lastLoginEnd != null && !"".equals(lastLoginEnd)) {
            lastLoginEnd = lastLoginEnd + " 00:00:00";
            pd.put("lastLoginEnd", lastLoginEnd);
        }

        page.setPd(pd);
        List<SysUser> userList = userService.findList(pd); // 列出用户列表

        List<SysRole> roleList = (List<SysRole>) session.getAttribute("USER_ROLES");
        if (roleList == null) {
            roleList = roleService.findList(); // 列出所有二级角色
            for (SysRole role : roleList) {
                if (role.getParentId() == "0" || role.getParentId() == "7") {
                    roleList.remove(role);
                }
            }
            session.setAttribute("USER_ROLES", roleList);
        }
        /* 调用权限 */
        this.getHC(session);
        /* 调用权限 */
        mv.setViewName("system/user/user_list");
        mv.addObject("userList", userList);
        mv.addObject("roleList", roleList);
        mv.addObject("pd", pd);

        return mv;
    }
}