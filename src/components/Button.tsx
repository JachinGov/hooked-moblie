import { Pressable, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  style: object;
};

export default function Button({ title, onPress, style }: ButtonProps) {
  return (
    <Pressable style={style} onPress={onPress}>
      <Text style={style}>{title}</Text>
    </Pressable>
  );
}
