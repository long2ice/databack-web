<template>
  <div class="flex gap-4">
    <div class="stats shadow">
      <router-link to="/datasource">
        <div class="stat">
          <div class="stat-figure">
            <FeDatabase class="text-2xl" />
          </div>
          <div class="stat-title">{{ $t('datasource') }}</div>
          <div class="stat-value">{{ stat.datasource_count }}</div>
        </div>
      </router-link>
      <router-link to="/storage">
        <div class="stat">
          <div class="stat-figure">
            <TiOutlineCloudStorage class="text-2xl" />
          </div>
          <div class="stat-title">{{ $t('storage') }}</div>
          <div class="stat-value">{{ stat.storage_count }}</div>
        </div>
      </router-link>
      <router-link to="/task">
        <div class="stat">
          <div class="stat-figure">
            <BsListTask class="text-2xl" />
          </div>
          <div class="stat-title">{{ $t('task') }}</div>
          <div class="stat-value">{{ stat.task_count }}</div>
        </div>
      </router-link>
      <router-link to="/task_log">
        <div class="stat">
          <div class="stat-figure">
            <GlTaskDone class="text-2xl" />
          </div>
          <div class="stat-title">{{ $t('task_log') }}</div>
          <div class="stat-value">{{ stat.task_log_count }}</div>
        </div>
      </router-link>
      <router-link to="/restore_log">
        <div class="stat">
          <div class="stat-figure">
            <MdRestore class="text-2xl" />
          </div>
          <div class="stat-title">{{ $t('restore_log') }}</div>
          <div class="stat-value">{{ stat.restore_log_count }}</div>
        </div>
      </router-link>
      <router-link to="/admin">
        <div class="stat">
          <div class="stat-figure">
            <CaUserAdmin class="text-2xl" />
          </div>
          <div class="stat-title">{{ $t('admin') }}</div>
          <div class="stat-value">{{ stat.admin_count }}</div>
        </div>
      </router-link>
      <router-link to="/action_log">
        <div class="stat">
          <div class="stat-figure">
            <CaCloudLogging class="text-2xl" />
          </div>
          <div class="stat-title">{{ $t('action_log') }}</div>
          <div class="stat-value">{{ stat.action_log_count }}</div>
        </div>
      </router-link>
    </div>
  </div>
  <div class="w-[75%]">
    <Line :options="options" :data="data" />
  </div>
</template>
<script setup lang="ts">
import { getStats } from '@/api/stat'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import _ from 'lodash'
import { useI18n } from 'vue-i18n'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)
const { t } = useI18n()
const stat = await getStats()
const options = {
  plugins: {
    title: {
      display: true,
      text: t('task_log_stat')
    }
  }
}
const task_logs = stat.task_logs
const data = {
  labels: _.map(task_logs, 'date'),
  datasets: [
    {
      label: 'SUCCESS',
      data: _.map(task_logs, (log) => {
        if (log.status == 'success') {
          return log.count
        }
        return 0
      }),
      backgroundColor: '#7ed321'
    },
    {
      label: 'FAILED',
      data: _.map(task_logs, (log) => {
        if (log.status == 'failed') {
          return log.count
        }
        return 0
      }),
      backgroundColor: '#f87979'
    },
    {
      label: 'RUNNING',
      data: _.map(task_logs, (log) => {
        if (log.status == 'running') {
          return log.count
        }
        return 0
      }),
      backgroundColor: '#f8d21c'
    }
  ]
}
</script>
