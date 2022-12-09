/*!*/
// @material-ui/icons
import { Dashboard, Person, Mail, Settings, LocalHospital, ThumbDownAlt, ThumbUpAlt } from "@material-ui/icons";
import DashboardPage from "../features/dashboard/DashboardPage"
import { CompletedPage, DeclinedPage, SendReferralPage } from "../features/referral/";
import { UsersPage } from "../features/users/";
import { SettingsPage } from "../features/settings/";
import { ClinicsPage } from "../features/clinics";

const adminRoutes = { "Admin":[{
  path: "/clinics",
  name: "Clinics",
  icon: Dashboard,
  component: ClinicsPage,
  layout: "/admin"
},
{
  path: "/users",
  name: "Users",
  icon: Person,
  component: UsersPage,
  layout: "/admin",
},
{
  path: "/settings",
  name: "Settings",
  icon: Settings,
  component: SettingsPage,
  layout: "/admin",
}],

"Clinic Admin":[{
  path: "/dashboard",
  name: "Dashboard",
  icon: Dashboard,
  component: DashboardPage,
  layout: "/admin"
},
{
  path: "/users",
  name: "Users",
  icon: Person,
  component: UsersPage,
  layout: "/admin",
},
{
  path: "/settings",
  name: "Settings",
  icon: Settings,
  component: SettingsPage,
  layout: "/admin",
}],

"Medical Reviewer":[{
  path: "/dashboard",
  name: "Dashboard",
  icon: Dashboard,
  component: DashboardPage,
  layout: "/admin"
},
{
  path: "/referral/declined",
  name: "Declined",
  icon: ThumbDownAlt    ,
  component: DeclinedPage,
  layout: "/admin",
},
{
  path: "/referral/completed",
  name: "Completed",
  icon: ThumbUpAlt,
  component: CompletedPage,
  layout: "/admin",
},
{
  path: "/settings",
  name: "Settings",
  icon: Settings,
  component: SettingsPage,
  layout: "/admin",
}],

"Medical Admin":[{
  path: "/dashboard",
  name: "Dashboard",
  icon: Dashboard,
  component: DashboardPage,
  layout: "/admin"
},
{
  path: "/referral/declined",
  name: "Declined",
  icon: ThumbDownAlt    ,
  component: DeclinedPage,
  layout: "/admin",
},
{
  path: "/referral/completed",
  name: "Completed",
  icon: ThumbUpAlt,
  component: CompletedPage,
  layout: "/admin",
},
{
  path: "/settings",
  name: "Settings",
  icon: Settings,
  component: SettingsPage,
  layout: "/admin",
}], 
"Patient Service Representative": [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/referral/send",
    name: "Send Referral",
    icon: Mail,
    component: SendReferralPage,
    layout: "/admin",
  },
  {
    path: "/referral/declined",
    name: "Declined",
    icon: ThumbDownAlt    ,
    component: DeclinedPage,
    layout: "/admin",
  },
  {
    path: "/referral/completed",
    name: "Completed",
    icon: ThumbUpAlt,
    component: CompletedPage,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings",
    icon: Settings,
    component: SettingsPage,
    layout: "/admin",
  },
] };

// const adminRoutes = [
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     icon: Dashboard,
//     component: DashboardPage,
//     layout: "/admin"
//   },
//   {
//     path: "/referral/send",
//     name: "Send Referral",
//     icon: Mail,
//     component: SendReferralPage,
//     layout: "/admin",
//   },
//   {
//     path: "/referral/declined",
//     name: "Declined",
//     icon: ThumbDownAlt    ,
//     component: DeclinedPage,
//     layout: "/admin",
//   },
//   {
//     path: "/referral/completed",
//     name: "Completed",
//     icon: ThumbUpAlt,
//     component: CompletedPage,
//     layout: "/admin",
//   },
//   {
//     path: "/clinics",
//     name: "Clinics",
//     icon: LocalHospital,
//     component: ClinicsPage,
//     layout: "/admin",
//   },
//   {
//     path: "/users",
//     name: "Users",
//     icon: Person,
//     component: UsersPage,
//     layout: "/admin",
//   },
//   {
//     path: "/settings",
//     name: "Settings",
//     icon: Settings,
//     component: SettingsPage,
//     layout: "/admin",
//   },
// ];


export default adminRoutes;