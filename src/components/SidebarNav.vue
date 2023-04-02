<template>
  <ul class="menu bg-base-100 w-56 p-2 border-r h-screen">
    <li>
      <router-link to="/">
        <AkHomeAlt1 />
        首页
      </router-link>
    </li>
    <li>
      <router-link to="/datasource">
        <FeDatabase />
        数据源
      </router-link>
    </li>
    <li>
      <router-link to="/storage">
        <TiOutlineCloudStorage />
        存储
      </router-link>
    </li>
    <li>
      <router-link to="/task">
        <BsListTask />
        备份任务</router-link
      >
    </li>
    <li>
      <router-link to="/tasklog">
        <GlTaskDone />
        任务记录</router-link
      >
    </li>
    <li>
      <a>
        <CaSettings />
        系统设置</a
      >
    </li>
  </ul>
</template>


