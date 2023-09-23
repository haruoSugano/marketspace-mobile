import { Box, Text } from "native-base";

type Props = {
    text: string;
}

export function Checkbox({ text }: Props) {
    return (
        <Box>
            <input type="checkbox" />
            <Text>{text}</Text>
        </Box>
    );
}
