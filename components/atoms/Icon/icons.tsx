import React from "react";

interface IconFactoryBuilder {
    color?: string;
    size?: number;
    checkColor?: string;
}
interface IconFactory {
    name: string;
    code: (props: IconFactoryBuilder) => React.ReactElement;
}

const ArrowRightIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 12L17.5 8V11H2.5V13H17.5V16L21.5 12Z" fill={color} />
        </svg>
    );
};

const GoogleIcon = ({ color }: IconFactoryBuilder) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.5327 12.1871C21.5327 11.3677 21.4662 10.7698 21.3223 10.1497H11.9656V13.848H17.4578C17.3471 14.7671 16.7491 16.1512 15.4204 17.0813L15.4017 17.2051L18.3601 19.4969L18.5651 19.5174C20.4475 17.7789 21.5327 15.2211 21.5327 12.1871Z"
                fill={color || "#4285F4"}
            />
            <path
                d="M11.9657 21.9313C14.6563 21.9313 16.9152 21.0454 18.5651 19.5174L15.4204 17.0813C14.5789 17.6682 13.4494 18.0779 11.9657 18.0779C9.33032 18.0779 7.0936 16.3395 6.29627 13.9366L6.1794 13.9466L3.10322 16.3273L3.06299 16.4391C4.70177 19.6945 8.06795 21.9313 11.9657 21.9313Z"
                fill={color || "#34A853"}
            />
            <path
                d="M6.29626 13.9366C6.08588 13.3166 5.96412 12.6521 5.96412 11.9656C5.96412 11.2791 6.08588 10.6147 6.28519 9.99466L6.27962 9.8626L3.16489 7.44366L3.06298 7.49214C2.38756 8.84305 2 10.3601 2 11.9656C2 13.5712 2.38756 15.0882 3.06298 16.4391L6.29626 13.9366Z"
                fill={color || "#FBBC05"}
            />
            <path
                d="M11.9657 5.85336C13.837 5.85336 15.0992 6.66168 15.819 7.33718L18.6315 4.59107C16.9042 2.9855 14.6563 2 11.9657 2C8.06795 2 4.70177 4.23672 3.06299 7.49214L6.2852 9.99466C7.0936 7.59183 9.33032 5.85336 11.9657 5.85336Z"
                fill={color || "#EB4335"}
            />
        </svg>
    );
};

const ArrowLeftIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 12L6.5 16V13L21.5 13V11L6.5 11L6.5 8L2.5 12Z" fill={color} />
        </svg>
    );
};

const AlertFilledIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17V15H13V17H11ZM11 7V13H13V7H11Z"
                fill={color}
            />
        </svg>
    );
};

const MenuIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M20 9H4V11H20V9ZM14 13H4V15H14V13Z" fill={color} />
        </svg>
    );
};

const CheckIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.79499 15.875L4.62499 11.705L3.20499 13.115L8.79499 18.705L20.795 6.705L19.385 5.295L8.79499 15.875Z"
                fill={color}
            />
        </svg>
    );
};

const CheckFilledIcon = ({ color = "#000", size = 24, checkColor = "#000" }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M20 9H4V11H20V9ZM14 13H4V15H14V13Z" fill={color} />
            <circle cx="12" cy="12" r="12" fill={color} />
            <path
                d="M11.1304 14.2604L8.6979 11.8279L7.86957 12.6504L11.1304 15.9113L18.1304 8.91128L17.3079 8.08878L11.1304 14.2604Z"
                fill={checkColor}
                fillOpacity="0.6"
            />
        </svg>
    );
};

const InProgressSurveyIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.0933 8.75911V12.9591L14.8933 14.3591M19.0933 12.9591C19.0933 16.8251 15.9593 19.9591 12.0933 19.9591C8.22727 19.9591 5.09326 16.8251 5.09326 12.9591C5.09326 9.09311 8.22727 5.95911 12.0933 5.95911C15.9593 5.95911 19.0933 9.09311 19.0933 12.9591Z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const NewSurveyIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.1865 19.9591C8.32053 19.9591 5.18652 16.8251 5.18652 12.9591C5.18652 9.09311 8.32053 5.95911 12.1865 5.95911C16.0525 5.95911 19.1865 9.09311 19.1865 12.9591C19.1865 16.8251 16.0525 19.9591 12.1865 19.9591Z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const CompletedSurveyIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.0005 12.3191V12.9631C18.9996 14.4726 18.5108 15.9414 17.607 17.1504C16.7032 18.3594 15.4328 19.2438 13.9852 19.6718C12.5377 20.0998 10.9906 20.0484 9.57462 19.5253C8.15866 19.0022 6.94975 18.0354 6.12816 16.7691C5.30657 15.5027 4.91634 14.0048 5.01566 12.4985C5.11498 10.9923 5.69853 9.55854 6.67928 8.41106C7.66003 7.26359 8.98544 6.46388 10.4578 6.13122C11.9302 5.79855 13.4707 5.95075 14.8495 6.56511M19.0005 7.36311L12.0005 14.3701L9.90049 12.2701"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

const Satisfaction1FilledIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM7.57109 16.2418C8.69518 14.9904 10.3088 14.2727 12.0002 14.2727C13.6956 14.2727 15.3102 14.9909 16.4297 16.2427C16.597 16.43 16.5811 16.7168 16.3943 16.8845C16.3075 16.9618 16.1988 17 16.0911 17C15.9665 17 15.842 16.9491 15.7525 16.8486C14.8052 15.7891 13.4375 15.1818 12.0002 15.1818C10.567 15.1818 9.19882 15.7895 8.24746 16.8491C8.07973 17.0363 7.792 17.0513 7.60564 16.8836C7.41882 16.7159 7.40337 16.4286 7.57109 16.2418ZM17.4545 8.81817C17.2032 8.81817 17 9.02181 17 9.27272C17 10.0245 16.3882 10.6364 15.6363 10.6364C14.8845 10.6364 14.2727 10.0245 14.2727 9.27272C14.2727 9.02181 14.0695 8.81817 13.8182 8.81817C13.5668 8.81817 13.3636 9.02181 13.3636 9.27272C13.3636 10.5259 14.3832 11.5454 15.6363 11.5454C16.8895 11.5454 17.9091 10.5259 17.9091 9.27272C17.9091 9.02181 17.7059 8.81817 17.4545 8.81817ZM10.1817 8.81817C10.4331 8.81817 10.6363 9.02181 10.6363 9.27272C10.6363 10.5259 9.61673 11.5454 8.36355 11.5454C7.11037 11.5454 6.09082 10.5259 6.09082 9.27272C6.09082 9.02181 6.294 8.81817 6.54537 8.81817C6.79673 8.81817 6.99991 9.02181 6.99991 9.27272C6.99991 10.0245 7.61173 10.6364 8.36355 10.6364C9.11537 10.6364 9.72718 10.0245 9.72718 9.27272C9.72718 9.02181 9.93037 8.81817 10.1817 8.81817Z"
                fill={color}
            />
        </svg>
    );
};

const Satisfaction2FilledIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12C22 6.47727 17.5227 2 12 2C6.47727 2 2 6.47727 2 12C2 17.5227 6.47727 22 12 22C17.5227 22 22 17.5227 22 12ZM8.36364 8.81817C9.11545 8.81817 9.72727 9.42999 9.72727 10.1818C9.72727 10.9336 9.11545 11.5454 8.36364 11.5454C7.61182 11.5454 7 10.9336 7 10.1818C7 9.42999 7.61182 8.81817 8.36364 8.81817ZM15.6364 8.81817C14.8846 8.81817 14.2728 9.42999 14.2728 10.1818C14.2728 10.9336 14.8846 11.5454 15.6364 11.5454C16.3882 11.5454 17.0001 10.9336 17.0001 10.1818C17.0001 9.42999 16.3882 8.81817 15.6364 8.81817ZM7.57109 16.2418C8.69473 14.9904 10.3093 14.2727 12.0002 14.2727C13.6956 14.2727 15.3102 14.9909 16.4297 16.2427C16.597 16.43 16.5811 16.7168 16.3943 16.8845C16.3075 16.9618 16.1988 17 16.0911 17C15.9665 17 15.842 16.949 15.7525 16.8486C14.8052 15.7891 13.4375 15.1818 12.0002 15.1818C10.567 15.1818 9.19882 15.7895 8.24746 16.849C8.08019 17.0359 7.79246 17.0513 7.60564 16.8836C7.41882 16.7159 7.40337 16.4286 7.57109 16.2418Z"
                fill={color}
            />
        </svg>
    );
};

const Satisfaction3FilledIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12C22 6.47727 17.5227 2 12 2C6.47727 2 2 6.47727 2 12C2 17.5227 6.47727 22 12 22C17.5227 22 22 17.5227 22 12ZM9.72727 10.1818C9.72727 10.9336 9.11545 11.5454 8.36364 11.5454C7.61182 11.5454 7 10.9336 7 10.1818C7 9.42999 7.61182 8.81817 8.36364 8.81817C9.11545 8.81817 9.72727 9.42999 9.72727 10.1818ZM15.6364 8.81817C14.8846 8.81817 14.2728 9.42999 14.2728 10.1818C14.2728 10.9336 14.8846 11.5454 15.6364 11.5454C16.3882 11.5454 17.0001 10.9336 17.0001 10.1818C17.0001 9.42999 16.3882 8.81817 15.6364 8.81817ZM7 14.7272C7 14.4763 7.20364 14.2727 7.45455 14.2727H16.5455C16.7964 14.2727 17 14.4763 17 14.7272C17 14.9781 16.7964 15.1818 16.5455 15.1818H7.45455C7.20364 15.1818 7 14.9781 7 14.7272Z"
                fill={color}
            />
        </svg>
    );
};

const Satisfaction4FilledIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12C22 6.47727 17.5227 2 12 2C6.47727 2 2 6.47727 2 12C2 17.5227 6.47727 22 12 22C17.5227 22 22 17.5227 22 12ZM8.36364 8.81817C9.11545 8.81817 9.72727 9.42999 9.72727 10.1818C9.72727 10.9336 9.11545 11.5454 8.36364 11.5454C7.61182 11.5454 7 10.9336 7 10.1818C7 9.42999 7.61182 8.81817 8.36364 8.81817ZM15.6364 8.81817C14.8846 8.81817 14.2728 9.42999 14.2728 10.1818C14.2728 10.9336 14.8846 11.5454 15.6364 11.5454C16.3882 11.5454 17.0001 10.9336 17.0001 10.1818C17.0001 9.42999 16.3882 8.81817 15.6364 8.81817ZM11.9999 16.0909C13.4371 16.0909 14.8044 15.4837 15.7517 14.4241C15.919 14.2368 16.2062 14.2214 16.394 14.3887C16.5812 14.5564 16.5971 14.8432 16.4299 15.0305C15.3099 16.2818 13.6953 17 11.9999 17C10.309 17 8.69441 16.2823 7.57077 15.0309C7.40304 14.8441 7.4185 14.5568 7.60532 14.3891C7.79213 14.2209 8.07941 14.2364 8.24713 14.4237C9.1985 15.4832 10.5667 16.0909 11.9999 16.0909Z"
                fill={color}
            />
        </svg>
    );
};

const Satisfaction5FilledIcon = ({ color = "#000", size = 24 }: IconFactoryBuilder) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C14.6711 2 17.1823 3.0402 19.0711 4.92895C20.9598 6.81766 22 9.32891 22 12C22 14.6711 20.9598 17.1823 19.0711 19.0711C17.1823 20.9598 14.6711 22 12 22C9.32891 22 6.81766 20.9598 4.92895 19.0711C3.04016 17.1823 2 14.6711 2 12C2 9.32891 3.04016 6.81766 4.92895 4.92895C6.81766 3.0402 9.32891 2 12 2ZM17.6986 9.35922C16.7239 8.38449 15.1379 8.38441 14.1631 9.35922C13.9307 9.59168 13.9307 9.96855 14.1632 10.201C14.3956 10.4334 14.7725 10.4334 15.005 10.201C15.5155 9.69043 16.3463 9.69039 16.8569 10.201C16.9731 10.3173 17.1255 10.3754 17.2778 10.3754C17.4301 10.3754 17.5824 10.3173 17.6986 10.201C17.9311 9.96855 17.9311 9.59164 17.6986 9.35922ZM9.83687 9.35922C8.86215 8.38441 7.27609 8.38449 6.30137 9.35922C6.06891 9.59168 6.06891 9.96855 6.30141 10.201C6.53387 10.4334 6.91078 10.4334 7.1432 10.201C7.65379 9.69043 8.48457 9.69047 8.99516 10.201C9.11133 10.3173 9.26371 10.3754 9.41602 10.3754C9.56832 10.3754 9.72062 10.3173 9.83687 10.201C10.0693 9.96855 10.0693 9.59164 9.83687 9.35922ZM6.12699 13.0318C6.12699 16.2701 8.76164 18.9048 12 18.9048C15.2384 18.9048 17.873 16.2701 17.873 13.0318C17.873 12.703 17.6065 12.4365 17.2778 12.4365H6.72223C6.39352 12.4365 6.12699 12.703 6.12699 13.0318ZM12.0004 17.7143C9.61996 17.7143 7.64871 15.929 7.35547 13.627H16.6452C16.352 15.929 14.3807 17.7143 12.0004 17.7143Z"
                fill={color}
            />
        </svg>
    );
};

export default [
    {
        name: "arrow-right",
        code: ArrowRightIcon,
    },
    {
        name: "google",
        code: GoogleIcon,
    },
    {
        name: "arrow-left",
        code: ArrowLeftIcon,
    },
    {
        name: "alert-filled",
        code: AlertFilledIcon,
    },
    {
        name: "menu",
        code: MenuIcon,
    },
    {
        name: "check",
        code: CheckIcon,
    },
    {
        name: "check-filled",
        code: CheckFilledIcon,
    },
    {
        name: "in-progress-surveys",
        code: InProgressSurveyIcon,
    },
    {
        name: "new-surveys",
        code: NewSurveyIcon,
    },
    {
        name: "completed-surveys",
        code: CompletedSurveyIcon,
    },
    {
        name: "satisfaction-1-filled",
        code: Satisfaction1FilledIcon,
    },
    {
        name: "satisfaction-2-filled",
        code: Satisfaction2FilledIcon,
    },
    {
        name: "satisfaction-3-filled",
        code: Satisfaction3FilledIcon,
    },
    {
        name: "satisfaction-4-filled",
        code: Satisfaction4FilledIcon,
    },
    {
        name: "satisfaction-5-filled",
        code: Satisfaction5FilledIcon,
    },
] as IconFactory[];
