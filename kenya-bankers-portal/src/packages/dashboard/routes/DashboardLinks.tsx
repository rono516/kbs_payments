import Iconify from "../../../shared/components/Iconify.tsx";
import homeIcon from "../../../assets/images/drawable-hdpi/Home.png";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} sx={undefined} />;

export const DashboardLinks=[
    {
        title: 'Home',
        path: '/dashboard',
        icon: getIcon('bxs:dashboard'),
        image: homeIcon
    },
]