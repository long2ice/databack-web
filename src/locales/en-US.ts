export default {
  home: 'Home',
  datasource: 'Data Source',
  storage: 'Storage',
  task: 'Task',
  task_log: 'Task Log',
  add_datasource: 'Add Data Source',
  update_datasource: 'Update Data Source',
  name: 'Name',
  name_placeholder: 'Please enter unique name',
  type: 'Type',
  action: 'Action',
  local: 'Local',
  options: 'Options',
  save: 'Save',
  previous: 'Previous',
  next: 'Next',
  back: 'Back',
  host: 'Host',
  port: 'Port',
  username: 'Username',
  password: 'Password',
  other_options: 'Other Options',
  mysql_other_options_placeholder:
    'Please enter other options, such as: --databases=database1,database2, multiple options are separated by spaces',
  mysql_other_options_tips: 'All options refer to the help document of mysqlpump,',
  postgresql_other_options_placeholder:
    'Please enter other options, such as: -a -b, multiple options are separated by spaces',
  postgresql_other_options_tips: 'All options refer to the help document of {backup_program},',
  backup_program: 'Backup Program',
  local_path: 'Local Path',
  remote_path: 'Remote Path',
  private_key: 'Private Key',
  private_key_pass: 'Private Key Password',
  validate: {
    name_required: 'Name is required',
    host_required: 'Host is required',
    port_required: 'Port is required',
    username_required: 'Username is required',
    path_required: 'Path is required',
    ak_required: 'Access Key ID is required',
    sk_required: 'Secret Access Key is required',
    bucket_name_required: 'Bucket Name is required',
    keep_num_required: 'Keep Num is required',
    cron_required: 'Cron is required',
    keep_num_more_than_zero: 'Keep Num must be greater than or equal 0',
    keep_days_more_than_zero: 'Keep Days must be greater than or equal 0'
  },
  error: {
    server: 'Server error, please try again later!'
  },
  success: {
    add_datasource: 'Add data source success!',
    delete_datasource: 'Delete data source success!',
    update_datasource: 'Update data source success!',
    add_storage: 'Add storage success!',
    delete_storage: 'Delete storage success!',
    update_storage: 'Update storage success!',
    create_task: 'Create task success!',
    update_task: 'Update task success!',
    delete_task: 'Delete task success!',
    run_task: 'Run task success!',
    delete_task_log: 'Delete task log success!'
  },
  created_at: 'Created At',
  updated_at: 'Updated At',
  confirm_title: 'Confirm',
  cancel: 'Cancel',
  confirm: {
    delete_datasource: 'Are you sure to delete this data source?',
    delete_storage: 'Are you sure to delete this storage?',
    delete_task: 'Are you sure to delete this task?',
    delete_task_log: 'Are you sure to delete this task log?',
    delete_task_log_msg: 'The backup file will be deleted at the same time, please confirm!'
  },
  search: 'Search',
  search_placeholder: 'Please enter search content',
  select_datasource_type: 'Select Data Source Type',
  reset: 'Reset',
  select_storage_type: 'Select Storage Type',
  add_storage: 'Add Storage',
  update_storage: 'Update Storage',
  access_key_id: 'Access Key ID',
  secret_access_key: 'Secret Access Key',
  bucket_name: 'Bucket Name',
  region_name: 'Region Name',
  endpoint_url: 'Endpoint URL',
  path: 'Path',
  create_task: 'Add Task',
  compress: 'Compress',
  keep_num: 'Keep Num',
  keep_days: 'Keep Days',
  enabled: 'Enabled',
  cron: 'Cron',
  update_task: 'Update Task',
  keep_num_placeholder: 'The number of backups to keep, 0 means unlimited',
  keep_days_placeholder: 'The number of days to keep the backup, 0 means unlimited',
  cron_tips: 'Cron expression, please refer to the help document of',
  unlimited: 'Unlimited',
  select_datasource: 'Select Data Source',
  select_storage: 'Select Storage',
  task_id: 'Task ID',
  message: 'Message',
  status: 'Status',
  is_valid: 'Is Valid',
  start_at: 'Start At',
  end_at: 'End At',
  copied: 'Copied',
  size: 'Size',
  task_log_stat: 'Task Log Stat'
}
