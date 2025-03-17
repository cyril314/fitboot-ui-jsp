package com.fit.web.system;

import com.fit.base.BaseController;
import com.fit.entity.*;
import com.fit.service.*;
import com.fit.util.BeanUtils;
import com.fit.util.Const;
import com.fit.util.RightsHelper;
import com.fit.util.Tools;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @AUTO
 * @Author AIM
 * @DATE 2025/3/13
 */
@Slf4j
@Controller
@RequestMapping("/admin")
public class IndexController extends BaseController {

    @Autowired
    private SysGlQxService sysGlQxService;
    @Autowired
    private SysMenuService menuService;
    @Autowired
    private SysRoleService roleService;
    @Autowired
    private SysUserService userService;
    @Autowired
    private SysUserQxService userQxService;

    /**
     * 获取用户权限
     */
    public Map<String, String> getUQX(HttpServletRequest request, HttpSession session) {
        Map<String, String> map = new HashMap<String, String>();
        try {
            String USERNAME = session.getAttribute("USERNAME").toString();
            SysUser user = new SysUser();
            user.setUsername(USERNAME);
            pd.put("USERNAME", USERNAME);
            user = userService.get(user);
            String ROLE_ID = user.getRoleId().toString();
            pd.put("ROLE_ID", ROLE_ID);

            SysRole role = roleService.get(ROLE_ID);
            map.put("adds", role.getAddQx());
            map.put("dels", role.getDelQx());
            map.put("edits", role.getEditQx());
            map.put("chas", role.getChaQx());

            SysGlQx sysGlQx = new SysGlQx();
            sysGlQx.setRoleId(ROLE_ID);
            sysGlQx.setGlId(role.getQxId());
            sysGlQx = sysGlQxService.get(sysGlQx);
            if (null != sysGlQx) {
                map.put("FX_QX", sysGlQx.getFwQx().toString());
                map.put("FW_QX", sysGlQx.getFwQx().toString());
                map.put("QX1", sysGlQx.getQx1().toString());
                map.put("QX2", sysGlQx.getQx2().toString());
                map.put("QX3", sysGlQx.getQx3().toString());
                map.put("QX4", sysGlQx.getQx4().toString());

                SysUserQx sysUserQx = new SysUserQx();
                sysUserQx.setUId(user.getUserId());
                sysUserQx = userQxService.get(sysUserQx);
                map.put("C1", sysUserQx.getC1().toString());
                map.put("C2", sysUserQx.getC2().toString());
                map.put("C3", sysUserQx.getC3().toString());
                map.put("C4", sysUserQx.getC4().toString());
                map.put("Q1", sysUserQx.getQ1().toString());
                map.put("Q2", sysUserQx.getQ2().toString());
                map.put("Q3", sysUserQx.getQ3().toString());
                map.put("Q4", sysUserQx.getQ4().toString());
            }

            this.getRemortIP(request, session, USERNAME);
        } catch (Exception e) {
            log.error(e.toString(), e);
        }
        return map;
    }

    /**
     * 获取登录用户的IP
     *
     * @throws Exception
     */
    public void getRemortIP(HttpServletRequest request, HttpSession session, String USERNAME) throws Exception {
        String ip = "";
        if (request.getHeader("x-forwarded-for") == null) {
            ip = request.getRemoteAddr();
        } else {
            ip = request.getHeader("x-forwarded-for");
        }
        SysUser user = (SysUser) session.getAttribute(Const.SESSION_USER);
        user.setIp(ip);
        userService.update(user);
    }

    public List<Map<String, Object>> getMenuTree(String roleRights) {
        List<Map<String, Object>> trees = new ArrayList<>();
        List<SysMenu> list = menuService.findList();
        for (SysMenu sysMenu : list) {
            Map<String, Object> map = BeanUtils.bean2Map(sysMenu);
            if (sysMenu.getParentId().equals("0")) {
                map.put("hasMenu", RightsHelper.testRights(roleRights, sysMenu.getMenuId()));
                map.put("subMenu", getMenuChildren(sysMenu.getMenuId(), list, roleRights));
                trees.add(map);
            }
        }
        return trees;
    }

    private List<Map<String, Object>> getMenuChildren(String parentId, List<SysMenu> list, String roleRights) {
        List<Map<String, Object>> children = new ArrayList<>();
        for (SysMenu menu : list) {
            if (parentId.equals(menu.getParentId())) {
                Map<String, Object> map = BeanUtils.bean2Map(menu);
                map.put("hasMenu", RightsHelper.testRights(roleRights, menu.getMenuId()));
                // 递归获取子分类的子分类
                map.put("subMenu", getMenuChildren(menu.getMenuId(), list, roleRights));
                children.add(map);
            }
        }
        return children;
    }

    /**
     * 访问系统首页
     */
    @RequestMapping("/index")
    public ModelAndView login_index(HttpServletRequest request, HttpSession session) {
        pd = this.getPageData();
        try {
            SysUser user = (SysUser) session.getAttribute(Const.SESSION_USER);
            if (user != null) {
                SysUser userr = (SysUser) session.getAttribute(Const.SESSION_USERROL);
                if (null == userr) {
                    user = userService.get(user.getUserId());
                    session.setAttribute(Const.SESSION_USERROL, user);
                } else {
                    user = userr;
                }
                SysRole role = this.roleService.get(user.getRoleId());
                String roleRights = role != null ? role.getRights() : "";
                // 避免每次拦截用户操作时查询数据库，以下将用户所属角色权限、用户权限限都存入session
                session.setAttribute(Const.SESSION_ROLE_RIGHTS, roleRights); // 将角色权限存入session
                session.setAttribute(Const.SESSION_USERNAME, user.getUsername());

                List<Map<String, Object>> allmenuList = new ArrayList<Map<String, Object>>();
                if (null == session.getAttribute(Const.SESSION_allmenuList)) {
                    allmenuList = this.getMenuTree(roleRights);
                    session.setAttribute(Const.SESSION_allmenuList, allmenuList); // 菜单权限放入session中
                } else {
                    allmenuList = (List<Map<String, Object>>) session.getAttribute(Const.SESSION_allmenuList);
                }
                // 切换菜单=====
                List<Map<String, Object>> menuList = new ArrayList<Map<String, Object>>();
                if (null == session.getAttribute(Const.SESSION_menuList) || ("yes".equals(pd.getString("changeMenu")))) {
                    List<Map<String, Object>> menuList1 = new ArrayList<Map<String, Object>>();
                    List<Map<String, Object>> menuList2 = new ArrayList<Map<String, Object>>();
                    // 拆分菜单
                    for (Map<String, Object> map : allmenuList) {
                        if ("1".equals(map.get("MENU_TYPE"))) {
                            menuList1.add(map);
                        } else {
                            menuList2.add(map);
                        }
                    }

                    session.removeAttribute(Const.SESSION_menuList);
                    if ("2".equals(session.getAttribute("changeMenu"))) {
                        session.setAttribute(Const.SESSION_menuList, menuList1);
                        session.removeAttribute("changeMenu");
                        session.setAttribute("changeMenu", "1");
                        menuList = menuList1;
                    } else {
                        session.setAttribute(Const.SESSION_menuList, menuList2);
                        session.removeAttribute("changeMenu");
                        session.setAttribute("changeMenu", "2");
                        menuList = menuList2;
                    }
                } else {
                    menuList = (List<Map<String, Object>>) session.getAttribute(Const.SESSION_menuList);
                }
                // 切换菜单=====
                if (null == session.getAttribute(Const.SESSION_QX)) {
                    session.setAttribute(Const.SESSION_QX, this.getUQX(request, session)); // 按钮权限放到session中
                }
                // FusionCharts 报表
                String strXML = "<graph caption='前12个月订单销量柱状图' xAxisName='月份' yAxisName='值' decimalPrecision='0' formatNumberScale='0'><set name='2013-05' value='4' color='AFD8F8'/><set name='2013-04' value='0' color='AFD8F8'/><set name='2013-03' value='0' color='AFD8F8'/><set name='2013-02' value='0' color='AFD8F8'/><set name='2013-01' value='0' color='AFD8F8'/><set name='2012-01' value='0' color='AFD8F8'/><set name='2012-11' value='0' color='AFD8F8'/><set name='2012-10' value='0' color='AFD8F8'/><set name='2012-09' value='0' color='AFD8F8'/><set name='2012-08' value='0' color='AFD8F8'/><set name='2012-07' value='0' color='AFD8F8'/><set name='2012-06' value='0' color='AFD8F8'/></graph>";
                mv.addObject("strXML", strXML);
                // FusionCharts 报表
                mv.setViewName("system/admin/index");
                mv.addObject("user", user);
                mv.addObject("menuList", menuList);
            } else {
                mv.setViewName("redirect:/login");// session失效后跳转登录页面
            }
        } catch (Exception e) {
            mv.setViewName("redirect:/login");
            log.error(e.getMessage(), e);
        }
        mv.addObject("pd", pd);
        return mv;
    }

    /**
     * 进入首页后的默认页面
     */
    @RequestMapping(value = "/default")
    public String defaultPage() {
        System.out.println("======================== 加载首页 =====================");
        return "system/admin/default";
    }
}