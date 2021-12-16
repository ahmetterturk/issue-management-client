import GridViewIcon from '@mui/icons-material/GridView';
import Search from '@mui/icons-material/Search';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';

const navList = [
  {
    icon: Search,
    desc: 'Search',
    secondDesc: '',
    badge: 0,
    subList: [],
  },
  {
    icon: GridViewIcon,
    desc: 'Dashboard',
    secondDesc: '',
    badge: 0,
    subList: [],
  },
  {
    icon: ReceiptLongRoundedIcon,
    desc: 'Ticket',
    secondDesc: '',
    badge: 0,
    subList: [],
    link: '/issues'
  },
  {
    icon: AssessmentOutlinedIcon,
    desc: 'Graphs',
    secondDesc: '',
    badge: 0,
    subList: [],
  },
  {
    icon: PeopleOutlineIcon,
    desc: 'Employees',
    secondDesc: '',
    badge: 0,
    subList: [],
    link: '/profiles'
  },
  {
    icon: ManageAccountsOutlinedIcon,
    desc: 'Profile',
    secondDesc: '',
    badge: 0,
    subList: [],
    link: '/profile'
  },
  {
    icon: MeetingRoomOutlinedIcon,
    desc: 'Log out',
    secondDesc: '',
    badge: 0,
    subList: [],
    link: '/login'
  }
];

export default navList;
