<template>
  <div class="flex gap-4">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure">
          <FeDatabase class="text-2xl" />
        </div>
        <div class="stat-title">{{ $t('datasource') }}</div>
        <div class="stat-value">{{ stat.datasource_count }}</div>
      </div>
      <div class="stat">
        <div class="stat-figure">
          <TiOutlineCloudStorage class="text-2xl" />
        </div>
        <div class="stat-title">{{ $t('storage') }}</div>
        <div class="stat-value">{{ stat.storage_count }}</div>
      </div>
      <div class="stat">
        <div class="stat-figure">
          <BsListTask class="text-2xl" />
        </div>
        <div class="stat-title">{{ $t('task') }}</div>
        <div class="stat-value">{{ stat.task_count }}</div>
      </div>
      <div class="stat">
        <div class="stat-figure">
          <GlTaskDone class="text-2xl" />
        </div>
        <div class="stat-title">{{ $t('task_log') }}</div>
        <div class="stat-value">{{ stat.task_log_count }}</div>
      </div>
      <div class="stat">
        <div class="stat-figure">
          <MdTwotoneRestore class="text-2xl" />
        </div>
        <div class="stat-title">{{ $t('restore_log') }}</div>
        <div class="stat-value">{{ stat.restore_log_count }}</div>
      </div>
    </div>
  </div>
  <div class="max-w-5xl">
    <Line :options="options" :data="data" />
  </div>
</template>
<script setup lang="ts">
import { getStats } from '@/apis/stat'
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
