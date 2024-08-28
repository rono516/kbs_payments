import Iconify from "../../../shared/components/Iconify.tsx";
import savingIcon from "../../../assets/images/drawable-hdpi/mysavings.png";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} sx={undefined} />;

export const SavingLinks=[
    {
        title: 'Savings',
        path: '/savings',
        icon: getIcon('grommet-icons:money'),
        image: savingIcon
    },
]