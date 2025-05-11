export function env(variable: string) {
    const variables: { [key: string]: string | undefined } = {
        apiUrl: process.env.NEXT_PUBLIC_API_URL,
    };

    return variables?.[variable];
}