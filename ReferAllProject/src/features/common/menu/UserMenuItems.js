import DashboardIcon from '@material-ui/icons/Dashboard';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PersonIcon from '@material-ui/icons/Person';
import PaymentIcon from '@material-ui/icons/Payment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AnnouncementIcon from '@material-ui/icons/Announcement';

export const COMMON_USER_MENU_ITEMS = [
    {
        label: 'Dashboard',
        path: '/dashboard',
        icon: DashboardIcon,
        parentLabel: 'general',
    },
    {
        label: 'Explore',
        path: '/explore',
        icon: SportsFootballIcon,
        parentLabel: 'general',
    },
];

const ADMIN_USER_MENU_FRAGMENT_ITEMS = [
    {
        label: 'Manage Pushes',
        path: '/manage/pushes',
        icon: DynamicFeedIcon,
        parentLabel: 'management',
    },
    {
        label: 'Manage Posts',
        path: '/manage/posts',
        icon: AssignmentIcon,
        parentLabel: 'management',
    },
    // {
    //     label: 'Manage Users',
    //     path: '/manage/users',
    //     icon: GroupIcon,
    //     parentLabel: 'management',
    // },
    {
        label: 'Manage Affiliates',
        path: '/manage/affiliates',
        icon: AssignmentIcon,
        parentLabel: 'management',
    },
    {
        label: 'Manage Newsletter',
        path: '/manage/newsletter',
        icon: AnnouncementIcon,
        parentLabel: 'management',
    },
    {
        label: 'Transaction History',
        path: '/payment/transactions',
        icon: ReceiptIcon,
        parentLabel: 'management',
    },
];

export const ADMIN_USER_MENU_ITEMS = COMMON_USER_MENU_ITEMS.concat(ADMIN_USER_MENU_FRAGMENT_ITEMS);

export const USER_MENU_ITEMS = COMMON_USER_MENU_ITEMS.concat([
    {
        label: 'How it works',
        path: '/howitworks',
        icon: EmojiObjectsIcon,
    },
    {
        label: 'About Us',
        path: '/aboutus',
        icon: SupervisedUserCircleIcon,
    },
    // {
    //     label: 'FAQs',
    //     path: '/faq',
    //     icon: LiveHelpIcon,
    // },
    // {
    //     label: 'Articles',
    //     path: '/articles',
    //     icon: FiberNewIcon,
    // },
]);

export const PUBLIC_MENU_ITEMS = [
    {
        label: 'Explore',
        path: '/explore',
        icon: SportsFootballIcon,
    },
    {
        label: 'How it works',
        path: '/howitworks',
        icon: EmojiObjectsIcon,
    },
    {
        label: 'About Us',
        path: '/aboutus',
        icon: SupervisedUserCircleIcon,
    },
    // {
    //     label: 'FAQs',
    //     path: '/faq',
    //     icon: LiveHelpIcon,
    // },
    // {
    //     label: 'Articles',
    //     path: '/articles',
    //     icon: FiberNewIcon,
    // },

];

export const USER_SETTINGS_OPTIONS = [
    {
        label: 'Account Settings',
        path: '/settings',
        icon: PersonIcon,
        children: [
            {
                label: 'User Profile',
                path: '/settings/account',
            },
            {
                label: 'Change Password',
                path: '/settings/change-password',
            }
        ],
    },
    {
        label: 'Billing',
        path: '/payment',
        icon: PaymentIcon,
        children: [
            {
                label: 'Payment Details',
                path: '/payment/details',
            },
            {
                label: 'Transaction History',
                path: '/payment/transactions',
            }
        ],
    },
];
