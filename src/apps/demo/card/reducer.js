//引用单据reducer（单据reducer做了针对单据类录入app，封装了共用函数）
import * as vr from '../../templates/voucher/reducer'


Object.assign(exports, {...vr,...exports})
