import Iconify from "../../../shared/components/Iconify.tsx";
import loanIcon from "../../../assets/images/drawable-hdpi/myloans-1.png";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} sx={undefined} />;

export const LoanLinks=[
    {
        title: 'Loans',
        path: '/loans',
        icon: getIcon('ep:money'),
        image: loanIcon
    },
]