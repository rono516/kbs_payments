import Iconify from "../../../shared/components/Iconify.tsx";
import settingIcon from "../../../assets/images/drawable-hdpi/Group -33.png";
const getIcon = (name) => <Iconify icon={name} width={22} height={22} sx={undefined} />;

export const SettingLinks=[
    {
        title: 'Settings',
        path: '/settings',
        icon: getIcon('material-symbols:settings'),
        image: settingIcon
    },
]