export default [
  {
    name: 'arrow-right',
    code: (color = '#000', size = 24) => {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21.5 12L17.5 8V11H2.5V13H17.5V16L21.5 12Z" fill={color} />
        </svg>
      )
    }
  },
  {
    name: 'google',
    code: (color: string | undefined) => {
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
      )
    }
  },
  {
    name: 'arrow-left',
    code: (color = '#000', size = 24) => {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.5 12L6.5 16V13L21.5 13V11L6.5 11L6.5 8L2.5 12Z" fill={color} />
        </svg>
      )
    }
  },
  {
    name: 'alert-filled',
    code: (color = '#000', size = 24) => {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 17V15H13V17H11ZM11 7V13H13V7H11Z"
            fill={color}
          />
        </svg>
      )
    }
  },
  {
    name: 'menu',
    code: (color = '#000', size = 24) => {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 9H4V11H20V9ZM14 13H4V15H14V13Z"
            fill={color}
          />
        </svg>
      )
    }
  },
  {
    name: 'check',
    code: (color = '#000', size = 24) => {
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.79499 15.875L4.62499 11.705L3.20499 13.115L8.79499 18.705L20.795 6.705L19.385 5.295L8.79499 15.875Z"
            fill={color}
          />
        </svg>
      )
    }
  },
]
