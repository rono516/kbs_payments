import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { LandingRoutes } from "../packages/landing/routes";
import { AuthRoutes } from "../packages/auth/routes";
import {DashboardRoutes} from "../packages/dashboard/routes";
import {LoanRoutes} from "../packages/loan/routes";
import {SavingRoutes} from "../packages/savings/routes";
import {UtilityRoutes} from "../packages/utility/routes";
import {SettingRoutes} from "../packages/setting/routes";

const systemRoutes: RouteObject[] = [];
systemRoutes.push(...LandingRoutes);
systemRoutes.push(...AuthRoutes);
systemRoutes.push(...DashboardRoutes);
systemRoutes.push(...LoanRoutes);
systemRoutes.push(...SavingRoutes);
systemRoutes.push(...UtilityRoutes);
systemRoutes.push(...SettingRoutes);

export const router = createBrowserRouter(systemRoutes);
