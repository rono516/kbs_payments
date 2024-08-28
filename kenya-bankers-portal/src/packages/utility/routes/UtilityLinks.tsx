import Iconify from "../../../shared/components/Iconify.tsx";
import utilityIcon from "../../../assets/images/drawable-hdpi/Group -83.png";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} sx={undefined} />;

export const UtilityLinks=[
    {
        title: 'Utilities',
        path: '/utilities',
        icon: getIcon('arcticons:network-utilities'),
        image: utilityIcon
    },
]