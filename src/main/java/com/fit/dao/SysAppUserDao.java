package com.fit.dao;

import com.fit.base.BaseCrudDao;
import com.fit.entity.SysAppUser;
import org.apache.ibatis.annotations.Mapper;

/**
 * @AUTO 接口
 * @Author AIM
 * @DATE 2025-03-13 16:06:37
 */
@Mapper
public interface SysAppUserDao extends BaseCrudDao<SysAppUser> {
}