package com.fit.web.system;

import com.fit.base.BaseController;
import com.fit.base.Page;
import com.fit.entity.SysAppUser;
import com.fit.entity.SysRole;
import com.fit.service.SysAppUserService;
import com.fit.service.SysRoleService;
import com.fit.util.Const;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @AUTO
 * @Author AIM
 * @DATE 2025/3/17
 */
@Slf4j
@Controller
@RequestMapping(value = "/app_user")
public class AppUserController extends BaseController {

    @Autowired
    private SysAppUserService appUserService;
    @Autowired
    private SysRoleService roleService;

    /**
     * 显示用户列表
     */
    @RequestMapping(value = "/list")
    public ModelAndView listUsers(HttpSession session, Page page) {
        try {
            pd = this.getPageData();
            String USERNAME = pd.getString("USERNAME");
            if (null != USERNAME && !"".equals(USERNAME)) {
                USERNAME = USERNAME.trim();
                pd.put("USERNAME", USERNAME);
            }
            page.setPd(pd);
            pd.put("parentId", "7");
            List<SysAppUser> userList = appUserService.findList(pd);        //列出用户列表
            List<SysRole> roleList = roleService.findList(pd);           //列出所有会员二级角色
            /*调用权限*/
            this.getHC(session);
            /*调用权限*/
            mv.setViewName("system/appuser/appuser_list");
            mv.addObject("userList", userList);
            mv.addObject("roleList", roleList);
            mv.addObject("pd", pd);
        } catch (Exception e) {
            log.error(e.toString(), e);
        }

        return mv;
    }
}
