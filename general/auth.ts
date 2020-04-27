//@ts-ignore
const AUTH_TOKEN_NAME = "jwtToken";

const getToken: () => string = () => localStorage.getItem(AUTH_TOKEN_NAME) || "";

const setToken: (token: string) => void = (token: string) => localStorage.setItem(AUTH_TOKEN_NAME, token);

const deleteToken: () => void = () => localStorage.removeItem(AUTH_TOKEN_NAME);

export { getToken, setToken, deleteToken };
