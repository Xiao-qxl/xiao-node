tracker-api
```
import api from '@/axios'
import qs from 'qs'

// eslint-disable-next-line import/prefer-default-export
export const sendTracker = (data) => api.get(`/tracker.jpg?${qs.stringify(data)}`)
```

nginx配置
```
  # tracker根据实际情况更新nginx地址
  # moduleName默认tracker，需在http{}/https{}中设置tracker模板
  # 埋点nginx添加以下配置
  http: {
  ...
  log_format tracker log_format tracker '$remote_addr - $http_user_id  [$time_local] "$request" $status';
  ...
  }

  server {
  ...
    location /tracker {
      default_type text/html;
      add_header Content-Type 'text/html; charset=utf-8';
      access_log logs/{projectName}/tracker.log {moduleName};
      return 200 "tracker success";
    }
  ...
  }
```
