export default {
  home: '首页',
  datasource: '数据源',
  storage: '存储',
  task: '任务',
  task_log: '任务记录',
  add_datasource: '添加数据源',
  update_datasource: '更新数据源',
  name: '名称',
  name_placeholder: '请输入唯一名称',
  type: '类型',
  action: '操作',
  local: '本地',
  options: '选项',
  save: '保存',
  previous: '上一页',
  next: '下一页',
  back: '返回',
  host: '主机',
  port: '端口',
  username: '用户名',
  password: '密码',
  other_options: '其他选项',
  mysql_other_options_placeholder:
    '请填写其他选项，例如：--databases database1,database2，多个选项用空格分隔',
  mysql_other_options_tips: '所有选项请参考 mysqlpump 的帮助文档，',
  postgresql_other_options_placeholder: '请填写其他选项，例如：-a -b，多个选项用空格分隔',
  postgresql_other_options_tips: '所有选项请参考 {backup_program} 的帮助文档，',
  backup_program: '备份程序',
  local_path: '本地路径',
  remote_path: '远程路径',
  private_key: '私钥',
  private_key_pass: '私钥密码',
  import_private_key: '导入私钥文件',
  s3_type_desc: '任何兼容S3协议的存储',
  local_type_desc: '存储在本地目录',
  ssh_type_desc: '使用SCP存储到远程目录',
  validate: {
    name_required: '名称是必填项',
    host_required: '主机是必填项',
    port_required: '端口是必填项',
    username_required: '用户名是必填项',
    path_required: '路径是必填项',
    ak_required: 'Access Key ID是必填项',
    sk_required: 'Secret Access Key是必填项',
    bucket_name_required: '存储桶名称是必填项',
    keep_num_required: '保留数量是必填项',
    cron_required: '周期是必填项',
    keep_num_more_than_zero: '保留数量必须大于等于0',
    keep_days_more_than_zero: '保留天数必须大于等于0'
  },
  error: {
    server: '服务器错误，请稍后再试！'
  },
  success: {
    add_datasource: '添加数据源成功！',
    delete_datasource: '删除数据源成功！',
    update_datasource: '更新数据源成功！',
    add_storage: '添加存储成功！',
    delete_storage: '删除存储成功！',
    update_storage: '更新存储成功！',
    create_task: '创建任务成功！',
    update_task: '更新任务成功！',
    delete_task: '删除任务成功！',
    run_task: '运行任务成功！',
    delete_task_log: '删除任务记录成功！',
    restore_task_log: '提交恢复任务成功！',
    delete_restore_log: '删除恢复记录成功！'
  },
  created_at: '创建时间',
  updated_at: '更新时间',
  confirm_title: '确认',
  cancel: '取消',
  confirm: {
    delete_datasource: '确定要删除此数据源吗？',
    delete_storage: '确定要删除此存储吗？',
    delete_storage_message: '备份文件不会同时被删除',
    delete_task: '确定要删除此任务吗？',
    delete_task_log: '确定要删除此任务记录吗？',
    delete_task_log_msg: '备份文件将会同时删除，确定要删除吗？',
    delete_restore_log: '确定要删除此恢复记录吗？'
  },
  search: '查询',
  search_placeholder: '请输入查询内容',
  select_datasource_type: '选择数据源类型',
  reset: '重置',
  select_storage_type: '选择存储类型',
  add_storage: '添加存储',
  update_storage: '更新存储',
  access_key_id: 'Access Key ID',
  secret_access_key: 'Secret Access Key',
  bucket_name: '存储桶名称',
  region_name: '区域名称',
  endpoint_url: '端点URL',
  path: '路径',
  create_task: '添加任务',
  compress: '是否压缩',
  keep_num: '保留数量',
  keep_days: '保留天数',
  enabled: '是否开启',
  cron: '周期',
  update_task: '更新任务',
  keep_num_tips: '备份保留数量，0表示不限制',
  keep_days_tips: '备份保留天数，0表示不限制',
  cron_tips: 'Cron表达式，请参考',
  unlimited: '不限制',
  select_datasource: '选择数据源',
  select_storage: '选择存储',
  task_id: '任务ID',
  message: '消息',
  status: '状态',
  is_valid: '是否有效',
  start_at: '开始时间',
  end_at: '结束时间',
  copied: '已复制',
  size: '大小',
  task_log_stat: '任务记录统计',
  path_placeholder: '存储路径，默认为根目录',
  sub_path: '子路径',
  sub_path_tips: '相对于存储路径的子路径，不填写则默认为根目录',
  mysql_datasource_desc: '使用 mysqlpump 备份 MySQL 数据',
  postgres_datasource_desc: '使用 pg_dump 和 pg_dumpall 备份 PostgreSQL 数据',
  mongo_datasource_desc: '使用 mongodump 备份 MongoDB 数据',
  redis_datasource_desc: '使用 redis-dump-go 备份 Redis 数据',
  local_datasource_desc: '备份本地目录',
  ssh_datasource_desc: '使用 SCP 备份远程目录',
  restore: '备份恢复',
  mysql_restore_options_tips: '所有选项请参考 mysql 的帮助文档，',
  postgresql_restore_options_tips: '所有选项请参考 psql 的帮助文档，',
  submit: '提交',
  restore_log: '恢复记录',
  task_log_id: '任务记录ID',
  restore_type: '恢复类型',
  rows_selected: '已选择 {num} 行',
  delete_selected: '删除选中',
  columns: '展示列',
  total_rows: '共 {total} 条记录',
  root_path: '根目录',
  redis_other_options_placeholder: '其他选项，多个选项之间用空格分隔',
  redis_other_options_tips: '所有选项请参考 redis-dump-go 的帮助文档，',
  manual: '手动',
  redis_restore_options_tips: '所有选项请参考 redis-cli 的帮助文档，',
  mongo_other_options_placeholder: '其他选项，多个选项之间用空格分隔',
  mongo_other_options_tips: '所有选项请参考 mongodump 的帮助文档，',
  mongo_restore_options_tips: '所有选项请参考 mongorestore 的帮助文档，',
  next_run_at: '下次执行时间'
}
