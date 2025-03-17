package com.fit.web.system;

import com.fit.base.BaseController;
import com.fit.base.Page;
import com.fit.base.PageData;
import com.fit.entity.SysDict;
import com.fit.entity.SysMenu;
import com.fit.service.SysMenuService;
import com.fit.util.JacksonUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @AUTO
 * @Author AIM
 * @DATE 2025/3/13
 */
@Slf4j
@Controller
@RequestMapping(value = "/menu")
public class MenuController extends BaseController {

    @Autowired
    private SysMenuService menuService;

    /**
     * 显示菜单列表
     */
    @RequestMapping
    public ModelAndView list() {
        try {
            pd = this.getPageData();
            pd.put("parentId", "0");
            List<SysMenu> menuList = menuService.findList(pd);
            mv.addObject("menuList", menuList);
            mv.setViewName("system/menu/menu_list");
        } catch (Exception e) {
            log.error(e.toString(), e);
        }
        return mv;
    }

    /**
     * 获取当前菜单的所有子菜单
     */
    @RequestMapping(value = "/sub")
    @ResponseBody
    public void getSub(String MENU_ID, HttpServletResponse response) {
        try {
            pd = this.getPageData();
            pd.put("parentId", MENU_ID);
            List<SysMenu> subMenu = menuService.findList(pd);
            writeJson(response, JacksonUtils.toJson(subMenu));
        } catch (Exception e) {
            log.error(e.toString(), e);
        }
    }
}