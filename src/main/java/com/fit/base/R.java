package com.fit.base;

import java.util.HashMap;

/**
 * 操作消息提醒
 */
public class R extends HashMap<String, Object> {

    private static final long serialVersionUID = 1L;

    /**
     * 初始化一个新创建的 Message 对象
     */
    public R() {
    }

    /**
     * 返回成功消息
     *
     * @param key   键值
     * @param value 内容
     */
    @Override
    public R put(String key, Object value) {
        super.put(key, value);
        return this;
    }

    /**
     * 返回消息
     *
     * @param code  信息码
     * @param msg   内容
     * @param count 分页总数量
     * @param obj   返回数据
     */
    public static R results(int code, String msg, int count, Object obj) {
        R json = new R();
        json.put("code", code);
        json.put("msg", msg);
        json.put("recordsTotal", count);
        json.put("recordsFiltered", count);
        json.put("data", obj);
        return json;
    }

    /**
     * 返回错误消息
     */
    public static R error() {
        return error(-1, "操作失败");
    }

    /**
     * 返回错误消息
     *
     * @param msg 内容
     */
    public static R error(String msg) {
        return error(-1, msg);
    }

    /**
     * 返回错误消息
     *
     * @param code 错误码
     * @param msg  内容
     */
    public static R error(int code, String msg) {
        return results(code, msg, 0, null);
    }

    /**
     * 返回成功消息
     */
    public static R success() {
        return R.success("操作成功");
    }

    /**
     * 返回成功消息
     *
     * @param msg 内容
     */
    public static R success(String msg) {
        return success(0, msg, 0, null);
    }

    /**
     * 返回成功消息
     *
     * @param obj 返回数据
     */
    public static R success(Object obj) {
        return success(0, "请求成功", 0, obj);
    }

    /**
     * 返回成功消息
     *
     * @param count 分页总数量
     * @param obj   返回数据
     */
    public static R success(int count, Object obj) {
        return success(0, "获取列表成功", count, obj);
    }

    /**
     * 返回成功消息
     *
     * @param msg 内容
     * @param obj 返回数据
     */
    public static R success(String msg, Object obj) {
        return success(0, msg, 0, obj);
    }

    /**
     * 返回成功消息
     *
     * @param code 信息码
     * @param msg  内容
     */
    public static R success(int code, String msg) {
        return success(code, msg, 0, null);
    }

    /**
     * 返回成功消息
     *
     * @param code 信息码
     * @param msg  内容
     * @param obj  返回数据
     */
    public static R success(int code, String msg, Object obj) {
        return success(code, msg, 0, obj);
    }

    /**
     * 返回成功消息
     *
     * @param code  信息码
     * @param msg   内容
     * @param count 分页总数量
     * @param obj   返回数据
     */
    public static R success(int code, String msg, int count, Object obj) {
        return results(code, msg, count, obj);
    }
}
