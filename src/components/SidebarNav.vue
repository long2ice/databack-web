<template>
  <ul class="menu bg-base-100 w-56 p-2 border-r h-screen">
    <li>
      <router-link to="/">
        <AkHomeAlt1 />
        {{ $t('home') }}
      </router-link>
    </li>
    <li>
      <router-link to="/datasource">
        <FeDatabase />
        {{ $t('datasource') }}
      </router-link>
    </li>
    <li>
      <router-link to="/storage">
        <TiOutlineCloudStorage />
        {{ $t('storage') }}
      </router-link>
    </li>
    <li>
      <router-link to="/task">
        <BsListTask />
        {{ $t('task') }}
      </router-link>
    </li>
    <li>
      <router-link to="/tasklog">
        <GlTaskDone />
        {{ $t('task_log') }}
      </router-link>
    </li>
  </ul>
</template>
