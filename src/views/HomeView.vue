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
import type { TaskLogStatResponse } from '@/types/responses'
import { i18n } from '@/i18n'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const stat = await getStats()
const options = {
  plugins: {
    title: {
      display: true,
      text: i18n.global.t('task_log_stat')
    }
  }
}
const task_logs = stat.task_logs
const data = {
  labels: _.map(task_logs, 'date'),
  datasets: [
    {
      label: 'SUCCESS',
      data: _.filter(task_logs, { status: 'success' }).map(
        (item: TaskLogStatResponse) => item.count
      ),
      backgroundColor: '#7ed321'
    },
    {
      label: 'FAILED',
      data: _.filter(task_logs, { status: 'failed' }).map(
        (item: TaskLogStatResponse) => item.count
      ),
      backgroundColor: '#f87979'
    },
    {
      label: 'RUNNING',
      data: _.filter(task_logs, { status: 'running' }).map(
        (item: TaskLogStatResponse) => item.count
      ),
      backgroundColor: '#f8d21c'
    }
  ]
}
</script>
