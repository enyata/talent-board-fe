export function env(variable: string) {
    const variables: { [key: string]: string | undefined } = {
        apiUrl: process.env.NEXT_PUBLIC_API_URL,
        appEnv: process.env.NEXT_PUBLIC_APP_ENV
    };

    return variables?.[variable];
}