import { useQuery } from "@tanstack/react-query";

export function useFetchQuery(query_key: string, url: string) {
    return (useQuery({
        queryKey: [query_key],
        queryFn: async() => {
        const response = await fetch(
            url,
        )
        return await response.json();
        }
    })
    );
}