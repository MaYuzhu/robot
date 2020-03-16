import Vue from 'vue'
import Router from 'vue-router'

import login from '@/pages/login'
import robotManagement from '@/pages/robotManagement'

import tasksComprehensiveInspection from '@/pages/tasksComprehensiveInspection'
import tasksRoutineInspection from '@/pages/tasksRoutineInspection'
import tasksInfraredTemperature from '@/pages/tasksInfraredTemperature'
import tasksOilTranscribe from '@/pages/tasksOilTranscribe'
import tasksArresterTranscribe from '@/pages/tasksArresterTranscribe'
import tasksPressureTranscribe from '@/pages/tasksPressureTranscribe'
import tasksHydraulicTranscribe from '@/pages/tasksHydraulicTranscribe'
import tasksPositionStatus from '@/pages/tasksPositionStatus'
import tasksBadWeather from '@/pages/tasksBadWeather'
import tasksDefectTracking from '@/pages/tasksDefectTracking'
import tasksMultispectralInspection from '@/pages/tasksMultispectralInspection'
import tasksCustomTask from '@/pages/tasksCustomTask'
import tasksTaskShow from '@/pages/tasksTaskShow'

import monitorsInspectionMonitoring from '@/pages/monitorsInspectionMonitoring'
import monitorsRobotControl from '@/pages/monitorsRobotControl'

import resultsConfirmAlarmQuery from '@/pages/resultsConfirmAlarmQuery'
import resultsConfirmIntervalShow from '@/pages/resultsConfirmIntervalShow'
import resultsConfirmInspectionResultsBrowse from '@/pages/resultsConfirmInspectionResultsBrowse'
import resultsConfirmInspectionTaskAudit from '@/pages/resultsConfirmInspectionTaskAudit'
import resultsConfirmInspectionReportGenerate from '@/pages/resultsConfirmInspectionReportGenerate'

import resultsAnalysisComparisonAnalysis from '@/pages/resultsAnalysisComparisonAnalysis'
import resultsAnalysisGenerateReports from '@/pages/resultsAnalysisGenerateReports'

import usersThresholdSetting from '@/pages/usersThresholdSetting'
import usersRightsManagement from '@/pages/usersRightsManagement'
import usersInspectionPointsSetting from '@/pages/usersInspectionPointsSetting'
import usersUserManagement from '@/pages/usersUserManagement'
import usersOrganizationalStructure from '@/pages/usersOrganizationalStructure'
import usersLogManagement from '@/pages/usersLogManagement'

import systemsSoftwareSettings from '@/pages/systemsSoftwareSettings'
import systemsRobotSetup from '@/pages/systemsRobotSetup'
import systemsRobotAlarmQuery from '@/pages/systemsRobotAlarmQuery'
import systemsOutlierQuery from '@/pages/systemsOutlierQuery'
import systemsStatusDisplay from '@/pages/systemsStatusDisplay'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/robots/robot-management',  //robots/robot-management
      name: 'robotManagement',
      component: robotManagement
    },
    {
      path: '/tasks/comprehensive-inspection',
      name: 'tasksComprehensiveInspection',
      component: tasksComprehensiveInspection
    },
    {
      path: '/tasks/routine-inspection',
      name: 'tasksRoutineInspection',
      component: tasksRoutineInspection
    },
    {
      path: '/tasks/infrared-temperature',
      name: 'tasksInfraredTemperature',
      component: tasksInfraredTemperature
    },
    {
      path: '/tasks/oil-transcribe',
      name: 'tasksOilTranscribe',
      component: tasksOilTranscribe
    },
    {
      path: '/tasks/arrester-transcribe',
      name: 'tasksArresterTranscribe',
      component: tasksArresterTranscribe
    },
    {
      path: '/tasks/pressure-transcribe',
      name: 'tasksPressureTranscribe',
      component: tasksPressureTranscribe
    },
    {
      path: '/tasks/hydraulic-transcribe',
      name: 'tasksHydraulicTranscribe',
      component: tasksHydraulicTranscribe
    },
    {
      path: '/tasks/position-status',
      name: 'tasksPositionStatus',
      component: tasksPositionStatus
    },
    {
      path: '/tasks/bad-weather',
      name: 'tasksBadWeather',
      component: tasksBadWeather
    },
    {
      path: '/tasks/defect-tracking',
      name: 'tasksDefectTracking',
      component: tasksDefectTracking
    },
    {
      path: '/tasks/multispectral-inspection',
      name: 'tasksMultispectralInspection',
      component: tasksMultispectralInspection
    },
    {
      path: '/tasks/custom-task',
      name: 'tasksCustomTask',
      component: tasksCustomTask
    },
    {
      path: '/tasks/task-show',
      name: 'tasksTaskShow',
      component: tasksTaskShow
    },

    {
      path: '/monitors/inspection-monitoring',
      name: 'monitorsInspectionMonitoring',
      component: monitorsInspectionMonitoring
    },
    {
      path: '/monitors/robot-control',
      name: 'monitorsRobotControl',
      component: monitorsRobotControl
    },

    {
      path: '/resultsConfirm/alarm-query',
      name: 'resultsConfirmAlarmQuery',
      component: resultsConfirmAlarmQuery
    },
    {
      path: '/resultsConfirm/interval-show',
      name: 'resultsConfirmIntervalShow',
      component: resultsConfirmIntervalShow
    },
    {
      path: '/resultsConfirm/inspection-results-browse',
      name: 'resultsConfirmInspectionResultsBrowse',
      component: resultsConfirmInspectionResultsBrowse
    },
    {
      path: '/resultsConfirm/inspection-task-audit',
      name: 'resultsConfirmInspectionTaskAudit',
      component: resultsConfirmInspectionTaskAudit
    },
    {
      path: '/resultsConfirm/inspection-report-generate',
      name: 'resultsConfirmInspectionReportGenerate',
      component: resultsConfirmInspectionReportGenerate
    },

    {
      path: '/resultsAnalysis/comparison-analysis',
      name: 'resultsAnalysisComparisonAnalysis',
      component: resultsAnalysisComparisonAnalysis
    },
    {
      path: '/resultsAnalysis/generate-reports',
      name: 'resultsAnalysisGenerateReports',
      component: resultsAnalysisGenerateReports
    },

    {
      path: '/users/threshold-setting',
      name: 'usersThresholdSetting',
      component: usersThresholdSetting
    },
    {
      path: '/users/rights-management',
      name: 'usersRightsManagement',
      component: usersRightsManagement
    },
    {
      path: '/users/inspection-points-setting',
      name: 'usersInspectionPointsSetting',
      component: usersInspectionPointsSetting
    },
    {
      path: '/users/user-management',
      name: 'usersUserManagement',
      component: usersUserManagement
    },
    {
      path: '/users/organizational-structure',
      name: 'usersOrganizationalStructure',
      component: usersOrganizationalStructure
    },
    {
      path: '/users/log-management',
      name: 'usersLogManagement',
      component: usersLogManagement
    },

    {
      path: '/systems/software-settings',
      name: 'systemsSoftwareSettings',
      component: systemsSoftwareSettings
    },
    {
      path: '/systems/robot-setup',
      name: 'systemsRobotSetup',
      component: systemsRobotSetup
    },
    {
      path: '/systems/robot-alarm-query',
      name: '/systemsRobotAlarmQuery',
      component: systemsRobotAlarmQuery
    },
    {
      path: '/systems/outlier-query',
      name: 'systemsOutlierQuery',
      component: systemsOutlierQuery
    },
    {
      path: '/systems/status-display',
      name: 'systemsStatusDisplay',
      component: systemsStatusDisplay
    },

  ]
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    //let token = localStorage.getItem('Authorization');
    let token = localStorage.getItem('token');

    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;
