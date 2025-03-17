package com.fit.web.system;

import com.fit.base.BaseController;
import com.fit.base.Page;
import com.fit.entity.SysGlQx;
import com.fit.entity.SysRole;
import com.fit.entity.SysUserQx;
import com.fit.service.SysGlQxService;
import com.fit.service.SysRoleService;
import com.fit.service.SysUserQxService;
import com.fit.util.Const;
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
 * @DATE 2025/3/13
 */
@Controller
@RequestMapping(value = "/role")
public class RoleController extends BaseController {

    @Autowired
    private SysRoleService roleService;
    @Autowired
    private SysGlQxService glQxService;
    @Autowired
    private SysUserQxService userQxService;

    /**
     * 列表
     */
    @RequestMapping
    public ModelAndView list(HttpSession session, Page page) throws Exception {
        pd = this.getPageData();
        String roleId = pd.getString("ROLE_ID");
        if (roleId == null || "".equals(roleId)) {
            pd.put("ROLE_ID", "1");
        }
        List<SysRole> roleList = roleService.findList();                //列出所有部门
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("parentId", roleId);
        List<SysRole> roleList_z = roleService.findList(param);        //列出此部门的所有下级

        List<SysGlQx> kefuqxlist = glQxService.findList();        //管理权限列表
        List<SysUserQx> gysqxlist = userQxService.findList();        //用户权限列表
        /*调用权限*/
        this.getHC(session);
        /*调用权限*/
        SysRole sysRole = roleService.get(roleId);//取得点击部门

        mv.addObject("pd", sysRole);
        mv.addObject("kefuqxlist", kefuqxlist);
        mv.addObject("gysqxlist", gysqxlist);
        mv.addObject("roleList", roleList);
        mv.addObject("roleList_z", roleList_z);
        mv.setViewName("system/role/role_list");

        return mv;
    }
}
