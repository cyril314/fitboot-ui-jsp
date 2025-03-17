package com.fit.base;

import com.fit.util.Const;
import com.fit.util.Tools;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @AUTO 通用控制器
 * @Author AIM
 * @DATE 2019/4/19
 */
@Slf4j
public class BaseController {

    protected ModelAndView mv = new ModelAndView();
    protected PageData pd = new PageData();

    /**
     * 得到PageData
     */
    public PageData getPageData() {
        return new PageData(((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest());
    }

    public void getHC(HttpSession session){
        Map<String, Integer> map = (Map<String, Integer>)session.getAttribute(Const.SESSION_QX);
        mv.addObject(Const.SESSION_QX,map);	//按钮权限
        List<Map<String, Object>> menuList = (List<Map<String, Object>>) session.getAttribute(Const.SESSION_menuList);
        mv.addObject(Const.SESSION_menuList, menuList);// 菜单权限
    }

    /**
     * 将数据保存到session
     *
     * @param key   存入session键名
     * @param value 存入session值
     */
    protected void setValue2Session(HttpServletRequest res, String key, Object value) {
        res.getSession().setAttribute(key, value);
    }

    /**
     * 从session中获取数据
     *
     * @param key 取出session键名
     */
    protected Object getValueFromSession(HttpServletRequest res, String key) {
        return res.getSession().getAttribute(key);
    }

    /**
     * 将数据从session中删除
     *
     * @param key 删除session键名
     */
    protected void removeValueFromSession(HttpServletRequest res, String key) {
        res.getSession().removeAttribute(key);
    }

    /**
     * 将json数据写到客户端
     */
    protected void writeJson(HttpServletResponse response, String json) {
        try {
            log.info("服务器返回信息：==>{}", json);
            this.getPrintWriter(response).write(json);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取书写器
     */
    protected PrintWriter getPrintWriter(HttpServletResponse response) throws IOException {
        //response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Cache-Control", "no-cache");
        return response.getWriter();
    }

    /**
     * 获取请求的所有参数
     */
    protected Map<String, Object> getRequestParamsMap(HttpServletRequest request) {
        Map<String, Object> returnMap = new HashMap<String, Object>();
        try {
            Map<String, String[]> properties = request.getParameterMap();
            String value = "";
            for (Iterator<?> iter = properties.entrySet().iterator(); iter.hasNext(); ) {
                Map.Entry<?, ?> element = (Map.Entry<?, ?>) iter.next();
                Object strKey = element.getKey();
                Object strObj = element.getValue();
                if (null == strObj) {
                    value = "";
                } else if (strObj instanceof String[]) {
                    String[] values = (String[]) strObj;
                    for (int i = 0; i < values.length; i++) { // 用于请求参数中有多个相同名称
                        value = values[i] + ",";
                    }
                    value = value.substring(0, value.length() - 1);
                } else {
                    value = strObj.toString();// 用于请求参数中请求参数名唯一
                }
                returnMap.put(strKey.toString(), value);
            }
        } catch (Exception e) {
            log.error("getRequestParamsMap错误信息：{}", e);
        }
        return returnMap;
    }

    protected ResponseEntity<InputStreamResource> renderFile(String fileName, String filePath) {
        try {
            FileInputStream inputStream = new FileInputStream(filePath);
            return this.renderFile(fileName, inputStream);
        } catch (FileNotFoundException e) {
            throw new RuntimeException("FILE_READING_ERROR!");
        }
    }

    protected ResponseEntity<InputStreamResource> renderFile(String fileName, byte[] fileBytes) {
        return this.renderFile(fileName, new ByteArrayInputStream(fileBytes));
    }

    protected ResponseEntity<InputStreamResource> renderFile(String fileName, InputStream inputStream) {
        InputStreamResource resource = new InputStreamResource(inputStream);
        String dfileName = null;
        try {
            dfileName = new String(fileName.getBytes("gb2312"), "iso8859-1");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", dfileName);
        return new ResponseEntity(resource, headers, HttpStatus.CREATED);
    }
}