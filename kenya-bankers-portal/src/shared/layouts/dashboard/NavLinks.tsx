// ----------------------------------------------------------------------

import {DashboardLinks} from "../../../packages/dashboard/routes/DashboardLinks.tsx";
import {LoanLinks} from "../../../packages/loan/routes/LoanLinks.tsx";
import {SavingLinks} from "../../../packages/savings/routes/SavingLinks.tsx";
import {UtilityLinks} from "../../../packages/utility/routes/UtilityLinks.tsx";
import {SettingLinks} from "../../../packages/setting/routes/SettingLinks.tsx";

const navConfig = [];
navConfig.push(...DashboardLinks);
navConfig.push(...LoanLinks);
navConfig.push(...SavingLinks);
navConfig.push(...UtilityLinks);
navConfig.push(...SettingLinks);

export default navConfig;