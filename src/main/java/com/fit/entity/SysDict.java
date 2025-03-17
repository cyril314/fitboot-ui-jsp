package com.fit.entity;

import com.fit.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @AUTO 字典表
 * @Author AIM
 * @DATE 2025-03-17 15:26:43
 */
@Data
@Builder
@NoArgsConstructor //无参数的构造方法
@AllArgsConstructor //包含所有变量构造方法
public class SysDict extends BaseEntity {
    /** 主键 (主健ID) (无默认值) */
    private String zdId;

    /** 名称 (无默认值) */
    private String name;

    /** 编码 (无默认值) */
    private String code;

    /** 序号 (无默认值) */
    private Integer sort;

    /** 级别 (无默认值) */
    private Integer jb;

    /** 父级ID (无默认值) */
    private String pId;

    /** 父编码 (无默认值) */
    private String pCode;
}