const simpleChars: Record<string, string[]> = {
    "e": ["é", "è", "ê", "ë"],
    "a": ["à", "ä"],
    "o": ["ô", "ö"]
};

export function createSlug(title: string) {
    let res = title.toLowerCase().replaceAll(" ", "-");
    for (const [key, values] of Object.entries(simpleChars)) {
        for (const value of values) {
            res = res.replaceAll(value, key);
        }
    }
    return encodeURI(res);
}
