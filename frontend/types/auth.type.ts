interface IAccount {
    // Define the properties of the User object here
    id: number;
    username: string;
    role: string;
    // Add more properties as needed
}

interface ILoginResponse{
    accessToken: string;
    refreshToken?: string; //todo
}

interface ILoginData {
    username: string;
    password: string;
}

interface ISignUpData {
    username: string;
    password: string;
}