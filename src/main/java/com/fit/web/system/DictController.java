package com.fit.web.system;

import com.fit.base.BaseController;
import com.fit.base.Page;
import com.fit.base.PageData;
import com.fit.entity.SysDict;
import com.fit.service.SysDictService;
import com.fit.util.BeanUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
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
@RequestMapping(value = "/admin/dict")
public class DictController extends BaseController {

    @Autowired
    private SysDictService sysDictService;

    @RequestMapping
    public ModelAndView list(Page page) throws Exception {
        List<SysDict> szdList = new ArrayList<SysDict>();
        pd.clear();
        pd = this.getPageData();
        String PARENT_ID = pd.getString("PARENT_ID");
        if (null != PARENT_ID && !"".equals(PARENT_ID) && !"0".equals(PARENT_ID)) {
            //返回按钮用
            SysDict sysDict = sysDictService.get(PARENT_ID);
            mv.addObject("pdp", sysDict);
            //头部导航
            this.getDictName(szdList, PARENT_ID);    //	逆序
            Collections.reverse(szdList);
        }

        String NAME = pd.getString("NAME");
        if (null != NAME && !"".equals(NAME)) {
            NAME = NAME.trim();
            pd.put("NAME", NAME);
        }
        page.setShowCount(5);    //设置每页显示条数
        page.setPd(pd);
        List<SysDict> varList = sysDictService.findList();
        mv.setViewName("system/dict/zd_list");
        mv.addObject("varList", varList);
        mv.addObject("varsList", szdList);
        mv.addObject("pd", pd);

        return mv;
    }

    //递归
    public void getDictName(List<SysDict> szdList, String PARENT_ID) {
        try {
            SysDict dict = sysDictService.get(PARENT_ID);
            if (dict != null) {
                szdList.add(dict);
                this.getDictName(szdList, dict.getPId());
            }
        } catch (Exception e) {
            log.error(e.toString(), e);
        }
    }

    @RequestMapping(value = "/")
    public String edit(String id, HttpSession session) throws Exception {
        System.out.println("======================== 加载首页 =====================");
        return "system/dict/edit";
    }
}
