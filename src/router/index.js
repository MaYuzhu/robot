import Vue from 'vue'
import Router from 'vue-router'

import login from '@/pages/login'
import robotManagement from '@/pages/robotManagement'
import robotAddNewTask from '@/pages/robotAddNewTask'

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

import tasksDefectTracking1 from '@/pages/tasksDefectTracking1'
import tasksDefectTracking2 from '@/pages/tasksDefectTracking2'
import tasksDefectTracking3 from '@/pages/tasksDefectTracking3'
import tasksDefectTracking4 from '@/pages/tasksDefectTracking4'

import tasksMultispectralInspection from '@/pages/tasksMultispectralInspection'
import tasksCustomTask from '@/pages/tasksCustomTask'
import tasksTaskShow from '@/pages/tasksTaskShow'
import tasksPicUpload from '@/pages/pictureUpload'  //异物识别上传图片

import monitorsInspectionMonitoring from '@/pages/monitorsInspectionMonitoring'
import monitorsRobotControl from '@/pages/monitorsRobotControl'

import resultsConfirmAlarmQuery from '@/pages/resultsConfirmAlarmQuery'
import resultsConfirmIntervalShow from '@/pages/resultsConfirmIntervalShow'
import resultsConfirmInspectionResultsBrowse from '@/pages/resultsConfirmInspectionResultsBrowse'
import resultsConfirmInspectionTaskAudit from '@/pages/resultsConfirmInspectionTaskAudit'
import resultsConfirmInspectionReportGenerate from '@/pages/resultsConfirmInspectionReportGenerate'
import resultsLinePictureShow from '@/pages/resultsLinePictureShow'  //主接线展示
//import resultsLinePictureShow from '@/pages/testTableEdit.vue'     //表格编辑


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
  //mode: 'history',
  routes: [
    {
      path: '/',
      component: monitorsInspectionMonitoring,
      meta:{
        name:'巡检监控'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/robots/robot-management',  //robots/robot-management
      name: 'robotManagement',
      component: robotManagement,
      meta:{
        name:'机器人管理'
      }
    },
    {
      path: '/robots/add-task/:ids?',
      name: 'robotAddNewTask',
      component: robotAddNewTask,
      meta:{
        name:'创建任务'
      }
    },
    {
      path: '/tasks/comprehensive-inspection',
      name: 'tasksComprehensiveInspection',
      component: tasksComprehensiveInspection,
      meta:{
        name:'全面巡检'
      }
    },
    {
      path: '/tasks/routine-inspection',
      name: 'tasksRoutineInspection',
      component: tasksRoutineInspection,
      meta:{
        name:'例行巡检'
      }
    },
    {
      path: '/tasks/infrared-temperature',
      name: 'tasksInfraredTemperature',
      component: tasksInfraredTemperature,
      meta:{
        name:'红外测温'
      }
    },
    {
      path: '/tasks/oil-transcribe',
      name: 'tasksOilTranscribe',
      component: tasksOilTranscribe,
      meta:{
        name:'油位油温表抄录'
      }
    },
    {
      path: '/tasks/arrester-transcribe',
      name: 'tasksArresterTranscribe',
      component: tasksArresterTranscribe,
      meta:{
        name:'避雷器表抄录'
      }
    },
    {
      path: '/tasks/pressure-transcribe',
      name: 'tasksPressureTranscribe',
      component: tasksPressureTranscribe,
      meta:{
        name:'SF6压力表抄录'
      }
    },
    {
      path: '/tasks/hydraulic-transcribe',
      name: 'tasksHydraulicTranscribe',
      component: tasksHydraulicTranscribe,
      meta:{
        name:'液压表抄录'
      }
    },
    {
      path: '/tasks/position-status',
      name: 'tasksPositionStatus',
      component: tasksPositionStatus,
      meta:{
        name:'位置状态识别'
      }
    },
    {
      path: '/tasks/tasks-picture-upload',
      name: 'tasksPicUpload',
      component: tasksPicUpload,
      meta:{
        name:'异物缺陷识别'
      }
    },
    {
      path: '/tasks/bad-weather',
      name: 'tasksBadWeather',
      component: tasksBadWeather,
      meta:{
        name:'恶劣天气'
      }
    },
    {
      path: '/tasks/defect-tracking',
      name: 'tasksDefectTracking',
      component: tasksDefectTracking,
      meta:{
        name:'缺陷跟踪'
      }
    },
    {
      path: '/tasks/defect-tracking1',
      name: 'tasksDefectTracking1',
      component: tasksDefectTracking1,
      meta:{
        name:'远方状态'
      }
    },
    {
      path: '/tasks/defect-tracking2',
      name: 'tasksDefectTracking2',
      component: tasksDefectTracking2,
      meta:{
        name:'远方异常'
      }
    },
    {
      path: '/tasks/defect-tracking3',
      name: 'tasksDefectTracking3',
      component: tasksDefectTracking3,
      meta:{
        name:'安防联动'
      }
    },
    {
      path: '/tasks/defect-tracking4',
      name: 'tasksDefectTracking4',
      component: tasksDefectTracking4,
      meta:{
        name:'协助应急'
      }
    },
    {
      path: '/tasks/multispectral-inspection',
      name: 'tasksMultispectralInspection',
      component: tasksMultispectralInspection,
      meta:{
        name:'多光谱巡检'
      }
    },
    {
      path: '/tasks/custom-task',
      name: 'tasksCustomTask',
      component: tasksCustomTask,
      meta:{
        name:'自定义任务'
      }
    },
    {
      path: '/tasks/task-show',
      name: 'tasksTaskShow',
      component: tasksTaskShow,
      meta:{
        name:'任务展示'
      }
    },

    {
      path: '/monitors/inspection-monitoring',
      name: 'monitorsInspectionMonitoring',
      component: monitorsInspectionMonitoring,
      meta:{
        name:'巡检监控'
      }
    },
    {
      path: '/monitors/robot-control',
      name: 'monitorsRobotControl',
      component: monitorsRobotControl,
      meta:{
        name:'机器人遥控'
      }

    },

    {
      path: '/resultsConfirm/alarm-query',
      name: 'resultsConfirmAlarmQuery',
      component: resultsConfirmAlarmQuery,
      meta:{
        name:'设备告警信息确认'
      }
    },
    {
      path: '/resultsConfirm/interval-show',
      name: 'resultsConfirmIntervalShow',
      component: resultsConfirmIntervalShow,
      meta:{
        name:'间隔展示'
      }
    },
    {
      path: '/resultsConfirm/lineShow',
      name: 'resultsLinePictureShow',
      component: resultsLinePictureShow,
      meta:{
        name:'主接线展示'
      }
    },
    {
      path: '/resultsConfirm/inspection-results-browse',
      name: 'resultsConfirmInspectionResultsBrowse',
      component: resultsConfirmInspectionResultsBrowse,
      meta:{
        name:'巡检结果浏览'
      }
    },
    {
      path: '/resultsConfirm/inspection-task-audit',
      name: 'resultsConfirmInspectionTaskAudit',
      component: resultsConfirmInspectionTaskAudit,
      meta:{
        name:'巡检任务审核'
      }
    },
    {
      path: '/resultsConfirm/inspection-report-generate',
      name: 'resultsConfirmInspectionReportGenerate',
      component: resultsConfirmInspectionReportGenerate,
      meta:{
        name:'巡检报告生成'
      }
    },

    {
      path: '/resultsAnalysis/comparison-analysis',
      name: 'resultsAnalysisComparisonAnalysis',
      component: resultsAnalysisComparisonAnalysis,
      meta:{
        name:'对比分析'
      }
    },
    {
      path: '/resultsAnalysis/generate-reports',
      name: 'resultsAnalysisGenerateReports',
      component: resultsAnalysisGenerateReports,
      meta:{
        name:'生成报表'
      }
    },

    {
      path: '/users/threshold-setting',
      name: 'usersThresholdSetting',
      component: usersThresholdSetting,
      meta:{
        name:'告警阈值设置'
      }
    },
    {
      path: '/users/rights-management',
      name: 'usersRightsManagement',
      component: usersRightsManagement,
      meta:{
        name:'权限设置'
      }
    },
    {
      path: '/users/inspection-points-setting',
      name: 'usersInspectionPointsSetting',
      component: usersInspectionPointsSetting,
      meta:{
        name:'巡检点位设置'
      }
    },
    {
      path: '/users/user-management',
      name: 'usersUserManagement',
      component: usersUserManagement,
      meta:{
        name:'用户管理'
      }
    },
    {
      path: '/users/organizational-structure',
      name: 'usersOrganizationalStructure',
      component: usersOrganizationalStructure,
      meta:{
        name:'组织结构'
      }
    },
    {
      path: '/users/log-management',
      name: 'usersLogManagement',
      component: usersLogManagement,
      meta:{
        name:'日志管理'
      }
    },

    {
      path: '/systems/software-settings',
      name: 'systemsSoftwareSettings',
      component: systemsSoftwareSettings,
      meta:{
        name:'软件设置'
      }
    },
    {
      path: '/systems/robot-setup',
      name: 'systemsRobotSetup',
      component: systemsRobotSetup,
      meta:{
        name:'机器人设置'
      }
    },
    {
      path: '/systems/robot-alarm-query',
      name: '/systemsRobotAlarmQuery',
      component: systemsRobotAlarmQuery,
      meta:{
        name:'机器人告警查询'
      }
    },
    {
      path: '/systems/outlier-query',
      name: 'systemsOutlierQuery',
      component: systemsOutlierQuery,
      meta:{
        name:'设备异常点查询'
      }
    },
    {
      path: '/systems/status-display',
      name: 'systemsStatusDisplay',
      component: systemsStatusDisplay,
      meta:{
        name:'机器人状态显示'
      }
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
      //console.log(next)
      routersArr.push(to)
      routersArr = unique(routersArr)
      //console.log(routersArr)
    }
  }
});

/*function unique(arr) {
  var obj = {};
  var result = arr.reduce(function(item, next) {
    obj[next.component] ? '' : obj[next.component] = true && item.push(next);
    return item;
  }, []);
  return result
}*/
function unique(arr1) {
  const res = new Map();
  return arr1.filter((a) => !res.has(a.meta.name) && res.set(a.meta.name, 1))
}



const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default router;
