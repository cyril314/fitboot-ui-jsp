package com.fit.entity;

import com.fit.base.BaseEntity;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @AUTO 
 * @Author AIM
 * @DATE 2025-03-13 16:06:37
 */
@Data
@Builder
@NoArgsConstructor //无参数的构造方法
@AllArgsConstructor //包含所有变量构造方法
public class SysUser extends BaseEntity {
    /**  (主健ID) (无默认值) */
    private String userId;

    /**  (无默认值) */
    private String username;

    /**  (无默认值) */
    private String password;

    /**  (无默认值) */
    private String name;

    /**  (无默认值) */
    private String rights;

    /**  (无默认值) */
    private String roleId;

    /**  (无默认值) */
    private String lastLogin;

    /**  (无默认值) */
    private String ip;

    /**  (无默认值) */
    private String status;

    /**  (无默认值) */
    private String bz;

    /**  (无默认值) */
    private String skin;

    /**  (无默认值) */
    private String email;

    /**  (无默认值) */
    private String number;

    /**  (无默认值) */
    private String phone;
}